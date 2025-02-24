import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import clsx from "clsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import Cookies from "js-cookie";
import defaultImg from "../assets/image/default-pp.jpg";
import typingIcon from "../assets/icon/typing-icon.svg";
import ScrollableFeed from "react-scrollable-feed";
import { IoImages } from "react-icons/io5";
import socketIO from "socket.io-client";

const MessagePage = () => {
  const socket_url = import.meta.env.SOCKET_URL;
  const socket = socketIO.connect(socket_url);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = Cookies.get("llu-token");
  const localValue = localStorage.getItem("user");
  const loginUser = localValue ? JSON.parse(localValue) : null;
  const login_user_id = loginUser.userWithoutEmail.user_id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [usersMessage, setUsersMessage] = useState([]);
  const [usersUnreadMessage, setUsersUnreadMessage] = useState([]);
  const [userClick, setUserClick] = useState(false);
  const [message, setMessage] = useState("");
  const [typingStatus, setTypingStatus] = useState("");
  const [roomId, setRoomId] = useState("");
  const [chatId, setChatId] = useState("");
  const [friendId, setFriendId] = useState("");

  const uploadImage = (imageFile) => {
    const reader = new FileReader();

    reader.onload = () => {
      const arrayBuffer = reader.result;
      const imageBuffer = new Uint8Array(arrayBuffer);

      socket.emit("send_img", imageBuffer, {
        imageName: imageFile.name,
        chat_id: chatId,
        time: new Date().toISOString(),
      });
      console.log(imageBuffer, imageFile.name);
    };

    reader.readAsArrayBuffer(imageFile);
  };

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
    });
    socket.on("typing", (data) => {
      setTypingStatus(data.message);
    });

    socket.on("validation", (data) => {
      console.log(data);
    });

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
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
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

    const newSentMessage = {
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      content: trMeg,
      sender: "sent",
      type: "text",
    };

    setMessages((prevMessages) => [newSentMessage, ...prevMessages]);
    socket.emit("send_message", {
      token: token,
      room_id: roomId,
      friend_user_id: friendId,
      user_id: user_id,
      chat_id: chatId,
      content: trMeg,
      time: new Date().toISOString(),
    });
    setMessage("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      uploadImage(file);
    }
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleUser = (item) => {
    setNewMessage(item);
    socket.emit("join_chat", {
      token: token,
      friend_user_id: item.friend_user_id,
    });

    setRoomId(item.room_id);
    setChatId(item.chat_id);
    setFriendId(item.friend_user_id);
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
          `${baseUrl}/api/user/chats?start_time=${startDate}&end_time=${endDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        console.log("mge", response);

        const newMessages = response.data.data;
        const formattedMessages = newMessages?.map((msg) => ({
          time: new Date(msg.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          content: msg.content,
          sender: msg.user_id === login_user_id ? "sent" : "received",
          type: "text",
        }));
        setMessages([]);

        setMessages((prevMessages) => [...prevMessages, ...formattedMessages]);
      } catch (error) {
        setMessages([]);
        console.log(error);
      }
    }
    apiCall();
  };

  return (
    <section className="-m-5 xl:border-l border-background">
      <div className="flex xl:h-[90vh]">
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
                          chat.active === 1 ? "bg-green-500" : "bg-gray-500"
                        }`}
                      ></span>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-semibold capitalize">
                          {chat.first_name} {chat.last_name}
                        </h4>
                        <span className="text-sm text-darkText">
                          {new Date(chat.last_message_time).toLocaleTimeString(
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
                src={defaultImg}
                alt="Jane Cooper"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-4">
                <h4 className="font-semibold capitalize">
                  {newMessage.first_name} {newMessage.last_name}
                </h4>
                {newMessage.active === 1 && (
                  <p className="text-sm text-green-500">Active now</p>
                )}
              </div>
              <div className="ml-auto">
                <button className="text-gray-400">
                  <i className="fas fa-ellipsis-v"></i>
                </button>
              </div>
            </div>

            <ScrollableFeed>
              <div className="p-3 space-y-3 overflow-y-auto">
                {messages
                  .slice()
                  .reverse()
                  .map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.sender === "sent" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs ${
                          msg.sender === "sent" ? "bg-Primary" : "bg-background"
                        } p-3 rounded-lg text-sm whitespace-pre-wrap`}
                      >
                        {msg.type === "text" && <p>{msg.content}</p>}

                        {msg.type === "images" && (
                          <div className="grid grid-cols-2 gap-2">
                            {msg.content.map((imgData, idx) => (
                              <img
                                key={idx}
                                src={imgData.img}
                                alt={`Image ${idx}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                            ))}
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
                    <img src={typingIcon} className="w-10" alt="Typing icon" />
                  </p>
                )}
              </div>
            </ScrollableFeed>
            <div className="p-4 bg-darkSlate flex border-t relative border-t-background items-center">
              <label>
                <input onChange={handleFileChange} type="file" hidden />
                <IoImages className="text-xl absolute top-7 right-20 text-Primary cursor-pointer" />
              </label>
              <input
                type="text"
                value={message}
                onChange={handleOnchange}
                onKeyPress={handleKeyPress}
                placeholder="Write message..."
                className="flex-1 p-2 rounded-lg pr-11 bg-background text-gray-300"
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
