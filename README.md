# Customer Success Risk Dashboard

A React dashboard prototype that turns customer account signals into a simple risk view and a suggested follow-up action. I built it to explore how customer success teams can spot accounts that may need attention and prioritize proactive outreach.

**Live demo:** [Open the Customer Success Risk Dashboard](https://jennah-ittech.github.io/customer-success-risk-dashboard/)

> **Demo data:** The account names, owners, scores, ticket counts, and renewal dates shown in this project are fictional sample data. They do not represent real customers or measured business outcomes.

## What it does

- Displays a small portfolio of customer accounts with health, product usage, support ticket, and renewal signals.
- Assigns each account a High, Medium, or Low risk label using transparent threshold rules.
- Filters the account list by risk level and updates the selected account details.
- Shows a suggested next step based on the account's risk category.

The risk labels and follow-up suggestions are rule-based demo logic. This project does not currently use AI, connect to a CRM, or load live customer data.

## Built with

- React
- JavaScript
- Vite
- CSS

## Run locally

Requirements: Node.js and npm.

```bash
git clone https://github.com/Jennah-ittech/customer-success-risk-dashboard.git
cd customer-success-risk-dashboard
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

To create a production build:

```bash
npm run build
```

## Project status

This is a front-end portfolio prototype using in-code sample data. It is intended to demonstrate interface development, interactive filtering, and a straightforward approach to translating business signals into follow-up priorities. It is not a production customer-management system.

## Ideas for future improvements

- Add tests for risk classification and filtering.
- Make the risk thresholds configurable and explain each account's risk factors.
- Add accessible charts and responsive layouts for mobile screens.
- Add a documented data import path using safe, synthetic data.
- Explore persistence and a backend only after defining privacy and security requirements.

## Author

Created by [Jennah Higgins](https://github.com/Jennah-ittech), a DeVry University student interested in practical business technology and customer-focused problem-solving.
