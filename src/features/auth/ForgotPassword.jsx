import { Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from "react";
import { validateEmail } from "../../helpers/validation";
import { routes } from "../../routes/Routers";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {
            email: validateEmail(email),
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((error) => error);
        if (!hasErrors) {
            console.log(email, "Form submitted");
        }
    };

    return (
        <main className="bg-background font-inter text-white h-screen">
            <section className="flex items-center justify-center">
                <div className="my-10 w-1/3">
                    <div className="flex items-center ">
                        <Link
                            to={routes.login.path}
                            className=" text-base font-semibold text-Primary"
                        >
                            <FaArrowLeftLong />
                        </Link>
                        <h1 className="text-center text-2xl w-full font-medium">
                            Forgot Password
                        </h1>
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
                                    <p className="text-red-500 text-sm">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <Button title={"Sign Up"} className="mt-5" />
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ForgotPassword;
