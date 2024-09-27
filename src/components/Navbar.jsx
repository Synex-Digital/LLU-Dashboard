import React from "react";
import Image from "./common/Image";

import notification from "../assets/icon/notification.svg";
import { MdLocationPin } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes/Routers";
import { FaAnglesRight, FaUsers } from "react-icons/fa6";
import navBarStore from "../features/navSlice";
import { HiHome } from "react-icons/hi";
import { SiSession } from "react-icons/si";
import { RiQuestionnaireFill } from "react-icons/ri";
import clsx from "clsx";
import { PiMessengerLogoBold } from "react-icons/pi";

const Navbar = () => {
    const { toggleBears } = navBarStore();
    const navigate = useNavigate();

    let pathName = window.location.pathname;

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
                            <p className="text-xs">New York, USA</p>
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
                                onClick={() =>
                                    navigate(routes.notifications.path)
                                }
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
                        <p className="text-xs">New York, USA</p>
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
