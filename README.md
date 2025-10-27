# Vehicle Maintenance Tracker

A simple web application for tracking vehicle maintenance history and managing service reminders.

Built as part of the P3 Group Technical Assessment to show my problem-solving approach, system design, and how I apply AI thinking in real-world scenarios.

## Problem-Solving Approach

Since this challenge was based in a domain I’m not familiar with (vehicle maintenance), I started by breaking the problem down into something understandable and logical.

1. Understanding the domain:
I looked into what types of maintenance are common for vehicles, like oil changes, tire rotations, and inspections, and what intervals they usually follow. That helped me design realistic reminder rules.

2. Structuring the system:
Before writing any code, I mapped out the main entities: Vehicle, Maintenance Event, and Reminder Logic. I kept the relationships simple but clear to make the system easy to scale.

3. Keeping it small but solid:
I focused on building something clean and maintainable rather than overcomplicating things. The goal was to show clarity in how I think and how I organize projects, not to create a full production system

4. Planning for AI later:
Since the dataset for a new system would be small, I didn’t include actual ML models yet. Instead, I outlined how predictive maintenance could be added once enough data is collected.

## Overview
The Vehicle Maintenance Tracker helps users keep track of their car’s service history and receive reminders when the next maintenance is due.
The system uses rule-based logic to calculate service reminders and can easily grow into a data-driven predictive system later on.


## Features

### Core Functionality
- **Vehicle Management**: Add and manage multiple vehicles with model, year, and current mileage
- **Maintenance History**: Record all service events including type, date, mileage, cost, and notes
- **Smart Reminders**: Rule-based system that calculates when services are due based on both mileage and time intervals


### Technical Highlights
- RESTful API architecture
- Modular, maintainable codebase
- JSON-based data persistence
- Responsive design for mobile and desktop
- Real-time mileage tracking updates

## Technology Stack

### Backend
- **FastAPI**: for fast, modern API development
- **Pydantic**: Data validation using Python type annotations
- **Uvicorn**: for running the application locally

### Frontend
- **React**: Component-based UI library
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

## Project Structure

```
Vehicle Maintenance Tracker/
├── backend/
│   ├── app/
│   │   ├── core/          # Configuration and CORS setup
│   │   ├── database/      # Data persistence layer
│   │   ├── models/        # Pydantic models
│   │   ├── routes/        # API endpoints
│   │   ├── utils/         # Business logic (reminder rules)
│   │   └── main.py        # Application entry point
│   ├── venv/              # Python virtual environment
│   └── requirements.txt   # Python dependencies
│
└── frontend/
    ├── src/
    │   ├── components/    # Reusable React components
    │   ├── services/      # API integration layer
    │   ├── utils/         # Helper functions
    │   └── App.jsx        # Main application component
    └── package.json       # Node dependencies
```

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the server:
```bash
python -m uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`
API documentation: `http://localhost:8000/docs`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## API Endpoints

### Vehicles
- `GET /vehicles/` - Retrieve all vehicles
- `POST /vehicles/` - Add a new vehicle
- `PELETE /vehicles/{vehicle_id}` - Delete a vehicle

### Maintenance
- `GET /maintenance/history/{vehicle_id}` - Get maintenance history for a vehicle
- `POST /maintenance/{vehicle_id}` - Add a maintenance record
- `GET /maintenance/reminders/{vehicle_id}` - Get maintenance reminders

## Maintenance Rules

The system uses interval-based rules to calculate when services are due:

| Service Type | Kilometre Interval | Time Interval |
|-------------|-------------------|---------------|
| Oil Change | 5,000 km | 180 days |
| Tyre Rotation | 10,000 km | 365 days |
| Brake Inspection | 20,000 km | 365 days |
| Air Filter | 15,000 km | 365 days |
| Battery Check | 30,000 km | 730 days |

Reminders are prioritised as:
- **Overdue**: Service is past due (either by mileage or time)
- **Due Soon**: Within 1,000 km or 30 days of service
- **OK**: Service not yet due

## AI/ML Component Note
Right now, the system uses rule-based reminders (e.g., oil change every 5,000 km or 180 days).
While this works, it assumes every driver and vehicle behave the same, which isn’t true in reality.

That’s where Machine Learning or Generative AI could add real business value.


### 1. Predictive Maintenance Model (Machine Learning)
**Goal*: Predict when a specific vehicle is likely to need maintenance based on historical data.

**Approach**:
- Collect data on:

  - Vehicle type, model, and age

  - Driving frequency and mileage patterns

  - Maintenance history (services, replacements, failures)

  - Environmental conditions (temperature, terrain, location)

- Train a regression model or time-series model (like XGBoost, LSTM, or Prophet) to forecast the next likely maintenance date or mileage.


**Business Value**:
- Prevent costly breakdowns and improve safety
- Let workshops schedule maintenance before issues happen
- Help customers save money and plan expenses

### 2. Generative AI Assistant (LLM Integration)
**Goal**: Help users understand their maintenance history, upcoming services, and even learn about car care through natural conversation.

**Approach**:
- Use an LLM (like GPT or a fine-tuned smaller model) connected to the system’s API.
- Users can ask questions like:

  “When should I replace my brake pads?”
  “What maintenance have I done this year?”
  “Summarize my car’s last 5 services.”
- The LLM would:
   - Retrieve structured data from the API

   - Generate an easy-to-understand summary or advice

**Business Value**:
- Turns the system into a smart, user-friendly assistant
- Reduces customer confusion about maintenance
- Could evolve into a chatbot for car dealerships or workshops

### 3. Anomaly Detection (AI-Assisted Alerts)
**Goal*: Detect unusual maintenance patterns or potential fraud (for business use cases).

**Approach**:
- Use unsupervised learning to detect outliers:
  - A car suddenly needing too many oil changes
  - High mileage jumps in short timeframes
  - Missing or inconsistent service logs
- Alerts could help service centers maintain data integrity or prevent misuse.


**Business Value**:
- Improves reliability of data
- Detects fraudulent or incorrect entries early

### 4. AI-Driven Recommendations
**Goal**: Use pattern recognition to give users proactive insights.

*Examples:

- “You usually drive 800 km per week — your next service is due in 3 weeks.”
- “Based on your usage and climate, consider checking your battery earlier.”
- “Your fuel efficiency dropped by 15% — might be time for an air filter change.”

## 5. Data Needed for ML Expansion

To implement these ideas realistically, we’d need:

- Vehicle usage logs (mileage over time)-Maintenance history (type, cost, outcome)
- Optional contextual data (weather, road conditions)
- User feedback (was the reminder accurate or too early?)

Even a small dataset can be used to create a proof-of-concept predictive model that evolves over time.

## Future Vision

This app could evolve into a “Smart Car Care Companion”, combining:

- Predictive analytics for timing

- AI-generated explanations

- Integrated chat or voice assistant

- Business dashboard for workshops (showing predictive insights across customers)

## Future Enhancements

- User authentication and multi-user support
- Database migration (PostgreSQL/MongoDB)
- Export maintenance history to PDF
- Integration with vehicle APIs for automatic mileage updates
- Mobile application (React Native)
- Email/SMS reminder notifications

## Author

Christofine Chang
P3 Group Technical Assessment
October 2025

## Licence

This project was created for evaluation purposes as part of a job interview process.