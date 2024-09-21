import React, { useEffect, useState } from "react";
import PageHeading from "../components/common/PageHeading";
import SubPageTitle from "../components/common/SubPageTitle";
import { BsPlusSquareDotted } from "react-icons/bs";
import axios from "axios";
import Cookies from "js-cookie";

const EditFacility = () => {
    const token = Cookies.get("llu-token");
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [images, setImages] = useState([]);
    const [facilityData, setFacilityData] = useState("");
    const [days, setDays] = useState({
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: false,
        sun: false,
    });
    

    const [timeRange, setTimeRange] = useState({
        mon: { from: "10:00", to: "22:00" },
        tue: { from: "10:00", to: "22:00" },
        wed: { from: "10:00", to: "22:00" },
        thu: { from: "10:00", to: "22:00" },
        fri: { from: "10:00", to: "22:00" },
        sat: { from: "10:00", to: "22:00" },
        sun: { from: "10:00", to: "22:00" },
    });

    useEffect(() => {
        async function apiCall() {
            try {
                let response = await axios.get(
                    `${baseUrl}/api/facilitator/facility/3?page=1&limit=5`,

                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );
                console.log(response.data.data);
                setFacilityData(response.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        apiCall();
    }, []);

    if (!facilityData) {
        return;
    }

    const toggleDay = (day) => {
        setDays({ ...days, [day]: !days[day] });
    };

    const updateTime = (day, key, value) => {
        setTimeRange({
            ...timeRange,
            [day]: { ...timeRange[day], [key]: value },
        });
    };

    console.log(facilityData.facilityInfo);

    const handleFile = (e) => {
        const files = Array.from(e.target.files);
        const imagePromises = files.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = (event) => {
                    resolve(event.target.result);
                };

                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(imagePromises)
            .then((imageUrls) => {
                setImages((prevImages) => [...prevImages, ...imageUrls]);
            })
            .catch((error) => console.error("Error loading images", error));
    };

    const CustomToggleSwitch = ({ checked, onChange }) => {
        return (
            <div
                onClick={onChange}
                className={`relative flex sm:h-6 h-4 sm:w-12 w-8 cursor-pointer items-center rounded-full transition-colors duration-300 ${
                    checked
                        ? "justify-end bg-Secondary"
                        : "justify-start bg-darkSlate"
                }`}
            >
                <div
                    className={`absolute flex sm:h-6 sm:w-6 h-4 w-4 rounded-full bg-white transition-transform duration-300`}
                ></div>
            </div>
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFacilityData((prev) => ({
            ...prev,
            facilityInfo: {
                ...prev.facilityInfo,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // try {
        //     await axios.put(
        //         `${baseUrl}/api/facilitator/facility/update/3`,
        //         {
        //             ...facilityData, // Send updated facility data
        //             days, // Send updated days and times
        //             timeRange,
        //         },
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //                 Accept: "application/json",
        //             },
        //         }
        //     );
        //     alert("Facility updated successfully!");
        // } catch (error) {
        //     console.log("Error updating facility", error);
        // }
        console.log({ ...facilityData, days, timeRange });
    };

    return (
        <section>
            <PageHeading title={"Edit Facility"} />
            <form onSubmit={handleSubmit}>
                <p>Facility Name</p>
                <input
                    name="name"
                    value={facilityData.facilityInfo.name}
                    onChange={handleInputChange}
                    placeholder="Enter facility name"
                    className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
                />

                <p>Capacity</p>
                <input
                    name="capacity"
                    value={facilityData.facilityInfo.capacity}
                    onChange={handleInputChange}
                    placeholder="Enter capacity amount"
                    className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
                />
                <SubPageTitle title={"Working Hours"} />
                {Object.keys(days).map((day, index) => (
                    <div
                        key={index}
                        className="mb-2 flex items-center justify-between"
                    >
                        <div className="flex items-center">
                            <CustomToggleSwitch
                                checked={days[day]}
                                onChange={() => toggleDay(day)}
                            />
                            <span className="ml-2 capitalize">{day}</span>
                        </div>
                        {days[day] ? (
                            <div className="flex h-10 items-center space-x-2">
                                <span className="max-sm:ml-2 max-sm:hidden">
                                    from
                                </span>
                                <input
                                    type="time"
                                    value={timeRange[day].from}
                                    onChange={(e) =>
                                        updateTime(day, "from", e.target.value)
                                    }
                                    className="rounded-lg border border-darkSlate bg-darkSlate px-2 py-1 text-sm text-white"
                                />
                                <span className="max-sm:text-xs">to</span>
                                <input
                                    type="time"
                                    value={timeRange[day].to}
                                    onChange={(e) =>
                                        updateTime(day, "to", e.target.value)
                                    }
                                    className="rounded-lg border border-darkSlate bg-darkSlate px-2 py-1 text-sm text-white"
                                />
                            </div>
                        ) : (
                            <span className="h-10 text-gray-600">
                                Not Available
                            </span>
                        )}
                    </div>
                ))}
                <SubPageTitle title={"Gallery"} />
                <div>
                    <label className="flex cursor-pointer items-center gap-x-3">
                        <BsPlusSquareDotted className="text-4xl text-Primary" />
                        <div>
                            <p>Click to upload</p>
                            <p className="text-darkText">Max.800x400px</p>
                        </div>
                        <input onChange={handleFile} type="file" hidden />
                    </label>
                </div>
                <div className="mt-5 grid md:grid-cols-4 grid-cols-3 gap-3">
                    {images.map((imageSrc, index) => (
                        <img
                            key={index}
                            className="h-[400px] w-[800px] rounded-lg"
                            src={imageSrc}
                            alt={`Preview ${index}`}
                        />
                    ))}
                </div>
                <button
                    type="submit"
                    className="mt-5 w-full bg-primary text-white p-2 rounded-lg"
                >
                    Save Changes
                </button>
            </form>
        </section>
    );
};

export default EditFacility;
