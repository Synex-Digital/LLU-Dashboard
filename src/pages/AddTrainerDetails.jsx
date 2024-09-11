import React, { useState } from "react";
import PageHeading from "../components/common/PageHeading";
import SubPageTitle from "../components/common/SubPageTitle";

const AddTrainerDetails = () => {
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
                className="rounded-lg border border-darkSlate bg-darkSlate px-2 py-1 text-sm text-white"
              />
              <span>to</span>
              <input
                type="time"
                value={timeRange[day].to}
                onChange={(e) => updateTime(day, "to", e.target.value)}
                className="rounded-lg border border-darkSlate bg-darkSlate px-2 py-1 text-sm text-white"
              />
            </div>
          ) : (
            <span className="h-10 text-gray-600">Not Available</span>
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
    </section>
  );
};

export default AddTrainerDetails;
