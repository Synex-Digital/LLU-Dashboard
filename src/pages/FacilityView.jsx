import React, { useEffect, useRef, useState } from "react";
import PageHeading from "../components/common/PageHeading";
import { CiEdit } from "react-icons/ci";
import SubPageTitle from "../components/common/SubPageTitle";
import {
    MdDelete,
    MdLocationPin,
    MdOutlineReduceCapacity,
} from "react-icons/md";
import Button from "../components/common/Button";
import { BiDollar } from "react-icons/bi";
import profile from "../assets/image/pp.png";
import Image from "../components/common/Image";
import { IoIosStar } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../routes/Routers";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import Cookies from "js-cookie";
const libraries = ["places"];
const mapContainerStyle = {
    width: "100%",
    height: "300px",
};

const FacilityView = () => {
    const locations = useLocation();
    const navigate = useNavigate();
    const facilityData = locations.state?.facility;
    const [facilityView, setFacilityView] = useState("");
    const [realTime, setRealTime] = useState(false);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAP_KEY}&loading=async`,
        libraries,
    });
    const mapRef = useRef(null);
    const token = Cookies.get("llu-token");
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [center, setCenter] = useState({
        lat: 0,
        lng: 0,
    });
    const [locationName, setLocationName] = useState("Fetching location...");

    const reverseGeocode = async () => {
        if (!center) return;

        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${center.lat},${center.lng}&key=${import.meta.env.VITE_GOOGLE_MAP_KEY}`;

        try {
            const response = await axios.get(geocodingUrl);

            if (response.data.status === "OK") {
                const fullAddress = response.data.results[0]?.formatted_address;
                setLocationName(fullAddress);
            } else {
                console.error("Geocoding error:", response.data.status);
                setLocationName("Location not found");
            }
        } catch (error) {
            console.error("Error with reverse geocoding:", error);
            setLocationName("Error fetching location");
        }
    };

    useEffect(() => {
        if (facilityData && facilityData.facilityInfo) {
            const newCenter = {
                lat: facilityData.facilityInfo.latitude,
                lng: facilityData.facilityInfo.longitude,
            };
            setCenter(newCenter);
        }
    }, [facilityData]);

    useEffect(() => {
        async function apiCall() {
            try {
                let response = await axios.get(
                    `${baseUrl}/api/facilitator/facility/${facilityData.facilityInfo.facility_id}?page=1&limit=5`,

                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );
                setFacilityView(response.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        apiCall();
    }, [realTime]);

    useEffect(() => {
        reverseGeocode();
    }, [center]);

    const onLoad = (map) => {
        mapRef.current = map;
    };

    const handleEdit = () => {
        navigate(routes.editFacility.path, {
            state: { facility_id: facilityData.facilityInfo.facility_id },
        });
    };

    const handleDelete = async (item) => {
        console.log(item.facility_img_id);
        try {
            let response = await axios.delete(
                `${baseUrl}/api/facilitator/delete_img/${item.facility_img_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );
            console.log(response.data);
            setRealTime(!realTime);
        } catch (error) {
            console.log(error);
        }
    };

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    return (
        <section>
            <div className="flex justify-between">
                <PageHeading
                    className={"max-xl:!mb-0"}
                    title={facilityView.facilityInfo?.name}
                />
                <CiEdit
                    onClick={handleEdit}
                    className="xl:h-10 xl:w-10 w-7 h-7 cursor-pointer rounded-full border border-darkText xl:p-2 p-1"
                />
            </div>

            <div className="grid sm:grid-cols-2 gap-x-5">
                <div>
                    <SubPageTitle title={"Available Hours"} />
                    <div className="rounded-lg bg-gray-900 p-4 text-white">
                        <ul className="space-y-2">
                            {facilityView?.availableHours?.map(
                                (item, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between"
                                    >
                                        <span className="capitalize">
                                            {item.week_day}
                                        </span>
                                        <span>{item.available_hours}</span>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                    <div className="mt-4">
                        <p className="flex items-center">
                            <span className="mr-2 text-xl text-Primary">
                                <BiDollar />
                            </span>
                            <span>
                                Hourly Rate - $
                                {facilityView?.facilityInfo?.hourly_rate}
                            </span>
                        </p>
                        <p className="mt-2 flex items-center">
                            <span className="mr-2 text-xl text-Primary">
                                <MdOutlineReduceCapacity />
                            </span>
                            <span>
                                Capacity: {facilityView?.facilityInfo?.capacity}{" "}
                                Person
                            </span>
                        </p>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <SubPageTitle title={"Address"} />
                        <p className="text-darkText">View on map</p>
                    </div>

                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={13}
                        center={center}
                        onLoad={onLoad}
                    ></GoogleMap>
                    <p className="mt-2 text-sm text-gray-400">
                        <MdLocationPin className="inline-block text-xl text-Primary" />
                        {locationName}
                    </p>
                </div>
            </div>
            <SubPageTitle title={"Gallery"} />
            <div className="grid sm:grid-cols-3 grid-cols-2 gap-3">
                {facilityView?.gallery?.map((item, index) => (
                    <div key={index} className="relative">
                        <span
                            onClick={() => handleDelete(item)}
                            className="absolute right-1 top-1 text-background text-xl cursor-pointer shadow-xl"
                        >
                            <MdDelete />
                        </span>
                        <Image className={"w-full rounded-lg"} src={item.img} />
                    </div>
                ))}
            </div>
            <h2 className="mb-3 mt-8 text-xl font-medium">
                Reviews <span className="text-Primary">(210)</span>
            </h2>
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-x-3">
                    <Image className={"w-16 rounded-full"} src={profile} />
                    <p>Jhony Deep</p>
                </div>
                <p className="text-darkText">2 month ago</p>
            </div>
            <p className="text-darkText">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, variations of passages of Lorem Ipsum
                available, but the majority have suffered alteration in some
                form, by injected humour,
            </p>
            <div className="flex items-center gap-x-0.5">
                <IoIosStar className="text-Primary" />
                <IoIosStar className="text-Primary" />
                <IoIosStar className="text-Primary" />
                <IoIosStar className="text-Primary" />
                <IoIosStar className="mr-2 text-Primary" />
                <span>5.00</span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
                <Image className={"w-full rounded-lg"} src={profile} />
                <Image className={"w-full rounded-lg"} src={profile} />
                <Image className={"w-full rounded-lg"} src={profile} />
            </div>
            <Button
                className={"mt-5 w-full bg-darkSlate"}
                title={"Show More"}
            />
        </section>
    );
};

export default FacilityView;
