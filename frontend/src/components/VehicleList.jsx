import React from "react";
import { Plus } from "lucide-react";
import VehicleCard from "./VehicleCard";
// Import the VehicleCard component to display individual vehicle details.

export default function VehicleList({
  vehicles,
  selectedVehicle,
  onSelectVehicle,
  onAddClick,
  onDeleteVehicle,
}) {
  // Functional component to display a list of vehicles.
  // Props:
  // - vehicles: Array of vehicle objects to display.
  // - selectedVehicle: The currently selected vehicle object.
  // - onSelectVehicle: Callback function triggered when a vehicle is selected.
  // - onAddClick: Callback function triggered when the "Add Vehicle" button is clicked.
  // - onDeleteVehicle: Callback function triggered when a vehicle is deleted.

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      {/* Main container with styling for background, border radius, shadow, padding, and margin. */}

      <div className="flex justify-between items-center mb-4">
        {/* Header section with title and "Add Vehicle" button, styled for layout and spacing. */}

        <h2 className="text-xl font-semibold">My Vehicles</h2>
        {/* Title for the vehicle list. */}

        <button
          onClick={onAddClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {/* "Add Vehicle" button with click handler and styling for appearance and hover effect. */}
          <Plus className="w-4 h-4" />
          {/* Plus icon to visually indicate the "Add" action. */}
          Add Vehicle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Grid layout for displaying vehicle cards.
            - Single column on small screens.
            - Three columns on medium and larger screens.
            - Spacing between grid items. */}

        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            isSelected={selectedVehicle?.id === vehicle.id}
            // Highlight the card if it matches the selected vehicle.

            onSelect={onSelectVehicle}
            // Pass the onSelectVehicle callback to handle card selection.

            onDelete={onDeleteVehicle}
            // Pass the onDeleteVehicle callback to handle vehicle deletion.
          />
        ))}
      </div>

      {vehicles.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          {/* Fallback message displayed when there are no vehicles in the list. */}
          No vehicles added yet. Click "Add Vehicle" to get started.
        </p>
      )}
    </div>
  );
}
