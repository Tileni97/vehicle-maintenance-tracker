from datetime import datetime  # Import datetime for timestamping
from fastapi import (
    APIRouter,
    HTTPException,
)  # Import FastAPI router and exception handling
from app.models.vehicle_models import (
    Vehicle,
    VehicleResponse,
)  # Import models for request and response validation
from app.database.db import load_data, save_data  # Import database utility functions

# Create a router for vehicle-related endpoints with a prefix and tag
router = APIRouter(prefix="/vehicles", tags=["vehicles"])


# Endpoint to add a new vehicle
@router.post("/", response_model=VehicleResponse)
def add_vehicle(vehicle: Vehicle):
    data = load_data()  # Load existing data from the database
    vehicle_data = {
        "id": data["next_vehicle_id"],  # Assign a unique ID to the new vehicle
        "model": vehicle.model,  # Vehicle model
        "year": vehicle.year,  # Vehicle manufacturing year
        "current_mileage": vehicle.current_mileage,  # Current mileage of the vehicle
        "created_at": datetime.now().isoformat(),  # Timestamp when the vehicle is added
    }
    data["vehicles"].append(vehicle_data)  # Add the new vehicle to the list
    data["next_vehicle_id"] += 1  # Increment the next vehicle ID
    save_data(data)  # Save the updated data back to the database
    return vehicle_data  # Return the newly added vehicle data


# Endpoint to retrieve all vehicles
@router.get("/", response_model=list[VehicleResponse])
def get_vehicles():
    data = load_data()  # Load existing data from the database
    return data["vehicles"]  # Return the list of vehicles


# Endpoint to delete a vehicle by its ID
@router.delete("/{vehicle_id}")
def delete_vehicle(vehicle_id: int):
    data = load_data()  # Load existing data from the database
    # Find the vehicle with the given ID
    vehicle = next((v for v in data["vehicles"] if v["id"] == vehicle_id), None)
    if not vehicle:
        # Raise an HTTP 404 error if the vehicle is not found
        raise HTTPException(status_code=404, detail="Vehicle not found")

    # Remove the vehicle from the list
    data["vehicles"] = [v for v in data["vehicles"] if v["id"] != vehicle_id]
    # Remove all maintenance events associated with the vehicle
    data["maintenance_events"] = [
        e for e in data["maintenance_events"] if e["vehicle_id"] != vehicle_id
    ]
    save_data(data)  # Save the updated data back to the database
    return {"message": "Vehicle deleted successfully"}  # Return a success message
