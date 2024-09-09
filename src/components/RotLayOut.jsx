import React from "react";
import HomeLayout from "./HomeLayout";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const RotLayOut = () => {
  return (
    <main className="font-inter text-white">
      <section className="flex h-screen overflow-hidden">
        <SideBar />
        <section className="relative w-10/12 overflow-y-auto overflow-x-hidden">
          <Navbar />
          <div className="p-5">
            <Outlet />
          </div>
        </section>
      </section>
    </main>
  );
};

export default RotLayOut;
