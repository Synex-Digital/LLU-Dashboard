import React, { useEffect, useRef, useState } from "react";
import SubPageTitle from "../components/common/SubPageTitle";
import PageHeading from "../components/common/PageHeading";
import { MdLocationPin } from "react-icons/md";
import axios from "axios";
import Cookies from "js-cookie";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import Button from "../components/common/Button";
import { LoadingIcon } from "../assets/icon";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routers";

const libraries = ["places"];
const mapContainerStyle = {
    width: "100%",
    height: "300px",
};

const EditDetails = () => {
    const navigate = useNavigate();
    const token = Cookies.get("llu-token");
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [formData, setFormData] = useState({
        fullName: "",
        professionalsResources: "",
    });
    const [location, setLocation] = useState(null); 
    const [loading, setLoading] = useState(false);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAP_KEY}&loading=async`,
        libraries,
    });
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    // Get user's geolocation
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Error getting location", error);
                    // Optionally, set a default location if geolocation fails
                    setLocation({ lat: 23.7918436, lng: 90.3666064 }); // Default location
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    useEffect(() => {
        async function apiCall() {
            try {
                let response = await axios.get(
                    `${baseUrl}/api/facilitator/edit_details`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );

                const { first_name, last_name, no_of_professionals } =
                    response.data.data.facilitatorInfo[0];

                const fullName = `${first_name} ${last_name}`;
                setFormData({
                    fullName,
                    professionalsResources: no_of_professionals,
                });
            } catch (error) {
                console.log(error);
            }
        }

        apiCall();
    }, [token, baseUrl]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        setLocation({ lat, lng });
    };

    const onLoad = (map) => {
        mapRef.current = map;
        if (location) {
            // Create a marker when the map is loaded
            const { lat, lng } = location;
            markerRef.current = new google.maps.Marker({
                position: { lat, lng },
                map: map,
                title: "Your location", // Optional title for the marker
            });
        }
    };

    const handleClick = async () => {
        setLoading(true);
        let data = {
            full_name: formData.fullName,
            no_of_professionals: formData.professionalsResources,
            latitude: location.lat,
            longitude: location.lng,
        };
        try {
            await axios.patch(`${baseUrl}/api/facilitator/edit_details`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            navigate(routes.profile.path);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    if (loadError) return "Error loading maps";
    if (!isLoaded || !location) return "Loading Maps";

    return (
        <section>
            <PageHeading title={"Edit Facilitator Details"} />

            <p>
                Full Name<span className="text-redText">*</span>
            </p>
            <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Write full name here"
                className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
            />

            <p>
                Professionals Resources
                <span className="text-redText">*</span>
            </p>
            <input
                name="professionalsResources"
                value={formData.professionalsResources}
                onChange={handleChange}
                placeholder="25"
                className="mb-5 mt-2 w-full rounded-lg bg-darkSlate p-2 placeholder:text-[#7F7E84]"
            />

            <div className="flex items-center justify-between">
                <SubPageTitle title={"Address"} />
                <p className="text-darkText">View on map</p>
            </div>
            <p className="mb-2 text-sm text-gray-400">
                <MdLocationPin className="inline-block text-xl text-Primary" />
                {formData.address}
            </p>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={location} // Center map based on user's location
                onClick={handleMapClick}
                onLoad={onLoad}
            ></GoogleMap>

            {loading ? (
                <Button
                    title={<LoadingIcon />}
                    className="w-full mt-5 flex justify-center !px-12 !py-1 rounded-md"
                />
            ) : (
                <Button
                    className={"w-full mt-5"}
                    onClick={handleClick}
                    title={"Save Change"}
                ></Button>
            )}
        </section>
    );
};

export default EditDetails;
