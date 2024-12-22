import React, { useState } from "react";

export default function Modal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    namaBarang: "",
    kategoriBarang: "",
    jumlahBarang: 0,
    hargaPerUnit: 0,
    tanggalMasuk: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/add-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Item added successfully!");
        setFormData({
          namaBarang: "",
          kategoriBarang: "",
          jumlahBarang: 0,
          hargaPerUnit: 0,
          tanggalMasuk: "",
        });
        onClose(); // Close the modal after successful submission
      } else {
        console.error("Failed to add item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center font-sans">
      <div className="relative bg-white rounded-xl p-6 max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-500"
        >
          &times;
        </button>
        <h3 className="text-2xl lg:text-3xl font-semibold mb-4">
          Tambah Barang
        </h3>
        <form onSubmit={handleSubmit}>
          {/* Nama Barang */}
          <div className="mb-4">
            <label
              htmlFor="namaBarang"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Nama Barang <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="namaBarang"
              value={formData.namaBarang}
              onChange={handleInputChange}
              className="border border-gray-300 text-gray-900 text-lg rounded-lg block w-full px-4 py-2"
              placeholder="Nama Barang"
              required
            />
          </div>

          {/* Kategori Barang */}
          <div className="mb-4">
            <label
              htmlFor="kategoriBarang"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Kategori Barang
            </label>
            <select
              id="kategoriBarang"
              value={formData.kategoriBarang}
              onChange={handleInputChange}
              className="border border-gray-300 text-gray-900 text-lg rounded-lg block w-full px-4 py-2"
              required
            >
              <option value="" disabled>
                Pilih Kategori
              </option>
              <option value="Elektronik">Elektronik</option>
              <option value="Pakaian">Pakaian</option>
              <option value="Makanan">Makanan</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          {/* Jumlah Barang */}
          <div className="mb-4">
            <label
              htmlFor="jumlahBarang"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Jumlah Barang <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="jumlahBarang"
              value={formData.jumlahBarang}
              onChange={handleInputChange}
              className="border border-gray-300 text-gray-900 text-lg rounded-lg block w-full px-4 py-2"
              placeholder="Jumlah Barang"
              min="1"
              required
            />
          </div>

          {/* Harga per Unit */}
          <div className="mb-4">
            <label
              htmlFor="hargaPerUnit"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Harga per Unit <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="hargaPerUnit"
              value={formData.hargaPerUnit}
              onChange={handleInputChange}
              className="border border-gray-300 text-gray-900 text-lg rounded-lg block w-full px-4 py-2"
              placeholder="Harga per Unit (Rp)"
              min="100"
              required
            />
          </div>

          {/* Tanggal Masuk */}
          <div className="mb-4">
            <label
              htmlFor="tanggalMasuk"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Tanggal Masuk <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="tanggalMasuk"
              value={formData.tanggalMasuk}
              onChange={handleInputChange}
              className="border border-gray-300 text-gray-900 text-lg rounded-lg block w-full px-4 py-2"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-lg text-lg font-medium w-full"
          >
            Tambah Barang
          </button>
        </form>
      </div>
    </div>
  );
}
