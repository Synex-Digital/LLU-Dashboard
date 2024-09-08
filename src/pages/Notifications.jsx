import React from "react";
import NotificationCard from "../components/NotificationCard";
import Image from "../components/common/Image";

import notiIcon from "../assets/icon/notifications-page-icon.svg";

const Notifications = () => {
    let arr = [12, 2, 4, 1, 2, 2];
    return (
        <section>
            <h1 className="font-semibold text-3xl mb-8">Notifications</h1>
            <>
                {arr.length === 0 ? (
                    <div className="w-full flex flex-col justify-center mt-20">
                        <div className="mx-auto">
                            <Image src={notiIcon} />
                            <p className="mt-5 font-medium text-xl">
                                No Notifications
                            </p>
                        </div>
                    </div>
                ) : (
                    Array.from({ length: arr.length }).map((_, index) => (
                        <NotificationCard
                            key={index}
                            title={"Trainee appointment booked"}
                            subtitle={
                                "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form..."
                            }
                            times={"1h"}
                        />
                    ))
                )}
            </>
        </section>
    );
};

export default Notifications;
