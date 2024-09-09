import React from "react";
import { PiMailboxFill } from "react-icons/pi";

const NotificationCard = ({ title, subtitle, times }) => {
  return (
    <div className="group flex cursor-pointer gap-x-3 rounded-lg p-5 hover:bg-darkSlate">
      <div className="inline-block rounded-full bg-darkSlate p-5 group-hover:bg-background">
        <PiMailboxFill className="text-2xl" />
      </div>
      <div>
        <p className="text-lg font-medium">
          {title}
          <span className="float-right text-darkText">{times}</span>
        </p>
        <p className="mt-1 text-darkText">{subtitle}</p>
      </div>
    </div>
  );
};

export default NotificationCard;
