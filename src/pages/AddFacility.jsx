import React, { useEffect, useRef, useState } from "react";
import SubPageTitle from "../components/common/SubPageTitle";
import { MdLocationPin } from "react-icons/md";
import PageHeading from "../components/common/PageHeading";
import { RxCross2 } from "react-icons/rx";
import { BsPlusSquareDotted } from "react-icons/bs";
import Button from "../components/common/Button";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import Cookies from "js-cookie";
import { routes } from "../routes/Routers";
import { useNavigate } from "react-router-dom";

const libraries = ["places"];
const mapContainerStyle = {
    width: "100%",
    height: "450px",
};
const center = {
    lat: 23.8103,
    lng: 90.4125,
};

const AddFacility = () => {
    const token = Cookies.get("llu-token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();
    const [facilities, setFacilities] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [images, setImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [fullName, setFullName] = useState("");
    const [hourlyRate, setHourlyRate] = useState("");
    const [establishedIn, setEstablishedIn] = useState("");
    const [capacity, setCapacity] = useState("");
    const [locationName, setLocationName] = useState("");
    const [selectedTrainers, setSelectedTrainers] = useState([]);
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
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAP_KEY}&loading=async`,
        libraries,
    });

    useEffect(() => {
        if (location.lat && location.lng) {
            reverseGeocode();
        }
    }, [location]);
    useEffect(() => {
        async function apiCall() {
            try {
                let response = await axios.get(
                    `${baseUrl}/api/facilitator/${storedUser.specializedUserId}/employees`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );
                console.log(response.data.data.employees);
                setTrainers(response.data.data.employees);
            } catch (error) {
                console.log(error);
            }
        }
        apiCall();
    }, []);
    const reverseGeocode = async () => {
        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${import.meta.env.VITE_GOOGLE_MAP_KEY}`;

        try {
            const response = await axios.get(geocodingUrl);
            console.log(response);

            if (response.data.status === "OK") {
                const address =
                    response.data.results[0]?.formatted_address ||
                    "Unknown location";
                setLocationName(address);
            } else {
                console.error("Geocoding error:", response.data.status);
            }
        } catch (error) {
            console.error("Error with reverse geocoding:", error);
        }
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => console.error("Error getting location: ", error),
            { enableHighAccuracy: true }
        );
    }, []);

    useEffect(() => {
        if (mapRef.current && location.lat && location.lng) {
            const loadMarker = async () => {
                try {
                    const { AdvancedMarkerElement } =
                        await google.maps.importLibrary("marker");

                    if (markerRef.current) {
                        markerRef.current.position = new google.maps.LatLng(
                            location.lat,
                            location.lng
                        );
                    } else {
                        markerRef.current = new AdvancedMarkerElement({
                            map: mapRef.current,
                            position: new google.maps.LatLng(
                                location.lat,
                                location.lng
                            ),
                        });
                    }
                } catch (error) {
                    console.error("Error loading marker: ", error);
                }
            };

            loadMarker();
        }
    }, [location, isLoaded]);

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setLocation({ lat, lng });
    };

    const onLoad = (map) => {
        mapRef.current = map;
    };

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
        const newImageFiles = [...imageFiles, ...files]; // For uploading

        const imageUrls = files.map((file) => URL.createObjectURL(file)); // For preview
        setImages((prevImages) => [...prevImages, ...imageUrls]);
        setImageFiles(newImageFiles);
    };

    const handleClick = () => {
        const convertTime = (time) => {
            const [hour, minute] = time.split(":");
            const ampm = hour >= 12 ? "PM" : "AM";
            const adjustedHour = hour % 12 || 12;
            return `${adjustedHour}:${minute} ${ampm}`;
        };

        const dayMapping = {
            fri: "friday",
            mon: "monday",
            sat: "saturday",
            sun: "sunday",
            thu: "thursday",
            tue: "tuesday",
            wed: "wednesday",
        };

        const transformedData = Object.entries(days).reduce(
            (acc, [day, isSelected]) => {
                if (!isSelected) {
                    acc[dayMapping[day]] = "Not available";
                } else if (!timeRange[day].from || !timeRange[day].to) {
                    acc[dayMapping[day]] = "Not available";
                } else {
                    acc[dayMapping[day]] =
                        `${convertTime(timeRange[day].from)} - ${convertTime(timeRange[day].to)}`;
                }
                return acc;
            },
            {}
        );

        const data = {
            name: fullName,
            hourly_rate: +hourlyRate,
            latitude: location.lat || center.lat,
            longitude: location.lng || center.lng,
            capacity: +capacity,
            established_in: +establishedIn,
            available_hours: transformedData,
            amenities: facilities,
            employees: selectedTrainers,
        };
        console.log(data);

        const formData = new FormData();
        imageFiles.forEach((file) => {
            formData.append("img", file);
        });

        async function apiPost() {
            try {
                let response = await axios.post(
                    `${baseUrl}/api/facilitator/${storedUser.specializedUserId}/add_facility`,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );
                console.log(response.data);

                // let imageResponse = await axios.post(
                //     `${baseUrl}/api/facilitator/${storedUser.specializedUserId}/add_img`,
                //     formData,
                //     {
                //         headers: {
                //             Authorization: `Bearer ${token}`,
                //             Accept: "application/json",
                //             "Content-Type": "multipart/form-data",
                //         },
                //     }
                // );
                // console.log("Images uploaded:", imageResponse.data);

                alert("Facility Add successfully!");
                navigate(routes.profile.path);
            } catch (error) {
                console.log(error);
            }
        }

        apiPost();
    };

    const handleSelectChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions);
        const selectedValues = selectedOptions.map((option) => option.value);

        const filteredSelectedValues = selectedValues.filter(Boolean);

        setSelectedTrainers((prevSelected) => {
            return filteredSelectedValues.reduce((acc, trainerId) => {
                if (acc.includes(trainerId)) {
                    return acc.filter((id) => id !== trainerId);
                } else {
                    return [...acc, trainerId];
                }
            }, prevSelected);
        });
    };

    const selectedTrainerDetails = trainers.filter((trainer) =>
        selectedTrainers.includes(String(trainer.trainer_id))
    );

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

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
                    type="number"
                    onChange={(e) => setHourlyRate(e.target.value)}
                    placeholder="Hourly Rate"
                    className="w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
                />
            </div>
            <p>
                Established in<span className="text-redText">*</span>
            </p>
            <input
                type="number"
                onChange={(e) => setEstablishedIn(e.target.value)}
                placeholder="2004"
                className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
            />
            <p>
                Capacity
                <span className="text-redText">*</span>
            </p>
            <input
                type="number"
                onChange={(e) => setCapacity(e.target.value)}
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
            <select
                className="mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
                value={selectedTrainers}
                onChange={handleSelectChange}
                multiple={false}
            >
                <option value="">Select Trainer</option>
                {trainers.map((item) => (
                    <option key={item.trainer_id} value={item.trainer_id}>
                        {item.first_name} {item.last_name}
                    </option>
                ))}
            </select>

            <div className="mt-3">
                {selectedTrainerDetails.length > 0 ? (
                    <ul className="flex gap-3 flex-wrap">
                        {selectedTrainerDetails.map((trainer) => (
                            <li
                                key={trainer.trainer_id}
                                className="p-2 bg-darkSlate rounded-lg"
                            >
                                {trainer.first_name} {trainer.last_name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No trainers selected</p>
                )}
            </div>

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

            {/* <SubPageTitle title={"Gallery"} />
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
            </div> */}

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
                onClick={handleMapClick}
                onLoad={onLoad}
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
