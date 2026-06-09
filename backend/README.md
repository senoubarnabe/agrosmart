# AgroSmart Backend

API Express TypeScript pour simuler et préparer l'integration IoT AgroSmart.

Le materiel physique n'est pas encore requis. Les mesures capteurs, la pompe, les alertes et les parcelles sont simulees en memoire pour permettre au frontend et aux tests de travailler avant l'arrivee des composants ESP32.

## Installation

```bash
cd backend
npm install
```

## Lancer en developpement

```bash
npm run dev
```

API locale :

```text
http://localhost:4000/api
```

## Routes principales

- `GET /api/health`
- `GET /api/parcels`
- `POST /api/parcels`
- `GET /api/sensors/latest`
- `POST /api/iot/readings`
- `GET /api/pump`
- `POST /api/pump`
- `GET /api/alerts`
- `POST /api/irrigation/programs/generate`

## Integration ESP32 plus tard

L'ESP32 pourra envoyer ses mesures avec :

```http
POST /api/iot/readings
Content-Type: application/json

{
  "parcelId": "parcel-tomatoes",
  "soilHumidity": 42,
  "temperature": 34,
  "waterLevel": 28,
  "flowRate": 3.2,
  "leakDetected": false
}
```
