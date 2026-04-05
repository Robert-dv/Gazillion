# Gazillion Company Website

A corporate portfolio website for Gazillion Company, a Rwanda-based IT and AI engineering firm specializing in software development, automation, and cloud systems.

## Project Structure

- **Root:** Static HTML/CSS/JS website (no build step required)
  - `index.html` — Main landing page
  - `ceo-robert-uyisenga.html` — CEO profile page
  - `thank-you.html` — Contact form success page
  - `style.css` / `main.js` — Root-level copies of main assets
  - `server.js` — Static file server (Node.js, port 5000)
- **`/css`** — Stylesheets (`style.css`, `ceo-profile.css`)
- **`/js`** — Frontend JavaScript (`main.js`)
- **`/Assets`** — SVG illustrations and MP4 background videos
- **`/render-api`** — Node.js/Express backend for contact form emails

## Architecture

- **Frontend:** Plain HTML, CSS, and Vanilla JavaScript served by a custom Node.js static file server on port 5000
- **Backend API:** Express.js contact form email service on port 3000 (uses Nodemailer + SMTP)
- **Package manager:** npm (backend only)

## Workflows

- **Start application** — Runs `node server.js` on port 5000 (frontend static server)
- **Backend API** — Runs `cd render-api && node server.js` on port 3000 (contact form API)

## Environment Variables (Backend)

Set in the Replit environment secrets for email functionality:

- `PORT` — Backend port (default: 3000)
- `ALLOWED_ORIGIN` — Comma-separated list of allowed CORS origins
- `SMTP_HOST` — SMTP server hostname
- `SMTP_PORT` — SMTP port (default: 587)
- `SMTP_USER` — SMTP username
- `SMTP_PASS` — SMTP password
- `MAIL_TO` — Recipient email address
- `MAIL_FROM` — Sender name/email

## Deployment

Configured as `autoscale` deployment running `node server.js`.
