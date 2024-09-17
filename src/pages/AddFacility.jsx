import React, { useState } from "react";
import SubPageTitle from "../components/common/SubPageTitle";
import { MdLocationPin } from "react-icons/md";
import PageHeading from "../components/common/PageHeading";
import { RxCross2 } from "react-icons/rx";
import { BsPlusSquareDotted } from "react-icons/bs";
import Button from "../components/common/Button";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    Autocomplete
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
    width: "100%",
    height: "450px",
};
const center = {
    lat: 23.8103, // Default lat
    lng: 90.4125, // Default lng
};

const AddFacility = () => {
    const [facilities, setFacilities] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [images, setImages] = useState([]);
    const [fullName, setFullName] = useState("");
    const [hourlyRate, setHourlyRate] = useState("");
    const [establishedIn, setEstablishedIn] = useState("");
    const [professionalResources, setProfessionalResources] = useState("");
    const [trainer, setTrainer] = useState("");
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

    const [location, setLocation] = useState({ lat: null, lng: null });
    const [autocomplete, setAutocomplete] = useState(null);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAP_KEY}&loading=async`, // Replace with your API key
        libraries,
    });

    // Handle location based on search
    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            setLocation({ lat, lng });
        }
    };

    const onLoad = (autocompleteInstance) => {
        setAutocomplete(autocompleteInstance);
    };

    // Handle getting the user's current location
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => console.error(error)
            );
        }
    };

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

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

    const handleClick = () => {
        const formData = {
            fullName,
            hourlyRate,
            establishedIn,
            professionalResources,
            facilities,
            days,
            timeRange,
            trainer,
            images,
        };
        console.log(formData);

        console.log({ name: fullName, hourly_rate: hourlyRate });
    };

    return (
        <section>
            <PageHeading title={"Add Facility"} />

            <p>
                Full Name<span className="text-redText">*</span>
            </p>
            <input
                placeholder="Write full name here"
                onChange={(e) => setFullName(e.target.value)}
                className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
            />
            <p>
                Hourly Rate<span className="text-redText">*</span>
            </p>
            <div className="mb-5 mt-2 flex items-center gap-2 rounded-lg bg-darkSlate pl-3">
                <div className="border-r border-Secondary pr-2">USD</div>
                <input
                    onChange={(e) => setHourlyRate(e.target.value)}
                    placeholder="Hourly Rate"
                    className="w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
                />
            </div>
            <p>
                Established in<span className="text-redText">*</span>
            </p>
            <input
                onChange={(e) => setEstablishedIn(e.target.value)}
                placeholder="2004"
                className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
            />
            <p>
                Professionals Resources
                <span className="text-redText">*</span>
            </p>
            <input
                onChange={(e) => setProfessionalResources(e.target.value)}
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
                        className=" rounded-lg"
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
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={location.lat ? location : center}
            >
                {location.lat && <Marker position={location} />}
            </GoogleMap>
            <Button
                onClick={handleClick}
                className={"mt-5 w-full"}
                title={"Confirm"}
            />
        </section>
    );
};

export default AddFacility;
