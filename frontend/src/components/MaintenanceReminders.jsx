import React from "react";
import { AlertCircle } from "lucide-react";
import { getStatusColor } from "../utils/helpers";

// Component to display maintenance reminders
export default function MaintenanceReminders({ reminders }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Header with icon and title */}
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <AlertCircle className="w-5 h-5" />
        Maintenance Reminders
      </h2>
      <div className="space-y-3">
        {/* Iterate over the reminders array and display each reminder */}
        {reminders.map((reminder, idx) => (
          <div
            key={idx} // Use index as the key for each reminder
            className={`p-4 rounded-lg border-2 ${getStatusColor(
              reminder.status // Apply dynamic border color based on status
            )}`}
          >
            {/* Display the service type */}
            <div className="font-semibold">{reminder.service_type}</div>
            {/* Display due information based on the status */}
            <div className="text-sm mt-1">
              {reminder.status === "overdue" ? (
                <>
                  Overdue by: {Math.abs(reminder.due_in_km)} km or{" "}
                  {Math.abs(reminder.due_in_days)} days
                </>
              ) : (
                <>
                  Due in: {reminder.due_in_km} km or {reminder.due_in_days} days
                </>
              )}
            </div>
            {/* Display last service details if available */}
            {reminder.last_service_date && (
              <div className="text-xs mt-1">
                Last service: {reminder.last_service_date} at{" "}
                {reminder.last_service_mileage?.toLocaleString()} km
              </div>
            )}
          </div>
        ))}
        {/* Display a message if there are no reminders */}
        {reminders.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No reminders yet. Add maintenance records to get started.
          </p>
        )}
      </div>
    </div>
  );
}
