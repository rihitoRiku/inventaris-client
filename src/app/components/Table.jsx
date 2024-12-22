import React, { useState, useEffect } from "react";
import { showToast } from "./../components/Notification";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";

export default function Table({ data, setItems }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dateError, setDateError] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  };

  const validateDate = (dateValue) => {
    const today = new Date();
    const entryDate = new Date(dateValue);

    if (!dateValue) return "Tanggal masuk wajib diisi.";
    if (entryDate > today)
      return "Tanggal masuk tidak boleh lebih dari hari ini.";
    return "";
  };

  const isFormValid = () => {
    return (
      selectedItem &&
      selectedItem.NamaBarang.trim() &&
      selectedItem.Kategori.trim() &&
      selectedItem.JumlahBarang > 0 &&
      selectedItem.HargaPerUnit > 0 &&
      selectedItem.TanggalMasuk.trim() &&
      !validateDate(selectedItem.TanggalMasuk)
    );
  };

  const handleEditClick = (item) => {
    setSelectedItem({ ...item });
    setDateError("");
    setEditModalOpen(true);
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const closeModals = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedItem(null);
    setDateError("");
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setSelectedItem((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (id === "TanggalMasuk") {
      setDateError(validateDate(value));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Final validation before submission
    const dateValidationError = validateDate(selectedItem.TanggalMasuk);
    if (dateValidationError) {
      setDateError(dateValidationError);
      return;
    }

    try {
      const response = await fetch("/api/items", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedItem),
      });

      if (response.ok) {
        console.log("Item updated successfully!");
        const updatedItems = data.map((item) =>
          item._id === selectedItem._id ? selectedItem : item
        );
        setItems(updatedItems);
        showToast("success", "Item updated successfully!");
      } else {
        console.error("Failed to update item.");
        showToast("error", "Failed to update item.");
      }
    } catch (error) {
      console.error("Error updating item:", error);
      showToast("error", "An error occurred while updating the item.");
    } finally {
      closeModals();
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch("/api/items", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: selectedItem._id }),
      });

      if (response.ok) {
        console.log("Item deleted successfully!");
        const updatedItems = data.filter(
          (item) => item._id !== selectedItem._id
        );
        setItems(updatedItems);
        showToast("success", "Item deleted successfully!");
      } else {
        console.error("Failed to delete item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      showToast("error", "An error occurred while deleting the item.");
    } finally {
      closeModals();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const AOS = require("aos"); 
      AOS.init();
      AOS.refresh();
    }
  }, [])

  return (
    <div className="w-full rounded-lg bg-white mt-8 lg:mt-12">
      <div className="w-full rounded-lg max-h-[40rem] overflow-x-auto">
        {/* Table */}
        <table data-aos="zoom-in" data-aos-delay="200" className="w-full font-sans text-sm text-left rtl:text-right text-gray-500 relative">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50 sticky top-0 z-20">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap bg-gray-50 sticky top-0 left-0 z-30 max-w-44">
                Nama Barang
              </th>
              <th className="px-4 py-4 whitespace-nowrap sticky top-0 z-20">
                Kategori
              </th>
              <th className="px-4 py-4 whitespace-nowrap max-w-40 sticky top-0 z-20">
                Jumlah Barang
              </th>
              <th className="px-4 py-4 whitespace-nowrap sticky top-0 z-20">
                Harga Total
              </th>
              <th className="px-4 py-4 whitespace-nowrap text-center sticky top-0 z-20">
                Tanggal Masuk
              </th>
              <th className="px-4 py-4 whitespace-nowrap text-center pe-6 sticky top-0 z-20">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900 whitespace-normal bg-white sticky left-0 z-10 max-w-44 break-words">
                  {item.NamaBarang}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">{item.Kategori}</td>
                <td className="px-4 py-4 whitespace-nowrap max-w-40">
                  {item.JumlahBarang}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  Rp {item.JumlahBarang * item.HargaPerUnit}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  {formatDate(item.TanggalMasuk)}
                </td>
                <td className="text-center whitespace-nowrap text-2xl">
                  <button
                    className="px-4 py-4 text-yellow-400 hover:underline"
                    onClick={() => handleEditClick(item)}
                  >
                    <MdEdit />
                  </button>
                  <button
                    className="px-4 py-4 text-red-400 hover:underline"
                    onClick={() => handleDeleteClick(item)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 bg-white/10 backdrop-blur-sm flex items-center justify-center font-sans mx-3">
          <div data-aos="zoom-in" data-aos-delay="50" className="relative bg-white rounded-lg p-8 pt-12 max-w-md w-full">
            <button
              onClick={closeModals}
              className="absolute top-4 right-4 text-6xl text-gray-500"
            >
              <IoClose />
            </button>
            <h3 className="text-2xl lg:text-3xl font-semibold mb-4">
              Edit Barang
            </h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-base font-medium mb-2">
                  Nama Barang
                </label>
                <input
                  type="text"
                  id="NamaBarang"
                  className="border border-gray-300 text-gray-900 text-base rounded-lg block w-full px-4 py-2 focus:outline-none"
                  value={selectedItem.NamaBarang}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium mb-2">
                  Kategori Barang
                </label>
                <select
                  id="Kategori"
                  className="border border-gray-300 text-gray-900 text-base rounded-lg block w-full px-4 py-2"
                  value={selectedItem.Kategori}
                  onChange={handleInputChange}
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
              <div className="mb-4">
                <label className="block text-base font-medium mb-2">
                  Jumlah Barang
                </label>
                <input
                  type="number"
                  id="JumlahBarang"
                  className="border border-gray-300 text-gray-900 text-base rounded-lg block w-full px-4 py-2 focus:outline-none"
                  value={selectedItem.JumlahBarang}
                  onChange={handleInputChange}
                  min="1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium mb-2">
                  Harga per Unit
                </label>
                <input
                  type="number"
                  id="HargaPerUnit"
                  className="border border-gray-300 text-gray-900 text-base rounded-lg block w-full px-4 py-2 focus:outline-none"
                  value={selectedItem.HargaPerUnit}
                  onChange={handleInputChange}
                  min="100"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium mb-2">
                  Tanggal Masuk
                </label>
                <input
                  type="date"
                  id="TanggalMasuk"
                  className={`border ${
                    dateError ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-base rounded-lg block w-full px-4 py-2 focus:outline-none`}
                  value={selectedItem.TanggalMasuk}
                  onChange={handleInputChange}
                  required
                />
                {dateError && (
                  <p className="text-red-500 text-sm mt-2">{dateError}</p>
                )}
              </div>
              <button
                type="submit"
                className={`bg-green-400 hover:bg-green-500 text-white mt-8 px-8 py-2.5 rounded-lg font-medium float-end ${
                  isFormValid() ? "" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!isFormValid()}
              >
                Simpan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 bg-white/10 backdrop-blur-sm flex items-center justify-center font-sans mx-3">
          <div data-aos="zoom-in" data-aos-delay="50" className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Hapus Barang</h3>
            <p className="text-gray-700 mb-6">
              Apakah Anda yakin ingin menghapus barang{" "}
              <span className="font-semibold">{selectedItem.NamaBarang}</span>?
            </p>
            <div className="flex justify-between gap-6">
              <button
                className="bg-gray-500 text-white px-8 py-2.5 rounded-lg flex-1"
                onClick={closeModals}
              >
                Batal
              </button>
              <button
                className="bg-red-500 text-white px-8 py-2.5 rounded-lg flex-1"
                onClick={handleDeleteConfirm}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
