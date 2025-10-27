from fastapi.middleware.cors import CORSMiddleware


# Function to add CORS middleware to a FastAPI app
def add_cors(app):
    app.add_middleware(  # This adds the middleware to the FastAPI application
        CORSMiddleware,
        allow_origins=["*"],  # Allow requests from any origin
        allow_credentials=True,  # Allow cookies and authentication headers
        allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
        allow_headers=["*"],  # Allow all headers
    )
