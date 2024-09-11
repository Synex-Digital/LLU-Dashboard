import React from "react";
import PageHeading from "../components/common/PageHeading";
import { CiEdit, CiShare2 } from "react-icons/ci";
import SubPageTitle from "../components/common/SubPageTitle";
import { MdLocationPin, MdOutlineReduceCapacity } from "react-icons/md";
import Button from "../components/common/Button";
import { BiDollar } from "react-icons/bi";
import profile from "../assets/image/pp.png";
import Image from "../components/common/Image";
import { IoIosStar } from "react-icons/io";

const schedule = [
    { day: "Monday", time: "10:00 - 12:00" },
    { day: "Tuesday", time: "10:00 - 12:00" },
    { day: "Wednesday", time: "10:00 - 12:00" },
    { day: "Thursday", time: "10:00 - 12:00" },
    { day: "Friday", time: "10:00 - 12:00" },
    { day: "Saturday", time: "Closed" },
    { day: "Sunday", time: "Closed" },
];

const FacilityView = () => {
    return (
        <section>
            <div className="flex items-center justify-between">
                <PageHeading title={"Ark Indoor"} />
                <div className="flex items-center gap-3">
                    <CiShare2 className="h-10 w-10 rounded-full border border-darkText p-2" />
                    <CiEdit className="h-10 w-10 rounded-full border border-darkText p-2" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-5">
                <div>
                    <SubPageTitle title={"Available Hours"} />
                    <div className=" p-4 bg-gray-900 text-white rounded-lg">
                        <ul className="space-y-2">
                            {schedule.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between"
                                >
                                    <span>{item.day}</span>
                                    <span>{item.time}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4 ">
                        <p className="flex items-center">
                            <span className="text-Primary mr-2 text-xl">
                                <BiDollar />
                            </span>
                            <span>Hourly Rate - $20.00</span>
                        </p>
                        <p className="flex items-center mt-2">
                            <span className="text-Primary mr-2 text-xl">
                                <MdOutlineReduceCapacity />
                            </span>
                            <span>Capacity: 26 Person</span>
                        </p>
                    </div>
                </div>

                <div>
                    <div className=" flex items-center justify-between">
                        <SubPageTitle title={"Address"} />
                        <p className="text-darkText">View on map</p>
                    </div>

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4967.308022344391!2d90.36704350771629!3d23.807506139831705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1725902792584!5m2!1sen!2sbd"
                        width="600"
                        height="300"
                        className="w-full rounded-2xl"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <p className="mt-2 text-sm text-gray-400">
                        <MdLocationPin className="inline-block text-xl text-Primary" />
                        Green Valley, Hill road, NY
                    </p>
                </div>
            </div>
            <SubPageTitle title={"Gallery"} />
            <div className="grid grid-cols-3 gap-3">
                <Image className={"rounded-lg w-full"} src={profile} />
                <Image className={"rounded-lg w-full"} src={profile} />
                <Image className={"rounded-lg w-full"} src={profile} />
                <Image className={"rounded-lg w-full"} src={profile} />
                <Image className={"rounded-lg w-full"} src={profile} />
                <Image className={"rounded-lg w-full"} src={profile} />
            </div>
            <h2 className="mb-3 mt-8 text-xl font-medium">
                Reviews <span className="text-Primary">(210)</span>
            </h2>
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-x-3">
                    <Image className={"w-16 rounded-full"} src={profile} />
                    <p>Jhony Deep</p>
                </div>
                <p className="text-darkText">2 month ago</p>
            </div>
            <p className="text-darkText">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, variations of passages of Lorem Ipsum
                available, but the majority have suffered alteration in some
                form, by injected humour,
            </p>
            <div className="flex items-center gap-x-0.5">
                <IoIosStar className="text-Primary" />
                <IoIosStar className="text-Primary" />
                <IoIosStar className="text-Primary" />
                <IoIosStar className="text-Primary" />
                <IoIosStar className="mr-2 text-Primary" />
                <span>5.00</span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
                <Image className={"w-full rounded-lg"} src={profile} />
                <Image className={"w-full rounded-lg"} src={profile} />
                <Image className={"w-full rounded-lg"} src={profile} />
            </div>
            <Button
                className={"mt-5 w-full bg-darkSlate"}
                title={"Show More"}
            />
        </section>
    );
};

export default FacilityView;
