# 💎 Aurex - Digital Hub Protocol

Aurex is a high-performance, aesthetically curated glassmorphic landing page designed to organize and display essential digital nodes (links). It features a secure, private administration terminal for real-time content management.

![Version](https://img.shields.io/badge/version-3.0.4-indigo?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-pink?style=for-the-badge)
![Framework](https://img.shields.io/badge/framework-React%2019-blue?style=for-the-badge)
![Tool](https://img.shields.io/badge/tool-Vite%206-orange?style=for-the-badge)

---

## ✨ Key Features

- **🎨 Glassmorphic UI**: Ultra-modern design using backdrop filters, vibrant gradients, and fluid floating animations.
- **🔐 Secure Terminal**: Hidden admin panel with identity authentication for managing the link repository.
- **📑 Tabbed Management**: Organized interface for adding new nodes and purging existing entries (Active Manifest vs. New Entry).
- **🖼️ Asset Mounting**: Support for custom icons and visual assets via base64 encoding/local file upload.
- **📱 Fully Responsive**: Seamless experience across mobile, tablet, and desktop devices.
- **☁️ Cloud Optimized**: Pre-configured with `vercel.json` and `netlify.toml` for instant deployment.

---

## 🛠 Tech Stack

- **Core**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Fonts**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)

---

## 🚀 Quick Start

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Development
Launch the local development server:
```bash
npm run dev
```

### 3. Build
Generate a production-ready bundle:
```bash
npm run build
```

---

## 🔐 Administration Protocol

To access the secure administrative terminal:
1. Click the **Floating Key/Gear Icon** at the bottom right of the screen.
2. Enter the administrative credentials.

**Default Credentials:**
- **Identity (Username)**: `ash#404`
- **Secret Key (Password)**: `myaj!`

> [!IMPORTANT]
> You can modify these credentials in the `src/constants.ts` file before deployment.

---

## ☁️ Deployment Guide

### Vercel
1. Push your code to GitHub.
2. Import the project into Vercel.
3. Vercel will automatically detect the **Vite** framework.
4. Ensure the build command is `npm run build` and output directory is `dist`.

### Netlify
1. Connect your repository to Netlify.
2. The included `netlify.toml` handles all Single Page Application (SPA) redirects and build settings automatically.

---

## 📁 Project Structure

- `components/`: Modular UI elements (Admin Panel, Login, Website Cards).
- `constants.ts`: Global configuration and initial seed data.
- `types.ts`: Shared TypeScript interfaces.
- `App.tsx`: Main application logic, state management, and persistence.
- `index.html`: Base template with custom glassmorphic CSS layers.

---

## ⚖️ License

Built with ❤️ by **Ashish**. Distributed under the MIT License. See `LICENSE` for more information.
