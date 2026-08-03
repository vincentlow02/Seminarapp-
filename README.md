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

### Build

There is no build step. GitHub Pages serves the source files directly from the root of the `main` branch.

## Challenges and Learnings

1. **Passing data between static pages:** With no backend, the selected image path and visitor name are written on the first page and read on the result page. Using both session and local storage avoids losing the latest selection during the redirect, but it also means the visitor name can remain in the browser.
2. **Keeping destination data consistent:** `js/script.js` contains the region-to-image lists, while `js/country.js` contains a separate metadata map. A file path must match in both places for the result page to show a known country name and region; otherwise it uses the `Unknown`/`Other` fallback.
3. **Displaying SVG artwork reliably:** The main card uses the SVG file directly. The circular thumbnail fetches the same SVG and converts it to a Base64 data URL, with the original path as a fallback if the fetch fails.
4. **Balancing custom motion with a simple stack:** The selection page adds a magnetic call-to-action, pointer-based parallax, and a continuous breathing animation with vanilla JavaScript. This keeps the project framework-free, but the animation loop and pointer behavior still need accessibility and performance testing.
5. **Iterating on sharing and capture behavior:** Git history shows several attempts to support result screenshots and sharing, including canvas cross-origin fixes. That feature was later removed, leaving a simpler display-only result flow and some related SVG conversion code to reassess.

## Current Limitations

- Despite the `Weave AI` text in the interface, the code uses `Math.random()` and does not call an AI service. The recommendation is not personalized beyond the selected region.
- The app shows a visual destination card but does not provide descriptions, activities, prices, maps, booking links, or live travel data.
- The `Other` region includes assets that are not present in the destination metadata map, so those results deliberately display `Unknown` and `Other`.
- Both HTML pages reference `icon-button/flight-takeoff-line.png`, while the file currently lives at `icon-button/other/flight-takeoff-line.png`. The icon is therefore missing unless the path or file location is corrected.
- Tailwind runs from a CDN in the browser. There is no local Tailwind build, asset bundling, offline support, or dependency lockfile.
- The destination lists and metadata are duplicated across two JavaScript files, making updates easy to miss.
- There are no automated tests, linting rules, or documented browser/accessibility checks.
- The visitor name is retained in `localStorage`, and there is no clear-data control or privacy explanation in the interface.
- Google Analytics is hard-coded on the result page and is not disabled automatically during local development.

## Future Improvements

- Fix the broken flight icon references and add a small automated check for missing static assets.
- Move destination file paths and metadata into one shared data source.
- Decide whether `Other` destinations should receive full metadata or use a clearer generic card.
- Add keyboard, reduced-motion, screen-reader, mobile viewport, and cross-browser checks.
- Replace the runtime Tailwind CDN with a small production CSS build if the project needs offline use or stricter dependency control.
- Add a privacy note, a clear-data action, and an option to disable analytics outside production.
- Add a focused end-to-end test for the name → region → result flow.

## Recognition

No verified hackathon result or award is documented in this repository. Add recognition only when there is a public result page, organizer announcement, certificate, or other source that can be linked.

## License

No license is currently included. MIT would be a reasonable choice for this small static codebase if the intention is to let others reuse the code with attribution. Before adding it, confirm that every destination illustration, icon, and font can be redistributed under compatible terms. A license should only be added after the repository owner approves it.
