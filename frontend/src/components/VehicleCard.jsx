import React from "react";
import { Trash2 } from "lucide-react";

export default function VehicleCard({
  vehicle,
  isSelected,
  onSelect,
  onDelete,
}) {
  // Functional component to display a vehicle card.
  // Props:
  // - vehicle: Object containing vehicle details (model, year, mileage, etc.).
  // - isSelected: Boolean indicating if the card is selected.
  // - onSelect: Callback function triggered when the card is selected.
  // - onDelete: Callback function triggered when the delete button is clicked.

  return (
    <div
      className={`p-4 rounded-lg border-2 text-left transition relative ${
        isSelected
          ? "border-blue-600 bg-blue-50"
          : "border-gray-200 hover:border-blue-300"
      }`}
    >
      {/* Main container with dynamic styling based on selection state.
          - Selected: Blue border and light blue background.
          - Not selected: Gray border with hover effect. */}

      <button onClick={() => onSelect(vehicle)} className="w-full text-left">
        {/* Button to select the vehicle card. Triggers the onSelect callback. */}

        <div className="font-semibold text-lg">{vehicle.model}</div>
        {/* Display the vehicle model in bold and larger font. */}

        <div className="text-gray-600 text-sm">Year: {vehicle.year}</div>
        {/* Display the vehicle's year in smaller, gray text. */}

        <div className="text-gray-600 text-sm">
          Mileage: {vehicle.current_mileage.toLocaleString()} km
        </div>
        {/* Display the vehicle's mileage, formatted with commas. */}
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          // Prevent the click event from propagating to the parent container.

          if (
            window.confirm(
              `Delete ${vehicle.model}? This will remove all maintenance records.`
            )
          ) {
            onDelete(vehicle.id);
            // Trigger the onDelete callback if the user confirms the deletion.
          }
        }}
        className="absolute top-2 right-2 p-2 text-red-600 hover:bg-red-50 rounded"
        title="Delete vehicle"
      >
        {/* Delete button positioned at the top-right corner of the card.
            - Displays a confirmation dialog before deletion.
            - Styled with red text and hover effect. */}

        <Trash2 className="w-4 h-4" />
        {/* Trash icon to visually represent the delete action. */}
      </button>
    </div>
  );
}
