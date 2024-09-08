import React from "react";
import { PiMailboxFill } from "react-icons/pi";

const NotificationCard = ({title,subtitle,times}) => {
    return (
        <div className="flex gap-x-3 cursor-pointer hover:bg-darkSlate p-5 rounded-lg group">
            <div className="p-5 bg-darkSlate group-hover:bg-background rounded-full inline-block">
                <PiMailboxFill className="text-2xl" />
            </div>
            <div>
                <p className="text-lg font-medium">
                    {title}
                    <span className="float-right text-darkText">{times}</span>
                </p>
                <p className="text-darkText mt-1">{subtitle}</p>
            </div>
        </div>
    );
};

export default NotificationCard;
