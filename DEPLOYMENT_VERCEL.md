# Vercel Deployment Guide for TechDLT

This guide outlines the steps to deploy your Next.js application to **Vercel** while keeping your domain and emails on **Hostinger**.

## Architecture Overview
- **Domain**: `techdlt.in` (Managed via Hostinger)
- **Website Hosting**: Vercel
- **Email/SMTP**: Hostinger (`info@techdlt.com`)

---

## 1. Deploy to Vercel

1. **Sign Up/In**: Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.
2. **Import Project**: 
   - Click **Add New** -> **Project**.
   - Import the `techdlt` repository.
3. **Configure Environment Variables**:
   In the "Environment Variables" section during setup, add these keys:
   - `SMTP_HOST`: `smtp.hostinger.com`
   - `SMTP_PORT`: `465`
   - `SMTP_SECURE`: `true`
   - `SMTP_USER`: `info@techdlt.com`
   - `SMTP_PASS`: `your_email_password`
   - `NODE_ENV`: `production`
4. **Deploy**: Click **Deploy**. Vercel will build and host your site at a temporary URL (e.g., `techdlt.vercel.app`).

---

## 2. Connect Your Custom Domain

1. In the Vercel Dashboard, go to **Project Settings** -> **Domains**.
2. Add `techdlt.in` and `www.techdlt.in`.
3. Vercel will provide the required DNS records.

---

## 3. Configure DNS at Hostinger

Go to your **Hostinger hPanel** -> **Domains** -> **techdlt.in** -> **DNS Zone**. Add/Update these records:

| Type  | Name | Value                   |
|-------|------|-------------------------|
| A     | @    | `76.76.21.21`           |
| CNAME | www  | `cname.vercel-dns.com`  |

*Note: Do NOT delete your MX records, as those are required for your emails to work.*

---

## 4. Final Verification

1. Wait for DNS propagation (can take 5–30 minutes).
2. Visit [https://www.techdlt.in](https://www.techdlt.in).
3. Test all forms (Footer, Careers, Contact) to ensure they still send emails via Hostinger SMTP.

---
**Build Note**: We have configured `next.config.ts` with `output: 'standalone'`, which Vercel supports for optimized builds.
