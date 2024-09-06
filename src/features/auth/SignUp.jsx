import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../../helpers/validation";
import { routes } from "../../routes/Routers";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      fullName: validateName(fullName),
      email: validateEmail(email),
      password: validatePassword(password),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (!hasErrors) {
      console.log(fullName, email, password, "Form submitted");
    }
  };

  return (
    <main className="bg-background font-inter text-white">
      <section className="flex items-center justify-center">
        <div className="my-10 w-1/3">
          <h1 className="text-center text-2xl font-medium">
            Create Your Account
          </h1>
          <div className="text-center text-sm font-medium text-[#B7B6BA]">
            Already Have An Account?{" "}
            <Link
              to={routes.login.path}
              className="mt-3 text-base font-semibold text-Primary"
            >
              Log In
            </Link>
          </div>
          <div className="mt-16 flex flex-col gap-y-3">
            <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
              <div>
                <p>Full Name</p>
                <Input
                  type="text"
                  user={true}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={"Enter Your Full Name"}
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>
              <div>
                <p>Email</p>
                <Input
                  email={true}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={"Enter Email Address"}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <p>Password</p>
                <Input
                  password={true}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={"Enter Password"}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
              <Button title={"Sign Up"} className="mt-5" />
            </form>
            <p className="text-sm font-medium">
              By continuing, you agree to LLU’s Terms of Service and Privacy
              Policy
            </p>

            <div>
              <div className="flex items-center py-8">
                <hr className="flex-grow border-gray-700" />
                <span className="px-2 text-sm text-gray-500">or</span>
                <hr className="flex-grow border-gray-700" />
              </div>
              <button className="mb-4 flex w-full items-center justify-center rounded-lg bg-[#2F2F2F] py-2 font-medium text-white">
                <span className="mr-2 text-xl">
                  <FcGoogle />
                </span>{" "}
                Continue with Google
              </button>
              <button className="mb-4 flex w-full items-center justify-center rounded-lg bg-black py-2 font-medium text-white">
                <span className="mr-2 text-xl">
                  <FaApple />
                </span>{" "}
                Continue with Apple
              </button>
              <div className="text-center">
                <button
                  onClick={() => navigate("/")}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Skip For Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
