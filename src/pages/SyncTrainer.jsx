import React, { useEffect } from "react";
import PageHeading from "../components/common/PageHeading";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";
import Cookies from "js-cookie";

const SyncTrainer = () => {
    const token = Cookies.get("llu-token");
    const baseUrl = import.meta.env.VITE_BASE_URL;

    async function apiCall() {
        try {
            const center = {
                latitude: 40.7128,
                longitude: -73.906,
            };
            let response = await axios.get(
                `${baseUrl}/api/facilitator/nearby_trainers`,
                center,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        apiCall();
    }, []);
    
    return (
        <section>
            <div className="flex items-center gap-3 w-full">
                <PageHeading title={"Sync Trainer"} className={"w-1/5 !mb-0"} />
                <div className="w-4/5 relative">
                    <input className="p-3 pl-11 w-full bg-darkSlate rounded-lg" />
                    <IoMdSearch className="text-3xl absolute top-2.5 left-2" />
                </div>
            </div>
        </section>
    );
};

export default SyncTrainer;
