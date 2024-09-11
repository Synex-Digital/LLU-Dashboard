import React from "react";
import PageHeading from "../components/common/PageHeading";
import { FaAngleRight } from "react-icons/fa";
import { routes } from "../routes/Routers";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Modal from "react-modal";
import { RxCrossCircled } from "react-icons/rx";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
    },
};

const Settings = () => {
    let navigate = useNavigate();
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#f00";
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <section>
            <PageHeading title={"Settings"} />
            <div className="grid gap-3">
                <div
                    onClick={() => navigate(routes.changeEmailAddress.path)}
                    className="flex cursor-pointer items-center justify-between rounded-lg bg-darkSlate p-3"
                >
                    <p>Change your email address</p>
                    <FaAngleRight />
                </div>
                <div className="flex cursor-pointer items-center justify-between rounded-lg bg-darkSlate p-3">
                    <p>Change password</p>
                    <FaAngleRight />
                </div>
                <div className="flex cursor-pointer items-center justify-between rounded-lg bg-darkSlate p-3">
                    <p>Personal information</p>
                    <FaAngleRight />
                </div>
            </div>
            <div className="w-2/5 grid grid-cols-2 gap-x-5 mt-5">
                <Button
                    onClick={openModal}
                    className={"border border-darkText bg-transparent"}
                    title={"Delete account"}
                />
                <Button className={"bg-redText px-7"} title={"Sign out"} />
            </div>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <p className="text-lg font-medium mb-2">
                    Are you sure you want to delete your account?{" "}
                    <span onClick={closeModal} className="float-right text-2xl cursor-pointer">
                        <RxCrossCircled />
                    </span>
                </p>
                <p className="text-darkText">
                    If you proceed, your account and all of your information
                    will be permanently deleted & you won’t be able to retrieve
                    it again.
                </p>
                <div className="grid grid-cols-2 gap-x-4 mt-5 mx-auto">
                    <Button
                        title={"No, don't delete it"}
                        className={"bg-transparent border border-darkText text-darkSlate"}
                    />
                    <Button title={"Yes I'm sure"} className={"bg-redText"}/>
                </div>
            </Modal>
        </section>
    );
};

export default Settings;
