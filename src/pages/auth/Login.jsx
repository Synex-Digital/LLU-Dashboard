import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { validateEmail, validatePassword } from "../../helpers/validation";
import { routes } from "../../routes/Routers";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();
    const notify = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {
            email: validateEmail(email),
            password: validatePassword(password),
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((error) => error);
        if (!hasErrors) {
            let data = {
                email: email,
                password: password,
            };

            try {
                let response = await axios.post(`${baseUrl}/auth/login`, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log("login", response.data);
                if (response.data && response.data.accessToken) {
                    Cookies.set("llu-token", response.data.accessToken, {
                        secure: true,
                        sameSite: "Strict",
                        expires: 1 / 96,
                    });
                    Cookies.set("ref-token", response.data.refreshToken, {
                        secure: true,
                        sameSite: "Strict",
                        expires: 7,
                    });

                    if (response.data.loginStatus) {
                        const { email, ...userWithoutEmail } =
                            response.data.user;
                        localStorage.setItem(
                            "user",
                            JSON.stringify(userWithoutEmail)
                        );
                        notify("Login successful");
                        navigate(routes.dashboard.path);
                    }
                }
            } catch (error) {
                notifyError("Login failed");
            }
        }
    };

    return (
        <main className="bg-background font-inter text-white">
            <section className="flex items-center justify-center">
                <div className="my-10 xl:w-1/3 px-2">
                    <h1 className="text-center text-2xl font-medium">Login</h1>
                    <div className="text-center text-sm font-medium text-[#B7B6BA]">
                        Do Not Have Account Yet?{" "}
                        <Link
                            to={routes.signup.path}
                            className="mt-3 text-base font-semibold text-Primary"
                        >
                            Sign Up
                        </Link>
                    </div>
                    <div className="mt-16 flex flex-col gap-y-3">
                        <form
                            className="flex flex-col gap-y-3"
                            onSubmit={handleSubmit}
                        >
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
                                    <p className="text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div>
                                <p>Password</p>
                                <Input
                                    password={true}
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder={"Enter Password"}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                            <Button title={"Sign Up"} className="mt-5" />
                        </form>
                        <div>
                            <button
                                onClick={() =>
                                    navigate(routes.forgotPassword.path)
                                }
                                className="float-right text-sm text-blue-500 hover:underline"
                            >
                                Forgot Password
                            </button>
                        </div>
                        <p className="text-sm font-medium">
                            By continuing, you agree to LLU’s Terms of Service
                            and Privacy Policy
                        </p>

                        <div>
                            <div className="flex items-center py-8">
                                <hr className="flex-grow border-gray-700" />
                                <span className="px-2 text-sm text-gray-500">
                                    or
                                </span>
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
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Login;
