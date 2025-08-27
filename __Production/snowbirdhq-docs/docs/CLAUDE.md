# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Snowbird HQ Documentation Platform** - A streamlined property documentation system built on Next.js and Vercel, transforming how short-term rental properties are managed in Queenstown, New Zealand.

### Vision
Leverage existing Vercel infrastructure to build directly with Next.js, MDX, and ContentLayer. Focus on rapid deployment and type-safe content management while maintaining simplicity and reliability.

## Architecture & Development Philosophy

### Core Principles (Direct-to-Production)
1. **Type-Safe Content**: Use ContentLayer for validated, typed MDX content
2. **Existing Infrastructure**: Build on current Vercel setup
3. **Developer Experience**: Hot reload, IntelliSense, instant preview
4. **Business Focus**: Every feature solves real STR problems

### System Architecture
```
┌──────────────────────────────────────────────────────────────┐
│                     Content Layer                           │
├──────────────────────────────────────────────────────────────┤
│  Obsidian      →    Git          →    CI/CD      →   Edge   │
│  Authoring         Version           Pipeline        Delivery│
│                    Control                                   │
│  Templates         Branching         Testing         CDN     │
│  Plugins          Reviews           Validation      Cache    │
│  Dataview         Webhooks          Deploy          Auth     │
└──────────────────────────────────────────────────────────────┘
```

### Development Workflow (Explore-Plan-Code-Commit)
- **Explore**: Analyze patterns and existing code
- **Plan**: Design scalable solutions
- **Code**: Implement with best practices
- **Commit**: Deploy through quality gates

## Repository Structure

```
snowbird-docs/
├── .claude/                    # AI-specific configurations
│   ├── commands/              # Custom workflow commands
│   └── agents/                # Specialized AI agents
├── .obsidian/                 # Obsidian configuration
│   ├── templates/            # Content templates
│   └── plugins/              # Custom plugins
├── src/
│   ├── content/              # Main content directory
│   │   ├── properties/       # Property-specific docs
│   │   │   └── {property-id}/
│   │   │       ├── index.mdx
│   │   │       ├── guest/
│   │   │       ├── operations/
│   │   │       └── assets/
│   │   ├── shared/           # Shared resources
│   │   └── internal/         # Private documentation
│   ├── components/           # React/MDX components
│   ├── lib/                  # Utility functions
│   └── styles/              # Global styles
├── public/                   # Static assets
├── tests/                    # Test suites (80% coverage minimum)
├── scripts/                  # Build/deploy scripts
├── CLAUDE.md                 # This file
└── docs/
    ├── requirements.md       # Enhanced requirements document
    └── architecture/         # Technical documentation
```

## Technology Stack (Simplified)

### Phase 1 Technologies
- **Content Management**: Obsidian (local control, proven)
- **Version Control**: GitHub (free, reliable)
- **Hosting**: GitHub Pages → Vercel (simple progression)
- **Processing**: Static site generator → Next.js

### Phase 2 Technologies
- **Web Framework**: Next.js 14+ (industry standard)
- **Authentication**: Supabase Auth (simple setup)
- **Database**: Supabase PostgreSQL (integrated)
- **Analytics**: Vercel Analytics (built-in)

### Phase 3 Technologies
- **Search**: Next.js built-in → Simple service if needed
- **Storage**: Supabase Storage (integrated solution)
- **Monitoring**: Vercel Monitoring

### Explicitly Avoided (Initially)
- Algolia (complex, expensive)
- GraphQL (over-engineering)
- React Native (PWA sufficient)
- Multiple cloud services (complexity)
- Advanced testing frameworks (start simple)

## Development Commands

### Phase 1 (Static Site)
```bash
# Simple setup
git add . && git commit -m "Update content"
git push origin main     # Auto-deploys via GitHub Pages
```

### Phase 2 (Next.js Application)
```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Content Management
npm run content:sync      # Sync with Obsidian vault
npm run content:validate  # Basic validation

# Deployment
git push origin main     # Auto-deploys via Vercel
```

