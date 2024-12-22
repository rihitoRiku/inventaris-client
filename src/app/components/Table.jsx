import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";

export default function Table({ data, onEdit, onDelete }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Open the Edit Modal
  const handleEditClick = (item) => {
    setSelectedItem({ ...item }); // Clone the item to avoid directly mutating it
    setEditModalOpen(true);
  };

  // Open the Delete Modal
  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  // Close both modals
  const closeModals = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedItem(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(selectedItem); // Call parent function for edit action
    closeModals();
  };

  const handleDeleteConfirm = () => {
    onDelete(selectedItem); // Call parent function for delete action
    closeModals();
  };

  return (
    <div className="w-full rounded-lg bg-white border mt-8 lg:mt-12">
      <div className="w-full rounded-lg max-h-[40rem] overflow-x-auto">
        <table className="w-full font-sans text-sm text-left rtl:text-right text-gray-500 relative">
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
                  Rp {item.HargaTotal.toLocaleString()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  {item.TanggalMasuk}
                </td>
                <td className="text-center whitespace-nowrap text-2xl">
                  <button
                    className="px-4 py-4 text-gray-400 hover:underline"
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
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center font-sans">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Edit Barang</h3>
            <form onSubmit={handleEditSubmit}>
              {/* Nama Barang */}
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">
                  Nama Barang
                </label>
                <input
                  type="text"
                  className="border border-gray-300 text-gray-900 text-lg rounded-lg block w-full px-4 py-2"
                  value={selectedItem.NamaBarang}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, NamaBarang: e.target.value })
                  }
                  required
                />
              </div>

              {/* Kategori Barang */}
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">
                  Kategori Barang
                </label>
                <select
                  className="border border-gray-300 text-gray-900 text-lg rounded-lg block w-full px-4 py-2"
                  value={selectedItem.Kategori}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, Kategori: e.target.value })
                  }
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
                <label className="block text-lg font-medium mb-2">
                  Jumlah Barang
                </label>
                <input
                  type="number"
                  className="border border-gray-300 text-gray-900 text-lg rounded-lg block w-full px-4 py-2"
                  value={selectedItem.JumlahBarang}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, JumlahBarang: e.target.value })
                  }
                  min="1"
                  required
                />
              </div>

              {/* Harga per Unit */}
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">
                  Harga per Unit
                </label>
                <input
                  type="number"
                  className="border border-gray-300 text-gray-900 text-lg rounded-lg block w-full px-4 py-2"
                  value={selectedItem.HargaPerUnit}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, HargaPerUnit: e.target.value })
                  }
                  min="100"
                  required
                />
              </div>

              {/* Tanggal Masuk */}
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">
                  Tanggal Masuk
                </label>
                <input
                  type="date"
                  className="border border-gray-300 text-gray-900 text-lg rounded-lg block w-full px-4 py-2"
                  value={selectedItem.TanggalMasuk}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, TanggalMasuk: e.target.value })
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-lg w-full"
              >
                Simpan
              </button>
            </form>
            <button
              className="mt-4 bg-gray-500 text-white px-6 py-2 rounded-lg w-full"
              onClick={closeModals}
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center font-sans">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Hapus Barang</h3>
            <p className="text-gray-700 mb-6">
              Apakah Anda yakin ingin menghapus barang{" "}
              <span className="font-semibold">{selectedItem.NamaBarang}</span>?
            </p>
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-lg"
                onClick={handleDeleteConfirm}
              >
                Hapus
              </button>
              <button
                className="bg-gray-500 text-white px-6 py-2 rounded-lg"
                onClick={closeModals}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
