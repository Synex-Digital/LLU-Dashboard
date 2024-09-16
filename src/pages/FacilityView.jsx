import React from "react";
import PageHeading from "../components/common/PageHeading";
import { CiEdit } from "react-icons/ci";
import SubPageTitle from "../components/common/SubPageTitle";
import { MdLocationPin, MdOutlineReduceCapacity } from "react-icons/md";
import Button from "../components/common/Button";
import { BiDollar } from "react-icons/bi";
import profile from "../assets/image/pp.png";
import Image from "../components/common/Image";
import { IoIosStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routers";

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
    const navigate = useNavigate();
    return (
        <section>
            <div className="flex justify-between">
                <PageHeading className={"max-xl:!mb-0"} title={"Ark Indoor"} />
                <CiEdit
                    onClick={() => navigate(routes.editArkIndoor.path)}
                    className="xl:h-10 xl:w-10 w-7 h-7 cursor-pointer rounded-full border border-darkText xl:p-2 p-1"
                />
            </div>

            <div className="grid sm:grid-cols-2 gap-x-5">
                <div>
                    <SubPageTitle title={"Available Hours"} />
                    <div className="rounded-lg bg-gray-900 p-4 text-white">
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
                    <div className="mt-4">
                        <p className="flex items-center">
                            <span className="mr-2 text-xl text-Primary">
                                <BiDollar />
                            </span>
                            <span>Hourly Rate - $20.00</span>
                        </p>
                        <p className="mt-2 flex items-center">
                            <span className="mr-2 text-xl text-Primary">
                                <MdOutlineReduceCapacity />
                            </span>
                            <span>Capacity: 26 Person</span>
                        </p>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
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
            <div className="grid sm:grid-cols-3 grid-cols-2 gap-3">
                <Image className={"w-full rounded-lg"} src={profile} />
                <Image className={"w-full rounded-lg"} src={profile} />
                <Image className={"w-full rounded-lg"} src={profile} />
                <Image className={"w-full rounded-lg"} src={profile} />
                <Image className={"w-full rounded-lg"} src={profile} />
                <Image className={"w-full rounded-lg"} src={profile} />
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
