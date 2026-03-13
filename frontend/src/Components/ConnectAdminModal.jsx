import { useState } from "react";

export const ConnectAdminModal = ({ isOpen, onClose, onConnect }) => {

  const [adminId, setAdminId] = useState("");

  if (!isOpen) return null;

  const handleConnect = () => {
    onConnect(adminId);
    setAdminId("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

      <div className="bg-white w-[400px] rounded-xl shadow-xl p-6">

        <h2 className="text-xl font-semibold mb-4">Connect to Admin</h2>

        <div className="mb-6">
          <label className="text-sm text-gray-600">Admin ID</label>
          <input
            type="text"
            placeholder="Enter admin ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleConnect}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Connect
          </button>

        </div>

      </div>

    </div>
  );
};