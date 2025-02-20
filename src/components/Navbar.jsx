import React, { useEffect, useState } from "react";
import Image from "./common/Image";

import notification from "../assets/icon/notification.svg";
import { MdLocationPin } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes/Routers";
import { FaAnglesRight, FaUsers } from "react-icons/fa6";
import navBarStore from "../features/navSlice";
import { HiHome } from "react-icons/hi";
import { SiSession } from "react-icons/si";
import clsx from "clsx";
import { PiMessengerLogoBold } from "react-icons/pi";
import axios from "axios";

const Navbar = () => {
  const { toggleBears } = navBarStore();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState("Fetching location...");

  let pathName = window.location.pathname;

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          setLocationName(`Error: ${error.message}`);
          if (error.code === error.PERMISSION_DENIED) {
            alert(
              "❌ Location access is denied!\n\nPlease enable location access in your browser settings."
            );
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            alert("⚠️ Location information is unavailable. Try again later.");
          } else if (error.code === error.TIMEOUT) {
            alert(
              "⏳ Location request timed out. Please check your internet connection."
            );
          } else {
            alert("Unknown error occurred. Please try again.");
          }
        }
      );
    } else {
      setLocationName("Geolocation not supported");
    }
  };

  const reverseGeocode = async () => {
    if (!location) return;

    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${import.meta.env.VITE_GOOGLE_MAP_KEY}`;
    try {
      const response = await axios.get(geocodingUrl);

      if (response.data.status === "OK") {
        const addressComponents = response.data.results[0]?.address_components;

        let city = "";
        let country = "";

        addressComponents.forEach((component) => {
          if (component.types.includes("locality")) {
            city = component.long_name;
          }
          if (component.types.includes("country")) {
            country = component.long_name;
          }
        });

        if (city && country) {
          setLocationName(`${city}, ${country}`);
        } else {
          setLocationName("Location not found");
        }
      } else {
        setLocationName("Location not found");
      }
    } catch (error) {
      setLocationName("Error fetching location");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (location) {
      reverseGeocode();
    }
  }, [location]);

  return (
    <>
      <nav className="sticky top-0 w-full border-b z-50 border-darkSlate bg-background py-4">
        <div className="max-lg:flex justify-between hidden max-lg:px-2">
          <FaAnglesRight
            className="cursor-pointer"
            onClick={() => toggleBears()}
          />
          <div className="flex items-center gap-x-3">
            <div className="flex items-center gap-x-1 rounded bg-darkSlate px-2 py-1">
              <MdLocationPin className="text-xl" />
              <p className="text-xs">{locationName}</p>
            </div>
            <div className="relative">
              <PiMessengerLogoBold
                onClick={() => navigate(routes.messages.path)}
                className="text-2xl cursor-pointer"
              />
              <div className="absolute right-0 top-1 h-2 w-2 rounded-full bg-green-500"></div>
            </div>
            <div className="relative">
              <Image
                className={"md:w-5 w-4 cursor-pointer"}
                onClick={() => navigate(routes.notifications.path)}
                src={notification}
              />
              <div className="absolute right-0 top-1 w-1.5 h-1.5 md:h-2 md:w-2 rounded-full bg-red-600"></div>
            </div>
          </div>
        </div>
        <div className="lg:flex hidden items-center justify-end gap-x-8 pr-5">
          <Link
            className={clsx(
              `${pathName == routes.dashboard.path ? "text-white" : "text-darkText "}`
            )}
            to={routes.dashboard.path}
          >
            Home
          </Link>
          <Link
            className={clsx(
              `${pathName == routes.session.path ? "text-white" : "text-darkText "}`
            )}
            to={routes.session.path}
          >
            Session
          </Link>
          <Link
            className={clsx(
              `${pathName == routes.community.path ? "text-white" : "text-darkText "}`
            )}
            to={routes.community.path}
          >
            Community
          </Link>
          <div className="flex items-center gap-x-1 rounded bg-darkSlate px-2 py-1">
            <MdLocationPin className="text-xl" />
            <p className="text-xs">{locationName}</p>
          </div>
          <div className="relative">
            <PiMessengerLogoBold
              onClick={() => navigate(routes.messages.path)}
              className="text-2xl cursor-pointer"
            />
            <div className="absolute right-0 top-1 h-2 w-2 rounded-full bg-green-500"></div>
          </div>
          <div className="relative">
            <Image
              className={"w-5 cursor-pointer"}
              onClick={() => navigate(routes.notifications.path)}
              src={notification}
            />
            <div className="absolute right-0 top-1 h-2 w-2 rounded-full bg-red-600"></div>
          </div>
        </div>
      </nav>
      <footer className="lg:hidden fixed z-50 bottom-0 text-center grid grid-cols-3 gap-x-2 items-center bg-darkSlate w-full py-3 px-2">
        <Link
          className={clsx(
            `${pathName == routes.dashboard.path ? "text-center text-white" : "text-center text-darkText "}`
          )}
          to={routes.dashboard.path}
        >
          <HiHome className="text-2xl mx-auto " />
          <span className="text-sm">Home</span>
        </Link>
        <Link
          className={clsx(
            `${pathName == routes.session.path ? "text-center text-white" : "text-center text-darkText "}`
          )}
          to={routes.session.path}
        >
          <SiSession className="text-2xl mx-auto" />
          <span className="text-sm">Session</span>
        </Link>
        <Link
          className={clsx(
            `${pathName == routes.community.path ? "text-center text-white" : "text-center text-darkText "}`
          )}
          to={routes.community.path}
        >
          <FaUsers className="text-2xl mx-auto" />
          <span className="text-sm">Community</span>
        </Link>
      </footer>
    </>
  );
};

export default Navbar;
