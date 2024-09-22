import React, { useEffect, useState } from "react";
import SubPageTitle from "../components/common/SubPageTitle";
import PageHeading from "../components/common/PageHeading";
import { MdLocationPin } from "react-icons/md";
import axios from "axios";
import Cookies from "js-cookie";

const EditDetails = () => {
    const token = Cookies.get("llu-token");
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [formData, setFormData] = useState({
        fullName: "",
        establishedIn: "",
        professionalsResources: "",
        address: "Green Valley, Hill road, NY",
    });

    useEffect(() => {
        async function apiCall() {
            try {
                let response = await axios.get(
                    `${baseUrl}/api/facilitator/edit_details`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );

                const {
                    first_name,
                    last_name,
                    latitude,
                    longitude,
                    no_of_professionals,
                } = response.data.data.facilitatorInfo[0];
                console.log(
                    first_name,
                    last_name,
                    latitude,
                    longitude,
                    no_of_professionals
                );
                const fullName = `${first_name} ${last_name}`;
                setFormData({
                    fullName,
                    professionalsResources: no_of_professionals,
                });
            } catch (error) {
                console.log(error);
            }
        }

        apiCall();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section>
            <PageHeading title={"Edit Facilitator Details"} />

            <p>
                Full Name<span className="text-redText">*</span>
            </p>
            <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Write full name here"
                className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
            />

            <p>
                Established in<span className="text-redText">*</span>
            </p>
            <input
                name="establishedIn"
                value={formData.establishedIn}
                onChange={handleChange}
                placeholder="2004"
                className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
            />

            <p>
                Professionals Resources
                <span className="text-redText">*</span>
            </p>
            <input
                name="professionalsResources"
                value={formData.professionalsResources}
                onChange={handleChange}
                placeholder="25"
                className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
            />

            <div className="flex items-center justify-between">
                <SubPageTitle title={"Address"} />
                <p className="text-darkText">View on map</p>
            </div>
            <p className="mb-2 text-sm text-gray-400">
                <MdLocationPin className="inline-block text-xl text-Primary" />
                {formData.address}
            </p>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4967.308022344391!2d90.36704350771629!3d23.807506139831705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1725902792584!5m2!1sen!2sbd"
                width="600"
                height="300"
                className="w-full rounded-2xl"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
        </section>
    );
};

export default EditDetails;
