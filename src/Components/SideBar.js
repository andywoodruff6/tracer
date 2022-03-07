import React from "react";
import { SideBarIcon } from "./SideBarIcon";
import { FaFire } from "react-icons/fa";

export const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-16 md:h-screen md:w-16 m-0 flex flex-col bg-green-400 shadow-lg">
      <SideBarIcon icon={<FaFire size="28" />} />
    </div>
  );
};
