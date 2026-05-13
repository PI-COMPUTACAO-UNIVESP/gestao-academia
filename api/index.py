from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import os

app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

# Permite que o site acesse esta IA
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Caminho da IA produzida no Colab
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "modelo_churn_academia.pkl")

class PredictRequest(BaseModel):
    frequencia_semanal: float
    atrasos_pagamento: float

@app.get("/api/py/status")
def home():
    return {"status": "IA Online e Pronta", "model_loaded": os.path.exists(MODEL_PATH)}

@app.post("/api/py/predict")
def predict_churn(data: PredictRequest):
    try:
        freq = data.frequencia_semanal
        atraso = data.atrasos_pagamento

        if os.path.exists(MODEL_PATH):
            model = joblib.load(MODEL_PATH)

            df = pd.DataFrame([[freq, atraso]], columns=['frequencia_semanal', 'atrasos_pagamento'])

            prediction = model.predict_proba(df)[0][1]
        else:
            prediction = 0.8 if freq < 3 and atraso > 5 else 0.2

        risk_score = float(prediction)
        is_alert = bool(risk_score > 0.7)

        return {
            "status": "success",
            "churn_risk": round(risk_score, 2),
            "alert": is_alert
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}
