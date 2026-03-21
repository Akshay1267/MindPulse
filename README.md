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
- View personal mood history using token

### For Counsellors
- Secure login portal
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

## 🔄 Workflow

### 👤 Student Flow
```
1. Visit app → Click "Generate" → Get anonymous token (e.g. MP-8821-X)
2. Save token safely → Fill daily check-in (mood, sleep, stress) → Submit
3. See success screen "You're seen. You're heard 💚"
4. Every day → enter saved token → submit new check-in (10 seconds)
5. Go to /resources → enter token → see 7-day mood chart + counsellor messages
```

### ⚙️ Automatic AI Detection (Backend)
```
Every check-in submission triggers automatically:
      ↓
Fetch last 7 check-ins for that token from MongoDB
      ↓
Calculate avg mood, avg stress, avg sleep
Check consecutive low mood days
      ↓
IF avg mood < 2.0 OR 3+ consecutive low days  →  HIGH alert 🔴
IF avg mood < 2.8 OR (stress > 8 AND sleep < 4) →  MEDIUM alert 🟡
IF avg mood < 3.2                               →  LOW (no alert) 🟢
      ↓
Alert saved to MongoDB alerts collection anonymously
(token ID + department + severity only — never student name)
```

### 🏥 Counsellor Flow
```
1. Visit /login → Enter email + password → Redirected to /dashboard
2. View real-time stats → total check-ins, at-risk count, avg campus mood
3. See 14-day mood trend chart with crisis threshold line
4. See 🚨 Active Alerts panel → HIGH and MEDIUM risk students
5. Click "Send Message" on alert → type anonymous support message → send
6. Student sees message on /resources page using their token
7. Go to /analytics → view department breakdown, stress heatmap, AI insights
8. Click Logout → redirected back to /login
```

### 🏫 Admin Flow
```
1. Visit /analytics
2. View campus-wide wellness data:
   - Weekly check-in count + trends
   - Overall mood score
   - High risk alert count
   - Mood by department bar chart
   - Weekly stress heatmap
   - Mood vs attendance correlation
   - AI-generated insights with action buttons
```

### 📊 Data Flow
```
[Student Browser]
      |
      | POST /api/checkin
      | { tokenId, mood, sleep, stress, note, department }
      ↓
[Render Backend - Node.js + Express]
      |
      | Save to DB + Run Risk Detection
      ↓
[MongoDB Atlas]
      |              |
 checkins        alerts
 collection      collection
      |              |
      |              | GET /api/dashboard
      |              ↓
      |     [Counsellor Dashboard]
      |     Shows alerts, stats, charts
      |
      | GET /api/checkin/history/:tokenId
      ↓
[Student Mood History on /resources]
```

### 🔒 Privacy Flow
```
Student → Generates random token (MP-XXXX-X)
               ↓
         Submits check-ins under token only
         No name, email, or identity stored
               ↓
         AI detects risk pattern
               ↓
         Counsellor sees:
         Token ID + Department + Severity
         ❌ NEVER sees student name
         ❌ NEVER sees student identity
               ↓
         Even if database is breached:
         Zero personally identifiable information exposed
```

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
├── frontend/                        # Next.js frontend
│   ├── app/
│   │   ├── page.tsx                 # Student check-in page
│   │   ├── login/
│   │   │   └── page.tsx             # Counsellor login page
│   │   ├── dashboard/
│   │   │   ├── page.tsx             # Counsellor dashboard
│   │   │   ├── layout.tsx           # Dashboard layout with sidebar
│   │   │   ├── alerts/
│   │   │   │   └── page.tsx         # Active alerts page
│   │   │   ├── messages/
│   │   │   │   └── page.tsx         # Messages page
│   │   │   └── settings/
│   │   │       └── page.tsx         # Settings page
│   │   ├── analytics/
│   │   │   └── page.tsx             # Admin analytics page
│   │   ├── resources/
│   │   │   └── page.tsx             # Self-help resources + mood history
│   │   └── about/
│   │       └── page.tsx             # About page
│   ├── components/
│   │   ├── check-in-card.tsx        # Main check-in form component
│   │   ├── mood-history.tsx         # Token-based mood history viewer
│   │   ├── navbar.tsx               # Top navigation bar
│   │   ├── dashboard-sidebar.tsx    # Counsellor sidebar with logout
│   │   └── animated-background.tsx  # Floating blob animations
│   └── package.json
│
└── backend/                         # Node.js backend
    ├── server.js                    # Express server entry point
    ├── models/
    │   ├── Checkin.js               # Mood check-in schema
    │   └── Alert.js                 # At-risk alert schema
    ├── routes/
    │   ├── checkin.js               # Check-in + history API routes
    │   └── dashboard.js             # Dashboard, alerts, analytics routes
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

### Counsellor Login
> Secure login portal for counsellors and admins  
> Live: [https://mind-pulse-iota.vercel.app/login](https://mind-pulse-iota.vercel.app/login)

### Counsellor Dashboard
> Real-time mood trends + active alerts + send message  
> Live: [https://mind-pulse-iota.vercel.app/dashboard](https://mind-pulse-iota.vercel.app/dashboard)

### Admin Analytics
> Department mood breakdown + stress heatmap + AI insights  
> Live: [https://mind-pulse-iota.vercel.app/analytics](https://mind-pulse-iota.vercel.app/analytics)

### Self-Help Resources + Mood History
> Curated tools + token-based personal mood history viewer  
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
