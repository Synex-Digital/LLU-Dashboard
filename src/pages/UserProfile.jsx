import React from "react";
import Image from "../components/common/Image";
import profile from "../assets/image/pp.png";
import SubPageTitle from "../components/common/SubPageTitle";
import { IoIosTimer } from "react-icons/io";
import { FaRegComments } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routers";

const UserProfile = () => {
    const navigate = useNavigate();
    return (
        <section>
            <div className="sm:flex xl:gap-x-16 gap-x-10">
                <div className="mt-5 items-center text-center w-full justify-center gap-6">
                    <Image
                        className={"w-24 rounded-full mx-auto"}
                        src={profile}
                    />
                    <div>
                        <p className="mt-2.5 text-lg font-medium">
                            Mickael whisper
                        </p>
                        <div className="text-center text-darkText mb-4">
                            Facilitator Owner
                        </div>
                    </div>
                    <div className=" text-white p-4 border-y border-y-darkSlate mx-auto">
                        <div className="flex justify-center items-center">
                            <div className="text-center mr-6">
                                <div className="text-2xl font-bold">2555</div>
                                <div className="text-sm text-darkText">
                                    Followers
                                </div>
                            </div>

                            <div className="border-l border-darkText h-8"></div>

                            <div className="text-center ml-6">
                                <div className="text-2xl font-bold">150</div>
                                <div className="text-sm text-darkText">
                                    Following
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-x-7 sm:w-1/2 mx-auto">
                <button
                    onClick={() => navigate(routes.massages.path)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-darkSlate px-6 py-2 text-white"
                >
                    Massage
                </button>
                <button className="flex items-center justify-center gap-2 rounded-lg bg-Primary px-6 py-2 text-white">
                    Follow
                </button>
            </div>
            <div className="border-t-4 mt-8 border-t-darkSlate ">
                <SubPageTitle className={"!mt-5"} title={"Activity"} />
            </div>
            <div className="bg-darkSlate p-5 rounded-lg">
                <div className="flex gap-x-3 mb-5 ">
                    <Image
                        src={profile}
                        className={"w-16 h-16 rounded-full cursor-pointer"}
                        onClick={() => navigate(routes.userProfile.path)}
                    />
                    <div>
                        <h3
                            onClick={() => navigate(routes.userProfile.path)}
                            className="text-lg cursor-pointer"
                        >
                            Mickael W.
                        </h3>
                        <time className="text-darkText flex items-center">
                            <IoIosTimer className="text-white text-xl mr-2" />{" "}
                            50 minutes ago
                        </time>
                    </div>
                </div>
                <p>
                    Lorem ipsum dolor sit amet consectetur. Aenean commodo
                    euismod sapien tempor. Vel vitae odio in tempor amet et
                    dignissim ullamcorper.
                </p>
                <p className="text-Secondary mt-1">#training #game</p>

                <div className="flex items-center gap-x-10 mt-3 border-t border-t-darkText pt-3">
                    <div className="flex items-center gap-x-2 cursor-pointer">
                        <AiFillLike className="text-Primary text-2xl" />{" "}
                        <span>1210</span>
                    </div>
                    <div
                        onClick={() => setComments(!comments)}
                        className="flex items-center gap-x-2 cursor-pointer"
                    >
                        <FaRegComments className="text-Primary text-2xl" />{" "}
                        <span>36</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;
