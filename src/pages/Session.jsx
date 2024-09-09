import React from "react";
import SessionCard from "../components/SessionCard";

const Session = () => {
  return (
    <section>
      <h1 className="mb-8 text-3xl font-semibold">All Session</h1>

      <h2 className="mb-3 text-xl font-medium text-Primary">
        Upcoming Session
      </h2>
      <div className="grid grid-cols-3 flex-wrap gap-3">
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
      <div className="grid grid-cols-3 flex-wrap gap-3">
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
