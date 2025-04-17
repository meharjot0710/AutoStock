from flask import Flask, jsonify, request, send_file
from flask_cors import CORS  # Import CORS
import pandas as pd
import numpy as np
import os
from ollama_rog import generate_answer
import io

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Load the forecast data
forecast_path = 'forecast_45_day.csv'

if os.path.exists(forecast_path):
    forecast_df = pd.read_csv(forecast_path, parse_dates=['date'])
else:
    forecast_df = pd.DataFrame()  # fallback if not found

@app.route('/rag-query', methods=['POST'])
def rag_query():
    data = request.get_json()
    query = data.get('query')

    if not query:
        return jsonify({"error": "Missing query"}), 400

    answer = generate_answer(query)
    return jsonify({"response": answer})

@app.route('/query-inventory', methods=['POST'])
def query_inventory():
    query = request.json['query']
    agent = create_csv_agent(OpenAI(temperature=0), 'forecast_45_day.csv', verbose=False)
    response = agent.run(query)
    return jsonify({'response': response})

# Inventory Recommendation Function
def generate_inventory_recommendations(forecast_df):
    forecast_summary = forecast_df.groupby(['store_id', 'item_id'])['predicted_quantity'].sum().reset_index()
    forecast_summary.rename(columns={'predicted_quantity': 'forecasted_45_day_demand'}, inplace=True)

    # Simulated current inventory
    np.random.seed(42)
    forecast_summary['current_inventory'] = np.random.randint(0, 200, size=len(forecast_summary))

    # Buffer and reorder quantity
    forecast_summary['buffer_stock'] = (0.10 * forecast_summary['forecasted_45_day_demand']).round()
    forecast_summary['reorder_qty'] = (
        forecast_summary['forecasted_45_day_demand'] + forecast_summary['buffer_stock']
        - forecast_summary['current_inventory']
    ).clip(lower=0).round()

    forecast_summary['reorder_required'] = forecast_summary['reorder_qty'] > 0
    return forecast_summary.sort_values(by='reorder_qty', ascending=False)


@app.route('/inventory-recommendations', methods=['GET'])
def inventory_recommendations():
    page = int(request.args.get('page', 1))  # Default page is 1
    limit = int(request.args.get('limit', 50))  # Default limit is 50
    offset = (page - 1) * limit

    if forecast_df is None or forecast_df.empty:
        return jsonify({'error': 'No forecast data available'}), 400

    inventory_plan = generate_inventory_recommendations(forecast_df)
    total_items = len(inventory_plan)
    total_pages = (total_items // limit) + (1 if total_items % limit > 0 else 0)
    paginated_items = inventory_plan[offset:offset + limit]

    result = {
        'items': paginated_items.to_dict(orient='records'),
        'totalPages': total_pages
    }

    return jsonify(result)


@app.route('/inventory-recommendations/download', methods=['GET'])
def download_inventory_csv():
    if forecast_df is None or forecast_df.empty:
        return jsonify({'error': 'No forecast data available'}), 400

    inventory_plan = generate_inventory_recommendations(forecast_df)
    buffer = io.StringIO()
    inventory_plan.to_csv(buffer, index=False)
    buffer.seek(0)

    return send_file(
        io.BytesIO(buffer.getvalue().encode()),
        mimetype='text/csv',
        as_attachment=True,
        download_name='inventory_plan.csv'
    )


@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Inventory Optimization API!"


if __name__ == '__main__':
    app.run(debug=True)
