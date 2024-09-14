import React, { useState } from "react";
import PageHeading from "../components/common/PageHeading";
import { FiPlus } from "react-icons/fi";
import Image from "../components/common/Image";
import profile from "../assets/image/pp.png";
import { IoIosTimer } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa6";

const Community = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [comments, setComments] = useState(false);

    const images = [profile, profile, profile, profile];

    const openModal = (image) => {
        setSelectedImage(image);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedImage(null);
    };
    return (
        <section className="relative">
            <PageHeading title={"Community"} />
            {!comments && (
                <FiPlus className="w-12 h-12 bottom-8 right-5 cursor-pointer fixed bg-Primary rounded-full p-2" />
            )}
            <div className="bg-darkSlate p-5 rounded-lg">
                <div className="flex gap-x-3 mb-5 ">
                    <Image
                        src={profile}
                        className={"w-16 h-16 rounded-full cursor-pointer"}
                    />
                    <div>
                        <h3 className="text-lg cursor-pointer">Mickael W.</h3>
                        <time className="text-darkText flex items-center">
                            <IoIosTimer className="text-white text-xl mr-2" />{" "}
                            50 minutes ago
                        </time>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                    {images.map((item, index) => (
                        <img
                            key={index}
                            src={item}
                            alt={`Image ${index}`}
                            className="w-full h-auto object-cover rounded-lg cursor-pointer"
                            onClick={() => openModal(item)}
                        />
                    ))}
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

            {comments && (
                <div className="space-y-3 mt-3">
                    <div className=" p-4 rounded-lg">
                        <div className="flex gap-x-3">
                            <Image
                                src={profile}
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <div className="flex items-center gap-x-3">
                                    <h3 className="text-lg cursor-pointer">
                                        Aman RIchman
                                    </h3>
                                    <time className="text-darkText flex items-center">
                                        <IoIosTimer className="text-white text-sm mr-2" />
                                        30 min ago
                                    </time>
                                </div>
                                <p className="mt-2">
                                    Lorem ipsum dolor sit amet consectetur.
                                    Aenean commodo.
                                </p>
                                <div className="flex items-center gap-x-5 mt-3 text-gray-400">
                                    <div className="flex items-center gap-x-1">
                                        <AiFillLike className="text-Primary text-xl" />
                                        <span>50</span>
                                    </div>
                                    <div className="cursor-pointer">Reply</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" p-4 rounded-lg">
                        <div className="flex gap-x-3">
                            <Image
                                src={profile}
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <div className="flex items-center gap-x-3">
                                    <h3 className="text-lg cursor-pointer">
                                        Aman RIchman
                                    </h3>
                                    <time className="text-darkText flex items-center">
                                        <IoIosTimer className="text-white text-sm mr-2" />
                                        30 min ago
                                    </time>
                                </div>
                                <p className="mt-2">
                                    Lorem ipsum dolor sit amet consectetur.
                                    Aenean commodo.
                                </p>
                                <div className="flex items-center gap-x-5 mt-3 text-gray-400">
                                    <div className="flex items-center gap-x-1">
                                        <AiFillLike className="text-Primary text-xl" />
                                        <span>50</span>
                                    </div>
                                    <div className="cursor-pointer">Reply</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-darkSlate rounded-t-lg flex items-center">
                        <Image
                            src={profile}
                            className={"rounded-full w-20 h-20 p-3"}
                        />
                        <input className="bg-background rounded-full w-4/5" />
                    </div>
                </div>
            )}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="relative w-1/3">
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="w-full rounded-lg"
                        />
                        <button
                            className="absolute top-2 right-2 text-white text-2xl"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Community;
