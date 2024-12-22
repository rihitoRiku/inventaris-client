import React, { useState, useEffect } from "react";
import { showToast } from "./../components/Notification";
import { IoClose } from "react-icons/io5";

export default function Modal({ isOpen, onClose, setLoading, addItem }) {
  // State for form data and validation errors
  const [formData, setFormData] = useState({
    NamaBarang: "",
    Kategori: "",
    JumlahBarang: 1,
    HargaPerUnit: 100000,
    TanggalMasuk: "",
  });
  const [dateError, setDateError] = useState("");

  // Check if the form is valid
  const isFormValid =
    formData.NamaBarang.trim() &&
    formData.Kategori.trim() &&
    formData.JumlahBarang > 0 &&
    formData.HargaPerUnit > 0 &&
    formData.TanggalMasuk.trim() &&
    !dateError;

  // Validate the date input
  const validateDate = (dateValue) => {
    const today = new Date();
    const entryDate = new Date(dateValue);

    if (!dateValue) return "Tanggal masuk wajib diisi.";
    if (entryDate > today) return "Tanggal masuk tidak boleh lebih dari hari ini.";
    return "";
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Validate date field in real-time
    if (id === "TanggalMasuk") {
      setDateError(validateDate(value));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform final validation
    const dateValidationError = validateDate(formData.TanggalMasuk);
    if (dateValidationError) {
      setDateError(dateValidationError);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newItem = await response.json();
        addItem(newItem);
        showToast("success", "Item added successfully!");

        // Reset form data
        setFormData({
          NamaBarang: "",
          Kategori: "",
          JumlahBarang: 1,
          HargaPerUnit: 100000,
          TanggalMasuk: "",
        });
      } else {
        showToast("error", "Failed to add item.");
        console.error("Failed to add item.");
      }
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const AOS = require("aos"); 
      AOS.init();
      AOS.refresh();
    }
  }, [isOpen])

  // Do not render if modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/10 backdrop-blur-sm flex items-center justify-center font-sans mx-3">
      <div data-aos="zoom-in" data-aos-delay="50" className="relative bg-white rounded-xl p-8 pt-12 max-w-md w-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-6xl text-gray-500"
        >
          <IoClose />
        </button>

        {/* Modal Title */}
        <h3 className="text-2xl lg:text-3xl font-semibold mb-4">
          Tambah Barang
        </h3>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Nama Barang */}
          <div className="mb-4">
            <label
              htmlFor="NamaBarang"
              className="block mb-2 text-base font-medium text-gray-900"
            >
              Nama Barang <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="NamaBarang"
              value={formData.NamaBarang}
              onChange={handleInputChange}
              className="border border-gray-300 text-gray-900 text-base rounded-lg block w-full px-4 py-2 focus:outline-none"
              placeholder="Nama Barang"
              required
            />
          </div>

          {/* Kategori Barang */}
          <div className="mb-4">
            <label
              htmlFor="Kategori"
              className="block mb-2 text-base font-medium text-gray-900"
            >
              Kategori Barang
            </label>
            <select
              id="Kategori"
              value={formData.Kategori}
              onChange={handleInputChange}
              className="border border-gray-300 text-gray-900 text-base rounded-lg block w-full px-4 py-2 focus:outline-none"
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
              htmlFor="JumlahBarang"
              className="block mb-2 text-base font-medium text-gray-900"
            >
              Jumlah Barang <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="JumlahBarang"
              value={formData.JumlahBarang}
              onChange={handleInputChange}
              className="border border-gray-300 text-gray-900 text-base rounded-lg block w-full px-4 py-2 focus:outline-none"
              placeholder="Jumlah Barang"
              min="1"
              required
            />
          </div>

          {/* Harga per Unit */}
          <div className="mb-4">
            <label
              htmlFor="HargaPerUnit"
              className="block mb-2 text-base font-medium text-gray-900"
            >
              Harga per Unit <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="HargaPerUnit"
              value={formData.HargaPerUnit}
              onChange={handleInputChange}
              className="border border-gray-300 text-gray-900 text-base rounded-lg block w-full px-4 py-2 focus:outline-none"
              placeholder="Harga per Unit (Rp)"
              min="100"
              required
            />
          </div>

          {/* Tanggal Masuk */}
          <div className="mb-4">
            <label
              htmlFor="TanggalMasuk"
              className="block mb-2 text-base font-medium text-gray-900"
            >
              Tanggal Masuk <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="TanggalMasuk"
              value={formData.TanggalMasuk}
              onChange={handleInputChange}
              className={`border ${
                dateError ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-base rounded-lg block w-full px-4 py-2 focus:outline-none`}
              required
            />
            {dateError && (
              <p className="text-red-500 text-sm mt-2">{dateError}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`bg-green-400 hover:bg-green-500 text-white mt-8 px-6 py-2.5 rounded-lg font-medium float-end ${
              isFormValid ? "" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            Tambahkan!
          </button>
        </form>
      </div>
    </div>
  );
}
