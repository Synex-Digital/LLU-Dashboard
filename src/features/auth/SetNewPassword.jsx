import { Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { useState } from "react";
import { validateEmail, validatePassword } from "../../helpers/validation";
import { routes } from "../../routes/Routers";
import { FaArrowLeftLong } from "react-icons/fa6";

const SetNewPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (!hasErrors) {
      console.log(email, password, "Form submitted");
    }
  };

  return (
    <main className="h-screen bg-background font-inter text-white">
      <section className="flex items-center justify-center">
        <div className="my-10 w-1/3">
          <div className="flex items-center">
            <Link
              to={routes.login.path}
              className="text-base font-semibold text-Primary"
            >
              <FaArrowLeftLong />
            </Link>
            <h1 className="w-full text-center text-2xl font-medium">
              Set New Password
            </h1>
          </div>
          <div className="mt-16 flex flex-col gap-y-3">
            <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
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
              <Button title={"Reset Password"} className="mt-5" />
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SetNewPassword;
