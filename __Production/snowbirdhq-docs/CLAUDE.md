# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Project Overview

**Snowbird HQ Documentation Platform** - Successfully deployed Next.js application for property documentation management.

**Status**: ✅ Production Ready  
**Live URL**: https://snowbirdhq-docs-frdbr5bhw-andrewlaerys-projects.vercel.app  
**Target Domain**: docs.snowbirdhq.com  

## Architecture

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Content**: ContentLayer + MDX for type-safe property documents
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (via CLI due to Git deployment bug)
- **Content Management**: Obsidian (future integration)

### Project Structure
```
snowbird-docs/
├── app/                     # Next.js App Router pages
│   ├── page.tsx            # Home page
│   └── properties/         # Property routes
├── content/properties/     # MDX property documents
├── contentlayer.config.ts  # Content schema definition
└── public/                 # Static assets
```

## Development Workflow

### Local Development
```bash
npm run dev                 # Start development server
npm run build              # Test production build
```

### Deployment
```bash
vercel --prod --yes        # Deploy via Vercel CLI
```

**Important**: Use CLI deployment only. Git-based deployment has persistent `/vercel/path0/` bug.

### Content Management
1. Create MDX files in `content/properties/{slug}/index.mdx`
2. Use frontmatter schema defined in `contentlayer.config.ts`
3. ContentLayer automatically processes and validates content

## Key Implementation Notes

### Next.js 15 Compatibility
- Used `--legacy-peer-deps` for ContentLayer compatibility
- Updated dynamic routes to handle Promise-based params
- Disabled Turbopack (incompatible with ContentLayer)

### Solved Issues
- ✅ ContentLayer + Next.js 15 compatibility
- ✅ MDX frontmatter parsing
- ✅ Vercel deployment path issues (resolved via CLI)
- ✅ Dynamic property routing
- ✅ Responsive design

### Content Schema
Properties require:
- `title`: string
- `location`: string  
- `capacity`: number
- `access`: 'public' | 'private'

## Current Status

**Phase 1 Complete**: Core platform deployed and functional
**Next Phase**: Custom domain + main website integration

## Development Commands

```bash
# Development
npm run dev                 # Local development server
npm run build               # Production build
npm run lint               # Code linting

# Deployment  
vercel --prod --yes        # Deploy to production
vercel --help             # CLI help

# Content
# Add MDX files to content/properties/ directory
# ContentLayer automatically processes on next build
```

## Business Context

**Purpose**: Streamline property documentation for Queenstown STR business  
**Goal**: Reduce guest support calls by 40%  
**Target**: Scale to 50+ properties  
**Integration**: Link from main snowbirdhq.com website