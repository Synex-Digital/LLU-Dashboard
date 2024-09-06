import { useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import Button from "../../components/common/Button";

const GetStarted = () => {
  const navigate = useNavigate();
  return (
    <main className="flex h-screen items-center justify-center bg-background font-inter">
      <section>
        <div className="flex flex-col gap-y-5">
          <img alt="Link & Level up logo" src={logo} />
          <Button
            onClick={() => navigate("/auth/signup")}
            className="px-28"
            title={"GET STARTED"}
          />
          <Button
            className="w-full border border-[#B3B1BA] bg-transparent"
            title={"SIGN IN"}
          />
        </div>
      </section>
    </main>
  );
};

export default GetStarted;
