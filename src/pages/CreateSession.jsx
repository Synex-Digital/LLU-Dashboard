import React, { useState } from "react";
import PageHeading from "../components/common/PageHeading";
import Button from "../components/common/Button";
import { MdLocationPin } from "react-icons/md";

const CreateSession = () => {
    const [isToggled, setIsToggled] = useState(false);
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
                className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 flex items-center ${
                    checked
                        ? "bg-Secondary justify-end"
                        : "bg-darkSlate justify-start"
                }`}
            >
                <div
                    className={`absolute w-6 h-6 flex bg-white rounded-full transition-transform duration-300 `}
                ></div>
            </div>
        );
    };
    return (
        <section>
            <PageHeading title={"Create new session"} />
            <h2 className="mb-3 mt-8 text-xl font-medium text-Primary">
                Basic Info
            </h2>
            <p>
                Session Name<span className="text-redText">*</span>
            </p>
            <input
                placeholder="Write your session name here"
                className="w-full bg-darkSlate rounded-lg mt-2 mb-5 p-2 placeholder:text-[#7F7E84]"
            />
            <p>Description</p>
            <textarea
                placeholder="Write your description here..."
                className="w-full bg-darkSlate rounded-lg h-32 mt-2 p-2 placeholder:text-[#7F7E84]"
            />

            <div className=" text-white mt-5 rounded-lg ">
                <h2 className="text-lg font-semibold mb-4">Working Hours</h2>

                {Object.keys(days).map((day, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between mb-2"
                    >
                        <div className="flex items-center">
                            <CustomToggleSwitch
                                checked={days[day]}
                                onChange={() => toggleDay(day)}
                            />
                            <span className="ml-2 capitalize">{day}</span>
                        </div>
                        {days[day] ? (
                            <div className="flex items-center space-x-2 h-10">
                                <span>from</span>
                                <input
                                    type="time"
                                    value={timeRange[day].from}
                                    onChange={(e) =>
                                        updateTime(day, "from", e.target.value)
                                    }
                                    className="bg-darkSlate border border-darkSlate rounded-lg px-2 py-1 text-sm"
                                />
                                <span>to</span>
                                <input
                                    type="time"
                                    value={timeRange[day].to}
                                    onChange={(e) =>
                                        updateTime(day, "to", e.target.value)
                                    }
                                    className="bg-darkSlate border border-darkSlate rounded-lg px-2 py-1 text-sm"
                                />
                            </div>
                        ) : (
                            <span className="text-gray-600 h-10">
                                Not Available
                            </span>
                        )}
                    </div>
                ))}
                <div className="mt-10 flex justify-between">
                    <h2 className=" text-xl font-medium ">Address</h2>
                    <p className="text-Primary">View on map</p>
                </div>
                <p className="mb-2 mt-5 text-sm text-gray-400">
                    <MdLocationPin className="inline-block text-xl text-Primary" />
                    Green Valley, Hill road, NY
                </p>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4967.308022344391!2d90.36704350771629!3d23.807506139831705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1725902792584!5m2!1sen!2sbd"
                    width="600"
                    height="450"
                    className="w-full rounded-2xl"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
                <Button className={"w-full mt-5"} title={"Confirm"} />
            </div>
        </section>
    );
};

export default CreateSession;
