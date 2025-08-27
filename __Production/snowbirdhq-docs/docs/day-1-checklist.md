# Day 1 Implementation Checklist
## Start Implementation: docs.snowbirdhq.com

**Goal**: Get basic Next.js app deployed to docs.snowbirdhq.com subdomain  
**Time Estimate**: 2-3 hours  
**Owner**: Lead Developer

---

## PRIORITY 1: Project Setup (60 minutes)

### 1.1 Create Repository & Initialize Project
```bash
# Create new directory
mkdir snowbird-docs
cd snowbird-docs

# Initialize Next.js project
npx create-next-app@latest . --typescript --app --tailwind --no-src-dir --import-alias "@/*"

# Initialize Git repository
git init
```

**Checklist:**
- [ ] Directory created: `snowbird-docs`
- [ ] Next.js 14+ installed with TypeScript
- [ ] App Router enabled
- [ ] Tailwind CSS configured
- [ ] Git repository initialized

### 1.2 Install Core Dependencies
```bash
# ContentLayer for MDX processing
npm install contentlayer next-contentlayer
npm install @mdx-js/react @mdx-js/loader

# Development dependencies
npm install -D @types/mdx

# Supabase (for later authentication)
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

**Checklist:**
- [ ] ContentLayer installed
- [ ] MDX dependencies installed
- [ ] Supabase packages installed
- [ ] TypeScript types installed

### 1.3 Create GitHub Repository
```bash
# Create repository on GitHub: snowbird-docs
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/snowbird-docs.git
git add .
git commit -m "Initial Next.js setup for docs.snowbirdhq.com"
git push -u origin main
```

**Checklist:**
- [ ] GitHub repository created: `snowbird-docs`
- [ ] Initial commit pushed
- [ ] Repository is public (for easier Vercel import)

---

## PRIORITY 2: Vercel Deployment (30 minutes)

### 2.1 Deploy to Vercel
1. [ ] Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. [ ] Click "New Project"
3. [ ] Import `snowbird-docs` repository
4. [ ] Use default Next.js settings
5. [ ] Click "Deploy"
6. [ ] Wait for initial deployment to complete

**Result**: Project deployed at `https://snowbird-docs.vercel.app`

### 2.2 Configure Subdomain
1. [ ] In Vercel project, go to Settings → Domains
2. [ ] Click "Add" 
3. [ ] Enter: `docs.snowbirdhq.com`
4. [ ] Copy the DNS configuration shown

**Expected DNS Instructions:**
```
Type: CNAME
Name: docs
Value: cname.vercel-dns.com
```

### 2.3 Update DNS Settings
1. [ ] Log into your domain provider (where snowbirdhq.com is managed)
2. [ ] Go to DNS management
3. [ ] Add new CNAME record:
   ```
   Type: CNAME
   Name: docs
   Value: cname.vercel-dns.com
   TTL: 3600 (or default)
   ```
4. [ ] Save DNS changes
5. [ ] Wait 5-30 minutes for propagation

**Verification:**
- [ ] Visit `docs.snowbirdhq.com` - should show your Next.js app
- [ ] SSL certificate should auto-provision (green lock icon)

---

## PRIORITY 3: Basic ContentLayer Setup (45 minutes)

### 3.1 Create ContentLayer Configuration
Create `contentlayer.config.ts`:

```typescript
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Property = defineDocumentType(() => ({
  name: 'Property',
  filePathPattern: `properties/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'Property name',
      required: true,
    },
    location: {
      type: 'string',
      description: 'Location in Queenstown',
      required: true,
    },
    capacity: {
      type: 'number',
      description: 'Maximum guests',
      required: true,
    },
    access: {
      type: 'enum',
      options: ['public', 'private'],
      default: 'public',
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (property) => property._raw.flattenedPath.replace('properties/', ''),
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Property],
})
```

**Checklist:**
- [ ] `contentlayer.config.ts` created
- [ ] Property document type defined
- [ ] Computed slug field configured

### 3.2 Update Next.js Configuration
Update `next.config.js`:

```javascript
const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = withContentlayer(nextConfig)
```

**Checklist:**
- [ ] `next.config.js` updated with ContentLayer
- [ ] Configuration saved

### 3.3 Create Content Structure
```bash
# Create content directories
mkdir -p content/properties/lakefront-luxury
```

Create `content/properties/lakefront-luxury/index.mdx`:

```mdx
---
title: "Lakefront Luxury"
location: "Queenstown Central"
capacity: 6
access: "public"
---

# Welcome to Lakefront Luxury

Your premium lakeside retreat in the heart of Queenstown.

## Quick Info
- **Capacity**: {capacity} guests
- **Location**: {location}
- **WiFi**: LakefrontGuest / Welcome2024!

## Check-in
- **Time**: 3:00 PM
- **Key**: Lockbox code sent via SMS

## House Rules
1. No smoking inside
2. Quiet hours: 10 PM - 8 AM
3. No parties or events

## Emergency Contacts
- **Emergency Services**: 111
- **Property Manager**: +64 21 XXX XXXX
```

**Checklist:**
- [ ] Content directory structure created
- [ ] Sample property MDX file created
- [ ] Frontmatter matches ContentLayer schema

---

## PRIORITY 4: Basic Pages (30 minutes)

### 4.1 Create Property Listing Page
Create `app/properties/page.tsx`:

```typescript
import Link from 'next/link'
import { allProperties } from 'contentlayer/generated'

