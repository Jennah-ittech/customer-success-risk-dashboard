# Customer Success Risk Dashboard

A React-based customer health dashboard designed to help account teams prioritize interventions based on product usage, support pressure, and overall account health.

## Why this project matters

This project demonstrates how to translate operational signals into a decision-support interface for customer success teams. It is built to surface the accounts most likely to churn or require intervention, while keeping the experience simple enough for leadership and customer success managers to act on quickly.

## What is included

- Risk scoring across multiple account health signals
- Portfolio filtering by account severity
- Detailed account drill-down view with recommended action
- Trend visualization for health and adoption over time
- Data layer that supports JSON-backed inputs with graceful local fallback
- Modular component structure for maintainability and expansion

## Tech stack

- React
- Vite
- GitHub Pages deployment workflow
- CSS for dashboard styling and responsiveness

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Deployment

This project is configured for GitHub Pages deployment through the workflow in `.github/workflows/deploy.yml`.

## Data model

The dashboard uses a structured customer record model with the following key signals:

- health score
- product usage
- open support tickets
- renewal window
- account owner
- sentiment / risk category
