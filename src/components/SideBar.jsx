import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routers";
import { FaAnglesLeft } from "react-icons/fa6";
import clsx from "clsx";
import navBarStore from "../features/navSlice";

import Image from "./common/Image";
import appointment from "../assets/icon/appointment.svg";
import helpCenter from "../assets/icon/help-center.svg";
import paymentMethod from "../assets/icon/payment-method.svg";
import setting from "../assets/icon/setting.svg";
import profileIcon from "../assets/icon/profile-icon.svg";
import defaultImage from "../assets/image/default-pp.jpg";

const SideBar = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("user"));
    const { bears, toggleBears } = navBarStore();

    return (
        <aside
            className={clsx(
                `${bears ? "max-lg:absolute" : "max-lg:hidden"} static max-lg:absolute max-lg:z-[100] max-sm:w-2/3 max-md:w-2/5 max-lg:w-1/3 max-xl:w-1/4 h-screen sm:max-md:h-fit w-1/5 bg-darkSlate px-3 py-5`
            )}
        >
            <p className="max-lg:block hidden absolute right-3 cursor-pointer">
                <FaAnglesLeft onClick={() => toggleBears()} />
            </p>
            <div className="flex flex-col items-center justify-center gap-2">
                <Image
                    className={"xl:w-28 lg:w-24 w-20 rounded-full"}
                    src={
                        userData?.profile_picture
                            ? userData?.profile_picture
                            : defaultImage
                    }
                />
                <h2 className="text-center text-xl font-semibold mt-3 capitalize">
                    {userData?.userWithoutEmail?.first_name}{" "}
                    {userData?.userWithoutEmail?.last_name}
                </h2>
            </div>
            <div className="mt-8 flex flex-col gap-y-6">
                <div
                    onClick={() => navigate(routes.profile.path)}
                    className="flex cursor-pointer items-center gap-x-4 rounded-lg px-3 py-2 hover:bg-background"
                >
                    <Image src={profileIcon} />
                    <p>Profile</p>
                </div>
                <div className="flex cursor-pointer items-center gap-x-4 rounded-lg px-3 py-2 hover:bg-background">
                    <Image src={appointment} />
                    <p>My Appointment</p>
                </div>
                <div className="flex cursor-pointer items-center gap-x-4 rounded-lg px-3 py-2 hover:bg-background">
                    <Image src={paymentMethod} />
                    <p>Payment Method</p>
                </div>
                <div
                    onClick={() => navigate(routes.settings.path)}
                    className="flex cursor-pointer items-center gap-x-4 rounded-lg px-3 py-2 hover:bg-background"
                >
                    <Image src={setting} />
                    <p>Setting</p>
                </div>

                <div className="flex cursor-pointer items-center gap-x-4 rounded-lg px-3 py-2 hover:bg-background">
                    <Image src={helpCenter} />
                    <p>Help Center</p>
                </div>
            </div>
        </aside>
    );
};

export default SideBar;
