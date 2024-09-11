import React from "react";
import PageHeading from "../components/common/PageHeading";
import SubPageTitle from "../components/common/SubPageTitle";
import Button from "../components/common/Button";

const ChangeEmailAddress = () => {
    return (
        <section>
            <PageHeading title={"Authentication"} />
            <SubPageTitle title={"Confirm your identity"} />
            <p className="text-darkText">
                For security reasons, we'll send a verification code to:
                <span>facilator@gamil.com.</span>
            </p>
            <p className="text-darkText">
                If you don't have access to this email address, please contact
                LLU Support.
            </p>
            <Button title={"Send code"} className={"mt-5 px-10"} />
        </section>
    );
};

export default ChangeEmailAddress;
