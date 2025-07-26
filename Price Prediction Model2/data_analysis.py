# 🧠 Import necessary libraries
import pandas as pd
from sklearn.linear_model import Ridge
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import pickle
import os

# 📂 Load the dataset
df = pd.read_csv("Agriculture_price_dataset.csv")

# 🧹 Clean column names
df.columns = df.columns.str.strip()
df.columns = df.columns.str.replace(r"\s+", " ", regex=True)

df.head()

# ✅ Filter for Onion, Tomato, Wheat
crops = ["Onion", "Tomato", "Wheat"]
df_filtered = df[df["Commodity"].isin(crops)].copy()

# 🧼 Drop missing essential fields
required_cols = ["Commodity", "STATE", "District Name", "Market Name", "Variety", "Grade", "Modal_Price"]
df_filtered = df_filtered.dropna(subset=required_cols)

# Rename columns for convenience
df_filtered.rename(columns={
    "District Name": "District",
    "Market Name": "Market"
}, inplace=True)

# 🔠 Encode categorical features
categorical_cols = ["STATE", "District", "Market", "Variety", "Grade"]
encoder_dir = "encoders"
os.makedirs(encoder_dir, exist_ok=True)

encoders = {}

for col in categorical_cols:
    le = LabelEncoder()
    df_filtered[col] = le.fit_transform(df_filtered[col].astype(str))
    encoders[col] = le
    
    # Save encoder
    with open(f"{encoder_dir}/{col.lower()}_encoder.pkl", "wb") as f:
        pickle.dump(le, f)

# 🧠 Train and save models for each crop
model_dir = "models"
os.makedirs(model_dir, exist_ok=True)

for crop in crops:
    crop_df = df_filtered[df_filtered["Commodity"] == crop]
    X = crop_df[["STATE", "District", "Market", "Variety", "Grade"]]
    y = crop_df["Modal_Price"]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = Ridge(alpha=1.0)
    model.fit(X_train, y_train)
    
    # Save model
    with open(f"{model_dir}/{crop.lower()}_model.pkl", "wb") as f:
        pickle.dump(model, f)

print("✅ All models and encoders saved successfully!")
