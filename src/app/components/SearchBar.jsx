import React from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchBar({ placeholder, value, onChange }) {
  return (
    <div className="flex items-center w-full relative">
      <input
        type="search"
        className="block w-full p-3 lg:p-4 ps-4 lg:ps-6 pe-12 lg:pe-12 text-base lg:text-lg text-gray-900 border rounded-full bg-white focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div className="absolute inset-y-0 end-0 flex items-center pe-4 lg:pe-6 pointer-events-none text-xl lg:text-2xl text-gray-400">
        <IoSearchOutline />
      </div>
    </div>
  );
}
