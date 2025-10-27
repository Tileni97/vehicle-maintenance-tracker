import React, { useState } from "react";

const SERVICE_TYPES = [
  "Oil Change",
  "Tire Rotation",
  "Brake Inspection",
  "Air Filter",
  "Battery Check",
]; // Array of predefined service types for the dropdown menu.

export default function AddMaintenanceModal({ isOpen, onClose, onSubmit }) {
  // Component props:
  // - isOpen: Boolean to control modal visibility.
  // - onClose: Function to handle modal close action.
  // - onSubmit: Function to handle form submission.

  const [formData, setFormData] = useState({
    type: "", // Selected service type.
    date: new Date().toISOString().split("T")[0], // Default to today's date.
    mileage: 0, // Vehicle mileage.
    cost: "", // Maintenance cost (optional).
    notes: "", // Additional notes (optional).
  }); // State to manage form input values.

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior.
    const payload = {
      ...formData,
      cost: formData.cost ? parseFloat(formData.cost) : null, // Parse cost to a float or set to null if empty.
    };
    onSubmit(payload); // Pass the form data to the parent component via onSubmit.
    setFormData({
      type: "",
      date: new Date().toISOString().split("T")[0],
      mileage: 0,
      cost: "",
      notes: "",
    }); // Reset form fields after submission.
  };

  if (!isOpen) return null; // If the modal is not open, render nothing.

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      {/* Modal backdrop and container */}
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Add Maintenance Record</h3>
        {/* Modal title */}
        <div className="space-y-4">
          {/* Form fields */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Service Type
            </label>
            <select
              required
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select service type...</option>
              {SERVICE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}{" "}
              {/* Dropdown menu populated with service types */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />{" "}
            {/* Date input field */}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Mileage (km)
            </label>
            <input
              type="number"
              required
              value={formData.mileage}
              onChange={(e) =>
                setFormData({ ...formData, mileage: parseInt(e.target.value) })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />{" "}
            {/* Mileage input field */}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Cost (N$) - Optional
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.cost}
              onChange={(e) =>
                setFormData({ ...formData, cost: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />{" "}
            {/* Cost input field */}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Notes - Optional
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
              rows="3"
            />{" "}
            {/* Notes textarea */}
          </div>
          <div className="flex gap-2 justify-end">
            {/* Action buttons */}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
