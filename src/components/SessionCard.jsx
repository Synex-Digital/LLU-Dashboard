import React from "react";
import Button from "./common/Button";
import { MdLocationPin } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routers";

const SessionCard = ({
    title,
    locations,
    startTime,
    endTime,
    dates,
    bTrue,
    lTrue,
    sessionDetails,
    key,
}) => {
    const navigate = useNavigate();
    return (
        <div key={key} className="rounded-lg bg-darkSlate p-3">
            <h2 className="font-medium">{title}</h2>
            <p className="my-3 text-sm text-gray-400">{sessionDetails}</p>
            {lTrue && (
                <p className="mb-1 mt-3 text-sm text-gray-400">
                    <MdLocationPin className="inline-block text-xl text-Primary" />{" "}
                    {locations}
                </p>
            )}

            <div className="flex items-end justify-between">
                <div className="flex items-center text-sm text-gray-400">
                    <FaRegCalendarAlt className=" text-lg text-Primary" />
                    <p className="mx-2">
                        {startTime} 
                        {" - "} {endTime}
                    </p>
                    <p>{dates}</p>
                </div>
                {bTrue && (
                    <Button
                        title={"More Details"}
                        className={
                            "!inline-block !rounded-full !px-2 !py-1 !text-xs !font-normal"
                        }
                        onClick={() => navigate(routes.sessionDetails.path)}
                    />
                )}
            </div>
        </div>
    );
};

export default SessionCard;
