# BigQuery Release Notes App (event-talks-app)

A modern, responsive web application that fetches and displays the latest release notes for Google Cloud BigQuery.

## Features
- **Live Feed**: Fetches real-time release notes using the official BigQuery RSS feed.
- **Modern UI**: Features a sleek dark mode with glassmorphism effects.
- **One-Click Tweet**: Easily share updates on Twitter with automatically generated, truncated snippets.
- **Asynchronous Refresh**: Updates the feed seamlessly without reloading the page.

## Tech Stack
- **Backend**: Python Flask, `feedparser`
- **Frontend**: Vanilla HTML, CSS, JavaScript

## Installation and Usage

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
2. **Run the server:**
   ```bash
   python app.py
   ```
3. **Open your browser:**
   Navigate to `http://127.0.0.1:5000/`.
