from fastapi import (
    APIRouter,
    HTTPException,
)  # Import FastAPI router and exception handling
from typing import List  # Import List for type hinting
from app.models.vehicle_models import (  # Import models for request and response validation
    MaintenanceEvent,
    MaintenanceEventResponse,
    MaintenanceReminder,
)
from app.database.db import load_data, save_data  # Import database utility functions
from app.utils.rules import (
    generate_reminders,
)  # Import utility function to generate reminders

# Create a router for maintenance-related endpoints with a prefix and tag
router = APIRouter(prefix="/maintenance", tags=["maintenance"])


# Endpoint to add a maintenance event for a specific vehicle
@router.post("/{vehicle_id}", response_model=MaintenanceEventResponse)
def add_maintenance(vehicle_id: int, event: MaintenanceEvent):
    data = load_data()  # Load existing data from the database
    # Find the vehicle with the given ID
    vehicle = next((v for v in data["vehicles"] if v["id"] == vehicle_id), None)
    if not vehicle:
        # Raise an HTTP 404 error if the vehicle is not found
        raise HTTPException(status_code=404, detail="Vehicle not found")

    # Update the vehicle's current mileage if the event mileage is greater
    if event.mileage > vehicle["current_mileage"]:
        vehicle["current_mileage"] = event.mileage

    # Create a new maintenance event record
    event_data = {
        "id": data["next_event_id"],  # Assign a unique ID to the event
        "vehicle_id": vehicle_id,  # Associate the event with the vehicle
        "type": event.type,  # Type of maintenance (e.g., oil change)
        "date": event.date,  # Date of the maintenance event
        "mileage": event.mileage,  # Mileage at the time of the event
        "cost": event.cost,  # Cost of the maintenance
        "notes": event.notes,  # Additional notes about the event
    }
    data["maintenance_events"].append(event_data)  # Add the event to the list
    data["next_event_id"] += 1  # Increment the next event ID
    save_data(data)  # Save the updated data back to the database
    return event_data  # Return the newly added maintenance event


# Endpoint to retrieve the maintenance history of a specific vehicle
@router.get("/history/{vehicle_id}", response_model=List[MaintenanceEventResponse])
def get_history(vehicle_id: int):
    data = load_data()  # Load existing data from the database
    # Find the vehicle with the given ID
    vehicle = next((v for v in data["vehicles"] if v["id"] == vehicle_id), None)
    if not vehicle:
        # Raise an HTTP 404 error if the vehicle is not found
        raise HTTPException(status_code=404, detail="Vehicle not found")
    # Filter maintenance events for the given vehicle ID
    events = [e for e in data["maintenance_events"] if e["vehicle_id"] == vehicle_id]
    # Return the events sorted by date in descending order
    return sorted(events, key=lambda x: x["date"], reverse=True)


# Endpoint to retrieve maintenance reminders for a specific vehicle
@router.get("/reminders/{vehicle_id}", response_model=List[MaintenanceReminder])
def get_reminders(vehicle_id: int):
    data = load_data()  # Load existing data from the database
    # Find the vehicle with the given ID
    vehicle = next((v for v in data["vehicles"] if v["id"] == vehicle_id), None)
    if not vehicle:
        # Raise an HTTP 404 error if the vehicle is not found
        raise HTTPException(status_code=404, detail="Vehicle not found")
    # Filter maintenance events for the given vehicle ID
    events = [e for e in data["maintenance_events"] if e["vehicle_id"] == vehicle_id]
    # Generate and return reminders based on the vehicle and its maintenance events
    return generate_reminders(vehicle, events)
