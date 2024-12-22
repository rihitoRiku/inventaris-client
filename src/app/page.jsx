"use client";
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Loadercomponent, InlineLoader } from "./components/LoaderComponent";
import Modal from "./components/Modal";
import Table from "./components/Table";
import SearchBar from "./components/SearchBar";
import { MdAddToPhotos } from "react-icons/md";
import { FaFileDownload } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [tableLoad, setTableLoad] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [addItemModal, setAddItemModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const openAddItemModal = () => setAddItemModal(true);
  const closeAddItemModal = () => setAddItemModal(false);

  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    hargaMin: "",
    hargaMax: "",
    jumlahMin: "",
    jumlahMax: "",
    tanggalMasuk: "",
  });

  const filteredData = items.filter((item) => {
    const isNameMatch = item.NamaBarang.toLowerCase().includes(
      searchQuery.toLowerCase()
    );
    const isCategoryMatch =
      !filters.category || item.Kategori === filters.category;
    const isHargaMatch =
      (!filters.hargaMin ||
        item.HargaPerUnit * item.JumlahBarang >= +filters.hargaMin) &&
      (!filters.hargaMax ||
        item.HargaPerUnit * item.JumlahBarang <= +filters.hargaMax);
    const isJumlahMatch =
      (!filters.jumlahMin || item.JumlahBarang >= +filters.jumlahMin) &&
      (!filters.jumlahMax || item.JumlahBarang <= +filters.jumlahMax);
    const isTanggalMatch =
      !filters.tanggalMasuk ||
      new Date(item.TanggalMasuk) <= new Date(filters.tanggalMasuk);

    return (
      isNameMatch &&
      isCategoryMatch &&
      isHargaMatch &&
      isJumlahMatch &&
      isTanggalMatch
    );
  });

  // Utility functions
  const convertToCSV = (data) => {
    if (!data || data.length === 0) return "";

    const headers =
      Object.keys(data[0])
        .filter((key) => key !== "_id")
        .join(",") + "\n";

    const rows = data
      .map((row) => {
        return Object.keys(row)
          .filter((key) => key !== "_id")
          .map((key) => {
            if (key === "TanggalMasuk") {
              const date = new Date(row[key]);
              return `"${date.getDate().toString().padStart(2, "0")}-${(
                date.getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}-${date.getFullYear()}"`;
            }
            return `"${row[key]}"`;
          })
          .join(",");
      })
      .join("\n");

    return headers + rows;
  };

  const downloadCSV = (csvContent, filename = "data.csv") => {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = () => {
    const csvData = convertToCSV(items);
    downloadCSV(csvData, "inventaris.csv");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init({ once: false, mirror: false });
      AOS.refresh();
    }
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const toggleFilterContainer = () => setShowFilter((prev) => !prev);

  return (
    <>
      {loading && <Loadercomponent />}

      <Modal
        isOpen={addItemModal}
        onClose={closeAddItemModal}
        setLoading={setLoading}
        addItem={addItem}
      />

      <div className="w-full min-h-screen">
        <div className="w-full px-4 flex justify-center">
          <div className="w-full max-w-screen-lg flex flex-col relative top-32">
            {/* Header */}
            <div
              data-aos="zoom-in"
              data-aos-delay="50"
              className="text-gray-900 text-center space-y-4 sm:space-y-6 lg:space-y-8"
            >
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
                data-aos="zoom-in"
                data-aos-delay="100"
                onClick={openAddItemModal}
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
              <button
                data-aos="zoom-in"
                data-aos-delay="100"
                onClick={toggleFilterContainer}
                className="p-3 lg:p-4 relative flex justify-center items-center gap-2 text-gray-600 w-min text-nowrap ms-2"
              >
                <FaFilter className="text-3xl" />
                {/* <span className="hidden lg:inline-block">Unduh CSV</span> */}
              </button>
              <button
                data-aos="zoom-in"
                data-aos-delay="100"
                onClick={handleDownload}
                className="p-3 lg:p-4 relative flex justify-center items-center gap-2 text-gray-600 w-min text-nowrap me-2"
              >
                <FaFileDownload className="text-3xl" />
                {/* <span className="hidden lg:inline-block">Unduh CSV</span> */}
              </button>
            </div>

            {/* Filter Container */}
            {/* Filter Container */}
            {showFilter && (
              <div className="font-sans border mt-4 bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-wrap gap-4 justify-between items-start">
                  <div className="flex flex-col w-full md:w-[23%]">
                    <label className="block text-sm font-semibold mb-2">
                      Kategori:
                    </label>
                    <select
                      name="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                      className="border rounded px-3 py-2 focus:outline-none w-full"
                    >
                      <option value="">Semua</option>
                      <option value="Elektronik">Elektronik</option>
                      <option value="Pakaian">Pakaian</option>
                      <option value="Makanan">Makanan</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full md:w-[23%]">
                    <label className="block text-sm font-semibold mb-2">
                      Harga Total (Min-Max):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        name="hargaMin"
                        value={filters.hargaMin}
                        onChange={handleFilterChange}
                        placeholder="Min"
                        className="border rounded px-3 py-2 focus:outline-none w-full"
                      />
                      <input
                        type="number"
                        name="hargaMax"
                        value={filters.hargaMax}
                        onChange={handleFilterChange}
                        placeholder="Max"
                        className="border rounded px-3 py-2 focus:outline-none w-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-full md:w-[23%]">
                    <label className="block text-sm font-semibold mb-2">
                      Jumlah Barang (Min-Max):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        name="jumlahMin"
                        value={filters.jumlahMin}
                        onChange={handleFilterChange}
                        placeholder="Min"
                        className="border rounded px-3 py-2 focus:outline-none w-full"
                      />
                      <input
                        type="number"
                        name="jumlahMax"
                        value={filters.jumlahMax}
                        onChange={handleFilterChange}
                        placeholder="Max"
                        className="border rounded px-3 py-2 focus:outline-none w-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-full md:w-[23%]">
                    <label className="block text-sm font-semibold mb-2">
                      Tanggal Masuk (Sebelum):
                    </label>
                    <input
                      type="date"
                      name="tanggalMasuk"
                      value={filters.tanggalMasuk}
                      onChange={handleFilterChange}
                      className="border rounded px-3 py-2 focus:outline-none w-full"
                    />
                  </div>
                </div>
              </div>
            )}

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

            {/* About */}
            <div className="mb-16 mt-12 font-sans text-center">
              {/* Aplikasi ini diselesaikan kurang dari satu hari oleh Muhammad Rafi
              Shidiq menggunakan React Next.js, MongoDB, dan Tailwind CSS.
              Desainnya sederhana dan user-friendly, dilengkapi validasi form
              untuk keamanan sesuai spesifikasi. Dengan clean code dan minim
              resorce, aplikasi ini cepat, efisien, dan ringan. Sayang saya
              tidak memilih mengerjakan case ke-2 karena keterbatasan waktu
              sambil mengerjakan projek lain. */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
