import os
import json

DATA_FILE = "data.json"


# Load existing data or initialize new data structure
def load_data():
    if os.path.exists(DATA_FILE):  # Check if the data file exists
        with open(DATA_FILE, "r") as f:  # Open the file for reading
            return json.load(f)  # Load and return the JSON data
    return {  # If the file doesn't exist, return an initial data structure
        "vehicles": [],
        "maintenance_events": [],
        "next_vehicle_id": 1,
        "next_event_id": 1,
    }


def save_data(data):  # Save data back to the JSON file
    with open(DATA_FILE, "w") as f:  # Open the file for writing
        json.dump(
            data, f, indent=2
        )  # Write the JSON data with indentation for readability
