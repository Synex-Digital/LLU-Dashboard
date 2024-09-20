import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { Navigate, Outlet } from "react-router-dom";
import { routes } from "../routes/Routers";
import { useAuth } from "../AuthProvider";

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true); //change for design value is false
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        if (token) {
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
