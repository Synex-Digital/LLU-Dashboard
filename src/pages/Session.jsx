import React from "react";
import SessionCard from "../components/SessionCard";
import PageHeading from "../components/common/PageHeading";

const Session = () => {
    return (
        <section>
            <PageHeading title={"All Session"} />

            <h2 className="mb-3 text-xl font-medium text-Primary">
                Upcoming Session
            </h2>
            <div className="grid xl:grid-cols-3 sm:grid-cols-2 flex-wrap gap-3">
                <SessionCard
                    title={"Basketball Workout Training"}
                    locations={"Green Valley, Hill road, NY"}
                    times={"04pm-05pm"}
                    dates={"14th Apr "}
                    bTrue={true}
                    lTrue={true}
                />
                <SessionCard
                    title={"Basketball Workout Training"}
                    locations={"Green Valley, Hill road, NY"}
                    times={"04pm-05pm"}
                    dates={"14th Apr "}
                    bTrue={true}
                    lTrue={true}
                />
                <SessionCard
                    title={"Basketball Workout Training"}
                    locations={"Green Valley, Hill road, NY"}
                    times={"04pm-05pm"}
                    dates={"14th Apr "}
                    bTrue={true}
                    lTrue={true}
                />
                <SessionCard
                    title={"Basketball Workout Training"}
                    locations={"Green Valley, Hill road, NY"}
                    times={"04pm-05pm"}
                    dates={"14th Apr "}
                    bTrue={true}
                    lTrue={true}
                />
            </div>
            <h2 className="mb-3 mt-8 text-xl font-medium text-Primary">
                Ongoing Session
            </h2>
            <div className="grid xl:grid-cols-3 sm:grid-cols-2 flex-wrap gap-3">
                <SessionCard
                    title={"Basketball Workout Training"}
                    locations={"Green Valley, Hill road, NY"}
                    times={"04pm-05pm"}
                    dates={"14th Apr "}
                    sessionDetails={
                        "There are many variations of passages of Lorem Ipsum available, but the majority..."
                    }
                />
                <SessionCard
                    title={"Basketball Workout Training"}
                    locations={"Green Valley, Hill road, NY"}
                    times={"04pm-05pm"}
                    dates={"14th Apr "}
                    sessionDetails={
                        "There are many variations of passages of Lorem Ipsum available, but the majority..."
                    }
                />
                <SessionCard
                    title={"Basketball Workout Training"}
                    locations={"Green Valley, Hill road, NY"}
                    times={"04pm-05pm"}
                    dates={"14th Apr "}
                    sessionDetails={
                        "There are many variations of passages of Lorem Ipsum available, but the majority..."
                    }
                />
                <SessionCard
                    title={"Basketball Workout Training"}
                    locations={"Green Valley, Hill road, NY"}
                    times={"04pm-05pm"}
                    dates={"14th Apr "}
                    sessionDetails={
                        "There are many variations of passages of Lorem Ipsum available, but the majority..."
                    }
                />
            </div>
        </section>
    );
};

export default Session;
