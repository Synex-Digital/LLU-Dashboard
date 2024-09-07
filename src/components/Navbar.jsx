import React from "react";
import Image from "./common/Image";

import notification from "../assets/icon/notification.svg";
import { MdLocationPin } from "react-icons/md";

const Navbar = () => {
    return (
        <nav className="w-full border-b border-darkSlate bg-background sticky top-0 py-4">
            <div className="flex items-center justify-end gap-x-8 pr-5">
                <p>Home</p>
                <p>Session</p>
                <p>Community</p>
                <p>Request</p>
                <div className="flex items-center gap-x-1 rounded bg-darkSlate px-2 py-1">
                    <MdLocationPin className="text-xl" />
                    <p className="text-xs">New York, USA</p>
                </div>
                <div className="relative">
                    <Image className={"w-5"} src={notification} />
                    <div className="absolute right-0 top-1 h-2 w-2 rounded-full bg-red-600"></div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
