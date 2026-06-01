# NavalMaint AI Agent — Lab Fullstack con Agente IA

Asistente de mantenimiento naval con agente LangGraph, RAG sobre documentos reales del Guardamar Talía y frontend React con streaming SSE.

## Stack

**Backend:** Python + FastAPI + LangGraph + ChromaDB + Groq (LLaMA 3.3)  
**Frontend:** React 18 + Vite + React Router v6

## Estructura
lab-web-fullstack-with-ai-agent/
├── backend/
│   ├── agent/
│   │   └── agent.py        ← agente LangGraph + RAG
│   ├── docs/
│   │   └── vessel_1/       ← plan de mantenimiento Guardamar Talía
│   ├── main.py             ← FastAPI + CORS + endpoints
│   ├── .env.example
│   └── requirements.txt
└── frontend/
├── src/
│   ├── api/            ← auth.js + client.js
│   ├── context/        ← AuthContext.jsx
│   ├── components/     ← Chat.jsx + ProtectedRoute.jsx
│   ├── pages/          ← LoginPage.jsx + ChatPage.jsx
│   └── App.jsx
├── .env.example
└── package.json

## Instalación

### Backend

```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # Windows
pip install -r requirements.txt
```

Crea `backend/.env`:
GROQ_API_KEY=tu_groq_api_key
DEMO_TOKEN=demo-token-12345
ALLOWED_ORIGINS=http://localhost:5173

### Frontend

```bash
cd frontend
npm install
```

Crea `frontend/.env`:
VITE_API_URL=http://localhost:8000

## Arrancar en local

```bash
# Terminal 1 — Backend
cd backend
source venv/Scripts/activate
uvicorn main:app --reload

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Abre http://localhost:5173

## Credenciales de acceso

- **Token:** `demo-token-12345`

## Funcionalidades

- ✅ Autenticación con token Bearer
- ✅ Rutas protegidas — redirige a `/login` sin token
- ✅ Chat con streaming SSE token a token
- ✅ RAG sobre el plan de mantenimiento real del Guardamar Talía
- ✅ Agente con memoria de sesión (LangGraph + MemorySaver)
- ✅ Gestión de errores de conexión

## Documentos indexados

Plan de mantenimiento del Guardamar Talía dividido por frecuencia:

| Archivo | Contenido |
|---|---|
| 01_info_general.txt | Datos técnicos y equipos del buque |
| 02_mantenimiento_diario.txt | Tareas diarias |
| 03_mantenimiento_2dias_4dias.txt | Tareas cada 2 y 4 días |
| 04_mantenimiento_semanal.txt | Tareas semanales |
| 05_mantenimiento_quincenal.txt | Tareas quincenales |
| 06_mantenimiento_mensual.txt | Tareas mensuales |
| 07_mantenimiento_bimestral_trimestral.txt | Tareas bimestrales y trimestrales |
| 08_mantenimiento_semestral.txt | Tareas semestrales |
| 09_mantenimiento_anual.txt | Tareas anuales |
| 10_mantenimiento_bianual.txt | Tareas bianuales |

## Arquitectura RAG

Los documentos están organizados por `vessel_id` en `docs/vessel_1/`. Esta estructura permite escalar a múltiples embarcaciones añadiendo carpetas `vessel_2/`, `vessel_3/`... con filtro por metadatos en ChromaDB — sin mezclar datos entre barcos.

## Relación con NavalMaint

Este lab es el motor de IA de [NavalMaint](https://navalmaint.vercel.app), una app de gestión de mantenimiento naval. La integración prevista incluye:

- Chat contextual por barco filtrado por `vessel_id`
- Importación de planes de mantenimiento desde PDF via API Anthropic
- Alertas automáticas de mantenimiento pendiente