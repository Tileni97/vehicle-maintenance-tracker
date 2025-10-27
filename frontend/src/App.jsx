// Import necessary React hooks and components
import React, { useState, useEffect } from "react";
import { Car } from "lucide-react"; // Icon for the header
import VehicleList from "./components/VehicleList"; // Component to display the list of vehicles
import MaintenanceReminders from "./components/MaintenanceReminders"; // Component to display maintenance reminders
import MaintenanceHistory from "./components/MaintenanceHistory"; // Component to display maintenance history
import AddVehicleModal from "./components/AddVehicleModal"; // Modal for adding a new vehicle
import AddMaintenanceModal from "./components/AddMaintenanceModal"; // Modal for adding maintenance records
import {
  fetchVehicles, // API call to fetch all vehicles
  addVehicle, // API call to add a new vehicle
  deleteVehicle, // API call to delete a vehicle
  fetchMaintenance, // API call to fetch maintenance history
  fetchReminders, // API call to fetch reminders
  addMaintenance, // API call to add maintenance
  deleteMaintenance, // API call to delete maintenance
} from "./services/api"; // API service functions

// Main App component
export default function App() {
  // State variables
  const [vehicles, setVehicles] = useState([]); // List of vehicles
  const [selectedVehicle, setSelectedVehicle] = useState(null); // Currently selected vehicle
  const [maintenanceHistory, setMaintenanceHistory] = useState([]); // Maintenance history for the selected vehicle
  const [reminders, setReminders] = useState([]); // Maintenance reminders for the selected vehicle
  const [showAddVehicle, setShowAddVehicle] = useState(false); // Controls visibility of AddVehicleModal
  const [showAddMaintenance, setShowAddMaintenance] = useState(false); // Controls visibility of AddMaintenanceModal

  // Load vehicles when the component mounts
  useEffect(() => {
    loadVehicles();
  }, []);

  // Load maintenance data whenever a vehicle is selected
  useEffect(() => {
    if (selectedVehicle) {
      loadMaintenanceData(selectedVehicle.id);
    }
  }, [selectedVehicle]);

  // Fetch the list of vehicles from the API
  const loadVehicles = async () => {
    try {
      const data = await fetchVehicles();
      setVehicles(data);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    }
  };

  // Fetch maintenance history and reminders for a specific vehicle
  const loadMaintenanceData = async (vehicleId) => {
    try {
      const [history, remindersData] = await Promise.all([
        fetchMaintenance(vehicleId),
        fetchReminders(vehicleId),
      ]);
      setMaintenanceHistory(history);
      setReminders(remindersData);
    } catch (err) {
      console.error("Error fetching maintenance data:", err);
    }
  };

  // Handle adding a new vehicle
  const handleAddVehicle = async (vehicleData) => {
    try {
      await addVehicle(vehicleData);
      await loadVehicles(); // Refresh the vehicle list
      setShowAddVehicle(false); // Close the modal
    } catch (err) {
      console.error("Error adding vehicle:", err);
    }
  };

  // Handle deleting a vehicle
  const handleDeleteVehicle = async (vehicleId) => {
    try {
      await deleteVehicle(vehicleId);
      // Reset selected vehicle and related data if the deleted vehicle was selected
      if (selectedVehicle?.id === vehicleId) {
        setSelectedVehicle(null);
        setMaintenanceHistory([]);
        setReminders([]);
      }
      await loadVehicles(); // Refresh the vehicle list
    } catch (err) {
      console.error("Error deleting vehicle:", err);
    }
  };

  // Handle adding a maintenance record
  const handleAddMaintenance = async (maintenanceData) => {
    if (!selectedVehicle) return; // Ensure a vehicle is selected

    try {
      await addMaintenance(selectedVehicle.id, maintenanceData);
      await loadMaintenanceData(selectedVehicle.id); // Refresh maintenance data
      await loadVehicles(); // Refresh the vehicle list
      setShowAddMaintenance(false); // Close the modal
    } catch (err) {
      console.error("Error adding maintenance:", err);
    }
  };

  // Handle deleting a maintenance record
  const handleDeleteMaintenance = async (eventId) => {
    try {
      await deleteMaintenance(eventId);
      await loadMaintenanceData(selectedVehicle.id); // Refresh maintenance data
      await loadVehicles(); // Refresh the vehicle list
    } catch (err) {
      console.error("Error deleting maintenance:", err);
    }
  };

  // Render the main UI
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Car className="w-8 h-8" /> {/* Icon */}
            Vehicle Maintenance Tracker
          </h1>
          <p className="text-gray-600 mt-2">
            Track your vehicle maintenance history and stay on top of service
            reminders
          </p>
        </div>

        {/* Vehicle List */}
        <VehicleList
          vehicles={vehicles}
          selectedVehicle={selectedVehicle}
          onSelectVehicle={setSelectedVehicle}
          onAddClick={() => setShowAddVehicle(true)}
          onDeleteVehicle={handleDeleteVehicle}
        />

        {/* Maintenance Data */}
        {selectedVehicle && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MaintenanceReminders reminders={reminders} />
            <MaintenanceHistory
              history={maintenanceHistory}
              onAddClick={() => setShowAddMaintenance(true)}
              onDelete={handleDeleteMaintenance}
            />
          </div>
        )}

        {/* Modals */}
        <AddVehicleModal
          isOpen={showAddVehicle}
          onClose={() => setShowAddVehicle(false)}
          onSubmit={handleAddVehicle}
        />
        <AddMaintenanceModal
          isOpen={showAddMaintenance}
          onClose={() => setShowAddMaintenance(false)}
          onSubmit={handleAddMaintenance}
        />
      </div>
    </div>
  );
}
