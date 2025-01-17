import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { Navigate, Outlet } from "react-router-dom";
import { routes } from "../routes/Routers";
import Cookies from "js-cookie";
import axios from "axios";

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const refToken = Cookies.get("ref-token");

    useEffect(() => {
        if (refToken) {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to={routes.login.path} />;
};

const RotLayOut = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const refToken = Cookies.get("ref-token");
    const accToken = Cookies.get("llu-token");

    const refreshToken = async () => {
        if (!refToken) {
            return;
        }
        try {
            const response = await axios.post(`${baseUrl}/auth/token`, {
                token: refToken,
            });
            const fifteenMinutesFromNow = new Date(Date.now() + 15 * 60 * 1000);

            const newToken = response.data.accessToken;
            const newRefToken = response.data.refreshToken;

            Cookies.set("llu-token", newToken, {
                secure: true,
                sameSite: "Strict",
                expires: 1 / 96,
            });
            Cookies.set("ref-token", newRefToken, {
                secure: true,
                sameSite: "Strict",
                expires: fifteenMinutesFromNow,
            });
        } catch (error) {

            if (error.response?.status === 401) {
                Cookies.remove("llu-token");
                Cookies.remove("ref-token");
                setToken(null);
            }
        }
    };

    useEffect(() => {
        if (!accToken) {
            refreshToken();
        }

        const interval = setInterval(
            () => {
                refreshToken();
            },
            14 * 60 * 1000
        ); // 14 minutes

        return () => clearInterval(interval);
    }, [accToken]);

    return (
        <PrivateRoute>
            <main className="font-inter text-white">
                <section className="flex h-screen overflow-hidden">
                    <SideBar />
                    <section className="relative lg:w-10/12 w-full overflow-y-auto overflow-x-hidden">
                        <Navbar />
                        <div className="lg:p-5 max-lg:p-2 max-lg:mb-[76px]">
                            <Outlet />
                        </div>
                    </section>
                </section>
            </main>
        </PrivateRoute>
    );
};

export default RotLayOut;
