# Weave Destination Experience

An interactive travel discovery experience created for exhibition visitors. Enter your name, choose a region, and receive a randomly selected destination card.

## Live Demo

[View Weave Destination Experience](https://vincentlow02.github.io/weave-destination-experience/)

## Features

- Name-based destination card
- Six region categories to choose from
- Random destination selection using local artwork
- English and Japanese destination labels
- Responsive interface with custom motion effects
- Browser-based state with no account or installation required

## How It Works

```text
Visitor
  ↓
Enter a name and choose a region
  ↓
JavaScript selects a destination
  ↓
The result page displays a personalized card
```

The selection page stores the visitor's name and destination in browser storage. The result page reads that information and renders the matching SVG artwork, destination details, and timestamp. The experience runs entirely in the browser.

## Technology

- HTML5
- Tailwind CSS
- Custom CSS
- Vanilla JavaScript
- Web Storage API
- GitHub Pages

## Run Locally

Clone the repository:

```bash
git clone https://github.com/vincentlow02/weave-destination-experience.git
cd weave-destination-experience
```

Start a local static server:

```bash
python -m http.server 5501
```

Open [http://localhost:5501](http://localhost:5501) in your browser.
