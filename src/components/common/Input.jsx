import { useState } from "react";
import Image from "./Image";

import { VscEye, VscEyeClosed } from "react-icons/vsc";
import userIcon from "../../assets/icon/user-icon.svg";
import emailIcon from "../../assets/icon/email-icon.svg";
import passIcon from "../../assets/icon/password-icon.svg";
import clsx from "clsx";

const Input = ({
  onChange,
  placeholder,
  email,
  user,
  password,
  type,
  value,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible((prevState) => !prevState);

  return (
    <div className="mt-2 flex items-center gap-2 rounded-lg bg-[#14121E] pl-3">
      <div className="border-r border-Secondary pr-2">
        {email ? (
          <Image alt={"icon"} src={emailIcon} />
        ) : user ? (
          <Image alt={"icon"} src={userIcon} />
        ) : (
          password && <Image alt={"icon"} src={passIcon} />
        )}
      </div>
      <div className={clsx("relative w-full")}>
        <input
          value={value}
          type={isPasswordVisible ? "text" : type}
          placeholder={placeholder}
          className="w-full bg-transparent p-2 placeholder:text-[#7F7E84]"
          onChange={onChange}
        />
        {isPasswordVisible
          ? type == "password" && (
              <VscEye
                className="absolute right-4 top-1/2 -translate-y-1/2 transform"
                onClick={togglePasswordVisibility}
              />
            )
          : type == "password" && (
              <VscEyeClosed
                className="absolute right-4 top-1/2 -translate-y-1/2 transform"
                onClick={togglePasswordVisibility}
              />
            )}
      </div>
    </div>
  );
};

export default Input;
