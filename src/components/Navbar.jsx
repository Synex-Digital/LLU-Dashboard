import React from "react";
import Image from "./common/Image";

import notification from "../assets/icon/notification.svg";
import { MdLocationPin } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes/Routers";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 w-full border-b border-darkSlate bg-background py-4">
      <div className="flex items-center justify-end gap-x-8 pr-5">
        <Link to={routes.dashboard.path}>Home</Link>
        <Link to={routes.session.path}>Session</Link>
        <Link to={"/"}>Community</Link>
        <Link to={routes.athleteRequest.path}>Request</Link>
        <div className="flex items-center gap-x-1 rounded bg-darkSlate px-2 py-1">
          <MdLocationPin className="text-xl" />
          <p className="text-xs">New York, USA</p>
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
  );
};

export default Navbar;
