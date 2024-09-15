import React, { useState } from "react";
import Image from "./common/Image";
import profile from "../assets/image/pp.png";
import Button from "./common/Button";
import { RxCross2 } from "react-icons/rx";
import { IoImages } from "react-icons/io5";

const CreatePost = ({ toggleComments }) => {
    const [images, setImages] = useState([]);

    const handleFile = (e) => {
        const files = Array.from(e.target.files);
        const imagePromises = files.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = (event) => {
                    resolve(event.target.result);
                };

                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });
        Promise.all(imagePromises)
            .then((imageUrls) => {
                setImages((prevImages) => [...prevImages, ...imageUrls]);
            })
            .catch((error) => console.error("Error loading images", error));
    };

    return (
        <section>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-3">
                    <RxCross2
                        onClick={toggleComments}
                        className="text-2xl cursor-pointer"
                    />
                    <Image className={"rounded-full"} src={profile} />
                    <p>Create post</p>
                </div>
            </div>
            <textarea
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
            <Button className={"px-5 w-1/5"} title={"Post"} />
        </section>
    );
};

export default CreatePost;
