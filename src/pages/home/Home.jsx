import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SessionCard from "../../components/SessionCard";
import { FiPlusCircle } from "react-icons/fi";
import ReactCalendar from "../../components/ReactCalendar";
import { routes } from "../../routes/Routers";

const Home = () => {
  const navigate = useNavigate();
  return (
    <main>
      <section>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Ongoing Session</h1>
          <Link className="text-sm text-Primary" to={"/"}>
            See all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <SessionCard
              bTrue={true}
              times={"05:00 PM - 06:00 PM"}
              locations={"Ark Sports Club, NY"}
              sessionDetails={
                "There are many variations of passages of Lorem Ipsum available, but the majority..."
              }
              title={"Football Keeping Session"}
              lTrue={true}
            />
          ))}
        </div>
      </section>

      {/* Upcoming Session */}
      <section className="my-10">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-3">
            <h1 className="text-3xl font-semibold">Upcoming Session</h1>
            <button
              onClick={() => navigate(routes.createSession.path)}
              className="flex items-center gap-x-2 rounded-full bg-darkSlate px-6 py-2"
            >
              <FiPlusCircle /> Create New Session
            </button>
          </div>
          <Link className="text-sm text-Primary" to={"/"}>
            See all
          </Link>
        </div>
        <div className="mt-8">
          <ReactCalendar />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <SessionCard
              bTrue={true}
              times={"05:00 PM - 06:00 PM"}
              locations={"Ark Sports Club, NY"}
              sessionDetails={
                "There are many variations of passages of Lorem Ipsum available, but the majority..."
              }
              title={"Football Keeping Session"}
              lTrue={true}
            />
          ))}
        </div>
      </section>

      {/* Session History */}

      <section>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Session History</h1>
          <Link className="text-sm text-Primary" to={"/"}>
            See all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <SessionCard
              bTrue={true}
              times={"05:00 PM - 06:00 PM"}
              locations={"Ark Sports Club, NY"}
              sessionDetails={
                "There are many variations of passages of Lorem Ipsum available, but the majority..."
              }
              title={"Football Keeping Session"}
              lTrue={true}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
