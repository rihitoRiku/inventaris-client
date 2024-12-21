"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import Loadercomponent from "./components/loader/loader";

export default function Page() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <Loadercomponent />}
      <div className="min-h-screen flex items-center gap-6 lg:gap-16  text-gray-900 px-4">
        {/* Main Section */}
        <div className="max-w-screen-lg mx-auto flex flex-col gap-16 justify-center items-center min-h-screen pb-8">
          <div className="text-gray-900 text-center space-y-4 sm:space-y-6 lg:space-y-8">
            <h1 style={{lineHeight:1.1}} className="text-4xl sm:text-5xl lg:text-7xl font-semibold">
              Kelola inventaris gudang dengan{" "}
              <span className="text-gray-400">mudah</span>
            </h1>
            <h3 className="text-base sm:text-lg lg:text-xl">
              Sistem manajemen inventaris ini mempermudah pengelolaan gudang
              Anda dengan fitur tambah, lihat, edit, hapus data barang, dan
              tabel responsif. Akses mudah dari berbagai perangkat membuat
              proses inventarisasi lebih cepat, akurat, dan terorganisir.
            </h3>
          </div>
          <button type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-base lg:text-xl px-5 py-2.5 lg:px-8 lg:py-3">Mulai Kelola</button>
        </div>
      </div>
    </>
  );
}
