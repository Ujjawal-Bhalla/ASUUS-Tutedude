from fastapi import FastAPI
from pydantic import BaseModel
import xgboost as xgb
import pandas as pd

app = FastAPI()

# Load XGBoost model
model = xgb.Booster()
model.load_model("./backend/prediction-model/Model/xgb_price_model.json")

# Pydantic input model
class InputData(BaseModel):
    Day: int
    Month: int
    Year: int

@app.post("/predict")
def predict_price(data: InputData):
    df = pd.DataFrame([data.model_dump()])
    dmatrix = xgb.DMatrix(df)
    prediction = model.predict(dmatrix)
    return {"predicted_price": float(prediction[0])}
