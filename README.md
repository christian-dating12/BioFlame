# 🌿 BioFlame 

BioFlame is a web-based monitoring system that integrates animal waste management with renewable energy technology.  

---

## 📋 Features

- 🌾 **Home Page** – Introduces the BioFlame project and its mission.  
- ⚙️ **Maintenance Page** – Displays system operation data and maintenance schedules.  
- 📚 **Documentation Page** – Contains workflow details, setup instructions, and sensor descriptions.  
- 📊 **Dashboard Page** – Visualizes sensor readings such as:
  - Slurry management status  
  - Gas quality levels (CH₄ & CO₂)  
  - Real-time monitoring for temperature, pH, and water level indicators

---

## 🎨 Color Palette

| Color | Hex Code |
|-------|-----------|
| 🟩 Green | `#6C8E3E` |
| 🟫 Brown | `#8B5A2B` |
| 🟨 Gold | `#E5C16A` |
| 🟥 Red | `#A3362E` |
| 🧴 Cream | `#F8F4E3` |

---

## 🏗️ Tech Stack

| Technology | Purpose |
|-------------|----------|
| **React + Vite** | Frontend Framework |
| **Tailwind CSS** | Styling and Layout |
| **Lucide React** | Icon Library |
| **Framer Motion** | Animations |
| **Recharts** | Data Visualization |

---

## ⚙️ Installation Guide

### 1️⃣ Prerequisites
Make sure the following are installed:
- [Node.js](https://nodejs.org/en/) (v18 or higher)
- npm or yarn package manager

### 2️⃣ Clone this Repository
git clone https://github.com/<your-username>/biogas-frontend.git
cd biogas-frontend

### 3️⃣ Install Dependencies
npm install

npm install recharts

### 4️⃣ Run the Development Server
npm run dev

---
Then open your browser and go to:
\```
http://localhost:5173
\```

---
## ARCHITECTURE

```text
src/
 ├─ assets/             # Logos, icons, and images
 ├─ components/         # Reusable components
 │   ├─ Navbar.jsx       # Top navigation bar
 │   ├─ Header.jsx       # Page header component
 │   └─ ui/             # Reusable UI elements
 │       ├─ Button.jsx
 │       ├─ Card.jsx
 │       └─ Input.jsx
 ├─ pages/              # Pages
 │   ├─ Home.jsx
 │   ├─ Maintenance.jsx
 │   ├─ Documentation.jsx
 │   └─ Dashboard.jsx
 ├─ theme/              # Tailwind customization and color palette
 ├─ App.jsx             # Main app component
 └─ main.jsx            # Entry point
