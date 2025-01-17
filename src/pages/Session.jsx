import React, { useEffect, useState } from "react";
import SessionCard from "../components/SessionCard";
import PageHeading from "../components/common/PageHeading";
import Cookies from "js-cookie";
import axios from "axios";

const Session = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = Cookies.get("llu-token");
  const [upcomingSession, setUpcomingSession] = useState("");
  const [ongoingSession, setOngoingSession] = useState([]);

  useEffect(() => {
    async function apiCall() {
      try {
        let response = await axios.get(
          `${baseUrl}/api/facilitator/sessions?page=1&limit=5`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        setOngoingSession(response.data.data.ongoingSessions);
      } catch (error) {
        console.log(error);
      }
    }
    apiCall();
  }, []);
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
          startTime={"14th Apr"}
          dates={"14th Apr"}
          bTrue={true}
          lTrue={true}
        />
        <SessionCard
          title={"Basketball Workout Training"}
          locations={"Green Valley, Hill road, NY"}
          startTime={"14th Apr"}
          dates={"14th Apr"}
          bTrue={true}
          lTrue={true}
        />
        <SessionCard
          title={"Basketball Workout Training"}
          locations={"Green Valley, Hill road, NY"}
          startTime={"14th Apr"}
          dates={"14th Apr"}
          bTrue={true}
          lTrue={true}
        />
        <SessionCard
          title={"Basketball Workout Training"}
          locations={"Green Valley, Hill road, NY"}
          startTime={"14th Apr"}
          dates={"14th Apr"}
          bTrue={true}
          lTrue={true}
        />
        <SessionCard
          title={"Basketball Workout Training"}
          locations={"Green Valley, Hill road, NY"}
          startTime={"14th Apr"}
          dates={"14th Apr"}
          bTrue={true}
          lTrue={true}
        />
      </div>
      <h2 className="mb-3 mt-8 text-xl font-medium text-Primary">
        Ongoing Session
      </h2>
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 flex-wrap gap-3">
        {ongoingSession.map((item, index) => {
          const formatDateTime = (date) => {
            const options = {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            };
            return new Intl.DateTimeFormat("en-US", options).format(
              new Date(date)
            );
          };

          return (
            <div key={index}>
              <SessionCard
                title={item.name}
                locations={"Green Valley, Hill road, NY"}
                endTime={formatDateTime(item.end_time)}
                startTime={formatDateTime(item.start_time)}
                sessionDetails={item.description}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Session;
