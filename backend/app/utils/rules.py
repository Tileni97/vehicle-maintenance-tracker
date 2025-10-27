from datetime import datetime  # Import datetime for date and time operations
from typing import List  # Import List for type hinting
from app.models.vehicle_models import (
    MaintenanceReminder,
)  # Import the MaintenanceReminder model

# Define maintenance rules with intervals in kilometers and days
MAINTENANCE_RULES = {
    "Oil Change": {
        "interval_km": 5000,
        "interval_days": 180,
    },  # Oil change every 5000 km or 180 days
    "Tire Rotation": {
        "interval_km": 10000,
        "interval_days": 365,
    },  # Tire rotation every 10000 km or 365 days
    "Brake Inspection": {
        "interval_km": 20000,
        "interval_days": 365,
    },  # Brake inspection every 20000 km or 365 days
    "Air Filter": {
        "interval_km": 15000,
        "interval_days": 365,
    },  # Air filter replacement every 15000 km or 365 days
    "Battery Check": {
        "interval_km": 30000,
        "interval_days": 730,
    },  # Battery check every 30000 km or 730 days
}


# Function to generate maintenance reminders based on vehicle data and past maintenance events
def generate_reminders(vehicle, events) -> List[MaintenanceReminder]:
    reminders = []  # Initialize an empty list to store reminders

    # Iterate through each maintenance rule
    for service_type, rule in MAINTENANCE_RULES.items():
        # Find the most recent maintenance event for the current service type
        last_service = next(
            (
                e
                for e in sorted(
                    events, key=lambda x: x["date"], reverse=True
                )  # Sort events by date (newest first)
                if service_type.lower()
                in e["type"].lower()  # Match service type (case-insensitive)
                or e["type"].lower() in service_type.lower()
            ),
            None,  # Default to None if no matching event is found
        )

        # If a previous service exists, calculate the time and distance since the last service
        if last_service:
            last_mileage = last_service["mileage"]  # Mileage at the last service
            last_date = datetime.fromisoformat(
                last_service["date"]
            )  # Date of the last service
            km_since_service = (
                vehicle["current_mileage"] - last_mileage
            )  # Kilometers since the last service
            days_since_service = (
                datetime.now() - last_date
            ).days  # Days since the last service
            due_in_km = (
                rule["interval_km"] - km_since_service
            )  # Kilometers remaining until the next service
            due_in_days = (
                rule["interval_days"] - days_since_service
            )  # Days remaining until the next service
        else:
            # If no previous service exists, use the full interval as the due values
            last_mileage = None
            last_date = None
            due_in_km = rule["interval_km"]
            due_in_days = rule["interval_days"]

        # Determine the status of the reminder
        status = "ok"  # Default status is "ok"
        if due_in_km <= 0 or due_in_days <= 0:
            status = (
                "overdue"  # Mark as "overdue" if either distance or time is past due
            )
        elif due_in_km <= 1000 or due_in_days <= 30:
            status = (
                "due_soon"  # Mark as "due_soon" if close to the due date or mileage
            )

        # Create a MaintenanceReminder object and add it to the reminders list
        reminders.append(
            MaintenanceReminder(
                service_type=service_type,
                due_in_km=due_in_km,
                due_in_days=due_in_days,
                last_service_date=last_service["date"] if last_service else None,
                last_service_mileage=last_mileage,
                status=status,
            )
        )

    # Sort reminders by status: "overdue" first, then "due_soon", then "ok"
    reminders.sort(key=lambda x: ("overdue", "due_soon", "ok").index(x.status))
    return reminders  # Return the list of reminders
