# Groundwork — Vendor Compliance Demo

A front-end prototype for small general contractors to track subcontractor paperwork, spot expiring documents, and check who is ready to mobilize.

**Live demo:** [Open Groundwork](https://jennah-ittech.github.io/customer-success-risk-dashboard/)

> **Demo data:** All vendor names, contacts, project counts, and document records are fictional. This is a UI prototype, not a compliance or document-storage service.

## What it does

- Shows a vendor roster with document completion and mobilization status.
- Filters and searches vendors, then opens a per-vendor compliance checklist.
- Adds vendors with an insurance, tax, license, and safety document checklist.
- Simulates uploading one document by recording its filename in the demo.
- Exports the current vendor roster as CSV and prepares a sample document-request notice.
- Adapts to mobile layouts.

The demo does not upload files to a server, send email, verify documents, or connect to accounting, email, or project-management systems. File selection is local to the browser session.

## Built with

- React
- JavaScript
- Vite
- CSS

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Create a production build with `npm run build`.

## Project status

This is an early product demo intended to validate a focused workflow with small subcontractors. Before using real vendor records, the product would need secure file storage, access controls, audit history, retention policies, and reviewed security practices.

## Author

Created by [Jennah Higgins](https://github.com/Jennah-ittech).
