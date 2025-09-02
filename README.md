# nexus-studio
🚀 Nexus Studio OS
English

Comprehensive Operating System for Startup Studios - A minimalist C-Suite level CRM to manage startup portfolios, teams, and real-time metrics.

📋 Description
Nexus Studio OS is an all-in-one platform specifically designed for Startup Studios that need to manage multiple initiatives, distributed teams, and financial metrics in a centralized manner. Built with modern technologies to deliver performance and scalability.
✨ Key Features

📊 Executive Dashboard - 360° view of all startups
💼 Portfolio Management - Complete control of initiatives from idea to scale
💰 Consolidated Finances - Integration with Stripe, PayPal, and spreadsheets
👥 Talent Management - Smart human resource allocation
🎯 OKRs System - Tracking objectives and key results
📈 Real-time Metrics - Automatically updated KPIs
🔄 Retrospectives - Documentation of learnings and decisions
🔔 Smart Alerts - Notifications for critical deviations

🛠️ Tech Stack
Frontend: Next.js 14, TypeScript, Tailwind CSS, Zustand, React Query, Recharts
Backend: NestJS, MongoDB, Redis, JWT, Bull Queue
DevOps: Docker, Turborepo, GitHub Actions, Vercel, Railway

🚀 Quick Start
Prerequisites

Node.js >= 18.0.0
pnpm >= 8.0.0
Docker Desktop
Git

Installation
bash# 1. Clone the repository
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
🌐 Development URLs

Frontend: http://localhost:3000
Backend API: http://localhost:4000
MongoDB Admin: http://localhost:8081
API Docs: http://localhost:4000/api-docs

📝 Available Scripts
bash# Development
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
🗺️ Roadmap
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

📄 License
This project is under the MIT License - see the LICENSE file for details.

Español

Sistema Operativo Integral para Startup Studios - Un CRM minimalista de nivel C-Suite para gestionar portfolios de startups, equipos y métricas en tiempo real.

📋 Descripción
Nexus Studio OS es una plataforma todo-en-uno diseñada específicamente para Startup Studios que necesitan gestionar múltiples iniciativas, equipos distribuidos y métricas financieras de manera centralizada. Construido con tecnologías modernas para ofrecer rendimiento y escalabilidad.
✨ Características Principales

📊 Dashboard Ejecutivo - Vista 360° de todas las startups
💼 Gestión de Portfolio - Control completo de iniciativas desde idea hasta escala
💰 Finanzas Consolidadas - Integración con Stripe, PayPal y hojas de cálculo
👥 Gestión de Talento - Asignación inteligente de recursos humanos
🎯 Sistema OKRs - Seguimiento de objetivos y resultados clave
📈 Métricas en Tiempo Real - KPIs actualizados automáticamente
🔄 Retrospectivas - Documentación de aprendizajes y decisiones
🔔 Alertas Inteligentes - Notificaciones de desviaciones críticas

🛠️ Stack Tecnológico
Frontend: Next.js 14, TypeScript, Tailwind CSS, Zustand, React Query, Recharts
Backend: NestJS, MongoDB, Redis, JWT, Bull Queue
DevOps: Docker, Turborepo, GitHub Actions, Vercel, Railway
🚀 Inicio Rápido
Prerrequisitos

Node.js >= 18.0.0
pnpm >= 8.0.0
Docker Desktop
Git

Instalación
bash# 1. Clonar el repositorio
git clone https://github.com/Flaticon/nexus-studio-os.git
cd nexus-studio-os

# 2. Instalar pnpm si no lo tienes
npm install -g pnpm

# 3. Instalar dependencias
pnpm install

# 4. Copiar variables de entorno
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env

# 5. Iniciar servicios de base de datos
pnpm run db:up

# 6. Iniciar en modo desarrollo
pnpm run dev
🌐 URLs de Desarrollo

Frontend: http://localhost:3000
API Backend: http://localhost:4000
Admin MongoDB: http://localhost:8081
Docs API: http://localhost:4000/api-docs

📝 Scripts Disponibles
bash# Desarrollo
pnpm run dev              # Iniciar todo en modo desarrollo
pnpm run dev:web          # Solo frontend
pnpm run dev:api          # Solo backend

# Base de datos
pnpm run db:up            # Iniciar MongoDB y Redis
pnpm run db:down          # Detener bases de datos
pnpm run db:reset         # Resetear bases de datos

# Build y Despliegue
pnpm run build            # Build de producción
pnpm run start            # Iniciar en producción
pnpm run lint             # Ejecutar linter
pnpm run test             # Ejecutar tests
pnpm run format           # Formatear código
🗺️ Hoja de Ruta
Fase 1: MVP Core ✅

Setup y Autenticación
Módulo Portfolio básico
Dashboard ejecutivo

Fase 2: Integraciones 🚧

Integración Stripe
Integración Google Sheets
Sistema de OKRs

Fase 3: Características Avanzadas 📋

Notificaciones en tiempo real
Insights con IA
Aplicación móvil

📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

📁 Project Structure / Estructura del Proyecto
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

🔧 Configuration / Configuración
Environment Variables / Variables de Entorno
Frontend (apps/web/.env.local)
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

🤝 Contributing / Contribuir
Contributions are welcome! / ¡Las contribuciones son bienvenidas!

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
  Built with ❤️ for Peruvian Startups<br>
  Construido con ❤️ para Startups Peruanas <br><br>
</div>