import React from "react";
import SubPageTitle from "../components/common/SubPageTitle";
import { CiCirclePlus } from "react-icons/ci";
import { FaAngleRight } from "react-icons/fa";
import PageHeading from "../components/common/PageHeading";
import { MdLocationPin } from "react-icons/md";

const EditDetails = () => {
    return (
        <section>
            <PageHeading title={"Edit Facilitator Details"} />
            <div className="w-1/2 mx-auto">
                <p>
                    Full Name<span className="text-redText">*</span>
                </p>
                <input
                    placeholder="Write full name here"
                    className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
                />
                <p>
                    Hourly Rate<span className="text-redText">*</span>
                </p>
                <div className="mt-2 mb-5 flex items-center gap-2 rounded-lg bg-darkSlate pl-3">
                    <div className="border-r border-Secondary pr-2">USD</div>
                    <input
                        placeholder="Hourly Rate"
                        className=" w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
                    />
                </div>
                <p>
                    Established in*<span className="text-redText">*</span>
                </p>
                <input
                    placeholder="2004"
                    className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
                />
                <p>
                    Professionals Resources*
                    <span className="text-redText">*</span>
                </p>
                <input
                    placeholder="25"
                    className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
                />
            </div>

            <div className=" flex justify-between items-center">
                <SubPageTitle title={"Address"} />
                <p className="text-darkText">View on map</p>
            </div>
            <p className="mb-2 text-sm text-gray-400">
                <MdLocationPin className="inline-block text-xl text-Primary" />
                Green Valley, Hill road, NY
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

            <div className="flex items-center justify-between text-xl font-medium">
                <SubPageTitle title={"Facility List"} />
                <CiCirclePlus className="text-3xl" />
            </div>

            <div className="grid grid-cols-3 gap-3">
                <div className="flex items-center justify-between rounded-lg bg-darkSlate p-3">
                    <p>Ark Indoor Stadium</p>
                    <FaAngleRight />
                </div>
                <div className="flex items-center justify-between rounded-lg bg-darkSlate p-3">
                    <p>Sports Club</p>
                    <FaAngleRight />
                </div>
                <div className="flex items-center justify-between rounded-lg bg-darkSlate p-3">
                    <p>Basketball Indoor Club</p>
                    <FaAngleRight />
                </div>
            </div>
        </section>
    );
};

export default EditDetails;
