# Book Club Hub

Book Club Hub is an interactive React web app for organizing a reading club in one place.

## Features

- Reading archive with detailed entries (title, author, read dates, discussion questions, ratings, and comments)
- Editable archive cards to update notes and group ratings
- Monthly suggestion and voting system
- Future Reads section for books that were not selected this month
- Member reading progress tracker with live individual and group progress bars
- Multi-page layout using React Router with a persistent navigation bar
- Consistent UI built with React Bootstrap components

## Pages

- Home dashboard
- Reading Archive
- Monthly Suggestions & Voting
- Reading Progress Tracker

## Component Coverage

The app includes more than 8 meaningful components (e.g. navbar, page header, forms, archive cards, suggestion cards, member progress cards, and group progress panel).

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production build outputs to `docs`, which can be served by GitHub Pages.

## GitHub Pages Hosting Notes

- Vite base path is configured as `/p128/` in `vite.config.js`
- If your repository name is different, update that value to match your repo
- Push the generated `docs` folder and configure GitHub Pages to serve from it
