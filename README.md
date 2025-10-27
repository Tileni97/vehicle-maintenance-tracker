# Vehicle Maintenance Tracker

A comprehensive web application for tracking vehicle maintenance history and managing service reminders. Built as part of the P3 Group technical assessment.

## Overview

This system helps vehicle owners maintain their cars by tracking service history and providing intelligent reminders for upcoming maintenance. The application features a clean, intuitive interface with a robust backend API.

## Features

### Core Functionality
- **Vehicle Management**: Add and manage multiple vehicles with model, year, and current mileage
- **Maintenance History**: Record all service events including type, date, mileage, cost, and notes
- **Smart Reminders**: Rule-based system that calculates when services are due based on both mileage and time intervals
- **Status Indicators**: Visual colour-coded alerts for overdue, due soon, and OK maintenance items

### Technical Highlights
- RESTful API architecture
- Modular, maintainable codebase
- JSON-based data persistence
- Responsive design for mobile and desktop
- Real-time mileage tracking updates

## Technology Stack

### Backend
- **FastAPI**: Modern Python web framework for building APIs
- **Pydantic**: Data validation using Python type annotations
- **Uvicorn**: ASGI server for running the application

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

## AI/ML Enhancement Opportunities

### 1. Predictive Maintenance
**Problem**: Reactive maintenance can lead to unexpected breakdowns and higher costs.

**Solution**: Implement a machine learning model that predicts component failures before they occur.

**Approach**:
- Train on historical maintenance data across similar vehicle models
- Features: vehicle age, mileage, service history, driving conditions
- Output: Probability of failure for each component within next 30/60/90 days
- Model: Random Forest or Gradient Boosting for tabular data

**Business Value**:
- Reduce unexpected breakdowns by 30-40%
- Lower long-term maintenance costs through preventive action
- Improve customer satisfaction and safety

### 2. Cost Optimisation & Anomaly Detection
**Problem**: Customers don't know if they're paying fair prices for services.

**Solution**: Analyse service costs across the user base to identify optimal pricing and detect overcharging.

**Approach**:
- Clustering similar services (location, vehicle type, service type)
- Anomaly detection on cost outliers
- Provide cost recommendations and average price ranges
- Model: Isolation Forest for anomaly detection, K-means for clustering

**Business Value**:
- Build trust through transparent pricing insights
- Help customers save 15-20% on maintenance costs
- Competitive advantage in the market

### 3. Personalised Smart Reminders
**Problem**: Generic reminders don't account for individual driving habits and patterns.

**Solution**: Machine learning system that adapts to each user's behaviour.

**Approach**:
- Track when users actually service their vehicles vs. when reminded
- Learn patterns: highway vs. city driving, seasonal usage
- Adjust reminder timing and urgency based on individual patterns
- Model: Time series analysis with LSTM for pattern recognition

**Business Value**:
- Increase reminder engagement by 40-50%
- Reduce notification fatigue
- More relevant, actionable insights for users

### 4. Vehicle Health Score
**Problem**: Users can't easily understand their vehicle's overall condition.

**Solution**: Generate a comprehensive health score (0-100) using multiple factors.

**Approach**:
- Weighted scoring model considering:
  - Maintenance compliance rate
  - Time since last major services
  - Vehicle age and mileage
  - Historical issue frequency
- Explainable AI to show which factors impact the score
- Model: Ensemble of regression models with interpretability

**Business Value**:
- Simple, actionable metric for vehicle condition
- Drive engagement with maintenance recommendations
- Aid in resale value estimation

## Implementation Considerations

For a proof of concept, I would recommend starting with **Cost Optimisation** because:
1. Requires minimal additional data collection
2. Provides immediate, tangible value to users
3. Can be implemented with existing maintenance cost data
4. Demonstrates clear ROI for the business
5. Simpler to explain and validate than predictive models

## Development Notes

- Development time: Approximately 2-3 hours
- Focus: Clean, maintainable code over extensive features
- Architecture: Separation of concerns with modular design
- Testing: Manual testing via API documentation and frontend UI

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