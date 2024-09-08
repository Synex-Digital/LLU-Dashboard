import React from "react";
import Button from "./common/Button";
import { MdLocationPin } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routers";

const SessionCard = ({
    title,
    locations,
    times,
    dates,
    bTrue,
    lTrue,
    sessionDetails,
}) => {
    const navigate = useNavigate();
    return (
        <div className="bg-darkSlate p-3 rounded-lg">
            <h2 className="font-medium">{title}</h2>
            {lTrue ? (
                <p className="text-sm text-gray-400 mt-3 mb-1">
                    <MdLocationPin className="inline-block text-xl text-Primary" />{" "}
                    {locations}
                </p>
            ) : (
                <p className="text-sm text-gray-400 my-3">{sessionDetails}</p>
            )}
            <div className="flex items-end justify-between">
                <div className="text-sm text-gray-400 inline-block">
                    <FaRegCalendarAlt className="inline-block text-lg text-Primary" />
                    <p className="inline-block mx-2">{times}</p>
                    <p className="inline-block">{dates}</p>
                </div>
                {bTrue && (
                    <Button
                        title={"More Details"}
                        className={
                            "!inline-block !font-normal !text-xs !px-2 !py-1 !rounded-full"
                        }
                        onClick={() => navigate(routes.sessionDetails.path)}
                    />
                )}
            </div>
        </div>
    );
};

export default SessionCard;
