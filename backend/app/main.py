from fastapi import FastAPI  # Import FastAPI to create the application
from app.core.config import add_cors  # Import the function to configure CORS
from app.routes import (
    vehicles,
    maintenance,
)  # Import routers for vehicles and maintenance endpoints

# Create a FastAPI application instance with a custom title
app = FastAPI(title="Automotive Maintenance Tracker")

# Add CORS middleware to the application
add_cors(app)

# Include the vehicles router to handle vehicle-related endpoints
app.include_router(vehicles.router)

# Include the maintenance router to handle maintenance-related endpoints
app.include_router(maintenance.router)


# Define the root endpoint ("/") to provide basic API information
@app.get("/")
def root():
    # Return a simple message and a link to the API documentation
    return {"message": "Automotive Maintenance Tracker API", "docs": "/docs"}
