import React from "react";
import Image from "../components/common/Image";
import profile from "../assets/image/pp.png";
import { MdLocationPin } from "react-icons/md";
import Button from "../components/common/Button";

const AthleteRequest = () => {
  return (
    <section>
      <h1 className="mb-8 text-3xl font-semibold">Athlete Request</h1>
      <div className="flex flex-col gap-y-5">
        {Array.from({ length: 10 }).map(() => (
          <div className="flex items-start gap-x-5 rounded-lg bg-darkSlate p-5">
            <Image className={"rounded-full"} src={profile} />
            <div>
              <h2 className="mb-1 text-xl font-medium">Jhony Dep</h2>
              <p className="text-darkText">
                There are many variations of passages of Lorem Ipsum available,
                but the majority...
              </p>
              <p className="mb-5 mt-1 text-sm text-gray-400">
                <MdLocationPin className="inline-block text-xl text-Primary" />
                Green Valley, Hill road, NY
              </p>
              <div className="flex gap-x-5">
                <Button
                  className={
                    "!rounded-full border border-redText bg-transparent !px-5 py-1.5"
                  }
                  title={"Decline"}
                />
                <Button
                  className={
                    "!rounded-full border border-success bg-success !px-5 py-1.5"
                  }
                  title={"Accept"}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AthleteRequest;
