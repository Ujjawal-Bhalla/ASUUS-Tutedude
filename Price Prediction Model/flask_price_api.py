from flask import Flask, request, jsonify, render_template
import pickle
import numpy as np

app = Flask(__name__)

# Load model and encoders
model = pickle.load(open("price_model.pkl", "rb"))
weather_encoder = pickle.load(open("weather_encoder.pkl", "rb"))
demand_encoder = pickle.load(open("demand_encoder.pkl", "rb"))

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    day = int(data["day"])
    weather = data["weather"]
    demand = data["demand"]

    # Encode inputs
    weather_encoded = weather_encoder.transform([weather])[0]
    demand_encoded = demand_encoder.transform([demand])[0]

    input_data = np.array([[day, weather_encoded, demand_encoded]])
    prediction = model.predict(input_data)[0]

    return jsonify({"predicted_price": round(prediction, 2)})

if __name__ == '__main__':
    app.run(debug=True)
