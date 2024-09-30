import React, { useEffect, useState } from "react";
import PageHeading from "../components/common/PageHeading";
import { FiPlus } from "react-icons/fi";
import Image from "../components/common/Image";
import profile from "../assets/image/pp.png";
import { IoIosTimer } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa6";
import Button from "../components/common/Button";
import CreatePost from "../components/CreatePost";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routers";
import axios from "axios";
import Cookies from "js-cookie";
import defaultImg from "../assets/image/default-pp.jpg";

const Community = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const token = Cookies.get("llu-token");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showComment, setShowComment] = useState(false);
    const [showCommentId, setShowCommentId] = useState("");
    const [getComments, setGetComments] = useState([]);
    const [values, setValues] = useState("");
    const [postId, setPostId] = useState("");
    const [createPost, setCreatePost] = useState(true);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    console.log(getComments);

    async function apiCall() {
        try {
            let response = await axios.get(
                `${baseUrl}/api/user/posts?page=1&limit=10`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );
            setPosts(response.data.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        apiCall();
    }, [createPost]);

    useEffect(() => {
        async function apiCall() {
            try {
                let response = await axios.get(
                    `${baseUrl}/api/user/posts/${postId}?page=1&limit=10`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );
                setGetComments(response.data.data.comments);
            } catch (error) {
                console.log(error);
            }
        }
        apiCall();
    }, [postId]);

    function formatDateTime(isoString) {
        const date = new Date(isoString);

        const hours = String(date.getUTCHours()).padStart(2, "0"); // Get hours in 24-hour format
        const minutes = String(date.getUTCMinutes()).padStart(2, "0"); // Get minutes
        const year = date.getUTCFullYear(); // Get year
        const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Get month (0-based)
        const day = String(date.getUTCDate()).padStart(2, "0"); // Get day

        return `${hours}:${minutes} ${year}-${month}-${day}`; // Format: "21:46 2024-09-29"
    }

    const openModal = (image) => {
        setSelectedImage(image);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedImage(null);
    };

    const toggleComments = () => {
        setCreatePost((prevState) => !prevState);
    };

    const handleMag = async (item) => {
        navigate(routes.userProfile.path, {
            state: { id: item.user_id },
        });
    };

    let handleComment = async (item) => {
        const getCurrentTime = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, "0");
            const day = String(now.getDate()).padStart(2, "0");
            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            const seconds = String(now.getSeconds()).padStart(2, "0");

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        };

        let data = {
            content: values,
            time: getCurrentTime(),
        };

        try {
            let response = await axios.post(
                `${baseUrl}/api/user/comment/${item.post_id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );
            console.log(response.data);
            setPostId(item.post_id);
            setValues("");
        } catch (error) {
            console.log(error);
        }
    };

    let handleShowComment = async (item) => {
        if (showCommentId === item.post_id) {
            setShowCommentId("");
            setShowComment(false);
        } else {
            setShowCommentId(item.post_id);
            setShowComment(true);
        }
        try {
            let response = await axios.get(
                `${baseUrl}/api/user/posts/${item.post_id}?page=1&limit=10`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );
            setGetComments(response.data.data.comments);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLike = async (post) => {
        const updatedPosts = posts.map((item) => {
            if (item.post_id === post.post_id) {
                const isLiked = item.isLiked;

                if (!isLiked) {
                    axios.get(`${baseUrl}/api/user/like/${post.post_id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    });
                    return {
                        ...item,
                        isLiked: true,
                        no_of_likes: item.no_of_likes + 1,
                    };
                } else {
                    axios.get(
                        `${baseUrl}/api/user/remove_like/${post.post_id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                Accept: "application/json",
                            },
                        }
                    );
                    return {
                        ...item,
                        isLiked: false,
                        no_of_likes: item.no_of_likes - 1,
                    };
                }
            }
            return item;
        });

        setPosts(updatedPosts);
    };

    const handleCommentLike = async (post) => {
        console.log(post);

        const updatedCom = getComments.map((item) => {
            if (item.comment_id === post.comment_id) {
                const isLiked = item.isLiked;

                if (!isLiked) {
                    axios.get(
                        `${baseUrl}/api/user/like_comment/${post.comment_id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                Accept: "application/json",
                            },
                        }
                    );
                    return {
                        ...item,
                        isLiked: true,
                        no_of_likes: item.no_of_likes + 1,
                    };
                } else {
                    // axios.get(
                    //     `${baseUrl}/api/user/remove_like/${post.post_id}`,
                    //     {
                    //         headers: {
                    //             Authorization: `Bearer ${token}`,
                    //             Accept: "application/json",
                    //         },
                    //     }
                    // );
                    // return {
                    //     ...item,
                    //     isLiked: false,
                    //     no_of_likes: item.no_of_likes - 1,
                    // };
                }
            }
            return item;
        });

        setGetComments(updatedCom);
    };

    return (
        <>
            {createPost ? (
                <section className="relative">
                    <PageHeading title={"Community"} />
                    {!showComment && (
                        <FiPlus
                            onClick={() => setCreatePost(!createPost)}
                            className="xl:w-12 xl:h-12 lg:w-10 lg:h-10 w-10 h-10 lg:bottom-8 bottom-20 right-5 cursor-pointer fixed bg-Primary rounded-full p-2"
                        />
                    )}
                    <div className="grid gap-y-3">
                        {posts
                            .sort((a, b) => new Date(b.time) - new Date(a.time))
                            .map((item, index) => (
                                <div key={index}>
                                    <div className="bg-darkSlate p-5 rounded-lg">
                                        <div className="flex gap-x-3 mb-5 ">
                                            <Image
                                                src={
                                                    item?.profile_picture
                                                        ? item?.profile_picture
                                                        : item?.img ||
                                                          defaultImg
                                                }
                                                className={
                                                    "w-16 h-16 rounded-full cursor-pointer"
                                                }
                                                onClick={() => handleMag(item)}
                                            />
                                            <div>
                                                <h3
                                                    onClick={() =>
                                                        handleMag(item)
                                                    }
                                                    className="text-lg cursor-pointer capitalize"
                                                >
                                                    {item.first_name}{" "}
                                                    {item.last_name}
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
                                            {item.post_images.map(
                                                (item, index) => {
                                                    if (index === 0) {
                                                        return (
                                                            <img
                                                                key={index}
                                                                src={item}
                                                                alt={`Image ${index}`}
                                                                className="w-full h-auto object-cover rounded-lg cursor-pointer col-span-2 row-span-2"
                                                                onClick={() =>
                                                                    openModal(
                                                                        item
                                                                    )
                                                                }
                                                            />
                                                        );
                                                    } else if (
                                                        index === 1 ||
                                                        index === 2
                                                    ) {
                                                        return (
                                                            <img
                                                                key={index}
                                                                src={item}
                                                                alt={`Image ${index}`}
                                                                className="w-full h-auto object-cover rounded-lg cursor-pointer"
                                                                onClick={() =>
                                                                    openModal(
                                                                        item
                                                                    )
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
                                                                onClick={() =>
                                                                    openModal(
                                                                        item
                                                                    )
                                                                }
                                                            />
                                                        );
                                                    }
                                                }
                                            )}
                                        </div>

                                        <p>{item.content}</p>
                                        {/* <p className="text-Secondary mt-1">
                                        #training #game
                                    </p> */}

                                        <div className="flex items-center gap-x-10 mt-3 border-t border-t-darkText pt-3">
                                            <div
                                                onClick={() => handleLike(item)}
                                                className="flex items-center gap-x-2 cursor-pointer"
                                            >
                                                <AiFillLike className="text-Primary text-2xl" />{" "}
                                                <span>{item.no_of_likes}</span>
                                            </div>
                                            <div
                                                onClick={() =>
                                                    handleShowComment(item)
                                                }
                                                className="flex items-center gap-x-2 cursor-pointer"
                                            >
                                                <FaRegComments className="text-Primary text-2xl" />{" "}
                                                <span>
                                                    {item.no_of_comments}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`transition-all duration-1000 ease-in-out overflow-hidden ${
                                            showCommentId == item.post_id
                                                ? "max-h-[1000px] opacity-100"
                                                : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        <div className="space-y-3 mt-3">
                                            {getComments?.map((gitem) => (
                                                <div className=" p-4 rounded-lg">
                                                    <div className="flex gap-x-3">
                                                        <Image
                                                            src={profile}
                                                            className="w-12 h-12 rounded-full"
                                                        />
                                                        <div>
                                                            <div className="flex items-center gap-x-3">
                                                                <h3 className="text-lg capitalize cursor-pointer">
                                                                    {
                                                                        gitem.first_name
                                                                    }{" "}
                                                                    {
                                                                        gitem.last_name
                                                                    }
                                                                </h3>
                                                                <time className="text-darkText flex items-center">
                                                                    <IoIosTimer className="text-white text-sm mr-2" />
                                                                    {formatDateTime(
                                                                        gitem.time
                                                                    )}
                                                                </time>
                                                            </div>
                                                            <p className="mt-2">
                                                                {gitem.content}
                                                            </p>
                                                            <div className="flex items-center gap-x-5 mt-3 text-gray-400">
                                                                <div
                                                                    className="flex items-center gap-x-1 cursor-pointer"
                                                                    onClick={() =>
                                                                        handleCommentLike(
                                                                            gitem
                                                                        )
                                                                    }
                                                                >
                                                                    <AiFillLike className="text-Primary text-xl" />
                                                                    <span>
                                                                        {
                                                                            gitem.no_of_likes
                                                                        }
                                                                    </span>
                                                                </div>
                                                                {/* <div className="cursor-pointer">
                                                                    Reply
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="bg-darkSlate rounded-t-lg flex gap-x-3 items-center p-2 ">
                                                <Image
                                                    src={profile}
                                                    className={
                                                        "rounded-full w-14 h-14"
                                                    }
                                                />
                                                <input
                                                    placeholder="Leave your thoughts..."
                                                    className="bg-background rounded-lg w-full p-2"
                                                    value={values}
                                                    onChange={(e) =>
                                                        setValues(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <Button
                                                    title={"Send"}
                                                    onClick={() =>
                                                        handleComment(item)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {isOpen && (
                                        <div className="fixed inset-0 flex items-center justify-center bg-[#00000040] bg-opacity-50 z-50">
                                            <div className="relative xl:w-1/3 w-3/4">
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
                                </div>
                            ))}
                    </div>
                </section>
            ) : (
                <CreatePost toggleComments={toggleComments} />
            )}
        </>
    );
};

export default Community;