export default function PropertiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Snowbird HQ Properties</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allProperties.map((property) => (
          <Link
            key={property.slug}
            href={`/properties/${property.slug}`}
            className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border"
          >
            <h2 className="text-2xl font-semibold mb-2">{property.title}</h2>
            <p className="text-gray-600 mb-2">📍 {property.location}</p>
            <p className="text-sm text-gray-500">
              👥 Sleeps {property.capacity} • 📋 Guest Guide Available
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

**Checklist:**
- [ ] Properties listing page created
- [ ] ContentLayer import working
- [ ] Responsive grid layout implemented

### 4.2 Create Dynamic Property Page
Create `app/properties/[slug]/page.tsx`:

```typescript
import { notFound } from 'next/navigation'
import { allProperties } from 'contentlayer/generated'
import { getMDXComponent } from 'next-contentlayer/hooks'

interface PropertyPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return allProperties.map((property) => ({
    slug: property.slug,
  }))
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const property = allProperties.find(
    (property) => property.slug === params.slug
  )

  if (!property) {
    notFound()
  }

  const MDXContent = getMDXComponent(property.body.code)

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="prose prose-lg max-w-none">
        <MDXContent />
      </div>
    </article>
  )
}
```

**Checklist:**
- [ ] Dynamic property page created
- [ ] MDX content rendering working
- [ ] 404 handling implemented

### 4.3 Update Home Page
Update `app/page.tsx`:

```typescript
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-5xl font-bold mb-6">
        Welcome to Snowbird HQ
      </h1>
      <p className="text-xl mb-8 text-gray-600">
        Your comprehensive property guide system
      </p>
      <Link 
        href="/properties"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Browse Properties
      </Link>
    </div>
  )
}
```

**Checklist:**
- [ ] Home page updated with branding
- [ ] Link to properties page added
- [ ] Styling looks good on mobile

---

## PRIORITY 5: Test & Deploy (15 minutes)

### 5.1 Test Locally
```bash
# Start development server
npm run dev

# Visit http://localhost:3000
# Test navigation: Home → Properties → Individual Property
```

**Testing Checklist:**
- [ ] Home page loads correctly
- [ ] Properties page shows Lakefront Luxury
- [ ] Individual property page renders MDX content
- [ ] Mobile responsive design works
- [ ] No console errors

### 5.2 Deploy Updates
```bash
# Commit and push changes
git add .
git commit -m "Add ContentLayer, basic pages, and sample property"
git push origin main
```

**Deployment Checklist:**
- [ ] Changes pushed to GitHub
- [ ] Vercel auto-deploys (check dashboard)
- [ ] Visit docs.snowbirdhq.com to verify
- [ ] Test all pages work on production

---

## PRIORITY 6: Connect Main Website (15 minutes)

### 6.1 Add Navigation Link to Main Website
In your main website (snowbirdhq.com), add a link to the documentation:

```tsx
// Add to your main website navigation
<Link 
  href="https://docs.snowbirdhq.com"
  className="nav-link"
  target="_blank"
  rel="noopener noreferrer"
>
  Guest Portal 📚
</Link>
```

### 6.2 Test Complete User Flow
1. [ ] Visit snowbirdhq.com
2. [ ] Click "Guest Portal" link
3. [ ] Should open docs.snowbirdhq.com in new tab
4. [ ] Navigate through property documentation
5. [ ] Confirm user experience is smooth

---

## Day 1 Success Criteria ✅

**Technical Verification:**
- [ ] docs.snowbirdhq.com loads successfully
- [ ] SSL certificate is active (green lock)
- [ ] ContentLayer processes MDX files
- [ ] At least 1 property documented and viewable
- [ ] Navigation between pages works
- [ ] Mobile responsive design

**Business Verification:**
- [ ] Main website links to documentation platform
- [ ] User can navigate from main site to docs
- [ ] Property information is clearly displayed
- [ ] Platform ready for more content

**Infrastructure Verification:**
- [ ] Separate Vercel project deployed
- [ ] GitHub repository active
- [ ] Automatic deployments working
- [ ] DNS properly configured

---

## Troubleshooting

### Common Issues

**DNS not propagating:**
- Wait longer (up to 24 hours)
- Check DNS with: `dig docs.snowbirdhq.com`
- Verify CNAME record in domain provider

**ContentLayer build errors:**
- Check MDX frontmatter matches schema
- Ensure all required fields present
- Restart dev server after config changes

**Vercel deployment fails:**
- Check build logs in Vercel dashboard
- Ensure all dependencies in package.json
- Verify Next.js version compatibility

---

## Next Steps (Day 2)

After Day 1 completion:
1. Create 2-3 more sample properties
2. Set up Obsidian vault
3. Configure git sync workflow
4. Begin Week 2 implementation tasks

---

**Day 1 Status**: Ready to Execute ✅  
**Estimated Time**: 2-3 hours total  
**Deliverable**: Working documentation platform at docs.snowbirdhq.com