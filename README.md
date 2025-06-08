# Electro Blitz Shop

A modern e-commerce web application for electronics, built with React, TypeScript, Vite, shadcn-ui, and Tailwind CSS.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Custom Domain](#custom-domain)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

Electro Blitz Shop is a demo e-commerce platform for browsing and purchasing the latest electronics. It features a modern UI, product listings, deals, and more.

---

## Tech Stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [shadcn-ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-router-dom](https://reactrouter.com/)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```sh
   git clone 
   ```

2. **Navigate to the project directory:**

   ```sh
   cd electro-blitz-shop
   ```

3. **Install dependencies:**

   ```sh
   npm install
   ```

### Running the App

Start the development server:

```sh
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## Available Scripts

- `npm run dev` – Start the development server with hot reloading.
- `npm run build` – Build the app for production.
- `npm run preview` – Preview the production build locally.
- `npm run lint` – Run linter to check code quality.

---

## Project Structure

```
electro-blitz-shop/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Deployment

You can deploy this project to any static hosting provider (e.g., Vercel, Netlify, GitHub Pages):

1. Build the app:

   ```sh
   npm run build
   ```

2. Deploy the contents of the `dist` folder to your hosting provider.

---

## Custom Domain

If your hosting provider supports custom domains, follow their documentation to connect your domain to your deployed site.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is licensed under the MIT License.