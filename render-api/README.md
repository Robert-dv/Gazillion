# Gazillion Contact API

This service receives contact form submissions and sends them to your inbox via SMTP.

## Environment variables

Copy `.env.example` and fill in your SMTP settings:

- `PORT`
- `ALLOWED_ORIGIN`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_TO`
- `MAIL_FROM`

## Run locally

```bash
npm install
npm start
```

The API will be available at `http://localhost:3000/api/contact`.
