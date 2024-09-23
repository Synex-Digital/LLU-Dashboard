import React, { useEffect, useState } from "react";
import PageHeading from "../components/common/PageHeading";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";
import Cookies from "js-cookie";
import {
    GoogleMap,
    Marker,
    InfoWindow,
    useLoadScript,
} from "@react-google-maps/api";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routers";

const SyncTrainer = () => {
    const navigate = useNavigate();
    const token = Cookies.get("llu-token");
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [trainers, setTrainers] = useState([]);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    console.log(trainers);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAP_KEY}&loading=async`,
    });

    async function apiCall() {
        try {
            const data = {
                latitude: 23.7918436,
                longitude: 90.3666064,
            };

            let response = await axios.post(
                `${baseUrl}/api/facilitator/nearby_trainers`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );

            console.log(response.data);
            setTrainers(response.data.data.trainers);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        apiCall();
    }, []);
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <section className="relative">
            <div className="flex items-center justify-around gap-3 w-full absolute z-50 top-2">
                <MdKeyboardBackspace
                    onClick={() => navigate(routes.profile.path)}
                    className="text-3xl bg-darkSlate text-white rounded-full p-2 w-10 h-10"
                />
                <div className="w-4/5 relative">
                    <input className="p-2 pl-11 w-full bg-darkSlate rounded-lg" />
                    <IoMdSearch className="text-xl absolute top-2.5 left-3" />
                </div>
            </div>
            <GoogleMap
                zoom={12}
                center={{ lat: 23.7918436, lng: 90.3666064 }} // Center of the map
                mapContainerStyle={{ width: "100%", height: "600px" }}
            >
                {trainers.map((trainer, index) => (
                    <Marker
                        key={index}
                        position={{
                            lat: trainer.latitude,
                            lng: trainer.longitude,
                        }}
                        onClick={() => setSelectedTrainer(trainer)}
                        icon={{
                            url: "https://example.com/custom-marker.png", // Optional: custom marker icon
                            scaledSize: new window.google.maps.Size(50, 50),
                        }}
                    />
                ))}

                {selectedTrainer && (
                    <InfoWindow
                        position={{
                            lat: selectedTrainer.latitude,
                            lng: selectedTrainer.longitude,
                        }}
                        onCloseClick={() => setSelectedTrainer(null)}
                    >
                        <div style={{ textAlign: "center" }}>
                            <img
                                src={selectedTrainer.profile_picture}
                                alt={selectedTrainer.name}
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                }}
                            />
                            <h2>{selectedTrainer.name}</h2>
                            <p>{selectedTrainer.specialty}</p>
                            <p>
                                🌟 {selectedTrainer.rating} (
                                {selectedTrainer.reviews} Reviews)
                            </p>
                            <button>Sync with this trainer</button>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </section>
    );
};

export default SyncTrainer;