### Phase 3 (Enhanced Features)
```bash
# Testing (when needed)
npm run test            # Basic test suite
npm run test:e2e        # Essential E2E tests
npm run lint            # Code quality

# Monitoring
npm run health-check    # System health verification
```

### Keep Simple
- Avoid complex build processes initially
- Automated deployment via Git push
- Minimal tooling until proven necessary

## Development Standards

### Code Quality Requirements
- **Test Coverage**: Minimum 80% with focus on critical paths
- **Performance**: Core Web Vitals all green
- **Accessibility**: WCAG 2.1 AA compliance
- **Security**: OWASP Top 10 compliance
- **Documentation**: All components documented with examples

### Content Standards

#### Public Content Requirements
- Mobile-first responsive design
- Page load time < 1.5 seconds
- Offline capability for essential docs
- Multi-language support (EN/ZH/JP)
- SEO optimized with structured data

#### Private Content Requirements
- Zero-trust security model
- Role-based access control (RBAC)
- Audit logging for all access
- Encrypted at rest and in transit

### Property Documentation Template
```yaml
---
title: Property Name
id: property-xxx
status: active
access: public|private
languages: [en, zh, jp]
tags: [lakefront, luxury, family]
---
```

Required sections per property:
- `index.mdx` - Property overview with metadata
- `guest/` - Public guest information
  - `welcome.mdx` - Check-in and basics
  - `amenities.mdx` - Property features
  - `local-guide.mdx` - Area recommendations
- `operations/` - Private management
  - `assets.mdx` - Inventory tracking
  - `maintenance.mdx` - Service records
  - `finances.mdx` - Revenue data

## Implementation Roadmap

### Current Status
**Phase**: Ready to Implement  
**Documentation**: Version 3.1 (Subdomain Approach)  
**Deployment**: docs.snowbirdhq.com (separate Vercel project)  
**Next Step**: Execute Day 1 implementation tasks  
**Timeline**: 6 weeks to production deployment  
**Architecture**: Clean separation from main website, zero risk to existing infrastructure

### Development Phases

#### Phase 0: Foundation (Weeks 1-2) 
- Development environment setup
- CI/CD pipeline configuration
- Obsidian vault structure
- Template creation

#### Phase 1: MVP (Weeks 3-4)
- Core Next.js application
- MDX component library
- Supabase authentication
- 3 pilot properties
- 80% test coverage

#### Phase 2: Enhancement (Weeks 5-8)
- Algolia search integration
- Multi-language support
- Analytics dashboard
- 25 properties
- A/B testing

#### Phase 3: Scale (Weeks 9-12)
- API development
- Mobile app
- Real-time updates
- 50+ properties
- IoT integration

### Success Metrics (Realistic)
- Guest support reduction: 40% in 4 months
- Property onboarding: <2 hours
- Page load time: <3 seconds (mobile)
- System reliability: 99% uptime
- Staff satisfaction: Team can manage system confidently
- ROI: System pays for itself within 12 months

## AI Assistant Guidelines

When working in this repository:

1. **Simplicity First**: Choose the simplest solution that works
2. **Business Value**: Ensure every feature solves a real STR problem
3. **Mobile-First**: STR guests primarily use mobile devices
4. **Maintainability**: Code that the business team can understand and modify
5. **Reliability**: System must work consistently for guest experiences
6. **Phase Discipline**: Don't add Phase 3 features to Phase 1
7. **Cost Awareness**: Consider ongoing operational costs
8. **Documentation**: Clear guides for non-technical team members
9. **Security**: Protect guest and business data appropriately
10. **Performance**: Fast enough for guest satisfaction (not perfection)

## References

- [Requirements Document](./docs/requirements.md)
- [Claude Code Standards](https://github.com/andrewlaery/Claude-Code-Standards)
- [Next.js Best Practices](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Obsidian Developer Docs](https://docs.obsidian.md/)