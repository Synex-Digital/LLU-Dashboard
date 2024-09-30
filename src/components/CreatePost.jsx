import React, { useState } from "react";
import Image from "./common/Image";
import profile from "../assets/image/pp.png";
import Button from "./common/Button";
import { RxCross2 } from "react-icons/rx";
import { IoImages } from "react-icons/io5";
import axios from "axios";
import Cookies from "js-cookie";

const CreatePost = ({ toggleComments }) => {
    const [values, setValues] = useState("");
    const [images, setImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const token = Cookies.get("llu-token");
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const handleFile = (e) => {
        const files = Array.from(e.target.files);
        const newImageFiles = [...imageFiles, ...files];

        const imageUrls = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...imageUrls]);
        setImageFiles(newImageFiles);
    };

    const handleClick = async () => {
        const formData = new FormData();

        formData.append("content", values);

        imageFiles.forEach((file) => {
            formData.append("img", file);
        });

        try {
            const response = await axios.post(
                `${baseUrl}/api/user/add_post`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.message) {
                alert("New post create");
                toggleComments();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-3">
                    <RxCross2 className="text-2xl cursor-pointer" />
                    <Image className={"rounded-full"} src={profile} />
                    <p>Create post</p>
                </div>
            </div>
            <textarea
                onChange={(e) => setValues(e.target.value)}
                className="bg-transparent mt-5 p-2 w-full focus:outline-none resize-none overflow-hidden"
                placeholder="Share your thoughts..."
                rows="1"
                onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                }}
            ></textarea>

            <div className="grid grid-cols-4 gap-3 my-5">
                {images.map((imageSrc, index) => (
                    <img
                        key={index}
                        className=" w-48"
                        src={imageSrc}
                        alt={`Preview ${index}`}
                    />
                ))}
            </div>
            <label>
                <input onChange={handleFile} type="file" hidden />
                <IoImages className="float-right mt-3 text-3xl text-Primary cursor-pointer" />
            </label>
            <Button
                onClick={handleClick}
                className={"px-5 w-1/5"}
                title={"Post"}
            />
        </section>
    );
};

export default CreatePost;
