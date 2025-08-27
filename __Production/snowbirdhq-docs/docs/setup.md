# Snowbird HQ - Implementation Setup Guide
## Subdomain Deployment: docs.snowbirdhq.com

This guide will get you from zero to a working property documentation platform at **docs.snowbirdhq.com** in under an hour, deployed as a separate Vercel project from your main website.

## Prerequisites

- Node.js 18+ installed
- GitHub account
- Vercel account (existing)
- Supabase account (free tier)
- Obsidian installed locally

## Step 1: Initialize Next.js Project

```bash
# Create the Next.js application
npx create-next-app@latest snowbird-docs \
  --typescript \
  --app \
  --tailwind \
  --no-src-dir \
  --import-alias "@/*"

cd snowbird-docs
```

## Step 2: Install ContentLayer and Dependencies

```bash
# Core dependencies
npm install contentlayer next-contentlayer
npm install @mdx-js/react @mdx-js/loader

# Supabase for authentication
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs

# Development dependencies
npm install -D @types/mdx
```

## Step 3: Configure ContentLayer

Create `contentlayer.config.ts` in the root:

```typescript
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

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
      description: 'Property location in Queenstown',
      required: true,
    },
    access: {
      type: 'enum',
      options: ['public', 'private'],
      default: 'public',
      required: true,
    },
    capacity: {
      type: 'number',
      description: 'Maximum guests',
      required: true,
    },
    amenities: {
      type: 'list',
      of: { type: 'string' },
      description: 'Property amenities',
    },
    wifi: {
      type: 'nested',
      of: defineNestedType(() => ({
        name: 'WiFi',
        fields: {
          network: { type: 'string', required: true },
          password: { type: 'string', required: true },
        },
      })),
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (property) => property._raw.flattenedPath.replace('properties/', ''),
    },
    url: {
      type: 'string',
      resolve: (property) => `/properties/${property._raw.flattenedPath.replace('properties/', '')}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Property],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },
})
```

## Step 4: Update Next.js Configuration

Update `next.config.js`:

```javascript
const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'], // Add your image domains
  },
}

module.exports = withContentlayer(nextConfig)
```

## Step 5: Create Content Structure

Create the following directory structure:

```bash
mkdir -p content/properties/lakefront-luxury
mkdir -p content/properties/mountain-retreat
mkdir -p content/shared
```

## Step 6: Create Sample Property Content

Create `content/properties/lakefront-luxury/index.mdx`:

```mdx
---
title: "Lakefront Luxury"
location: "Queenstown Central"
access: "public"
capacity: 6
amenities:
  - "Hot Tub"
  - "Lake Views"
  - "Full Kitchen"
  - "WiFi"
  - "Parking"
wifi:
  network: "LakefrontGuest"
  password: "Welcome2024!"
---

# Welcome to Lakefront Luxury

Your premium lakeside retreat in the heart of Queenstown.

## Check-in Information

- **Check-in time**: 3:00 PM
- **Check-out time**: 10:00 AM
- **Key collection**: Lockbox at front door (code sent via SMS)

## WiFi Access

- **Network**: {wifi.network}
- **Password**: {wifi.password}

## House Rules

1. No smoking inside the property
2. No parties or events
3. Quiet hours: 10 PM - 8 AM
4. Maximum occupancy: {capacity} guests

## Emergency Contacts

- **Emergency Services**: 111
- **Property Manager**: +64 21 XXX XXXX
- **After-hours Support**: +64 21 YYY YYYY
```

## Step 7: Create Property Listing Page

Create `app/properties/page.tsx`:

```typescript
import Link from 'next/link'
import { allProperties } from 'contentlayer/generated'

