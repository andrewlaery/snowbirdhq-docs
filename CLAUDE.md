# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Snowbird HQ Documentation Platform** - Production Next.js application with Obsidian CMS integration for vacation rental property documentation.

**Live URL**: https://docs.snowbirdhq.com  
**Status**: ✅ Production with active authentication and Obsidian CMS integration

## Commands

```bash
# Development
npm run dev                 # Start development server (http://localhost:3000)
npm run build              # Build for production (required before deployment)
npm run lint               # Run ESLint

# Installation (ContentLayer compatibility)
npm install --legacy-peer-deps    # Required for ContentLayer + Next.js 15

# Deployment (CLI only - Git deployment has bugs)
vercel --prod --yes        # Deploy to production

# Content Management (via Obsidian sync)
./sync-to-project.sh       # Sync content from Obsidian vault (run from Obsidian folder)
./sync-from-project.sh     # Sync content to Obsidian vault (run from Obsidian folder)
```

## Architecture

### Core Technologies
- **Framework**: Next.js 15.5.2 with App Router
- **Content Management**: Obsidian + ContentLayer 0.3.4 + MDX for type-safe property documents
- **Authentication**: Supabase (magic links + password)
- **Styling**: Tailwind CSS v4
- **Deployment**: Vercel (CLI deployment required)

### Content Management System

**Obsidian Integration**: Content is managed via Obsidian vault at `/Users/andrewlaery/Documents/andrewlaery/str/snowbirdhq-docs/`

**Multi-Document Architecture**: Each property has 4 separate document types:
1. **Property**: Basic metadata (`property.mdx`)
2. **Welcome & House Rules**: Check-in info and rules (`welcome-house-rules.mdx`) 
3. **User Instructions**: WiFi, appliances, amenities (`user-instructions.mdx`)
4. **Critical Info**: Emergency contacts and safety (`critical-info.mdx`)
5. **Local Guide**: Area recommendations per location (`locations/{slug}/local-guide.mdx`)

**Tabbed Interface**: Properties display content via `PropertyTabsSimple` component with:
- Simple markdown-to-HTML conversion (avoids MDX rendering issues)
- Smart tab initialization to first available document
- Availability indicators for missing content

### Authentication Flow

The authentication system uses Supabase with two implementations:

1. **Direct API calls** (`/auth/signin`) - Working perfectly
   - Uses hardcoded JWT token in fetch requests
   - Sends magic links successfully

2. **AuthContext + Supabase Client** (`/auth/login`) - Has fetch errors
   - Uses `contexts/AuthContext.tsx` with `lib/supabase-client.ts`
   - Known issue with JWT token handling in production

### Route Protection

Middleware (`middleware.ts`) controls access:
- **Public Routes**: `/`, `/properties/*` - Guest accessible
- **Protected Routes**: `/admin`, `/debug`, `/debug-auth` - Requires authentication
- Redirects to `/auth/signin?redirectTo={path}` when unauthorized

### ContentLayer Document Types

**Property documents** require specific frontmatter structure:

```typescript
// Property metadata (property.mdx)
{
  title: string      // Property name
  location: string   // Location in Queenstown  
  capacity: number   // Maximum guests
  access: 'public' | 'private'
}

// Content documents (welcome-house-rules.mdx, user-instructions.mdx, critical-info.mdx)
{
  title: string      // Document title (has defaults)
}

// Local guides (locations/{slug}/local-guide.mdx)
{
  title: string      // Guide title
  location: string   // Location name
}
```

ContentLayer automatically processes MDX files on build and generates type-safe imports.

## Known Issues & Solutions

### Authentication Fetch Error
- **Issue**: `/auth/login` shows "Failed to execute 'fetch' on 'Window': Invalid value"
- **Workaround**: Use `/auth/signin` page which works correctly
- **Root Cause**: JWT token handling in AuthContext

### Deployment Path Bug
- **Issue**: Git-based deployment creates `/vercel/path0/` errors
- **Solution**: Always deploy via CLI: `vercel --prod --yes`

### ContentLayer + Next.js 15
- **Issue**: Turbopack incompatible with ContentLayer
- **Solution**: Turbopack disabled in configuration
- **Installation**: Use `npm install --legacy-peer-deps`

### MDX Rendering Issues
- **Issue**: Complex MDX components cause `e.getOwner is not a function` errors during build
- **Solution**: Use `PropertyTabsSimple` with basic HTML conversion instead of `useMDXComponent`
- **Implementation**: Manual markdown-to-HTML parsing in `formatMarkdown()` function

## Content Management Workflow

### Obsidian → Website Pipeline
1. **Edit content** in Obsidian vault at `/Users/andrewlaery/Documents/andrewlaery/str/snowbirdhq-docs/`
2. **Sync content** via `./sync-to-project.sh` (copies from Obsidian to project `/content/` directory)
3. **Build & deploy** via `npm run build && vercel --prod --yes`

### Property Creation Process
1. Create property folder in Obsidian: `properties/{property-slug}/`
2. Use Obsidian templates from `templates/` folder:
   - Property Template → `property.mdx`
   - Welcome & House Rules Template → `welcome-house-rules.mdx`
   - User Instructions Template → `user-instructions.mdx`
   - Critical Info Template → `critical-info.mdx`
3. Sync to project and deploy

### Legacy Property Migration
- Properties with `index.mdx` files use old single-document structure
- Properties with separate MDX files use new multi-document tabbed structure
- ContentLayer handles both structures simultaneously

## Critical Files

- `middleware.ts` - Route protection logic
- `contexts/AuthContext.tsx` - Authentication state management
- `lib/supabase-client.ts` - Supabase client configuration (contains hardcoded fallback JWT)
- `app/auth/signin/page.tsx` - Working magic link implementation
- `app/auth/login/page.tsx` - Alternative login with known issues
- `contentlayer.config.ts` - Multi-document schema (Property, WelcomeHouseRules, UserInstructions, CriticalInfo, LocalGuide)
- `components/PropertyTabsSimple.tsx` - Tabbed content interface with HTML conversion
- `app/properties/[slug]/page.tsx` - Property pages with multi-document support

## Environment Variables

Required in production (see `.env.example`):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

The application has hardcoded fallbacks if environment variables are missing.

## Business Context

**Purpose**: Reduce guest support calls by providing self-service property documentation  
**Users**: Vacation rental guests in Queenstown, NZ  
**Scale Target**: 50+ properties  
**Current Properties**: Mix of legacy single-document and new multi-document properties
**Content Management**: Transitioned from manual file editing to Obsidian CMS workflow