# CVA Data Management System

Cash and Voucher Assistance Data Management System for IFRC (International Federation of Red Cross and Red Crescent Societies).

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **State Management**: TanStack Query
- **Deployment**: Vercel

---

## 🚀 Quick Start: Deploy in 15 Minutes

### Step 1: Set Up Supabase (5 minutes)

1. **Create a Supabase account**
   - Go to [https://supabase.com](https://supabase.com)
   - Click "Start your project" and sign up (GitHub recommended)

2. **Create a new project**
   - Click "New Project"
   - Name: `cva-system`
   - Database Password: Generate and **save this password**
   - Region: Choose closest to your users
   - Click "Create new project" (takes ~2 minutes)

3. **Run the database schema**
   - In Supabase dashboard, go to **SQL Editor** (left sidebar)
   - Click "New query"
   - Copy the entire contents of `supabase/schema.sql`
   - Paste into the SQL Editor
   - Click "Run" (or Cmd/Ctrl + Enter)
   - You should see "Success. No rows returned" - this is correct!

4. **Get your API credentials**
   - Go to **Project Settings** (gear icon) → **API**
   - Copy these values (you'll need them in Step 3):
     - `Project URL` → This is your `NEXT_PUBLIC_SUPABASE_URL`
     - `anon public` key → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 2: Push Code to GitHub (3 minutes)

1. **Create a new GitHub repository**
   - Go to [https://github.com/new](https://github.com/new)
   - Name: `cva-system`
   - Keep it public or private
   - Click "Create repository"

2. **Push this code to GitHub**
   ```bash
   # In the cva-system folder
   git init
   git add .
   git commit -m "Initial commit - CVA Data Management System"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/cva-system.git
   git push -u origin main
   ```

### Step 3: Deploy to Vercel (5 minutes)

1. **Create a Vercel account**
   - Go to [https://vercel.com](https://vercel.com)
   - Sign up with GitHub (recommended)

2. **Import your project**
   - Click "Add New..." → "Project"
   - Find and select your `cva-system` repository
   - Click "Import"

3. **Configure environment variables**
   - Expand "Environment Variables"
   - Add these variables:
   
   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon public key |

4. **Deploy**
   - Click "Deploy"
   - Wait ~2 minutes for build to complete
   - 🎉 Your app is live!

### Step 4: Create Your First User

1. Open your deployed app URL
2. Click "Sign up"
3. Enter your email and password
4. Check your email for the confirmation link
5. Click the link to verify your account
6. You're in!

---

## 📁 Project Structure

```
cva-system/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Auth pages (login)
│   │   ├── dashboard/         # Main application
│   │   │   ├── projects/      # Project management
│   │   │   ├── households/    # Beneficiary registration
│   │   │   ├── distributions/ # Distribution tracking
│   │   │   └── ...
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   └── layout/            # Layout components
│   ├── lib/
│   │   ├── supabase/          # Supabase clients
│   │   └── utils.ts           # Utility functions
│   └── types/
│       └── database.ts        # TypeScript types
├── supabase/
│   └── schema.sql             # Database schema
└── public/                    # Static assets
```

---

## 🛠 Local Development

### Prerequisites

- Node.js 18+
- npm or pnpm

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/cva-system.git
   cd cva-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

---

## 📊 Features Implemented

### ✅ Core Modules

- [x] **Authentication** - Login, signup, logout with Supabase Auth
- [x] **Dashboard** - Overview with stats and quick actions
- [x] **Projects** - Create and manage CVA programmes
- [x] **Households** - Register beneficiary households
- [x] **Beneficiaries** - Add household members with details

### 🔄 In Progress / Planned

- [ ] Distribution Planning & Scheduling
- [ ] Distribution Tracking
- [ ] Entitlement Management
- [ ] Case Management
- [ ] Reports & Analytics
- [ ] Data Import/Export
- [ ] Multi-language support

---

## 🔐 Security Notes

This is a **prototype** with simplified security. For production use:

1. **Row Level Security (RLS)**
   - Current policies allow all authenticated users to access all data
   - Production should implement role-based and country-based access

2. **Audit Logging**
   - Schema includes audit_logs table
   - Implement triggers to auto-log changes

3. **Data Encryption**
   - Supabase encrypts data at rest
   - Consider additional encryption for sensitive fields

---

## 📚 Database Schema Overview

```
countries
└── projects
    ├── assistance_types
    ├── distributions
    │   └── distribution_records
    └── households
        ├── beneficiaries
        ├── entitlements
        └── case_files
            └── case_notes

locations (hierarchical)
user_profiles
audit_logs
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is proprietary software developed for IFRC CVA programmes.

---

## 🆘 Troubleshooting

### "Invalid API key" error
- Double-check your Supabase URL and anon key in Vercel environment variables
- Make sure there are no extra spaces or quotes

### "User not found" after signup
- Check your email spam folder for the confirmation link
- In Supabase dashboard → Authentication → Users, verify the user was created

### Database tables don't exist
- Go to Supabase SQL Editor and run `schema.sql` again
- Check for any error messages in the output

### Deployment fails on Vercel
- Check the build logs for specific errors
- Ensure all environment variables are set correctly
- Try redeploying with "Redeploy" option

---

## 📞 Support

For issues with this prototype, please create a GitHub issue with:
- Description of the problem
- Steps to reproduce
- Screenshots (if applicable)
- Browser and device information
