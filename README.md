# 🧠 MindPulse — Student Mental Health Early Warning System

> **Hack Energy 2.0** | HackGyanVerse Community | Healthcare Track
> Team NextHope | MCA Students

![MindPulse Banner](https://mind-pulse-iota.vercel.app/icon.svg)

## 🌐 Live Demo

| | Link |
|---|---|
| 🖥️ **Frontend (Live)** | [https://mind-pulse-iota.vercel.app](https://mind-pulse-iota.vercel.app) |
| ⚙️ **Backend API** | [https://mindpulse-a403.onrender.com](https://mindpulse-a403.onrender.com) |
| 📂 **GitHub Repo** | [https://github.com/Akshay1267/MindPulse](https://github.com/Akshay1267/MindPulse) |

> ⚠️ Backend is on Render free tier — first request may take 30–60 seconds to wake up.

---

## 📌 Problem Statement

Mental health among college students has reached crisis levels, yet most institutions lack any proactive system to identify and support at-risk students before a breakdown occurs. Students dealing with anxiety, depression, academic pressure, and personal struggles often suffer in silence — either due to stigma, fear of judgment, or simply not knowing where to turn.

Currently, counsellors only become aware of a student's distress after it has escalated into a visible crisis. There is no early warning mechanism, no anonymous outlet, and no data-driven way for institutions to understand the mental wellness of their student population in real time.

This gap has direct academic consequences — undetected mental health struggles are a leading cause of poor grades, chronic absenteeism, and student dropout across Indian colleges.

---

## 💡 Solution — MindPulse

MindPulse is a **daily anonymous mood check-in platform** that uses AI-driven pattern detection to flag at-risk students and alert counsellors — without ever compromising student identity.

**Key capabilities:**
- 🔒 100% anonymous check-ins using token-based identity
- 🧠 AI pattern detection flags students at risk over 3–7 days
- 📊 Counsellor dashboard with real-time alerts and mood trends
- 🎓 Academic-wellbeing correlation tracking
- 💬 Anonymous messaging between counsellors and students
- 📈 Admin analytics for campus-level wellness insights

---

## 🎯 Features

### For Students
- Generate an anonymous token (no login, no name)
- Daily 10-second mood check-in (mood, sleep, stress, optional note)
- Access curated self-help resources
- Receive anonymous support messages from counsellors

### For Counsellors
- Real-time dashboard with campus mood trends
- Active alerts showing at-risk students (HIGH / MEDIUM severity)
- Send anonymous support messages to flagged students
- View recent check-ins across departments

### For Admins
- Campus-wide wellness analytics
- Mood by department breakdown
- Weekly stress heatmap
- Mood vs attendance correlation chart
- AI-generated actionable insights

---

## 🏗️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework |
| Tailwind CSS | Styling |
| shadcn/ui | UI components |
| Recharts | Data visualizations |
| Lucide React | Icons |
| Vercel | Deployment |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Web framework |
| MongoDB Atlas | Cloud database |
| Mongoose | ODM |
| CORS | Cross-origin requests |
| dotenv | Environment config |
| Render | Deployment |

---

## 📁 Project Structure
```
MindPulse/
│
├── frontend/                      # Next.js frontend
│   ├── app/
│   │   ├── page.tsx               # Student check-in page
│   │   ├── dashboard/
│   │   │   ├── page.tsx           # Counsellor dashboard
│   │   │   └── layout.tsx         # Dashboard layout with sidebar
│   │   ├── analytics/
│   │   │   └── page.tsx           # Admin analytics page
│   │   ├── resources/
│   │   │   └── page.tsx           # Self-help resources
│   │   └── about/
│   │       └── page.tsx           # About page
│   ├── components/
│   │   ├── check-in-card.tsx      # Main check-in form component
│   │   ├── navbar.tsx             # Top navigation bar
│   │   ├── dashboard-sidebar.tsx  # Counsellor sidebar
│   │   └── animated-background.tsx # Floating blob animations
│   └── package.json
│
└── backend/                       # Node.js backend
    ├── server.js                  # Express server entry point
    ├── models/
    │   ├── Checkin.js             # Mood check-in schema
    │   └── Alert.js               # At-risk alert schema
    ├── routes/
    │   ├── checkin.js             # Check-in API routes
    │   └── dashboard.js           # Dashboard & analytics routes
    └── package.json
```

---

## 🔌 API Endpoints

### Check-in Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/checkin` | Submit a mood check-in |
| `GET` | `/api/checkin/history/:tokenId` | Get mood history for a token |

### Dashboard Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dashboard` | Get all dashboard stats + alerts |
| `POST` | `/api/dashboard/message` | Send anonymous message to student |
| `POST` | `/api/dashboard/resolve/:alertId` | Mark alert as resolved |
| `GET` | `/api/dashboard/analytics` | Get admin analytics data |

### Example Request
```json
POST https://mindpulse-a403.onrender.com/api/checkin

{
  "tokenId": "MP-8821-X",
  "mood": 2,
  "sleep": 4,
  "stress": 9,
  "note": "Feeling overwhelmed with exams",
  "department": "Computer Science"
}
```

### Example Response
```json
{
  "success": true,
  "message": "Check-in recorded successfully",
  "checkin": {
    "tokenId": "MP-8821-X",
    "mood": 2,
    "sleep": 4,
    "stress": 9,
    "department": "Computer Science",
    "createdAt": "2026-03-14T10:30:00.000Z"
  }
}
```

---

## 🧠 AI Risk Detection Logic

After every check-in, MindPulse automatically runs a risk assessment:
```
IF avg mood < 2.0 OR consecutive low mood days >= 3
  → Severity: HIGH 🔴

IF avg mood < 2.8 OR (stress > 8 AND sleep < 4)
  → Severity: MEDIUM 🟡

IF avg mood < 3.2
  → Severity: LOW 🟢
```

Counsellors are alerted for HIGH and MEDIUM risk students — anonymously, without revealing student identity.

---

## 🚀 Run Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Akshay1267/MindPulse.git
cd MindPulse
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
JWT_SECRET=mindpulse_secret_key_2026
```

Start backend:
```bash
node server.js
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔒 Privacy Architecture

MindPulse is built privacy-first:

- Students are identified only by a **random token** (e.g. `MP-8821-X`)
- No name, email, or personal data is ever stored
- Counsellors see **only token IDs** — never student names
- All data is encrypted in transit (HTTPS/TLS)
- Students can delete all their data at any time
- Even a data breach reveals nothing personally identifiable

---

## 📸 Screenshots

### Student Check-in Page
> Anonymous token generation + mood check-in form
> Live: [https://mind-pulse-iota.vercel.app](https://mind-pulse-iota.vercel.app)

### Counsellor Dashboard
> Real-time mood trends + active alerts + send message
> Live: [https://mind-pulse-iota.vercel.app/dashboard](https://mind-pulse-iota.vercel.app/dashboard)

### Admin Analytics
> Department mood breakdown + stress heatmap + AI insights
> Live: [https://mind-pulse-iota.vercel.app/analytics](https://mind-pulse-iota.vercel.app/analytics)

### Self-Help Resources
> Curated tools for instant relief, peer support, academic stress
> Live: [https://mind-pulse-iota.vercel.app/resources](https://mind-pulse-iota.vercel.app/resources)

---

## 👥 Team NextHope

| Name | Role | Contact |
|------|------|---------|
| **Anshul** | Team Leader | +91 79060 76344 |
| **Akshay Jain** | Developer | +91 95689 83129 |

MCA Students | MIET

---

## 🏆 Hackathon

**Hack Energy 2.0**
- Organized by: HackGyanVerse Community
- Platform: Unstop
- Track: Healthcare
- Type: National Hybrid Hackathon

---

## 📄 License

This project was built for Hack Energy 2.0 hackathon purposes.

---

<p align="center">
  Built with 💚 by Team NextHope | MindPulse — Detect. Prevent. Empower.
</p>
