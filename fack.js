import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Initialize refresh token and access token from cookies
    const [refToken, setRefToken] = useState(Cookies.get("ref-token") || null);
    const [token, setToken] = useState(Cookies.get("llu-token") || null);
    const baseUrl = import.meta.env.VITE_BASE_URL; // Assuming you have the base URL in env variables

    const refreshToken = async () => {
        try {
            // Call your refresh token API
            const response = await axios.post(${baseUrl}/auth/token, {
                token: refToken,
            });
            
            const newToken = response.data.accessToken; // Extract the new access token from the response
            setToken(newToken); // Update the token state

            // Set the new access token in a cookie with a short expiration time
            Cookies.set("llu-token", newToken, {
                secure: true,  // Ensure it only works over HTTPS
                sameSite: "Strict",  // Prevent CSRF
                expires: 1 / 96,  // Token expires in 15 minutes (1/96 of a day)
            });

            console.log("Token refreshed successfully:", newToken);
        } catch (error) {
            console.error("Error refreshing token", error);
        }
    };

    // Set up the useEffect hook to refresh the token every 5 seconds (5000 ms)
    useEffect(() => {
        // Refresh the token every 5 seconds
        const interval = setInterval(() => {
            refreshToken();
        }, 5000); // 5000 ms = 5 seconds

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, [refToken]); // Ensure this effect runs whenever refToken changes

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to access the authentication context
export const useAuth = () => useContext(AuthContext);