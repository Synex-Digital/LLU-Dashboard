import React, { useEffect, useState } from "react";
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
import axios from "axios";
import Cookies from "js-cookie";
import { FaUserGroup } from "react-icons/fa6";
import defaultImage from "../assets/image/default-pp.jpg"

const Profile = () => {
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const token = Cookies.get("llu-token");
    const [basicInfo, setBasicInfo] = useState("");
    const [details, setDetails] = useState("");
    const [facilityList, setFacilityList] = useState([]);
    const [trainers, setTrainers] = useState([]);

    async function apiCall() {
        try {
            const data = {
                latitude: 40.7128,
                longitude: -73.906,
            };
            let response = await axios.post(
                `${baseUrl}/api/facilitator/profile?page=1&limit=5`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );
            setBasicInfo(response.data.data.basicInfo.user);
            setDetails(response.data.data.basicInfo.details);
            setFacilityList(response.data.data.facilityList);
            setTrainers(response.data.data.trainers);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        apiCall();
    }, []);

    const handleFacilityView = async (item) => {
        try {
            let response = await axios.get(
                `${baseUrl}/api/facilitator/facility/${item.facility_id}?page=1&limit=5`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );
            console.log(response.data.data);
            navigate(routes.facilityView.path, {
                state: { facility: response.data.data },
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <section>
            <div className="flex justify-between">
                <PageHeading className={"mb-0"} title={"Facilitator"} />
                <CiEdit
                    onClick={() => navigate(routes.editDetails.path)}
                    className="xl:h-10 xl:w-10 w-7 h-7 cursor-pointer rounded-full border border-darkText xl:p-2 p-1"
                />
            </div>
            <div className="mb-5 sm:flex items-center gap-x-60 border-b border-b-darkSlate pb-5">
                <div className="flex items-center gap-6">
                    <Image
                        className={"w-24 rounded-full"}
                        src={
                            basicInfo?.profile_picture
                                ? basicInfo?.profile_picture
                                : defaultImage
                        }
                    />
                    <div>
                        <p className="mt-2.5 text-lg font-medium capitalize">
                            {basicInfo?.first_name || "Facilitator"}{" "}
                            {basicInfo?.last_name}
                        </p>
                        <p className="font-medium text-darkText">
                            Facilitator Owner
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-lg bg-darkSlate p-5 max-sm:flex max-sm:flex-col max-sm:items-center">
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-background">
                        <FaUserGroup />
                    </div>
                    <p>Established in {details.established_in}</p>
                </div>
                {details.iso_certified == 1 && (
                    <div className="rounded-lg bg-darkSlate p-5 max-sm:flex max-sm:flex-col max-sm:items-center">
                        <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-background">
                            <FaUserGroup />
                        </div>
                        <p>ISO Certified</p>
                    </div>
                )}
                <div className="rounded-lg bg-darkSlate p-5 max-sm:flex max-sm:flex-col max-sm:items-center">
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-background">
                        <FaUserGroup />
                    </div>
                    <p>{details.no_of_professionals}+ Professionals</p>
                </div>
            </div>
            <div className="flex mb-3 mt-8 items-center justify-between text-xl font-medium">
                <SubPageTitle
                    className={"!mb-0 !mt-0"}
                    title={"Facility List"}
                />
                <CiCirclePlus
                    onClick={() => navigate(routes.addFacility.path)}
                    className="cursor-pointer text-3xl"
                />
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
                {facilityList.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleFacilityView(item)}
                        className="flex cursor-pointer items-center justify-between rounded-lg bg-darkSlate p-3"
                    >
                        <p>{item.name}</p>
                        <FaAngleRight />
                    </div>
                ))}
            </div>
            <div className="flex mb-3 mt-8 items-center justify-between text-xl font-medium">
                <SubPageTitle
                    className={"!mb-0 !mt-0"}
                    title={"Add/Sync Trainer"}
                />
                <CiCirclePlus
                    className="text-3xl cursor-pointer"
                    onClick={() => navigate(routes.syncTrainer.path)}
                />
            </div>
            <div className="flex gap-x-3">
                {trainers.map((item, index) => (
                    <div
                        key={index}
                        className="flex w-fit max-sm:w-full gap-x-3 rounded-lg bg-darkSlate p-3"
                    >
                        <Image className={"w-36 rounded-lg"} src={profile} />
                        <div>
                            <div className="flex items-center gap-x-2 rounded-full bg-background px-3 py-1 text-darkText">
                                <MdVerified className="text-lg text-Primary" />
                                <span className="capitalize">
                                    {item.specialization_level}
                                </span>{" "}
                                trainer
                            </div>
                            <h2 className="mt-2 font-medium">Jhony Deep</h2>
                            <p className="mb-4 mt-2 text-darkText">Trainer</p>
                            <p className="flex items-center gap-x-1 text-sm text-darkText">
                                <IoMdStarOutline className="text-xl text-Primary" />
                                <span>
                                    {item.avg_rating
                                        ? item.avg_rating.toFixed(1)
                                        : "N/A"}
                                </span>
                                <span> (100 Reviews)</span>
                            </p>
                        </div>
                    </div>
                ))}
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
