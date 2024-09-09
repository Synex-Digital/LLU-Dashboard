import React from "react";
import profile from "../assets/image/pp.png";
import Image from "../components/common/Image";
import Button from "../components/common/Button";
import { AiFillMessage } from "react-icons/ai";
import { IoIosCall, IoIosTime } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";

const SessionDetails = () => {
  return (
    <section>
      <h1 className="mb-8 text-3xl font-semibold">Session Details</h1>

      <div className="flex gap-x-3.5 border-b border-b-darkSlate pb-6">
        <div className="grid place-items-center rounded-xl bg-darkSlate px-3 py-2 text-center">
          20
          <br />
          May
        </div>
        <div>
          <h2 className="text-lg font-medium">Football Goal Keeping Session</h2>
          <p className="text-darkText">
            There are many variations of passages of Lorem Ipsum available, but
            the majority...
          </p>
          <p className="text-redText">Session Ends In: 49:25 minute</p>
        </div>
      </div>

      <h2 className="py-6 text-xl font-medium text-Primary">Session Book By</h2>
      <div className="flex gap-x-16">
        <div className="border-r border-r-darkSlate pr-16">
          <div className="mt-5 flex items-center gap-6">
            <Image className={"w-24 rounded-full"} src={profile} />
            <div>
              <p className="font-medium text-darkText">Athlete</p>
              <p className="mt-2.5 text-lg font-medium">Mickael whisper</p>
            </div>
          </div>
          <div className="mt-5 flex gap-x-7">
            <button className="flex items-center gap-2 rounded-lg bg-darkSlate px-6 py-2 text-darkText">
              <AiFillMessage className="text-Primary" /> Message
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-darkSlate px-6 py-2 text-darkText">
              <IoIosCall className="text-lg text-Primary" /> Message
            </button>
          </div>
        </div>
        <div>
          <p className="text-lg font-medium">Details</p>
          <p className="mb-1 mt-4 text-sm text-gray-400">
            <MdLocationPin className="inline-block text-xl text-Primary" /> Ark
            Sports Club, Herison Road, NY, 71005363
          </p>
          <div className="inline-block text-sm text-gray-400">
            <FaRegCalendarAlt className="inline-block text-lg text-Primary" />
            <p className="ml-1 mr-3 inline-block">20th May, 2024</p>
            <IoIosTime className="inline-block text-lg text-Primary" />
            <p className="ml-1 inline-block">05:00 PM - 06:00 PM</p>
          </div>
        </div>
      </div>
      <h2 className="mt-20 text-xl font-medium text-Primary">
        Session Trainer
      </h2>
      <div className="mt-5 flex items-center gap-6">
        <Image className={"w-24 rounded-full"} src={profile} />
        <div>
          <p className="font-medium text-darkText">Trainer</p>
          <p className="mt-2.5 text-lg font-medium">Jhony Dep</p>
        </div>
      </div>
    </section>
  );
};

export default SessionDetails;
