import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { validateEmail, validatePassword } from "../../helpers/validation";
import { routes } from "../../routes/Routers";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { LoadingIcon } from "../../assets/icon";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();
    const notify = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
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

                if (response.data && response.data.accessToken) {
                    Cookies.set("llu-token", response.data.accessToken, {
                        secure: true,
                        sameSite: "Strict",
                        expires: 1 / 96,
                        path: "/",
                    });
                    Cookies.set("ref-token", response.data.refreshToken, {
                        secure: true,
                        sameSite: "Strict",
                        expires: 7,
                        path: "/",
                    });

                    if (response.data.loginStatus) {
                        const { email, ...userWithoutEmail } =
                            response.data.user;

                        const userData = {
                            userWithoutEmail,
                            specializedUserId: response.data.specializedUserId,
                        };
                        localStorage.setItem("user", JSON.stringify(userData));
                        notify("Login successful");
                        navigate(routes.dashboard.path);
                    }
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                notifyError("Login failed");
            }
        }
        setLoading(false);
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
                            {loading ? (
                                <Button
                                    title={<LoadingIcon />}
                                    className="mt-5 !p-1 flex justify-center"
                                />
                            ) : (
                                <Button title={"Login"} className="mt-5" />
                            )}
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
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Login;
