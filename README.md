# TechDLT - Premium Enterprise Technology Solutions Website

A modern, cutting-edge website for TechDLT, a software and enterprise technology solutions company specializing in AI, blockchain, ERP consulting, and custom software development.

## 🌟 Features

### Design & Theme
- **Dark Enterprise Tech Theme**: Deep navy background with electric cyan and teal accents
- **Glassmorphism UI**: Premium glass-effect panels with backdrop blur
- **Gradient Effects**: Dynamic gradients and glow effects throughout
- **Modern Typography**: Clean, professional Inter font family

### Advanced Animations
- **3D Hero Background**: Three.js powered animated 3D sphere with particles and orbital rings
- **GSAP Animations**: Smooth, professional animations on page load
- **Framer Motion**: Advanced component animations and transitions
- **Scroll Animations**: Intersection observer-based scroll-triggered effects
- **Micro-interactions**: Hover effects, glow effects, and smooth transitions

### Pages

1. **Home** (`/`)
   - 3D animated hero section with stats
   - Services showcase
   - Industries overview
   - Case study preview
   - Call-to-action section

2. **About Us** (`/about`)
   - Company story and history
   - Mission and vision
   - Core values
   - Global presence
   - Team credibility

3. **Services** (`/services`)
   - Custom Software Development
   - AI & Machine Learning Solutions
   - Blockchain Solutions
   - ERP & SAP Consulting
   - Mobile App Development
   - Digital Marketing

4. **Industries** (`/industries`)
   - Finance & Banking
   - Retail & E-commerce
   - Healthcare & Life Sciences
   - Enterprise & Corporate
   - Logistics & Supply Chain
   - Education & EdTech

5. **Case Studies** (`/case-studies`)
   - Detailed project breakdowns
   - Challenge-solution-results format
   - Technologies used
   - Industry-specific success stories

6. **Contact** (`/contact`)
   - Interactive contact form
   - WhatsApp integration
   - Gmail integration
   - Contact information
   - Office hours

7. **Careers** (`/careers`)
   - Benefits showcase
   - Open positions
   - Application form

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom React components

### Animations & 3D
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animations**: GSAP, Framer Motion
- **Scroll Effects**: React Intersection Observer

### Development
- **Package Manager**: npm
- **Code Quality**: ESLint
- **Build Tool**: Turbopack (Next.js 16)

## 📦 Installation

1. **Clone the repository** (if applicable)
   ```bash
   git clone <repository-url>
   cd techdlt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Build & Deploy

### Production Build
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Check for Lint Errors
```bash
npm run lint
```

## 📱 Contact Integration

### WhatsApp Integration
The contact and inquiry forms are integrated with WhatsApp. Update the WhatsApp number in:
- `app/contact/page.tsx` (line ~38)

Replace `1234567890` with your actual WhatsApp number (include country code without +).

### Email Integration
Update email addresses in:
- `app/layout.tsx` (metadata)
- `app/contact/page.tsx`
- `app/careers/page.tsx`
- `components/layout/Footer.tsx`

Replace `info@techdlt.com` and `careers@techdlt.com` with your actual email addresses.

## 🎨 Customization

### Color Palette
Colors are defined in `app/globals.css` as CSS variables:
- `--color-accent`: Electric cyan (#00d9ff)
- `--color-accent-teal`: Teal accent (#00ffcc)
- `--color-accent-purple`: Purple accent (#8b5cf6)

### Content Updates
- **Company Information**: Update in `app/about/page.tsx`
- **Services**: Modify service offerings in `app/services/page.tsx`
- **Case Studies**: Add/edit projects in `app/case-studies/page.tsx`
- **Job Openings**: Update positions in `app/careers/page.tsx`

## 📂 Project Structure

```
techdlt/
├── app/                         # Next.js app directory
│   ├── about/                   # About page
│   ├── careers/                 # Careers page
│   ├── case-studies/           # Case studies page
│   ├── contact/                # Contact page
│   ├── industries/             # Industries page
│   ├── services/               # Services page
│   ├── globals.css             # Global styles & design system
│   ├── layout.tsx              # Root layout with navigation
│   └── page.tsx                # Home page
├── components/
│   ├── animations/
│   │   └── Hero3DBackground.tsx # Three.js 3D hero
│   ├── home/
│   │   ├── HeroSection.tsx     # Hero section
│   │   ├── ServicesSection.tsx # Services preview
│   │   ├── IndustriesSection.tsx # Industries preview
│   │   ├── CaseStudiesSection.tsx # Case studies preview
│   │   └── CTASection.tsx      # Call-to-action
│   └── layout/
│       ├── Navigation.tsx      # Navigation bar
│       └── Footer.tsx          # Footer
├── public/                     # Static assets
└── package.json               # Dependencies
```

## 🎯 SEO Optimization

The website includes comprehensive SEO features:
- Optimized meta tags and descriptions
- OpenGraph tags for social sharing
- Semantic HTML structure
- Descriptive page titles
- Proper heading hierarchy
- Fast page load times

## 🔧 Performance Optimization

- **Server-side rendering** with Next.js
- **Code splitting** for optimal bundle sizes
- **Image optimization** (Next.js Image component ready)
- **CSS optimization** with Tailwind CSS
- **Lazy loading** for heavy components
- **Turbopack** for faster builds in development

## 📝 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

When making changes:
1. Test in development mode first
2. Check for TypeScript errors
3. Run the linter
4. Test on multiple screen sizes
5. Verify animations work smoothly

## 📄 License

Copyright © 2026 TechDLT. All rights reserved.

## 💡 Support

For issues or questions about the website:
- Email: info@techdlt.com
- Phone: +1 (555) 123-4567

## 🎉 Features to Add (Future Enhancements)

- [ ] Blog section
- [ ] Client testimonials carousel
- [ ] Interactive project portfolio
- [ ] Live chat integration
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Advanced analytics integration
- [ ] Newsletter subscription
- [ ] Backend API for form submissions
- [ ] Admin dashboard for content management

---

Built with ❤️ using Next.js, Three.js, and modern web technologies.
