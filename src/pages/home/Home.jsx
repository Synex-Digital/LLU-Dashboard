import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SessionCard from "../../components/SessionCard";
import { FiPlusCircle } from "react-icons/fi";
import ReactCalendar from "../../components/ReactCalendar";
import { routes } from "../../routes/Routers";
import axios from "axios";
import Cookies from "js-cookie";
import PageHeading from "../../components/common/PageHeading";

const Home = () => {
    const navigate = useNavigate();
    const token = Cookies.get("llu-token");
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [upcomingSessions, setUpcomingSessions] = useState([]);
    const [ongoingSessions, setOngoingSessions] = useState([]);

    async function apiCall() {
        try {
            let response = await axios.get(
                `${baseUrl}/api/facilitator/sessions`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );
            console.log(response.data);
            

            setOngoingSessions(response.data.data.ongoingSessions);
            setUpcomingSessions(response.data.data.upcomingSessions);
        } catch (error) {}
    }

    useEffect(() => {
        apiCall();
    }, []);

    return (
        <main>
            <section>
                <div className="flex items-center justify-between">
                    <PageHeading className={"mb-0"} title={"Ongoing Session"} />
                </div>
                <div className="mt-8 grid xl:grid-cols-3 sm:grid-cols-2 gap-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index}>
                            <SessionCard
                                bTrue={true}
                                times={"05:00 PM - 06:00 PM"}
                                locations={"Ark Sports Club, NY"}
                                sessionDetails={
                                    "There are many variations of passages of Lorem Ipsum available, but the majority..."
                                }
                                title={"Football Keeping Session"}
                                lTrue={true}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Upcoming Session */}
            <section className="my-10">
                <div className="flex items-center justify-between">
                    <div className="flex gap-x-3">
                        <PageHeading
                            className={"mb-0"}
                            title={"Upcoming Session"}
                        />
                    </div>
                </div>
                <div className="mt-8">
                    <ReactCalendar />
                </div>
                <div className="mt-3 grid xl:grid-cols-3 sm:grid-cols-2 gap-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index}>
                            <SessionCard
                                bTrue={true}
                                times={"05:00 PM - 06:00 PM"}
                                locations={"Ark Sports Club, NY"}
                                sessionDetails={
                                    "There are many variations of passages of Lorem Ipsum available, but the majority..."
                                }
                                title={"Football Keeping Session"}
                                lTrue={true}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Session History */}

            <section>
                <div className="flex items-center justify-between">
                    <PageHeading className={"mb-0"} title={"Session History"} />
                </div>
                <div className="mt-8 grid xl:grid-cols-3 sm:grid-cols-2 gap-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index}>
                            <SessionCard
                                bTrue={true}
                                times={"05:00 PM - 06:00 PM"}
                                locations={"Ark Sports Club, NY"}
                                sessionDetails={
                                    "There are many variations of passages of Lorem Ipsum available, but the majority..."
                                }
                                title={"Football Keeping Session"}
                                lTrue={true}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Home;
