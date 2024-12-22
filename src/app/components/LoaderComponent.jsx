import React from "react";
import Loaderstyle from "./../styles/LoaderStyle.module.scss";
import Loaderstyle2 from "./../styles/LoaderStyle2.module.scss";

// Fullscreen loader component
export function Loadercomponent() {
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

// Reusable inline component
export function InlineLoader() {
  return (
    <span className={`dark:text-green-600 text-green-300 ${Loaderstyle2.loader}`}></span>
  );
}