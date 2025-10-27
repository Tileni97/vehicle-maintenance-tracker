const API_BASE = 'http://localhost:8000';
// Base URL for the API endpoints. Adjust as necessary for different environments.

export const fetchVehicles = async () => {
  // Fetches the list of all vehicles from the API.
  const res = await fetch(`${API_BASE}/vehicles/`);
  return res.json(); // Parses and returns the JSON response.
};

export const addVehicle = async (vehicleData) => {
  // Sends a POST request to add a new vehicle.
  // vehicleData: Object containing the details of the vehicle to be added.
  const res = await fetch(`${API_BASE}/vehicles/`, {
    method: 'POST', // HTTP method for creating a resource.
    headers: { 'Content-Type': 'application/json' }, // Specifies JSON content type.
    body: JSON.stringify(vehicleData) // Converts the vehicle data to a JSON string.
  });
  return res.json(); // Parses and returns the JSON response.
};

export const deleteVehicle = async (vehicleId) => {
  // Sends a DELETE request to remove a vehicle by its ID.
  // vehicleId: ID of the vehicle to be deleted.
  const res = await fetch(`${API_BASE}/vehicles/${vehicleId}`, {
    method: 'DELETE' // HTTP method for deleting a resource.
  });
  return res.json(); // Parses and returns the JSON response.
};

export const fetchMaintenance = async (vehicleId) => {
  // Fetches the maintenance history for a specific vehicle.
  // vehicleId: ID of the vehicle whose maintenance history is being fetched.
  const res = await fetch(`${API_BASE}/maintenance/history/${vehicleId}`);
  if (!res.ok) {
    // Throws an error if the response status is not OK (e.g., 404 or 500).
    throw new Error('Failed to fetch maintenance history');
  }
  return res.json(); // Parses and returns the JSON response.
};

export const fetchReminders = async (vehicleId) => {
  // Fetches maintenance reminders for a specific vehicle.
  // vehicleId: ID of the vehicle whose reminders are being fetched.
  const res = await fetch(`${API_BASE}/maintenance/reminders/${vehicleId}`);
  if (!res.ok) {
    // Throws an error if the response status is not OK.
    throw new Error('Failed to fetch reminders');
  }
  const data = await res.json(); // Parses the JSON response.
  return Array.isArray(data) ? data : []; // Ensures the response is an array, returns an empty array if not.
};

export const addMaintenance = async (vehicleId, maintenanceData) => {
  // Sends a POST request to add a maintenance record for a specific vehicle.
  // vehicleId: ID of the vehicle.
  // maintenanceData: Object containing the maintenance details.
  const res = await fetch(`${API_BASE}/maintenance/${vehicleId}`, {
    method: 'POST', // HTTP method for creating a resource.
    headers: { 'Content-Type': 'application/json' }, // Specifies JSON content type.
    body: JSON.stringify(maintenanceData) // Converts the maintenance data to a JSON string.
  });
  return res.json(); // Parses and returns the JSON response.
};

export const deleteMaintenance = async (eventId) => {
  // Sends a DELETE request to remove a maintenance record by its event ID.
  // eventId: ID of the maintenance event to be deleted.
  const res = await fetch(`${API_BASE}/maintenance/${eventId}`, {
    method: 'DELETE' // HTTP method for deleting a resource.
  });
  return res.json(); // Parses and returns the JSON response.
};