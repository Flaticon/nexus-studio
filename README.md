# nexus-studio
🚀 Nexus Studio OS

### 📝 Overview  
Comprehensive Operating System for Startup Studios - A minimalist C-Suite level CRM to manage startup portfolios, teams, and real-time metrics.

### 📋 Description
Nexus Studio OS is an all-in-one platform specifically designed for Startup Studios that need to manage multiple initiatives, distributed teams, and financial metrics in a centralized manner. Built with modern technologies to deliver performance and scalability.

### ✨ Key Features
- 📊 **Executive Dashboard** – 360° view of all startups  
- 💼 **Portfolio Management** – Complete control of initiatives from idea to scale  
- 💰 **Consolidated Finances** – Integration with Stripe, PayPal, and spreadsheets  
- 👥 **Talent Management** – Smart human resource allocation  
- 🎯 **OKRs System** – Tracking objectives and key results  
- 📈 **Real-time Metrics** – Automatically updated KPIs  
- 🔄 **Retrospectives** – Documentation of learnings and decisions  
- 🔔 **Smart Alerts** – Notifications for critical deviations  

###  🛠️ Tech Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Zustand, React Query, Recharts  
- **Backend**: NestJS, MongoDB, Redis, JWT, Bull Queue  
- **DevOps**: Docker, Turborepo, GitHub Actions, Vercel, Railway  

### 🚀Quick Start
### Prerequisites
- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Docker Desktop
- Git

### Installation
# 1. Clone the repository
git clone https://github.com/Flaticon/nexus-studio-os.git
cd nexus-studio-os

# 2. Install pnpm if you don't have it
npm install -g pnpm

# 3. Install dependencies
pnpm install

# 4. Copy environment variables
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env

# 5. Start database services
pnpm run db:up

# 6. Start in development mode
pnpm run dev

## 🌐 Development URLs
- **Frontend** → [http://localhost:3000](http://localhost:3000)  
- **Backend API** → [http://localhost:4000](http://localhost:4000)  
- **MongoDB Admin** → [http://localhost:8081](http://localhost:8081)  
- **API Docs** → [http://localhost:4000/api-docs](http://localhost:4000/api-docs)  

## 📝 Available Scripts
### Development
```bash
pnpm run dev              # Start everything in dev mode
pnpm run dev:web          # Frontend only
pnpm run dev:api          # Backend only

# Database
pnpm run db:up            # Start MongoDB and Redis
pnpm run db:down          # Stop databases
pnpm run db:reset         # Reset databases

# Build & Deploy
pnpm run build            # Production build
pnpm run start            # Start in production
pnpm run lint             # Run linter
pnpm run test             # Run tests
pnpm run format           # Format code
```

## 🗺️ Roadmap
Phase 1: Core MVP ✅

Setup & Authentication
Basic Portfolio Module
Executive Dashboard

Phase 2: Integrations 🚧

Stripe Integration
Google Sheets Integration
OKRs System

Phase 3: Advanced Features 📋

Real-time Notifications
AI Insights
Mobile App

### 📄 License
This project is under the MIT License - see the LICENSE file for details.


### 📁 Project Structure 
nexus-studio-os/
├── apps/
│   ├── web/                 # Frontend Next.js
│   │   ├── src/
│   │   │   ├── app/         # App Router pages
│   │   │   ├── components/  # React components
│   │   │   ├── lib/         # Utilities & hooks
│   │   │   └── types/       # TypeScript types
│   │   └── public/          # Static assets
│   │
│   └── api/                 # Backend NestJS
│       └── src/
│           ├── modules/     # Feature modules
│           ├── common/      # Shared resources
│           └── config/      # Configuration
│
├── packages/
│   ├── shared/             # Shared types & utils
│   └── ui/                 # Shared UI components
│
├── docker-compose.yml      # Docker services
├── turbo.json             # Turborepo config
└── package.json           # Root package.json
```
## ⚙️ Configuración / Configuration  

### 🌍 Environment Variables / Variables de Entorno  

#### Frontend (`apps/web/.env.local`)  

```env
envNEXT_PUBLIC_APP_NAME="Nexus Studio OS"
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
Backend (apps/api/.env)
envNODE_ENV=development
PORT=4000
MONGODB_URI=mongodb://localhost:27017/nexus_studio
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-jwt-secret
```

## 🤝 Contributing 
Contributions are welcome! 

Fork the project / Fork el proyecto
Create your feature branch / Crea tu rama de feature (git checkout -b feature/AmazingFeature)
Commit your changes / Confirma tus cambios (git commit -m 'Add some AmazingFeature')
Push to the branch / Push a la rama (git push origin feature/AmazingFeature)
Open a Pull Request / Abre un Pull Request



📞 Support / Soporte
Email: rgc000023@gmail.com

🙏 Acknowledgments / Agradecimientos
Next.js
NestJS
Tailwind CSS
MongoDB
All contributors / Todos los contribuidores


<div align="center">
  <b>Nexus Studio OS</b><br>
  Built with ❤️ por Roberto Gonzalez<br>
  Construido con ❤️ por Roberto Gonzalez<br><br>
</div>