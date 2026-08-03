# Weave Destination Experience

Weave is a two-page travel discovery experience made for exhibition visitors. A visitor enters a name, chooses a region, and receives a randomly selected visual destination card.

This repository is a static front-end project. The recommendation is random: there is currently no AI model, travel API, backend, or database behind it.

## Demo

- Live demo: [vincentlow02.github.io/weave-destination-experience](https://vincentlow02.github.io/weave-destination-experience/)
- GitHub: [github.com/vincentlow02/weave-destination-experience](https://github.com/vincentlow02/weave-destination-experience)
- Screenshots: The repository does not currently contain screenshots or a demo GIF. Before sharing the project, add one desktop screenshot, one mobile screenshot, and a short GIF showing name entry, region selection, and the result card.

## How It Works

```text
User
  ↓
Browser frontend (HTML, Tailwind CSS, custom CSS, JavaScript)
  ├──→ Static destination SVGs and icons
  ├──→ Browser storage (sessionStorage and localStorage)
  └──→ Google Analytics (result page only)
```

The visitor starts on `index.html`. `js/script.js` validates the form, selects a random SVG from the chosen region, and saves the selected image path and visitor name in browser storage. It then opens `country.html`, where `js/country.js` reads that stored data and renders the destination card with a live timestamp.

The two storage types serve slightly different purposes: `sessionStorage` keeps the latest choice for the current tab, while `localStorage` acts as a persistent fallback. All destination selection and rendering happen in the browser.

## Project Structure

```text
.
├── index.html                 # Name and region selection page
├── country.html               # Generated destination result page
├── js/
│   ├── script.js              # Selection, validation, storage, and motion effects
│   └── country.js             # Destination metadata and result rendering
├── css/
│   ├── style.css              # Selection page styles and animations
│   └── country.css            # Result page styles and animations
├── assets/regions/            # Destination artwork grouped by region
├── icon-button/               # UI icons and supporting graphics
└── convert-to-webp.ps1        # Optional local image-conversion helper
```

The project intentionally has no application framework, package manifest, server code, or database schema.

## Technology

- Semantic HTML for the two-page flow
- Tailwind CSS 3.4.17 loaded from the Tailwind CDN
- Custom CSS for layout, typography, transitions, and motion
- Vanilla JavaScript for selection and rendering
- Web Storage API for passing state between pages
- Google Analytics on `country.html`
- GitHub Pages for static hosting

## Getting Started

### Prerequisites

- Git
- A modern browser
- Python 3 for the local server command below, or any equivalent static file server
- Internet access while developing, because Tailwind CSS is loaded from a CDN

### Installation

```bash
git clone https://github.com/vincentlow02/weave-destination-experience.git
cd weave-destination-experience
```

There are no npm packages or other application dependencies to install.

### Environment Variables

No environment variables are used. An `.env` or `.env.example` file is therefore not required. The Google Analytics measurement ID is currently written directly in `country.html`; it is an identifier rather than a secret, but making analytics configurable would be cleaner.

### Local Development

Run a static server from the project root:

```bash
python -m http.server 5501
```

Then open [http://localhost:5501](http://localhost:5501).

Opening the HTML files directly may work for the main flow, but a local server is recommended because `country.js` fetches SVG files when preparing the result thumbnail.
