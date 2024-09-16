import React from "react";

const SubPageTitle = ({ title, className }) => {
    return (
        <h2
            className={`${className} mb-3 mt-8 text-xl font-medium text-Primary`}
        >
            {title}
        </h2>
    );
};

export default SubPageTitle;