export default function PropertiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Properties</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allProperties.map((property) => (
          <Link
            key={property.slug}
            href={property.url}
            className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-2">{property.title}</h2>
            <p className="text-gray-600 mb-2">{property.location}</p>
            <p className="text-sm text-gray-500">
              Sleeps {property.capacity} • {property.amenities?.length || 0} amenities
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

## Step 8: Create Dynamic Property Page

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
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{property.title}</h1>
        <p className="text-lg text-gray-600">{property.location}</p>
        {property.amenities && (
          <div className="flex flex-wrap gap-2 mt-4">
            {property.amenities.map((amenity) => (
              <span
                key={amenity}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {amenity}
              </span>
            ))}
          </div>
        )}
      </header>
      <div className="prose prose-lg max-w-none">
        <MDXContent />
      </div>
    </article>
  )
}
```

## Step 9: Set Up Obsidian Vault

1. Create a new Obsidian vault at `~/Documents/Snowbird-Properties`
2. Create the same folder structure as in `content/`
3. Install Obsidian Git plugin for syncing

Create `.obsidian/templates/property-template.md`:

```markdown
---
title: "{{title}}"
location: "{{location}}"
access: "public"
capacity: {{capacity}}
amenities:
  - ""
wifi:
  network: ""
  password: ""
---

# Welcome to {{title}}

## Check-in Information

- **Check-in time**: 3:00 PM
- **Check-out time**: 10:00 AM
- **Key collection**: 

## WiFi Access

- **Network**: 
- **Password**: 

## House Rules

## Emergency Contacts
```

## Step 10: Deploy to Vercel as Subdomain

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial setup with ContentLayer and MDX for docs.snowbirdhq.com"

# Push to GitHub
git remote add origin https://github.com/yourusername/snowbird-docs.git
git push -u origin main
```

**Deploy as NEW Vercel Project:**
1. Go to Vercel Dashboard
2. Click "New Project" (don't add to existing project)
3. Import your snowbird-docs GitHub repository
4. Deploy with default Next.js settings

**Configure Subdomain:**
5. Go to Project Settings → Domains
6. Click "Add"
7. Enter: `docs.snowbirdhq.com`
8. Vercel will provide DNS instructions

**Set Up DNS:**
9. In your domain provider (where snowbirdhq.com is managed):
   ```
   Type: CNAME
   Name: docs
   Value: cname.vercel-dns.com
   ```
10. Wait 5-30 minutes for DNS propagation
11. Test by visiting docs.snowbirdhq.com

## Step 11: Add Supabase Authentication (Optional)

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Create `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

## Development Workflow

1. **Edit content in Obsidian** using templates
2. **Sync to Git** using Obsidian Git plugin or manual commits
3. **Preview locally** with `npm run dev`
4. **Deploy automatically** by pushing to GitHub

## Useful Commands

```bash
# Development
npm run dev              # Start development server

# Build & Preview
npm run build           # Build for production
npm run start           # Preview production build

# Content
npm run contentlayer    # Manually build content

# Type checking
npm run type-check      # Check TypeScript types
```

## Step 11: Connect Main Website

Add a link from your main website to the docs platform:

```tsx
// In your main website navigation (snowbirdhq.com)
<nav>
  {/* Your existing navigation */}
  <Link 
    href="https://docs.snowbirdhq.com" 
    className="btn btn-primary"
    target="_blank"
  >
    Guest Portal 📚
  </Link>
</nav>
```

## Test Complete Flow

1. Visit `snowbirdhq.com`
2. Click "Guest Portal" link
3. Should redirect to `docs.snowbirdhq.com`
4. Browse property documentation

## Next Steps

1. ✅ Subdomain deployment complete
2. ✅ Main website integration working
3. 📝 Add more properties using Obsidian templates
4. 🔐 Implement authentication for private content
5. 🎨 Customize styling with Tailwind CSS
6. 📊 Configure Vercel Analytics
7. 🌍 Implement multi-language support
8. 🔍 Add search functionality

## Troubleshooting

**ContentLayer build errors:**
- Check MDX frontmatter matches schema
- Ensure all required fields are present
- Validate YAML syntax in frontmatter

**Hot reload not working:**
- Restart dev server after ContentLayer config changes
- Check that content directory path is correct

**Deployment issues:**
- Ensure all environment variables are set in Vercel
- Check build logs in Vercel dashboard

---

Ready to start! Your property documentation platform is now deployed at **docs.snowbirdhq.com** as a separate project, cleanly integrated with your main website. 🚀

**Architecture Achieved:**
- `snowbirdhq.com` → Main website (unchanged)
- `docs.snowbirdhq.com` → Documentation platform (new)
- Clean separation, zero risk to existing site
- Easy navigation between both platforms