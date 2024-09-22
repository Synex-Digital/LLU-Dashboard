import React, { useState } from "react";
import PageHeading from "../components/common/PageHeading";
import { CiEdit } from "react-icons/ci";
import SubPageTitle from "../components/common/SubPageTitle";
import { MdLocationPin, MdOutlineReduceCapacity } from "react-icons/md";
import Button from "../components/common/Button";
import { BiDollar } from "react-icons/bi";
import profile from "../assets/image/pp.png";
import Image from "../components/common/Image";
import { IoIosStar } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../routes/Routers";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    Autocomplete,
} from "@react-google-maps/api";
const libraries = ["places"];
const mapContainerStyle = {
    width: "100%",
    height: "300px",
};

const FacilityView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const facilityData = location.state?.facility;

    const [locations, setLocations] = useState({ lat: null, lng: null });
    const [autocomplete, setAutocomplete] = useState(null);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAP_KEY}&loading=async`,
        libraries,
    });

    const center = {
        lat: facilityData.facilityInfo.latitude,
        lng: facilityData.facilityInfo.longitude,
    };

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    const handleEdit = () => {
        navigate(routes.editFacility.path, {
            state: { facility_id: facilityData.facilityInfo.facility_id },
        });
    };

    return (
        <section>
            <div className="flex justify-between">
                <PageHeading
                    className={"max-xl:!mb-0"}
                    title={facilityData.facilityInfo.name}
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
                            {facilityData?.availableHours?.map(
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
                                {facilityData.facilityInfo.hourly_rate}
                            </span>
                        </p>
                        <p className="mt-2 flex items-center">
                            <span className="mr-2 text-xl text-Primary">
                                <MdOutlineReduceCapacity />
                            </span>
                            <span>
                                Capacity: {facilityData.facilityInfo.capacity}{" "}
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
                        zoom={12}
                        center={locations.lat ? locations : center}
                    >
                        {locations.lat && <Marker position={locations} />}
                    </GoogleMap>
                    <p className="mt-2 text-sm text-gray-400">
                        <MdLocationPin className="inline-block text-xl text-Primary" />
                        Green Valley, Hill road, NY
                    </p>
                </div>
            </div>
            <SubPageTitle title={"Gallery"} />
            <div className="grid sm:grid-cols-3 grid-cols-2 gap-3">
                {facilityData.gallery.map((item, index) => (
                    <div key={index}>
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
