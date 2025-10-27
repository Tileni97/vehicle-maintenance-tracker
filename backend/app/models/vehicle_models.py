from pydantic import BaseModel
from typing import List, Optional


# Vehicle Models
class Vehicle(BaseModel):
    # Represnts a vehicle with basic details
    model: str  # The model of the vehicle e.g., "Toyota Corolla"
    year: int  # The manufacturing year of the vehicle e.g., 2020
    current_mileage: int  # The current mileage of the vehicle in kilometers e.g., 15000


class VehicleResponse(Vehicle):  # Response model for Vehicle with additional fields
    id: int  # Unique identifier for the vehicle
    created_at: str  # Timestamp of when the vehicle record was created


# Maintenance Models
class MaintenanceEvent(BaseModel):
    type: str
    date: str
    mileage: int
    cost: Optional[float] = None
    notes: Optional[str] = None


class MaintenanceEventResponse(
    MaintenanceEvent
):  # Response model for MaintenanceEvent with additional fields
    id: int
    vehicle_id: int


class MaintenanceReminder(BaseModel):  # Model for maintenance reminders
    service_type: str
    due_in_km: int
    due_in_days: int
    last_service_date: Optional[str]
    last_service_mileage: Optional[int]
    status: str
