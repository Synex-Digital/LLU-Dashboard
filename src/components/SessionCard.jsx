import React from "react";
import Button from "./common/Button";
import { MdLocationPin } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";

const SessionCard = ({
    title,
    locations,
    times,
    dates,
    bTrue,
    lTrue,
    sessionDetails,
}) => {
    return (
        <div className="bg-darkSlate p-3 rounded-lg">
            <h2 className="font-medium">{title}</h2>
            {lTrue ? (
                <p className="text-sm text-gray-400 mt-3">
                    <MdLocationPin className="inline-block text-xl text-Primary" />{" "}
                    {locations}
                </p>
            ) : (
                <p className="text-sm text-gray-400 my-3">{sessionDetails}</p>
            )}
            <div className="flex items-end justify-between">
                <div className="text-sm text-gray-400 inline-block">
                    <FaRegCalendarAlt className="inline-block text-xl text-Primary" />
                    <p className="inline-block mx-2">{times}</p>
                    <p className="inline-block">{dates}</p>
                </div>
                {bTrue && (
                    <Button
                        title={"More Details"}
                        className={"!inline-block !py-1 !rounded-full"}
                    />
                )}
            </div>
        </div>
    );
};

export default SessionCard;
