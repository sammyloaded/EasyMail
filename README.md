# ✉️ Easymail - All-in-One Marketing Platform

![Deployment Status](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)
![Tech Stack](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

Easymail is a modern, responsive email marketing SaaS frontend prototype. It features a clean, high-end user interface, secure authentication, and an interactive data dashboard designed to help businesses grow their online presence.

**🌍 Live Demo:** [https://easymail-orcin.vercel.app/](https://easymail-orcin.vercel.app/)

---

## ✨ Key Features

- **Premium SaaS UI:** High-converting landing pages built with modern CSS flexbox/grid and the Nunito Sans typography.
- **Secure Authentication:** Integrated Firebase Email/Password authentication with protected routing.
- **Interactive Dashboard:** Real-time data visualization using Chart.js to track audience growth and campaign metrics.
- **Fully Responsive:** Mobile-first design principles ensuring a seamless experience across desktop, tablet, and mobile devices.
- **Modular JavaScript:** Clean, maintainable ES6 modules separating UI logic from authentication and data fetching.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend / Auth:** Google Firebase (Web SDK v10)
- **Data Visualization:** Chart.js
- **Icons:** Phosphor Icons
- **Deployment:** Vercel

---

## 📂 Project Structure

```text
EASYMAIL/
├── assets/
│   ├── css/
│   │   └── style.css          # Global styles and responsive media queries
│   ├── img/                   # Static visual assets (SVGs, PNGs)
│   └── js/
│       ├── auth.js            # Firebase Auth logic (Login/Register)
│       ├── dashboard.js       # Protected route logic & Chart.js initialization
│       └── script.js          # General UI interactions (mobile menu, etc.)
├── .gitignore                 # Git ignore rules
├── automation-builder.html    # Marketing automation feature page
├── dashboard.html             # Protected user dashboard (Requires Auth)
├── email-marketing.html       # Email marketing feature page
├── index.html                 # Main landing page
├── login.html                 # User sign-in interface
├── register.html              # Account creation interface
└── sms-marketing.html         # SMS marketing feature page
```
