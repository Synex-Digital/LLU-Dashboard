import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import clsx from "clsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import Cookies from "js-cookie";
import defaultImg from "../assets/image/default-pp.jpg";
import typingIcon from "../assets/icon/typing-icon.svg";

const MessagePage = ({ socket }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const token = Cookies.get("llu-token");
    const localValue = localStorage.getItem("user");
    const loginUser = localValue ? JSON.parse(localValue) : null;
    const login_user_id = loginUser.userWithoutEmail.user_id;

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
    const [message, setMessage] = useState("");
    const [typingStatus, setTypingStatus] = useState("");
    const [roomId, setRoomId] = useState("");
    const [chatId, setChatId] = useState("");

    useEffect(() => {
        socket.emit("connect_user", {
            token: token,
        });

        const handleBeforeUnload = () => {
            socket.emit("disconnect_user", { token: token });
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            socket.emit("disconnect_user", { token: token });

            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [socket, token]);

    // useEffect(() => {
    //     async function apiCall() {
    //         const today = new Date();

    //         const fiveDaysAgo = new Date(today);
    //         fiveDaysAgo.setDate(today.getDate() - 5);

    //         const oneDayAfter = new Date(today);
    //         oneDayAfter.setDate(today.getDate() + 1);

    //         const startDate = fiveDaysAgo.toISOString().split("T")[0];
    //         const endDate = oneDayAfter.toISOString().split("T")[0];

    //         try {
    //             let response = await axios.get(
    //                 `${baseUrl}/api/user/chats/${roomId}?start_time=${startDate}&end_time=${endDate}`,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                         Accept: "application/json",
    //                     },
    //                 }
    //             );

    //             console.log("new message", response.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     apiCall();
    // }, []);

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

                setUsersMessage(response.data.data.chats);
                setUsersUnreadMessage(response.data.data.unread_chats);
            } catch (error) {
                console.log(error);
            }
        }
        apiCall();
    }, []);

    useEffect(() => {
        socket.on("stop_typing", (data) => {
            setTypingStatus(data.message);
            console.log("stop_typing", data.message);
        });
        socket.on("typing", (data) => {
            setTypingStatus(data.message);
            console.log("typing", data.message);
        });
        socket.on("validation", (data) => {
            console.log("validation", data);
        });
        socket.on("status", (data) => console.log("status", data));

        socket.on("send_message", (data) => console.log("send_message", data));

        socket.on("receive_message", (data) => {
            const newMessage = {
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                }),
                content: data.message_content || "",
                sender: "received",
                type: "text",
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            // console.log(data.message_content);
        });

        return () => {
            socket.off("typing");
            socket.off("connect_user");
            socket.off("join_chat");
            socket.off("status");
            socket.off("receive_message");
        };
    }, [socket, token]);

    const handleSendMessage = () => {
        const trMeg = message.trim();
        if (!trMeg) return;
        const user_id = loginUser.userWithoutEmail.user_id;
        socket.emit("send_message", {
            token: token,
            room_id: roomId,
            friend_user_id: 19,
            user_id: user_id,
            chat_id: chatId,
            content: trMeg,
            time: new Date().toISOString(),
        });
        setMessage("");
    };

    let typingTimeout;

    const handleOnchange = (e) => {
        setMessage(e.target.value);

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        let user_id = loginUser.userWithoutEmail.user_id;

        socket.emit("typing", {
            room_id: roomId,
            user_id: user_id,
        });

        typingTimeout = setTimeout(() => {
            socket.emit("stop_typing", {
                room_id: roomId,
                user_id: user_id,
            });
        }, 5000);
    };

    const handleUser = (item) => {
        console.log(item);

        socket.emit("join_chat", {
            token: token,
            friend_user_id: item.friend_user_id,
        });

        setRoomId(item.room_id);
        setChatId(item.chat_id);
        setUserClick((prev) => !prev);
        async function apiCall() {
            const today = new Date();

            const fiveDaysAgo = new Date(today);
            fiveDaysAgo.setDate(today.getDate() - 5);

            const oneDayAfter = new Date(today);
            oneDayAfter.setDate(today.getDate() + 1);

            const startDate = fiveDaysAgo.toISOString().split("T")[0];
            const endDate = oneDayAfter.toISOString().split("T")[0];

            try {
                let response = await axios.get(
                    `${baseUrl}/api/user/chats/${item.room_id}?start_time=${startDate}&end_time=${endDate}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );

                console.log("new message", response.data);
            } catch (error) {
                console.log(error);
            }
        }
        apiCall();
    };

    return (
        <section className="-m-5">
            <div className="flex xl:h-[540px]">
                <div
                    className={clsx(
                        `${userClick ? "max-xl:hidden" : "max-xl:block"} bg-darkSlate text-white p-3 xl:w-1/3 w-full overflow-y-auto border-r border-r-background `
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
                        {usersMessage.map(
                            (chat, index) =>
                                chat.friend_user_id !== login_user_id && (
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
                                                    {chat.first_name}{" "}
                                                    {chat.last_name}
                                                </h4>
                                                <span className="text-sm text-darkText">
                                                    {new Date(
                                                        chat.last_message_time
                                                    ).toLocaleTimeString(
                                                        "en-US",
                                                        {
                                                            hour: "numeric",
                                                            minute: "numeric",
                                                            hour12: true,
                                                        }
                                                    )}
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
                                )
                        )}
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
                                <button className="text-gray-400">
                                    <i className="fas fa-ellipsis-v"></i>
                                </button>
                            </div>
                        </div>

                        <div className="p-3 space-y-3 overflow-y-auto">
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
                            {typingStatus == "User started typing" && (
                                <p className="p-3 rounded-lg text-sm whitespace-pre-wrap bg-background w-fit">
                                    <img
                                        src={typingIcon}
                                        className="w-10"
                                        alt="Typing icon"
                                    />
                                </p>
                            )}
                        </div>
                        <div className="p-4 bg-darkSlate flex border-t border-t-background items-center">
                            <input
                                type="text"
                                value={message}
                                onChange={handleOnchange}
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

export default MessagePage;
