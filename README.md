# 🎯 Onboardly
> Create, manage, and deploy beautiful product tours for your web applications - no code required.
Onboardly is a complete SaaS platform that makes it easy to build interactive product tours and onboarding experiences for your users. Create tours in minutes, track engagement with built-in analytics, and deploy with a simple script tag.
![Onboardly Dashboard](https://img.shields.io/badge/Status-MVP_Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Convex](https://img.shields.io/badge/Convex-Backend-orange)
![Clerk](https://img.shields.io/badge/Auth-Clerk-blue)
## ✨ Features
### 🎨 **Visual Tour Builder**
- **No-code interface** - Create tours without writing a single line of code
- **Live preview** - See how your tours will look before publishing
- **Step management** - Add, edit, and reorder tour steps with ease
- **Smart targeting** - Use CSS selectors to target any element on your page
### 📈  **Real-time Analytics**
- **Tour performance** - Track starts, completions, and skip rates
- **User insights** - Understand how users interact with your tours
- **Completion rates** - See which tours perform best
- **Event tracking** - Automatic tracking of tour_started, step_completed, tour_completed, and tour_skipped events
### 🚀  **Easy Deployment**
- **One script tag** - Add tours to any website with a single line of code
- **Auto-loading** - Tours fetch configuration automatically from our CDN
- **Framework agnostic** - Works with vanilla JS, React, Vue, Angular, and more
- **Zero dependencies** - Lightweight widget with no external dependencies
### :lock: **Enterprise Ready**
- **OAuth authentication** - Secure Google authentication via Clerk
- **Real-time database** - Powered by Convex for instant updates
- **Scalable architecture** - Built on Next.js 15 with app router
- **Protected routes** - Dashboard secured with middleware
## 🚀  Quick Start
### Prerequisites
- Node.js 18+ and pnpm
- A [Clerk](https://clerk.com) account for authentication
- A [Convex](https://convex.dev) account for the database
### Installation
1. **Clone the repository**
```bash
git clone https://github.com/python-fuse/onboardly.git
cd onboardly/web
```
2. **Install dependencies**
```bash
pnpm install
```
3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```bash
# Convex
CONVEX_DEPLOYMENT=dev:your-deployment-id
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
CLERK_JWT_ISSUER_DOMAIN=https://your-clerk-domain.clerk.accounts.dev
```
4. **Set up Convex**
```bash
npx convex dev
```
This will:
- Create your Convex deployment
- Set up the database schema
- Generate TypeScript types
5. **Run the development server**
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to see your app! :tada:
## 📖 Usage
### Creating Your First Tour
1. **Sign up** at `/signup` with your Google account
2. **Create a tour** in the dashboard at `/dashboard/managetour`
3. **Add steps** by clicking "Manage Steps"
4. **Configure each step** with:
   - Target selector (CSS selector)
   - Title and content
   - Placement (top, bottom, left, right)
   - Action trigger (click, hover, focus, none)
5. **Publish** your tour to get your embed script
6. **Copy the script** and add it to your website
### Embedding Tours
#### Vanilla JavaScript
```html
<!-- Add this before closing </body> tag -->
<script>
  (function () {
    const script = document.createElement("script");
    script.src = "https://timely-kheer-6c719b.netlify.app/onboardly.js";
    script.onload = function () {
      if (window.TourWidget) {
        window.TourWidget.init("your_script_id_here");
      }
    };
    document.head.appendChild(script);
  })();
</script>
```
#### React / Next.js
```tsx
import { useEffect } from 'react';
export default function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://timely-kheer-6c719b.netlify.app/onboardly.js';
    script.onload = function() {
      if ((window as any).TourWidget) {
        (window as any).TourWidget.init('your_script_id_here');
      }
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return (
    // Your app
  );
}
```
## 🏗️ Tech Stack
### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling
- **Lucide Icons** - Beautiful icons
### Backend
- **Convex** - Real-time database and backend
- **Clerk** - Authentication and user management
- **HTTP Actions** - For widget analytics endpoint
### Widget
- **Vanilla TypeScript** - Zero dependencies
- **Bundled with Vite** - Fast builds and HMR
- **Hosted on Netlify** - CDN delivery
## :file_folder: Project Structure
```
web/
├── convex/                   # Convex backend
│   ├── schema.ts            # Database schema
│   ├── tours.ts             # Tour CRUD operations
│   ├── analytics.ts         # Analytics tracking
│   ├── public.ts            # Public API for widget
│   ├── http.ts              # HTTP endpoints
│   └── auth.config.ts       # Clerk integration
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── (auth)/         # Auth routes (login, signup)
│   │   ├── dashboard/      # Protected dashboard routes
│   │   ├── about/          # Public about page
│   │   ├── documentation/  # Public docs
│   │   └── page.tsx        # Landing page
│   └── components/
│       ├── dashboard/      # Dashboard components
│       ├── landing-page/   # Landing page sections
│       ├── shared/         # Shared components
│       └── documentation/  # Docs components
├── public/                  # Static assets
└── middleware.ts            # Route protection
```
## :file_cabinet: Database Schema
### Tours Table
```typescript
{
  userId: string;           // Clerk user ID
  name: string;            // Tour name
  tourId: string;          // Unique tour identifier
  scriptId?: string;       // Generated on publish
  published: boolean;      // Publication status
  autoStart: boolean;      // Auto-start setting
  showProgress: boolean;   // Show progress indicator
  allowSkip: boolean;      // Allow skipping tour
  steps: TourStep[];       // Array of tour steps
  createdAt: number;       // Timestamp
  updatedAt: number;       // Timestamp
}
```
### Analytics Table
```typescript
{
  tourId: string;          // Reference to tour
  eventType: string;       // tour_started, step_completed, etc.
  stepId?: string;         // Step identifier
  timestamp: number;       // Event timestamp
  sessionId: string;       // User session ID
  userAgent?: string;      // Browser info
}
```
## 🔐 Authentication
Onboardly uses Clerk for authentication with the following configuration:
- **OAuth Providers**: Google (primary)
- **JWT Integration**: Convex validates Clerk JWTs
- **Protected Routes**: Dashboard routes require authentication
- **Middleware**: Automatic redirect to login for unauthenticated users
## 📈 Analytics
Built-in analytics track:
- **Tour Started** - When a user begins a tour
- **Step Completed** - When each step is completed
- **Tour Completed** - When the entire tour is finished
- **Tour Skipped** - When a user skips the tour
Analytics are stored in Convex and displayed in real-time on the dashboard.
## 🎨 Architecture Patterns
### Layout Wrappers
- **PageWrapper** - Header + Footer (landing, about pages)
- **DocsWrapper** - Header only (documentation pages)
- **AuthWrapper** - Centered auth UI (login, signup)
- **Dashboard Pages** - No wrapper (full-screen dashboard)
### State Management
- **Convex Queries** - Real-time data fetching
- **Convex Mutations** - CRUD operations
- **React State** - Local UI state
- **Loading States** - Custom spinner component
## :rocket: Deployment
### Deploy to Vercel
1. **Push to GitHub**
```bash
git push origin main
```
2. **Import to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your repository
- Add environment variables
- Deploy!
3. **Set up Convex Production**
```bash
npx convex deploy
```
### Environment Variables
Make sure to set these in Vercel:
```
NEXT_PUBLIC_CONVEX_URL
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
CLERK_JWT_ISSUER_DOMAIN
```
## 🛠️ Development
### Available Scripts
```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
npx convex dev    # Start Convex dev environment
```
### Code Quality
- **TypeScript** - Strict mode enabled
- **ESLint** - Enforced code standards
- **Prettier** - Code formatting (via formatter)
## 🤝 Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
## 📄 License
This project is licensed under the MIT License.
## 🔗 Links
- **Widget Repository**: [onboardly_widget](https://github.com/python-fuse/onboardly_widget)
- **Widget Demo**: [Widget Documentation](https://github.com/python-fuse/onboardly_widget#readme)
- **Live Demo**: Coming soon!
## 💬 Support
- **Issues**: [GitHub Issues](https://github.com/python-fuse/onboardly/issues)
- **Documentation**: `/documentation` route in the app
## 🎯 Roadmap
- [x] MVP - Complete tour creation and deployment
- [x] Analytics dashboard
- [x] Google OAuth
- [ ] Custom branding options
- [ ] A/B testing for tours
- [ ] Team collaboration features
- [ ] Advanced targeting rules
- [ ] Multi-language support
---
Built with ❤️ by Team Ottoman using Next.js, Convex, and Clerk