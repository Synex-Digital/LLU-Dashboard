import React from "react";
import { FaUserGroup } from "react-icons/fa6";

const ProfileCard = ({ title }) => {
    return (
        <div className="rounded-lg bg-darkSlate p-5 max-sm:flex max-sm:flex-col max-sm:items-center">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-background">
                <FaUserGroup />
            </div>
            <p>{title}</p>
        </div>
    );
};

export default ProfileCard;
