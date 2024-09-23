import React, { useState } from "react";
import PageHeading from "../components/common/PageHeading";
import SubPageTitle from "../components/common/SubPageTitle";
import Button from "../components/common/Button";
import axios from "axios";
import Cookies from "js-cookie";

const AddTrainerDetails = () => {
    const token = Cookies.get("llu-token");
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const storedUser = JSON.parse(localStorage.getItem("user"));
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

    const toggleDay = (day) => {
        setDays({ ...days, [day]: !days[day] });
    };

    const updateTime = (day, key, value) => {
        setTimeRange({
            ...timeRange,
            [day]: { ...timeRange[day], [key]: value },
        });
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

    let handleClick = () => {
        async function apiPost() {
            try {
                let response = await axios.post(
                    `${baseUrl}/api/facilitator/${storedUser.specializedUserId}/add_employee/3`,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        apiPost();
    };

    return (
        <section>
            <PageHeading title={"Add Trainer Details"} />

            <p>
                Trainer Name<span className="text-redText">*</span>
            </p>
            <input
                placeholder="Write full name here"
                className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
            />
            <p>
                Hourly Rate<span className="text-redText">*</span>
            </p>
            <div className="mb-5 mt-2 flex items-center gap-2 rounded-lg bg-darkSlate pl-3">
                <div className="border-r border-Secondary pr-2">USD</div>
                <input
                    placeholder="Hourly Rate"
                    className="w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
                />
            </div>
            <p>
                About<span className="text-redText">*</span>
            </p>
            <textarea
                placeholder="About..."
                className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
            />

            <h2 className="mb-4 mt-5 text-lg font-semibold">Working Hours</h2>

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

            <SubPageTitle title={"Location"} />
            <p>City</p>
            <input
                placeholder="city"
                className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
            />
            <p>Road</p>
            <input
                placeholder="road"
                className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
            />

            <p>Zip Code</p>
            <input
                placeholder="34543"
                className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
            />
            <Button
                onClick={handleClick}
                className={"mt-5 w-full"}
                title={"Confirm"}
            />
        </section>
    );
};

export default AddTrainerDetails;
