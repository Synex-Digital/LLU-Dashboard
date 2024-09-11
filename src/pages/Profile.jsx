import React from "react";
import PageHeading from "../components/common/PageHeading";

import profile from "../assets/image/pp.png";
import Image from "../components/common/Image";
import ProfileCard from "../components/ProfileCard";
import SubPageTitle from "../components/common/SubPageTitle";
import { CiCirclePlus, CiEdit, CiShare2 } from "react-icons/ci";
import { FaAngleRight } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { IoIosStar, IoMdStarOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routers";

const Profile = () => {
    const navigate = useNavigate();
    return (
        <section>
            <div className="flex items-center justify-between">
                <PageHeading title={"Facilitator"} />
                <div className="flex items-center gap-3">
                    <CiShare2 className="h-10 w-10 rounded-full border border-darkText p-2" />
                    <CiEdit
                        onClick={() => navigate(routes.editDetails.path)}
                        className="h-10 w-10 cursor-pointer rounded-full border border-darkText p-2"
                    />
                </div>
            </div>
            <div className="mb-5 flex items-center gap-x-60 border-b border-b-darkSlate pb-5">
                <div className="flex items-center gap-6">
                    <Image className={"w-24 rounded-full"} src={profile} />
                    <div>
                        <p className="mt-2.5 text-lg font-medium">
                            Denish Anderson
                        </p>
                        <p className="font-medium text-darkText">
                            Facilitator Owner
                        </p>
                    </div>
                </div>
                <div>
                    <p className="mb-2 mt-5 font-medium">Profile Completion</p>
                    <input className="w-64" value={"80"} type="range" />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
                <ProfileCard title={"Established in 2004"} />
                <ProfileCard title={"ISO Certified"} />
                <ProfileCard title={"23+ Professionals"} />
                <ProfileCard title={"Eco Friendly Sports Hub"} />
            </div>
            <div className="flex items-center justify-between text-xl font-medium">
                <SubPageTitle title={"Facility List"} />
                <CiCirclePlus className="text-3xl" />
            </div>

            <div className="grid grid-cols-3 gap-3">
                <div
                    onClick={() => navigate(routes.facilityView.path)}
                    className="flex items-center justify-between rounded-lg bg-darkSlate p-3 cursor-pointer"
                >
                    <p>Ark Indoor Stadium</p>
                    <FaAngleRight />
                </div>
                <div className="flex items-center justify-between rounded-lg bg-darkSlate p-3">
                    <p>Sports Club</p>
                    <FaAngleRight />
                </div>
                <div className="flex items-center justify-between rounded-lg bg-darkSlate p-3">
                    <p>Basketball Indoor Club</p>
                    <FaAngleRight />
                </div>
            </div>
            <div className="flex items-center justify-between text-xl font-medium">
                <SubPageTitle title={"Add/Sync Trainer"} />
                <CiCirclePlus className="text-3xl" />
            </div>
            <div className="flex w-fit gap-x-3 rounded-lg bg-darkSlate p-3">
                <Image className={"w-36 rounded-lg"} src={profile} />
                <div>
                    <div className="flex items-center gap-x-2 rounded-full bg-background px-3 py-1 text-darkText">
                        <MdVerified className="text-lg text-Primary" />
                        Professional trainer
                    </div>
                    <h2 className="mt-2 font-medium">Jhony Deep</h2>
                    <p className="mb-4 mt-2 text-darkText">Trainer</p>
                    <p className="flex items-center gap-x-1 text-sm text-darkText">
                        <IoMdStarOutline className="text-xl text-Primary" />
                        <span>4.8 </span>
                        <span> (100 Reviews)</span>
                    </p>
                </div>
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
        </section>
    );
};

export default Profile;
