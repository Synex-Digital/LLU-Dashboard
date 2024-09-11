import React, { useState } from "react";
import SubPageTitle from "../components/common/SubPageTitle";
import { MdLocationPin } from "react-icons/md";
import PageHeading from "../components/common/PageHeading";
import { RxCross2 } from "react-icons/rx";
import { BsPlusSquareDotted } from "react-icons/bs";

const AddFacility = () => {
  const [facilities, setFacilities] = useState([]);
  const [inputValue, setInputValue] = useState("");
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      setFacilities([...facilities, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeFacility = (indexToRemove) => {
    setFacilities(facilities.filter((_, index) => index !== indexToRemove));
  };

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

  return (
    <section>
      <PageHeading title={"Add Facility"} />
      <div className="mx-auto w-1/2">
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
        <div className="mb-5 mt-2 flex items-center gap-2 rounded-lg bg-darkSlate pl-3">
          <div className="border-r border-Secondary pr-2">USD</div>
          <input
            placeholder="Hourly Rate"
            className="w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
          />
        </div>
        <p>
          Established in<span className="text-redText">*</span>
        </p>
        <input
          placeholder="2004"
          className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
        />
        <p>
          Professionals Resources
          <span className="text-redText">*</span>
        </p>
        <input
          placeholder="25"
          className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
        />
        <p>
          Facilities
          <span className="text-redText">*</span>
        </p>
        <input
          placeholder="Enter your facilities here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
        />
        <div className="mt-3 flex flex-wrap">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="mb-2 mr-2 flex items-center rounded-full bg-darkSlate px-3 py-1 text-white"
            >
              {facility}

              <RxCross2
                onClick={() => removeFacility(index)}
                className="ml-2 cursor-pointer text-red-400"
              />
            </div>
          ))}
        </div>
        <p>
          Select Trainer
          <span className="text-redText">*</span>
        </p>
        <input
          placeholder="Select Trainer"
          className="mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
        />
      </div>

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
    </section>
  );
};

export default AddFacility;
