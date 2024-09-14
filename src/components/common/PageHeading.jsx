import React from "react";

const PageHeading = ({ title, className }) => {
    return (
        <h1
            className={`${className} mb-8 xl:text-3xl text-2xl font-semibold`}
        >
            {title}
        </h1>
    );
};

export default PageHeading;
