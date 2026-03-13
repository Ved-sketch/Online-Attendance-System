import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';

export const AddClassModal = ({ isOpen, onClose, onCreate }) => {

  const [className, setClassName] = useState("");
  const [criteria, setCriteria] = useState("");
  const [classId, setClassId] = useState("");

  useEffect(() => {
    if (isOpen) {
      // temporary random id (later replace with backend id)
      const randomId = nanoid(15);
      setClassId(randomId);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCreate = () => {
    onCreate({
      id: classId,
      name: className,
      criteria: criteria
    });

    setClassName("");
    setCriteria("");
    onClose();
  };

  const copyId = () => {
    navigator.clipboard.writeText(classId);
  };



  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

      <div className="bg-white w-[420px] rounded-xl shadow-xl p-6">

        <h2 className="text-xl font-semibold mb-4">Create New Class</h2>

        {/* Class ID */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Class ID</label>
          <div className="flex gap-2 mt-1">
            <input
              value={classId}
              readOnly
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
            <button
              onClick={copyId}
              className="bg-gray-200 px-3 rounded-lg hover:bg-gray-300"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Class Name */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Class Name</label>
          <input
            type="text"
            placeholder="Enter class name"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        {/* Attendance Criteria */}
        <div className="mb-6">
          <label className="text-sm text-gray-600">Attendance Criteria (%)</label>
          <input
            type="number"
            placeholder="Example: 75"
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
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
            onClick={handleCreate}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Create
          </button>
        </div>

      </div>
    </div>
  );
};