# Smart Inventory Optimization Platform

A modern, AI-powered inventory management dashboard for retailers, featuring real-time tracking, demand forecasting, autonomous reordering, and actionable insights.

## Features

- **Real-Time Inventory Tracking:**  
  Monitors live stock levels across all retail locations, synced with POS systems and warehouses.

- **AI-Powered Demand Forecasting:**  
  Uses machine learning and advanced analytics to forecast demand, incorporating real-time data.

- **Autonomous Reordering Engine:**  
  Predicts restock needs and generates purchase orders before stockouts occur.

- **Stockout & Overstock Prevention:**  
  Maintains optimal stock levels and provides alerts for abnormal demand surges or dips.

- **Multi-Channel Integration:**  
  Unified inventory across online, offline, and in-store platforms.

- **Manual Order Placement:**  
  Place and track manual orders directly from the dashboard.

- **Downloadable Reports:**  
  Download inventory recommendations as CSV.

- **Modern, Responsive UI:**  
  Beautiful dashboard with sidebar and top navigation. Works on desktop and mobile.

---

## Tech Stack

- **Frontend:** React + Vite + Chart.js, Axios, CSS
- **Backend:** Python Flask + Pandas + NumPy + Flask-CORS
- **Data:** CSV files (forecast, inventory, sales, etc.)

---

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm

### Backend Setup

1. **Navigate to the backend folder:**
   ```sh
   cd Backend
   ```

2. **Create and activate a virtual environment:**
   ```sh
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```sh
   pip install flask flask-cors pandas numpy
   ```

4. **Ensure your CSV data files (e.g., `forecast_45_day.csv`) are present in the Backend directory.**

5. **Run the Flask server:**
   ```sh
   python3 app.py
   ```
   The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to the frontend folder:**
   ```sh
   cd frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173` (or the next available port).

---

## Usage

- **Dashboard:** See live inventory status, recommendations, and AI insights.
- **Inventory:** Search, filter, and page through real-time recommendations.
- **Forecast:** View raw forecasted demand for every item/store/date.
- **Manual Orders:** Place manual purchase orders and see status.
- **Alerts:** Get notified of stockouts and overstock risks.
- **Download:** Export inventory plans as CSV for further analysis.

---

## Customization & Extensions

- Integrate with your own data sources (replace CSVs with databases or APIs).
- Add RAG-powered AI chat or insights (Retrieval-Augmented Generation).
- Add authentication, advanced analytics, or real-time notifications.

---

## License

MIT License