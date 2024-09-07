import React from "react";
import SessionCard from "../components/SessionCard";

const Session = () => {
    return (
        <section>
            <h1 className="font-semibold text-3xl mb-8">All Session</h1>

            <h2 className="font-medium text-xl text-Primary mb-3">
                Upcoming Session
            </h2>
            <div className="gap-3 grid flex-wrap grid-cols-3">
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
            <h2 className="font-medium text-xl text-Primary mt-8 mb-3">
                Ongoing Session
            </h2>
            <div className="gap-3 grid flex-wrap grid-cols-3">
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
