import React, { useState } from "react";
import PageHeading from "../components/common/PageHeading";
import SubPageTitle from "../components/common/SubPageTitle";
import { BsPlusSquareDotted } from "react-icons/bs";

const EditArkIndoor = () => {
  const [images, setImages] = useState([]);
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

  const handleFile = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    const imagePromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          resolve(event.target.result); // Resolve the image data URL
        };

        reader.onerror = reject; // Handle file reading error
        reader.readAsDataURL(file); // Read the file as a data URL
      });
    });

    // Once all promises resolve, update the state
    Promise.all(imagePromises)
      .then((imageUrls) => {
        setImages((prevImages) => [...prevImages, ...imageUrls]); // Append new images to the previous ones
      })
      .catch((error) => console.error("Error loading images", error));
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
      <PageHeading title={"Edit Ark Indoor"} />
      <p>
        Facility Name
        <span className="text-redText">*</span>
      </p>
      <input
        placeholder="Ark Indoor"
        className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
      />
      <p>
        Capacity
        <span className="text-redText">*</span>
      </p>
      <input
        placeholder="Enter capacity amount"
        className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
      />
      <SubPageTitle title={"Working Hours"} />
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
      <div className="mt-5 grid grid-cols-4 gap-3">
        {images.map((imageSrc, index) => (
          <img
            key={index}
            className="h-[400px] w-[800px] rounded-lg"
            src={imageSrc}
            alt={`Preview ${index}`}
          />
        ))}
      </div>
    </section>
  );
};

export default EditArkIndoor;
