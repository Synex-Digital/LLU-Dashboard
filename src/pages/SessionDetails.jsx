import React from "react";
import profile from "../assets/image/pp.png";
import Image from "../components/common/Image";
import Button from "../components/common/Button";
import { AiFillMessage } from "react-icons/ai";
import { IoIosCall, IoIosTime } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";

const SessionDetails = () => {
    return (
        <section>
            <h1 className="font-semibold text-3xl mb-8">Session Details</h1>

            <div className="flex gap-x-3.5 border-b border-b-darkSlate pb-6">
                <div className="bg-darkSlate px-3 py-2 rounded-xl grid place-items-center text-center">
                    20
                    <br />
                    May
                </div>
                <div>
                    <h2 className="font-medium text-lg">
                        Football Goal Keeping Session
                    </h2>
                    <p className="text-darkText">
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority...
                    </p>
                    <p className="text-redText">
                        Session Ends In: 49:25 minute
                    </p>
                </div>
            </div>

            <h2 className="font-medium text-xl text-Primary py-6">
                Session Book By
            </h2>
            <div className="flex gap-x-16">
                <div className="border-r border-r-darkSlate pr-16">
                    <div className="flex items-center gap-6 mt-5">
                        <Image className={"rounded-full w-24"} src={profile} />
                        <div>
                            <p className="text-darkText font-medium">Athlete</p>
                            <p className="font-medium text-lg mt-2.5">
                                Mickael whisper
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-x-7 mt-5 ">
                        <button className="flex items-center py-2 px-6 gap-2 bg-darkSlate rounded-lg text-darkText">
                            <AiFillMessage className="text-Primary" /> Message
                        </button>
                        <button className="flex items-center py-2 px-6 gap-2 bg-darkSlate rounded-lg text-darkText">
                            <IoIosCall className="text-Primary text-lg" />{" "}
                            Message
                        </button>
                    </div>
                </div>
                <div>
                    <p className="font-medium text-lg">Details</p>
                    <p className="text-sm text-gray-400 mt-4 mb-1">
                        <MdLocationPin className="inline-block text-xl text-Primary" />{" "}
                        Ark Sports Club, Herison Road, NY, 71005363
                    </p>
                    <div className="text-sm text-gray-400 inline-block">
                        <FaRegCalendarAlt className="inline-block text-lg text-Primary" />
                        <p className="inline-block ml-1 mr-3">20th May, 2024</p>
                        <IoIosTime className="inline-block text-lg text-Primary" />
                        <p className="inline-block ml-1">05:00 PM - 06:00 PM</p>
                    </div>
                </div>
            </div>
            <h2 className="font-medium text-xl text-Primary mt-20">
                Session Trainer
            </h2>
            <div className="flex items-center gap-6 mt-5">
                <Image className={"rounded-full w-24"} src={profile} />
                <div>
                    <p className="text-darkText font-medium">Trainer</p>
                    <p className="font-medium text-lg mt-2.5">Jhony Dep</p>
                </div>
            </div>
        </section>
    );
};

export default SessionDetails;
