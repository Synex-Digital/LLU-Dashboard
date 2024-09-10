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
        className={`relative flex h-6 w-12 cursor-pointer items-center rounded-full transition-colors duration-300 ${
          checked ? "justify-end bg-Secondary" : "justify-start bg-darkSlate"
        }`}
      >
        <div
          className={`absolute flex h-6 w-6 rounded-full bg-white transition-transform duration-300`}
        ></div>
      </div>
    );
  };
  return (
    <section>
      <PageHeading title={"Create new session"} />
      <h2 className="mb-3 mt-8 text-xl font-medium text-Primary">Basic Info</h2>
      <p>
        Session Name<span className="text-redText">*</span>
      </p>
      <input
        placeholder="Write your session name here"
        className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
      />
      <p>Description</p>
      <textarea
        placeholder="Write your description here..."
        className="mt-2 h-32 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
      />

      <div className="mt-5 rounded-lg text-white">
        <h2 className="mb-4 text-lg font-semibold">Working Hours</h2>

        {Object.keys(days).map((day, index) => (
          <div key={index} className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <CustomToggleSwitch
                checked={days[day]}
                onChange={() => toggleDay(day)}
              />
              <span className="ml-2 capitalize">{day}</span>
            </div>
            {days[day] ? (
              <div className="flex h-10 items-center space-x-2">
                <span>from</span>
                <input
                  type="time"
                  value={timeRange[day].from}
                  onChange={(e) => updateTime(day, "from", e.target.value)}
                  className="rounded-lg border border-darkSlate bg-darkSlate px-2 py-1 text-sm"
                />
                <span>to</span>
                <input
                  type="time"
                  value={timeRange[day].to}
                  onChange={(e) => updateTime(day, "to", e.target.value)}
                  className="rounded-lg border border-darkSlate bg-darkSlate px-2 py-1 text-sm"
                />
              </div>
            ) : (
              <span className="h-10 text-gray-600">Not Available</span>
            )}
          </div>
        ))}
        <div className="mt-10 flex justify-between">
          <h2 className="text-xl font-medium">Address</h2>
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
        <Button className={"mt-5 w-full"} title={"Confirm"} />
      </div>
    </section>
  );
};

export default CreateSession;
