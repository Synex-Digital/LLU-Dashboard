import React, { useEffect, useState } from "react";
import PageHeading from "../components/common/PageHeading";
import SubPageTitle from "../components/common/SubPageTitle";
import { BsPlusSquareDotted } from "react-icons/bs";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { routes } from "../routes/Routers";

const EditFacility = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const facility_id = location.state?.facility_id;
    const token = Cookies.get("llu-token");
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [images, setImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
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

    const convertTo24HourFormat = (time) => {
        const [hours, minutes] = time.split(":");
        let [minutePart, period] = minutes.split(" ");
        let hour = parseInt(hours);
        let minute = parseInt(minutePart);
        if (period === "PM" && hour !== 12) {
            hour += 12;
        } else if (period === "AM" && hour === 12) {
            hour = 0; // Midnight case
        }
        return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        async function apiCall() {
            try {
                let response = await axios.get(
                    `${baseUrl}/api/facilitator/facility/${facility_id}?page=1&limit=5`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );
                console.log(response.data.data.availableHours);
                setFacilityData(response.data.data);

                if (response.data.data.availableHours) {
                    const newTimeRange = mapAvailabilityToTimeRange(
                        response.data.data.availableHours
                    );
                    setTimeRange(newTimeRange);
                }
            } catch (error) {
                console.log(error);
            }
        }

        apiCall();
    }, [facility_id, token]);

    const mapAvailabilityToTimeRange = (availability) => {
        if (!availability) return {};

        const weekDayMap = {
            monday: "mon",
            tuesday: "tue",
            wednesday: "wed",
            thursday: "thu",
            friday: "fri",
            saturday: "sat",
            sunday: "sun",
        };

        const timeRange = {};

        availability.forEach(({ week_day, available_hours }) => {
            if (available_hours === "Not available") {
                timeRange[weekDayMap[week_day]] = { from: null, to: null };
            } else {
                const [from, to] = available_hours.split(" - ");
                timeRange[weekDayMap[week_day]] = {
                    from: convertTo24HourFormat(from),
                    to: convertTo24HourFormat(to),
                };
            }
        });

        return timeRange;
    };

    if (!facilityData) {
        return;
    }

    const toggleDay = (day) => {
        setDays({ ...days, [day]: !days[day] });
    };

    const updateTime = (day, key, value) => {
        setTimeRange((prevState) => ({
            ...prevState,
            [day]: {
                ...prevState[day],
                [key]: value,
            },
        }));
    };

    const handleFile = (e) => {
        const imgfiles = Array.from(e.target.files);
        const newImageFiles = [...imageFiles, ...imgfiles];
        setImageFiles(newImageFiles);

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

        const convertToAMPMFormat = (time) => {
            let [hours, minutes] = time.split(":");
            let period = "AM";
            hours = parseInt(hours);

            if (hours >= 12) {
                period = "PM";
                if (hours > 12) hours -= 12;
            } else if (hours === 0) {
                hours = 12;
            }

            return `${hours}:${minutes} ${period}`;
        };

        const formattedAvailableHours = {};
        const dayMap = {
            mon: "monday",
            tue: "tuesday",
            wed: "wednesday",
            thu: "thursday",
            fri: "friday",
            sat: "saturday",
            sun: "sunday",
        };

        Object.keys(days).forEach((dayKey) => {
            if (days[dayKey]) {
                const fromTime = convertToAMPMFormat(timeRange[dayKey].from);
                const toTime = convertToAMPMFormat(timeRange[dayKey].to);
                formattedAvailableHours[dayMap[dayKey]] =
                    `${fromTime} - ${toTime}`;
            } else {
                formattedAvailableHours[dayMap[dayKey]] = "Not available";
            }
        });

        const updatedFacilityData = {
            ...facilityData,
            availableHours: formattedAvailableHours,
        };

        let data = {
            description: "It's a good Stadium",
            capacity: +facilityData.facilityInfo.capacity,
            latitude: 40.7128,
            longitude: -74.006,
            name: facilityData.facilityInfo.name,
            hourly_rate: facilityData.facilityInfo.hourly_rate,
            available_hours: updatedFacilityData.availableHours,
        };

        console.log("in", data);

        const formData = new FormData();
        imageFiles.forEach((file) => {
            formData.append("img", file);
        });

        try {
            await axios.patch(
                `${baseUrl}/api/facilitator/facility/${facility_id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );
            alert("Facility updated successfully!");
            navigate(routes.profile.path)
            let imageResponse = await axios.post(
                `${baseUrl}/api/facilitator/${facility_id}/add_img`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("image", imageResponse.data);
        } catch (error) {
            console.log("Error updating facility", error);
        }
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
                    type="number"
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
                <Button
                    title={"Save Changes"}
                    type="submit"
                    className="mt-5 w-full bg-primary text-white "
                />
            </form>
        </section>
    );
};

export default EditFacility;
