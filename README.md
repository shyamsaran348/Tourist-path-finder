# 🗺️ Tourist Landmark Path Finder

A full-stack web application for finding the shortest path between tourist landmarks. The frontend is built with React, and the backend uses Flask with a Breadth-First Search (BFS) algorithm to find the optimal route.

## ✨ Features

- **Interactive Graph Visualization:** A visual representation of landmarks and connections using `react-force-graph-2d`.
- **Shortest Path Algorithm:** Utilizes a Breadth-First Search (BFS) algorithm to find the shortest path in terms of the number of stops.
- **Dynamic Path Highlighting:** The found path is highlighted in the graph for clear visualization.
- **RESTful API:** A simple Flask backend that serves a REST API endpoint for pathfinding.
- **Responsive UI:** A clean and modern user interface built with React.

## ⚙️ Technologies Used

### Frontend
- **React:** A JavaScript library for building user interfaces.
- **`axios`:** A promise-based HTTP client for making API requests.
- **`react-force-graph-2d`:** A component for visualizing graph data.

### Backend
- **Flask:** A lightweight Python web framework.
- **`flask-cors`:** A Flask extension for handling Cross-Origin Resource Sharing.
- **`collections.deque`:** Used to implement an efficient queue for the BFS algorithm.

## 🚀 Getting Started

### Prerequisites

- Node.js (with npm or yarn)
- Python 3.x
- `pip` (Python package installer)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR-USERNAME/Tourist-path-finder.git](https://github.com/YOUR-USERNAME/Tourist-path-finder.git)
    cd Tourist-path-finder
    ```

2.  **Set up the backend (Flask):**
    ```bash
    # Navigate into the backend directory
    cd backend  
    # Create a virtual environment (recommended)
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    # Install the required Python packages
    pip install Flask Flask-CORS
    ```

3.  **Set up the frontend (React):**
    ```bash
    # Navigate back to the project root and then into the frontend directory
    cd ../frontend
    # Install the Node.js dependencies
    npm install 
    ```

### Running the Application

1.  **Start the backend server:**
    Open a new terminal window or tab, navigate to the **backend** directory, and run:
    ```bash
    python app.py
    ```
    The server will start on `http://127.0.0.1:5000`.

2.  **Start the frontend development server:**
    Open another new terminal window or tab, navigate to the **frontend** directory, and run:
    ```bash
    npm start
    ```
    This will open the application in your browser at `http://localhost:3000`.

## 📌 Usage

- Use the "Start" and "Destination" dropdown menus to select two landmarks.
- The path will be automatically calculated and displayed below the dropdowns.
- The path will be highlighted in red on the graph visualization.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/YOUR-USERNAME/Tourist-path-finder/issues).

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
