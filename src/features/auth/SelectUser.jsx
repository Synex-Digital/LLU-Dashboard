import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../components/common/Image";

import Facilitator from "../../assets/image/facilitator.png";
import Parent from "../../assets/image/parent.png";
import Trainer from "../../assets/image/trainer.png";
import Athlete from "../../assets/image/athlete.png";
import Button from "../../components/common/Button";
import { FaCircleCheck } from "react-icons/fa6";

const SelectUser = () => {
  const [selectedType, setSelectedType] = useState(""); // State to track selected type
  const navigate = useNavigate();

  // Function to handle image click
  const handleSelect = (type) => {
    setSelectedType(type); // Update the selected type
  };

  return (
    <main className="bg-background font-inter text-white">
      <section className="flex items-center justify-center">
        <div className="my-10 w-1/3">
          <h1 className="text-center text-2xl font-medium">Select User Type</h1>
          <div className="text-center text-sm font-medium text-[#B7B6BA]">
            To give you a better experience we need to know your type
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div
              className="relative cursor-pointer text-center"
              onClick={() => handleSelect("Athlete")}
            >
              <Image
                className={clsx(
                  `h-56 w-full rounded-lg bg-[#161421] px-1 pt-12 ${
                    selectedType === "Athlete" ? "bg-Secondary" : ""
                  }`,
                )}
                alt={"Athlete"}
                src={Athlete}
              />
              {selectedType === "Athlete" && (
                <FaCircleCheck className="absolute bottom-6 right-1/2 translate-x-1/2 rounded-full border-2 border-background bg-background text-2xl text-Secondary" />
              )}

              <p className="mt-2 text-xl font-medium">Athlete</p>
            </div>
            <div
              className="relative cursor-pointer text-center"
              onClick={() => handleSelect("Trainer")}
            >
              <Image
                className={clsx(
                  `h-56 w-full rounded-lg bg-[#161421] px-1 pt-12 ${
                    selectedType === "Trainer" ? "bg-Secondary" : ""
                  }`,
                )}
                alt={"Trainer"}
                src={Trainer}
              />
              {selectedType === "Trainer" && (
                <FaCircleCheck className="absolute bottom-6 right-1/2 translate-x-1/2 rounded-full border-2 border-background bg-background text-2xl text-Secondary" />
              )}
              <p className="mt-2 text-xl font-medium">Trainer</p>
            </div>
            <div
              className="relative cursor-pointer text-center"
              onClick={() => handleSelect("Parent")}
            >
              <Image
                className={clsx(
                  `h-56 w-full rounded-lg bg-[#161421] px-1 pt-12 ${
                    selectedType === "Parent" ? "bg-Secondary" : ""
                  }`,
                )}
                alt={"Parent"}
                src={Parent}
              />
              {selectedType === "Parent" && (
                <FaCircleCheck className="absolute bottom-6 right-1/2 translate-x-1/2 rounded-full border-2 border-background bg-background text-2xl text-Secondary" />
              )}
              <p className="mt-2 text-xl font-medium">Parent</p>
            </div>
            <div
              className="relative cursor-pointer text-center"
              onClick={() => handleSelect("Facilitator")}
            >
              <Image
                className={clsx(
                  `h-56 w-full rounded-lg bg-[#161421] px-1 pt-12 ${
                    selectedType === "Facilitator" ? "bg-Secondary" : ""
                  }`,
                )}
                alt={"Facilitator"}
                src={Facilitator}
              />
              {selectedType === "Facilitator" && (
                <FaCircleCheck className="absolute bottom-6 right-1/2 translate-x-1/2 rounded-full border-2 border-background bg-background text-2xl text-Secondary" />
              )}
              <p className="mt-2 text-xl font-medium">Facilitator</p>
            </div>
          </div>
          <Button title={"Next"} className="mt-10 w-full" />
        </div>
      </section>
    </main>
  );
};

export default SelectUser;
