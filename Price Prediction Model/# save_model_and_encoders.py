# save_model_and_encoders.py

import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
import joblib

# Load dataset
df = pd.read_csv("D:\\shashank\\raw_material_price_dataset.csv")
df['Date'] = pd.to_datetime(df['Date'])
df['Day'] = df['Date'].dt.dayofyear

# Encode categorical variables
weather_encoder = LabelEncoder()
demand_encoder = LabelEncoder()
df['Weather'] = weather_encoder.fit_transform(df['Weather'])
df['Demand'] = demand_encoder.fit_transform(df['Demand'])

# Train model
X = df[['Day', 'Weather', 'Demand']]
y = df['Price']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = LinearRegression()
model.fit(X_train, y_train)

# Save everything
joblib.dump(model, 'price_model.pkl')
joblib.dump(weather_encoder, 'weather_encoder.pkl')
joblib.dump(demand_encoder, 'demand_encoder.pkl')

print("✅ Model and encoders saved!")
