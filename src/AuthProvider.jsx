import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const accToken = Cookies.get("llu-token");
    const refToken = Cookies.get("ref-token");

    const refreshToken = async () => {
        try {
            const response = await axios.post(`${baseUrl}/auth/token`, {
                token: refToken,
            });
            console.log(response);
            console.log("ref", refToken);
            console.log("acc", accToken);

            const newToken = response.data.accessToken;
            setToken(newToken);

            Cookies.set("llu-token", newToken, {
                secure: true,
                sameSite: "Strict",
                expires: 1 / 96,
            });
        } catch (error) {
            console.error("Error refreshing token", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(
            () => {
                refreshToken();
            },
            15 * 60 * 1000
        );

        return () => clearInterval(interval);
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
