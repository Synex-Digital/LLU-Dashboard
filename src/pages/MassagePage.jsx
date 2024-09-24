import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import clsx from "clsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import Cookies from "js-cookie";
import defaultImg from "../assets/image/default-pp.jpg";

const MassagePage = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const token = Cookies.get("llu-token");
    const [messages, setMessages] = useState([
        {
            time: "11:08 PM",
            content: "Hi, Jubaer Riyad! How are you?\nHow can I help you?",
            sender: "received",
            type: "text",
        },
        {
            time: "11:10 PM",
            content:
                "Ok then we need to first check out the vet we let you know.\nThen let you know in 24 Hours.",
            sender: "received",
            type: "text",
        },
        {
            time: "11:12 PM",
            content: "Ok great.\nI will waiting for your response.",
            sender: "sent",
            type: "text",
        },
        {
            time: "11:15 PM",
            content: [
                { img: "https://via.placeholder.com/150" },
                { img: "https://via.placeholder.com/150" },
            ],
            sender: "sent",
            type: "images",
        },
    ]);

    const [newMessage, setNewMessage] = useState("");
    const [usersMessage, setUsersMessage] = useState([]);
    const [usersUnreadMessage, setUsersUnreadMessage] = useState([]);
    const [userClick, setUserClick] = useState(false);

    useEffect(() => {
        async function apiCall() {
            try {
                let response = await axios.get(
                    `${baseUrl}/api/user/chats?page=1&limit=10`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );

                console.log(response.data.data);
                setUsersMessage(response.data.data.chats);
                setUsersUnreadMessage(response.data.data.unread_chats);
            } catch (error) {
                console.log(error);
            }
        }
        apiCall();
    }, []);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages([
                ...messages,
                {
                    time: "Now",
                    content: newMessage,
                    sender: "sent",
                    type: "text",
                },
            ]);
            setNewMessage("");
        }
    };

    const handleUser = (item) => {
        console.log(item.room_id);
        setUserClick((prev) => !prev);
    };
    return (
        <section className="-m-5">
            <div className="flex gap-x-3 xl:h-[540px]">
                <div
                    className={clsx(
                        `${userClick ? "max-xl:hidden" : "max-xl:block"} bg-darkSlate text-white p-3 xl:w-1/3 w-full flex-1 overflow-y-auto`
                    )}
                >
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Search chats"
                            className="w-full p-2 rounded-md bg-background text-gray-300"
                        />
                    </div>

                    <div className="space-y-2">
                        {usersMessage.map((chat, index) => (
                            <div
                                key={index}
                                className="flex items-center p-2 bg-background rounded-lg space-x-3 cursor-pointer"
                                onClick={() => handleUser(chat)}
                            >
                                <div className="relative">
                                    <img
                                        src={chat.img || defaultImg}
                                        alt={chat.first_name}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <span
                                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                                            chat.active === 1
                                                ? "bg-green-500"
                                                : "bg-gray-500"
                                        }`}
                                    ></span>
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-lg font-semibold capitalize">
                                            {chat.first_name} {chat.last_name}
                                        </h4>
                                        <span className="text-sm text-darkText">
                                            {chat.last_message_time}
                                        </span>
                                    </div>
                                    <p className="text-sm text-darkText">
                                        {chat.latest_message_content}
                                    </p>
                                </div>

                                {/* {chat.unreadCount > 0 && (
                                    <div className="flex items-center justify-center w-6 h-6 bg-yellow-500 text-black rounded-full text-sm">
                                        {chat.unreadCount}
                                    </div>
                                )} */}
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className={`${userClick ? "max-xl:block" : "max-xl:hidden"} xl:w-2/3 w-full `}
                >
                    <div className="h-full flex flex-col bg-darkSlate text-white">
                        {/* Header */}
                        <div className="flex items-center p-3 bg-darkSlate border-b border-b-background">
                            <FaArrowLeftLong
                                onClick={() => setUserClick((prev) => !prev)}
                                className="mr-3"
                            />
                            <img
                                src="https://randomuser.me/api/portraits/women/1.jpg"
                                alt="Jane Cooper"
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="ml-4">
                                <h4 className="font-semibold">Jane Cooper</h4>
                                <p className="text-sm text-green-500">
                                    Active now
                                </p>
                            </div>
                            <div className="ml-auto">
                                {/* Settings icon */}
                                <button className="text-gray-400">
                                    <i className="fas fa-ellipsis-v"></i>
                                </button>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${
                                        msg.sender === "sent"
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`max-w-xs ${
                                            msg.sender === "sent"
                                                ? "bg-Primary"
                                                : "bg-background"
                                        } p-3 rounded-lg text-sm whitespace-pre-wrap`}
                                    >
                                        {msg.type === "text" && (
                                            <p>{msg.content}</p>
                                        )}

                                        {msg.type === "images" && (
                                            <div className="grid grid-cols-2 gap-2">
                                                {msg.content.map(
                                                    (imgData, idx) => (
                                                        <img
                                                            key={idx}
                                                            src={imgData.img}
                                                            alt={`Image ${idx}`}
                                                            className="w-full h-24 object-cover rounded-lg"
                                                        />
                                                    )
                                                )}
                                            </div>
                                        )}
                                        <span className="text-xs text-gray-300 block mt-2">
                                            {msg.time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-darkSlate flex border-t border-t-background items-center">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Write message..."
                                className="flex-1 p-2 rounded-lg bg-background text-gray-300"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="ml-4 bg-yellow-500 p-2 rounded-full"
                            >
                                <IoIosSend />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MassagePage;
