"use client";
import React, { useState, useEffect } from "react";
import { Loadercomponent, InlineLoader } from "./components/LoaderComponent";
import Modal from "./components/Modal";
import Table from "./components/Table";
import SearchBar from "./components/SearchBar";
import { MdAddToPhotos } from "react-icons/md";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [tableLoad, setTableLoad] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [registerModal, setRegisterModal] = useState(false);

  const openRegisterModal = () => setRegisterModal(true);
  const closeRegisterModal = () => setRegisterModal(false);

  const [items, setItems] = useState([]);

  const filteredData = items.filter((item) =>
    item.NamaBarang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    async function fetchItems() {
      try {
        setTableLoad(true);
        const response = await fetch("/api/items");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setItems(data);
        setTableLoad(false);
      } catch (error) {
        console.error("Error fetching items:", error);
        setTableLoad(false);
      }
    }

    fetchItems();
  }, []);

  const addItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <>
      {loading && <Loadercomponent />}

      <Modal
        isOpen={registerModal}
        onClose={closeRegisterModal}
        setLoading={setLoading}
        addItem={addItem}
      />

      <div className="w-full min-h-screen">
        <div className="w-full px-4 flex justify-center">
          <div className="w-full max-w-screen-lg flex flex-col relative top-32">
            {/* Header */}
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

            {/* Toolbar */}
            <div className="flex justify-center items-center max-w-screen-lg w-full mx-auto font-nunito mt-20 rounded-lg">
              <button
                onClick={openRegisterModal}
                className="p-3 lg:p-4 relative flex justify-center items-center gap-2 text-green-600 w-min text-nowrap me-2 ms-2"
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

            {/* Content */}
            {!tableLoad ? (
              filteredData.length > 0 ? (
                <Table data={filteredData} setItems={setItems} />
              ) : (
                <p className="font-sans text-center text-xl mt-16 text-gray-500">
                  Barang tidak ditemukan.
                </p>
              )
            ) : (
              <div className="text-center mt-8">
                <InlineLoader />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
