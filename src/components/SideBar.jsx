import React from "react";
import Image from "./common/Image";

import profile from "../assets/image/pp.png";
import appointment from "../assets/icon/appointment.svg";
import helpCenter from "../assets/icon/help-center.svg";
import paymentMethod from "../assets/icon/payment-method.svg";
import setting from "../assets/icon/setting.svg";
import privacyPolicy from "../assets/icon/privacy-policy.svg";
import profileIcon from "../assets/icon/profile-icon.svg";

const SideBar = () => {
    return (
        <aside className="static h-screen w-1/5 bg-darkSlate px-3 py-5">
            <div className="flex flex-col items-center justify-center gap-2">
                <Image className={"w-32 rounded-full"} src={profile} />
                <h2 className="text-center text-xl font-semibold">
                    Tammy Gauthier
                </h2>
            </div>
            <div className="mt-8 flex flex-col gap-y-6">
                <div className="flex cursor-pointer items-center gap-x-4 rounded-lg px-3 py-2 hover:bg-background">
                    <Image src={profileIcon} />
                    <p>Profile</p>
                </div>
                <div className="flex cursor-pointer items-center gap-x-4 rounded-lg px-3 py-2 hover:bg-background">
                    <Image src={appointment} />
                    <p>My Appointment</p>
                </div>
                <div className="flex cursor-pointer items-center gap-x-4 rounded-lg px-3 py-2 hover:bg-background">
                    <Image src={paymentMethod} />
                    <p>Payment Method</p>
                </div>
                <div className="flex cursor-pointer items-center gap-x-4 rounded-lg px-3 py-2 hover:bg-background">
                    <Image src={setting} />
                    <p>Setting</p>
                </div>

                <div className="flex cursor-pointer items-center gap-x-4 rounded-lg px-3 py-2 hover:bg-background">
                    <Image src={helpCenter} />
                    <p>Help Center</p>
                </div>
                <div className="flex cursor-pointer items-center gap-x-4 rounded-lg px-3 py-2 hover:bg-background">
                    <Image src={privacyPolicy} />
                    <p>Privacy Policy</p>
                </div>
            </div>
        </aside>
    );
};

export default SideBar;
