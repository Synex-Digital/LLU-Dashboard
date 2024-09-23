import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(Cookies.get("llu-token") || null);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const refToken = Cookies.get("ref-token");
    const accToken = Cookies.get("llu-token");

    const refreshToken = async () => {
        if (!refToken) {
            console.error("No refresh token available.");
            return;
        }
        try {
            const response = await axios.post(`${baseUrl}/auth/token`, {
                token: refToken,
            });

            const newToken = response.data.accessToken;
            setToken(newToken);

            Cookies.set("llu-token", newToken, {
                secure: true,
                sameSite: "Strict",
                expires: 1 / 96,
            });
        } catch (error) {
            console.error("Error refreshing token", error);

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
                console.log("Calling refreshToken every 14 minutes...");
                refreshToken();
            },
            14 * 60 * 1000
        ); // 14 minutes

        return () => clearInterval(interval);
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
