import React, { useState } from "react";

// Component for adding a maintenance record
export default function AddMaintenanceModal({ isOpen, onClose, onSubmit }) {
  // State to manage form data
  const [formData, setFormData] = useState({
    type: "", // Type of service (e.g., Oil Change)
    date: new Date().toISOString().split("T")[0], // Default to today's date
    mileage: 0, // Mileage of the vehicle
    cost: "", // Cost of the service (optional)
    notes: "", // Additional notes (optional)
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const payload = {
      ...formData,
      cost: formData.cost ? parseFloat(formData.cost) : null, // Parse cost to a float if provided
    };
    onSubmit(payload); // Call the onSubmit callback with the form data
    // Reset the form to its initial state
    setFormData({
      type: "",
      date: new Date().toISOString().split("T")[0],
      mileage: 0,
      cost: "",
      notes: "",
    });
  };

  // If the modal is not open, return null to render nothing
  if (!isOpen) return null;

  // Render the modal
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      {/* Modal content container */}
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Add Maintenance Record</h3>
        <div className="space-y-4">
          {/* Input for service type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Service Type
            </label>
            <input
              type="text"
              required
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="e.g., Oil Change, Tire Replacement"
            />
          </div>
          {/* Input for date */}
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
            />
          </div>
          {/* Input for mileage */}
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
            />
          </div>
          {/* Input for cost */}
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
            />
          </div>
          {/* Input for notes */}
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
            />
          </div>
          {/* Action buttons */}
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose} // Close the modal
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit} // Submit the form
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
