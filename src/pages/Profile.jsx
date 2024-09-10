import React from "react";
import PageHeading from "../components/common/PageHeading";

import profile from "../assets/image/pp.png";
import Image from "../components/common/Image";
import { FaUserGroup } from "react-icons/fa6";
import ProfileCard from "../components/ProfileCard";

const Profile = () => {
  return (
    <section>
      <PageHeading title={"Facilitator"} />
      <div className="mb-5 flex items-center gap-x-60 border-b border-b-darkSlate pb-5">
        <div className="flex items-center gap-6">
          <Image className={"w-24 rounded-full"} src={profile} />
          <div>
            <p className="mt-2.5 text-lg font-medium">Denish Anderson</p>
            <p className="font-medium text-darkText">Facilitator Owner</p>
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
    </section>
  );
};

export default Profile;
