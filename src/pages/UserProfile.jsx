import React, { useEffect, useState } from "react";
import Image from "../components/common/Image";
import profile from "../assets/image/pp.png";
import SubPageTitle from "../components/common/SubPageTitle";
import { IoIosTimer } from "react-icons/io";
import { FaRegComments } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../routes/Routers";
import axios from "axios";
import Cookies from "js-cookie";

const UserProfile = () => {
    const location = useLocation();
    const userId = location.state?.id;
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const token = Cookies.get("llu-token");
    let [userData, setUserData] = useState("");
    let [realTime, setRealTime] = useState(true);

    async function apiCall() {
        try {
            let response = await axios.get(
                `${baseUrl}/api/user/profile/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );
            setUserData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        apiCall();
    }, [realTime]);

    if (!userData) {
        return;
    }
    console.log(userData);

    const handleMag = async () => {
        try {
            let response = await axios.get(
                `${baseUrl}/api/user/create_chat/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );

            navigate(routes.messages.path);
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };

    const handleFollow = async () => {
        try {
            let response = await axios.get(
                `${baseUrl}/api/user/follow/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );
            console.log(response.data);
            setRealTime(false);
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };

    return (
        <section>
            <div className="sm:flex xl:gap-x-16 gap-x-10">
                <div className="mt-5 items-center text-center w-full justify-center gap-6">
                    <Image
                        className={"w-24 rounded-full mx-auto"}
                        src={profile}
                    />
                    <div>
                        <p className="mt-2.5 text-lg font-medium capitalize">
                            {userData?.user.first_name}{" "}
                            {userData?.user.last_name}
                        </p>
                        <div className="text-center text-darkText mb-4 capitalize">
                            {userData?.user.type}
                        </div>
                    </div>
                    <div className=" text-white p-4 border-y border-y-darkSlate mx-auto">
                        <div className="flex justify-center items-center">
                            <div className="text-center mr-6">
                                <div className="text-2xl font-bold">
                                    {userData?.follower_no || 0}
                                </div>
                                <div className="text-sm text-darkText">
                                    Followers
                                </div>
                            </div>

                            <div className="border-l border-darkText h-8"></div>

                            <div className="text-center ml-6">
                                <div className="text-2xl font-bold">
                                    {userData?.following_no || 0}
                                </div>
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
                    onClick={handleMag}
                    className="flex items-center justify-center gap-2 rounded-lg bg-darkSlate px-6 py-2 text-white"
                >
                    Message
                </button>
                <button
                    onClick={handleFollow}
                    className="flex items-center justify-center gap-2 rounded-lg bg-Primary px-6 py-2 text-white"
                >
                    Follow
                </button>
            </div>
            <div className="border-t-4 mt-8 border-t-darkSlate ">
                <SubPageTitle className={"!mt-5"} title={"Activity"} />
            </div>
            <div className="grid gap-y-3">
                {userData?.posts
                    .sort((a, b) => new Date(b.time) - new Date(a.time))
                    .map((item, index) => (
                        <div key={index}>
                            <div className="bg-darkSlate p-5 rounded-lg">
                                <div className="flex gap-x-3 mb-5 ">
                                    <Image
                                        src={
                                            item?.profile_picture
                                                ? item?.profile_picture
                                                : item?.img
                                        }
                                        className={
                                            "w-16 h-16 rounded-full cursor-pointer"
                                        }
                                    />
                                    <div>
                                        <h3 className="text-lg cursor-pointer">
                                            {item.first_name} {item.last_name}
                                        </h3>
                                        <time className="text-darkText flex items-center">
                                            <IoIosTimer className="text-darkText text-xl mr-2" />{" "}
                                            {new Date(
                                                item.time
                                            ).toLocaleDateString()}
                                        </time>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 mb-3">
                                    {item.post_images.map((item, index) => {
                                        if (index === 0) {
                                            return (
                                                <img
                                                    key={index}
                                                    src={item}
                                                    alt={`Image ${index}`}
                                                    className="w-full h-auto object-cover rounded-lg cursor-pointer col-span-2 row-span-2"
                                                    onClick={() =>
                                                        openModal(item)
                                                    }
                                                />
                                            );
                                        } else if (index === 1 || index === 2) {
                                            return (
                                                <img
                                                    key={index}
                                                    src={item}
                                                    alt={`Image ${index}`}
                                                    className="w-full h-auto object-cover rounded-lg cursor-pointer"
                                                    onClick={() =>
                                                        openModal(item)
                                                    }
                                                />
                                            );
                                        } else {
                                            return (
                                                <img
                                                    key={index}
                                                    src={item}
                                                    alt={`Image ${index}`}
                                                    className="w-full h-auto object-cover rounded-lg cursor-pointer"
                                                />
                                            );
                                        }
                                    })}
                                </div>

                                <p>{item.content}</p>
                                {/* <p className="text-Secondary mt-1">
                                        #training #game
                                    </p> */}

                                <div className="flex items-center gap-x-10 mt-3 border-t border-t-darkText pt-3">
                                    <div className="flex items-center gap-x-2 cursor-pointer">
                                        <AiFillLike className="text-Primary text-2xl" />{" "}
                                        <span>{item.no_of_likes}</span>
                                    </div>
                                    <div className="flex items-center gap-x-2 cursor-pointer">
                                        <FaRegComments className="text-Primary text-2xl" />{" "}
                                        <span>{item.no_of_comments}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default UserProfile;
