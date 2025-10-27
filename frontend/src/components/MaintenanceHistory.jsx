import React from "react";
import { Wrench, Calendar, Clock, Plus, Trash2 } from "lucide-react";

export default function MaintenanceHistory({ history, onAddClick, onDelete }) {
  // Functional component that displays a maintenance history list.
  // Props:
  // - history: Array of maintenance records.
  // - onAddClick: Callback for adding a new record.
  // - onDelete: Callback for deleting a record.

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Main container with styling for background, border radius, shadow, and padding. */}

      <div className="flex justify-between items-center mb-4">
        {/* Header section with title and "Add Record" button. */}

        <h2 className="text-xl font-semibold flex items-center gap-2">
          {/* Title with an icon and text. */}
          <Wrench className="w-5 h-5" />
          Maintenance History
        </h2>

        <button
          onClick={onAddClick}
          className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          {/* Button to trigger the "Add Record" action. */}
          <Plus className="w-4 h-4" />
          Add Record
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {/* List container with spacing between items and scrollable overflow. */}

        {history.map((event) => (
          <div key={event.id} className="border rounded-lg p-4 relative">
            {/* Individual maintenance record card. */}

            <div className="flex justify-between items-start">
              {/* Top section with service type and action buttons. */}

              <div className="font-semibold">{event.type}</div>
              {/* Display the type of maintenance. */}

              <div className="flex items-center gap-2">
                {/* Cost and delete button container. */}

                {event.cost && (
                  <div className="text-blue-600 font-semibold">
                    {/* Display the cost if available, formatted to two decimal places. */}
                    N${event.cost.toFixed(2)}
                  </div>
                )}

                <button
                  onClick={() => {
                    if (window.confirm("Delete this maintenance record?")) {
                      onDelete(event.id);
                    }
                  }}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                  title="Delete record"
                >
                  {/* Delete button with confirmation prompt. */}
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-600 mt-1">
              {/* Details section with date and mileage. */}

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {event.date}
                {/* Display the maintenance date. */}
              </div>

              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-4 h-4" />
                {event.mileage.toLocaleString()} km
                {/* Display the mileage, formatted with commas. */}
              </div>
            </div>

            {event.notes && (
              <div className="text-sm text-gray-600 mt-2 italic">
                {/* Display notes if available, styled in italics. */}
                {event.notes}
              </div>
            )}
          </div>
        ))}

        {history.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            {/* Message displayed when there are no maintenance records. */}
            No maintenance records yet. Click "Add Record" to log your first
            service.
          </p>
        )}
      </div>
    </div>
  );
}
