# Deutschland entdecken

Technische Testaufgabe für **INFORMA GmbH & Co. KG** (Oelsnitz/Vogtland).

## Aufgabe

Erstellung einer einseitigen Website mit Node.js und Nuxt auf TypeScript.

## Tech Stack

- **Node.js** v24 (Active LTS)
- **Nuxt 3** — Full-Stack Framework
- **TypeScript** — strict mode
- **openmeteo** — offizieller Open-Meteo API Client

## Projektstruktur
```bash
germany-travel/
├── app/
│   ├── app.vue
│   ├── assets/css/main.css
│   ├── components/
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   ├── RegionsSection.vue
│   │   ├── Tips.vue
│   │   └── Widget.vue
│   └── pages/
│       └── index.vue
├── server/
│   └── api/
│       └── weather.get.ts
└── nuxt.config.ts
```

## API

`GET /api/weather?date=YYYY-MM-DD`

Gibt die historische Durchschnittstemperatur für Oelsnitz/Vogtland zurück.  
Datenquelle: [Open-Meteo Archive API](https://open-meteo.com/en/docs/historical-weather-api)

Beispiel:

```bash
curl "http://localhost:3000/api/weather?date=2023-07-15"
# {"date":"2023-07-15","tempMean":21.3}
```
