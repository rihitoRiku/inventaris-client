"use client";

import React, { useState } from "react";
import LoaderComponent from "./components/LoaderComponent";
import Modal from "./components/Modal";
import SearchBar from "./components/SearchBar";
import Table from "./components/Table";
import { MdAddToPhotos } from "react-icons/md";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [registerModal, setRegisterModal] = useState(false);

  const openRegisterModal = () => setRegisterModal(true);
  const closeRegisterModal = () => setRegisterModal(false);

  const [data, setData] = useState([
    {
      NamaBarang: "First aid kit",
      Kategori: "Peralatan",
      JumlahBarang: 50,
      HargaPerUnit: 100000,
      HargaTotal: 5000000,
      TanggalMasuk: "2024-02-01",
    },
    {
      NamaBarang: "Meja kayu",
      Kategori: "Furniture",
      JumlahBarang: 10,
      HargaPerUnit: 1000000,
      HargaTotal: 10000000,
      TanggalMasuk: "2024-03-01",
    },
  ]);

  const filteredData = data.filter((item) =>
    item.NamaBarang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {loading && <LoaderComponent />}

      <Modal isOpen={registerModal} onClose={closeRegisterModal} />

      <div className="w-full min-h-screen">
        <div className="w-full px-4 flex justify-center">
          <div className="w-full max-w-screen-lg flex flex-col relative top-32">
            <div className="text-gray-900 text-center space-y-4 sm:space-y-6 lg:space-y-8">
              <h1
                style={{ lineHeight: 1.1 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-semibold font-sans"
              >
                Kelola inventaris gudang dengan{" "}
                <span className="text-gray-400">mudah</span>
              </h1>
              <h3 className="text-base sm:text-lg lg:text-xl font-nunito">
                Sistem manajemen inventaris ini mempermudah pengelolaan gudang
                Anda dengan fitur tambah, lihat, edit, hapus data barang, dan
                tabel responsif. Akses mudah dari berbagai perangkat membuat
                proses inventarisasi lebih cepat, akurat, dan terorganisir.
              </h3>
            </div>

            <div className="flex justify-center items-center max-w-screen-lg w-full mx-auto font-nunito mt-20 rounded-lg">
              <button
                onClick={openRegisterModal}
                className="p-3 lg:p-4 relative flex justify-center items-center gap-2 text-gray-400 w-min text-nowrap me-2 ms-2"
              >
                <MdAddToPhotos className="text-4xl" />
                <span className="hidden lg:inline-block">Tambah Barang</span>
              </button>
              <SearchBar
                placeholder="Cari Barang"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Table data={filteredData} />
          </div>
        </div>
      </div>
    </>
  );
}
