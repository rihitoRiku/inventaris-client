import React from "react";
import Loaderstyle from "./style.module.scss";

export default function Loadercomponent() {
  return (
    <>
      <div className="top-0 start-0 w-screen h-screen z-40 bg-white/10 backdrop-blur-sm fixed bg-white grid place-items-center">
        <div
          className={`dark:text-green-600 text-green-300 ${Loaderstyle.loader}`}
        ></div>
      </div>
    </>
  );
}