# Jacob Roginski – Portfolio

A clean, lightweight personal portfolio site showcasing projects, experience, and contact information. Built with simple, maintainable HTML/CSS/JS so it’s easy to update and host anywhere.

## Overview
- **Pages:** `index.html` (home), `about.html`, `resume.html`, `contact.html`, project pages like `msu.html`, `msu-esk8.html`, `waggoner.html`, `arum.html`, `cahp.html`
- **Assets:** icons and images stored under `asset/` with subfolders `Computer_images/` and `Cobra_computer_images/`
- **Styling & Scripts:** global styles in `stylesheet.css`, interactions in `scripts.js`

## Features
- **Fast and simple:** Pure HTML/CSS/JS, no frameworks
- **Readable structure:** Clear separation of pages, styles, and assets
- **Easy to extend:** Add new project pages by duplicating an existing HTML file
- **Portable hosting:** Works on GitHub Pages, Netlify, Vercel, or any static host

## Project Structure
```
about.html
arum.html
cahp.html
contact.html
index.html
msu-esk8.html
msu.html
resume.html
scripts.js
stylesheet.css
waggoner.html
asset/
  Cobra_computer_images/
  Computer_images/
  icons/
```

## Getting Started
You can open the site locally or deploy it to a static host.

### Run Locally
1. Clone the repository:
	```bash
	git clone https://github.com/Jacob-Roginski/Portfolio.git
	cd Portfolio
	```
2. Open `index.html` directly in your browser, or serve the folder with a simple HTTP server:
	```bash
	# Python 3
	python3 -m http.server 8080
	# then visit http://localhost:8080
	```

### Deploy
- **GitHub Pages:** Push to `main`, then enable Pages for the repository and set the source to `/ (root)`.
- **Netlify/Vercel:** Create a new site, select this repo, set the build to “None” and the publish directory to the repo root.
- **Any static host:** Upload the repo contents and point the host to `index.html`.

## Editing Content
- **Text:** Update the relevant `.html` files (e.g., `about.html`, `resume.html`).
- **Styles:** Edit `stylesheet.css` for colors, typography, spacing, and layout.
- **Scripts:** Add or adjust simple interactions in `scripts.js`.
- **Images/Icons:** Place assets under `asset/` and reference with relative paths in your HTML.

## Adding a New Project Page
1. Duplicate an existing project page (e.g., `msu.html`) and rename it.
2. Update the content: title, description, images, and links.
3. Link it from `index.html` (and `about.html` or `resume.html` if appropriate).

## Accessibility & Performance Tips
- Use semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`).
- Provide `alt` text for all images in `asset/`.
- Compress images before adding to `asset/` to keep page loads fast.
- Ensure sufficient color contrast and keyboard navigation.

## Maintenance
- Keep dependencies minimal (currently none).
- Periodically review links and images for 404s.
- Test the site in modern browsers (Chrome, Firefox, Edge, Safari).

## License
This portfolio’s content is personal. Unless otherwise stated, code for layout and structure can be reused with attribution. Do not copy proprietary images or text without permission.

## Contact
- Portfolio: open `index.html` or visit the deployed site
- For updates or issues: open a GitHub Issue on this repository