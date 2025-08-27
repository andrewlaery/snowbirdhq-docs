# Snowbird HQ Documentation Platform
## Short-Term Rental Management System for Queenstown Properties

---

## Executive Vision

### Mission Statement
**"To create a world-class documentation platform that transforms how short-term rental properties are managed and experienced in Queenstown - delivering exceptional guest experiences through intelligent information architecture while empowering property managers with real-time operational insights."**

### Strategic Goals (Subdomain Implementation)
1. **Guest Excellence**: Reduce support inquiries by 40% through docs.snowbirdhq.com portal
2. **Operational Efficiency**: Cut property onboarding time to <2 hours with templates
3. **Sustainable Growth**: Support 30+ properties in Year 1, 75+ by Year 2
4. **Seamless Integration**: Connect main website to documentation platform
5. **Reliable Operations**: Create maintainable system that staff can confidently manage
6. **Positive ROI**: System pays for itself through reduced operational costs within 12 months

---

## Project Requirements Document
### Version 2.0 - Enhanced with Claude Code Standards

### 1. System Overview

#### Vision
A next-generation property documentation platform that treats content as code, enabling version-controlled, scalable management of STR properties through modern development practices.

#### Core Value Proposition
- **For Guests**: Instant access to property information, local recommendations, and support resources
- **For Managers**: Centralized control over distributed property documentation
- **For Owners**: Real-time visibility into property operations and guest satisfaction
- **For Business**: Scalable infrastructure supporting rapid portfolio expansion

### 2. Technical Architecture

#### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                     Content Layer                           │
├─────────────────────────────────────────────────────────────┤
│  Obsidian          Git              CI/CD          Edge     │
│  Authoring  →  Version Control → Build Pipeline → Delivery  │
│                                                              │
│  - Templates       - Branching      - Testing      - CDN    │
│  - Plugins         - Reviews        - Validation   - Cache  │
│  - Dataview        - Webhooks       - Deploy       - Auth   │
└─────────────────────────────────────────────────────────────┘
```

#### Development Workflow (Explore-Plan-Code-Commit)
1. **Explore**: Analyze existing documentation patterns
2. **Plan**: Design scalable content architecture
3. **Code**: Implement with MDX/Next.js
4. **Commit**: Deploy through automated pipelines

### 3. Core Functional Requirements

#### 3.1 Content Management
- **Markdown-based authoring** using Obsidian with live preview
- **Version control** via Git integration for tracking changes
- **Template system** using Obsidian Templater for standardization
- **Bulk operations** for updating common information across properties
- **Media management** for images, videos, and PDF attachments
- **Multi-language support** for international visitors

#### 3.2 Access Control & Security
- **Public pages** for guest-facing content (no authentication)
- **Private/secure sections** requiring authentication
- **Role-based access control** (owner, manager, cleaner, maintenance)
- **Property-specific access** restrictions
- **Guest access tokens** with booking duration validity
- **Frontmatter control** for public/private designation

#### 3.3 Guest Experience
- **Mobile-responsive design** prioritizing phone/tablet viewing
- **Fast loading times** (<2 seconds globally)
- **Offline capability** for essential documents (PWA)
- **Beautiful presentation** with property-specific branding
- **Search functionality** within property documentation
- **Interactive maps** for local recommendations
- **Emergency information** prominently displayed

#### 3.4 Internal Management Features
- **Property database** using Obsidian Dataview
- **Asset tracking** with warranties and maintenance schedules
- **Supplier/contractor directory** with contact information
- **Maintenance logs** and issue tracking
- **Cleaning checklists** with verification capability
- **Financial document storage** (secure vault)

### 4. Project Structure (Next.js + ContentLayer)

```
snowbird-docs/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   ├── properties/
│   │   ├── [slug]/
│   │   │   └── page.tsx       # Dynamic property pages
│   │   └── page.tsx           # Property listing
│   ├── admin/                 # Management dashboard
│   │   └── properties/
│   └── api/                   # API routes
│       └── auth/
├── content/                    # MDX content (Git-synced from Obsidian)
│   ├── properties/
│   │   ├── lakefront-luxury/
│   │   │   ├── index.mdx      # Property overview
│   │   │   ├── guest-guide.mdx
│   │   │   └── operations.mdx
│   │   └── mountain-retreat/
│   ├── shared/                # Shared content
│   └── internal/              # Private docs
├── components/
│   ├── mdx/                   # MDX components
│   ├── property/              # Property components
│   └── ui/                    # UI components
├── lib/
│   ├── contentlayer/          # Content configuration
│   ├── supabase/              # Auth/DB client
│   └── utils/                 # Utilities
├── public/                     # Static assets
│   └── images/
├── contentlayer.config.ts      # ContentLayer configuration
├── next.config.js              # Next.js configuration
├── package.json
├── CLAUDE.md                   # AI context
└── docs/
    ├── requirements.md         # This document
    └── setup.md                # Setup instructions

# Separate Obsidian Vault (local)
obsidian-vault/
├── .obsidian/
│   ├── templates/             # Property templates
│   └── plugins/               # Obsidian plugins
└── properties/                 # Same structure as content/
```

### 5. Technology Stack (Direct to Production)

> **Updated Approach**: Since Vercel hosting is already in place, we'll build directly with Next.js and MDX, skipping the static site phase entirely.

#### Core Stack (Immediate Implementation)
| Component | Technology | Rationale | Cost |
|-----------|------------|-----------|------|
| **Content Authoring** | Obsidian | Best-in-class markdown editor with templates | $50/year |
| **Content Processing** | MDX + ContentLayer | Type-safe content, hot reload, excellent DX | Free |
| **Version Control** | GitHub | Industry standard, CI/CD integration | Free |
| **Web Framework** | Next.js 14+ (App Router) | Already on Vercel, optimal performance | Free |
| **Hosting** | Vercel (existing) | Already configured, auto-deployments | Existing plan |
| **Authentication** | Supabase Auth | Simple setup, row-level security | Free → $25/mo |
| **Database** | Supabase PostgreSQL | Property metadata, user management | Included |
| **Analytics** | Vercel Analytics | Already integrated | Existing plan |

#### Content Pipeline Architecture
```
Obsidian (Local Editing)
    ↓ Git Push
GitHub Repository (snowbird-docs)
    ↓ Webhook
Vercel Build (New Project)
    ↓ ContentLayer Processing
MDX → Type-safe Content
    ↓ Next.js Pages
docs.snowbirdhq.com (Subdomain)
```

#### Integration with Main Website
```
snowbirdhq.com (Main Website)
    ↓ Navigation Link
docs.snowbirdhq.com (Documentation Platform)
    ↓ Guest Access
Property Guides & Information
```

#### Phase 1: Foundation (Weeks 1-2)
- Next.js app with ContentLayer
- MDX content processing pipeline
- Basic property page templates
- Mobile-responsive design

#### Phase 2: Access Control (Weeks 3-4)
- Supabase authentication
- Role-based access (guest/staff/owner)
- Private content protection
- Property management interface

#### Phase 3: Enhanced Features (Weeks 5-6)
- Search functionality (built-in first)
- Image optimization with Next/Image
- Performance optimization
- Multi-language support (i18n)

#### Why ContentLayer + MDX?
- **Type Safety**: Validates all content at build time
- **Hot Reload**: Instant preview of content changes
- **Component Support**: Embed interactive components in markdown
- **SEO Optimized**: Static generation with ISR
- **Developer Experience**: IntelliSense for content fields

### 6. Implementation Roadmap (Direct Next.js Approach)

> **Accelerated Timeline**: 6-week core development with existing Vercel infrastructure

#### Week 1-2: Next.js Foundation
**Goal**: Set up core Next.js application with content pipeline on subdomain

- [ ] Initialize Next.js 14+ with TypeScript and App Router
- [ ] Configure ContentLayer for MDX processing
- [ ] Set up Obsidian vault structure with templates
- [ ] Create property content schema (type definitions)
- [ ] Implement dynamic routing for properties
- [ ] Deploy as new Vercel project (separate from main website)
- [ ] Configure docs.snowbirdhq.com subdomain
- [ ] Create 3-5 test properties
- [ ] Add navigation link from main website

**Deliverable**: Live documentation platform at docs.snowbirdhq.com

#### Week 3-4: Authentication & Access Control
**Goal**: Secure private content and enable management features

- [ ] Integrate Supabase Auth
- [ ] Implement role-based access control (RBAC)
- [ ] Create login flow for staff and guests
- [ ] Build property management dashboard
- [ ] Add private/public content separation
- [ ] Implement secure API routes
- [ ] Set up user session management

**Deliverable**: Secure platform with protected content areas

#### Week 5-6: Production Features
**Goal**: Polish for production use

- [ ] Add search functionality (Next.js built-in)
- [ ] Implement image optimization (Next/Image)
- [ ] Create property onboarding wizard
- [ ] Add analytics tracking
- [ ] Optimize Core Web Vitals
- [ ] Set up error monitoring
- [ ] Create backup and restore procedures
- [ ] Document all workflows

**Deliverable**: Production-ready platform for 20+ properties

#### Month 2-3: Scaling & Enhancement
**Goal**: Support business growth

- [ ] Multi-language support (i18n routing)
- [ ] Advanced search with filters
- [ ] Bulk content operations
- [ ] Guest feedback system
- [ ] Integration webhooks
- [ ] Performance optimization
- [ ] Scale to 50+ properties

**Success Metric**: Platform handles 50+ properties efficiently

#### Future Enhancements (Month 4+)
- API development for third-party integrations
- Advanced analytics dashboard
- AI-powered content suggestions
- Mobile app (if PWA insufficient)

### 7. Success Metrics (Business-First Approach)

#### Primary Business Metrics (Phase 1-2)
| Metric | Baseline | Target | Measurement | Timeline |
|--------|----------|--------|-------------|----------|
| **Guest Support Calls** | Current volume | 40% reduction | Support tickets | 4 months |
| **Property Onboarding** | Current time | <2 hours | Time tracking | 3 months |
| **Guest Satisfaction** | Current rating | +0.3 points | Booking reviews | 6 months |
| **Manager Time Savings** | Current process | 25% less time | Time studies | 4 months |
| **Documentation Coverage** | 0% | 100% properties | Manual audit | 3 months |

#### Secondary Technical Metrics (Phase 2-3)
| Metric | Target | Measurement | Priority |
|--------|--------|-------------|----------|
| **Page Load Time** | <3 seconds | Lighthouse | Medium |
| **Mobile Usability** | 90+ score | Google PageSpeed | High |
| **Uptime** | 99%+ | Monitoring | High |
| **Content Update Time** | <30 minutes | Process tracking | Medium |
| **Guest Guide Usage** | 80% adoption | Analytics | Low |

#### Quality Standards (Simplified)
- **Functionality**: All features work as designed
- **Performance**: Fast enough for guest satisfaction
- **Mobile-First**: Excellent mobile experience
- **Reliability**: 99%+ uptime during guest stays
- **Security**: Guest data protected, staff access controlled
- **Maintainability**: Team can update content easily

> **Note**: Advanced metrics (A/B testing, conversion tracking, etc.) deferred to Phase 3+

### 8. User Stories

#### As a Guest
- I want to quickly find WiFi passwords and check-in instructions
- I want recommendations for local restaurants and activities
- I want to understand appliance usage without calling support
- I want emergency contact information readily available

#### As a Property Manager
- I want to update multiple property guides simultaneously
- I want to track which documents need updating
- I want to share specific documents with contractors
- I want to maintain property-specific information securely

#### As a Business Owner
- I want to ensure brand consistency across all properties
- I want to track document access and usage analytics
- I want to onboard new properties quickly using templates
- I want to maintain compliance documentation centrally

### 9. Realistic Budget Forecast

#### Development Costs (Accelerated Timeline)
| Phase | Timeline | Development Cost | Description |
|-------|----------|------------------|-------------|
| **Foundation** | Weeks 1-2 | $2,000-4,000 | Next.js setup, ContentLayer, MDX pipeline |
| **Access Control** | Weeks 3-4 | $3,000-5,000 | Supabase auth, RBAC, management dashboard |
| **Production** | Weeks 5-6 | $2,000-3,000 | Search, optimization, documentation |
| **Scaling** | Months 2-3 | $3,000-5,000 | Multi-language, integrations, 50+ properties |
| **Total** | 3 months | $10,000-17,000 | Reduced cost with existing infrastructure |

#### Operational Costs (Monthly)
| Scale | Properties | SaaS Costs | Maintenance | Total/Month | Annual |
|-------|-----------|------------|-------------|-------------|--------|
| **Year 1** | 10-30 | $50-100 | $200-500 | $250-600 | $3,000-7,200 |
| **Year 2** | 30-75 | $100-200 | $500-800 | $600-1,000 | $7,200-12,000 |
| **Year 3** | 75-150 | $200-400 | $800-1,200 | $1,000-1,600 | $12,000-19,200 |

#### Cost Breakdown
- **SaaS Services**: Vercel, Supabase, analytics, monitoring
- **Maintenance**: Updates, bug fixes, content management (20% of dev cost annually)
- **Does not include**: Staff time, additional features, major redesigns

### 10. Risk Management & Maintainability

#### Technical Risks
| Risk | Likelihood | Impact | Mitigation Strategy |
|------|-----------|--------|--------------------|
| **Obsidian dependency** | Medium | High | Git backup, export procedures, alternative editors |
| **Over-complexity** | High | High | Phased approach, simplicity first, regular reviews |
| **Team knowledge loss** | Medium | High | Documentation, training, multiple team members |
| **Service outages** | Medium | Medium | Multi-provider strategy, status monitoring |
| **Cost overruns** | High | Medium | Monthly budget reviews, usage monitoring |

#### Business Risks
| Risk | Likelihood | Impact | Mitigation Strategy |
|------|-----------|--------|--------------------|
| **Staff resistance** | Medium | High | Training, gradual rollout, show quick wins |
| **Guest confusion** | Medium | Medium | User testing, clear design, fallback support |
| **Scope creep** | High | Medium | Strict phase gates, change request process |
| **Integration failures** | Low | Medium | Flexible architecture, fallback procedures |

#### Maintainability Requirements
- **Documentation**: Complete setup guides, troubleshooting procedures
- **Monitoring**: Automated alerts for system issues
- **Backups**: Daily automated backups with tested restore procedures
- **Team Training**: Multiple staff members trained on system
- **Vendor Management**: Clear SLA agreements, support contacts
- **Change Management**: Controlled update process with rollback capability

### 11. Deliverables & Acceptance Criteria

#### Phase 1 Deliverables
1. **Production-Ready Application**
   - Next.js app with 80% test coverage
   - Responsive design (mobile-first)
   - Accessibility compliant (WCAG 2.1 AA)

2. **Content Management System**
   - Configured Obsidian vault with 10+ templates
   - Git workflow with branch protection
   - Automated content validation

3. **Documentation Suite**
   - Technical documentation (API, components)
   - User guides (guests, managers, owners)
   - CLAUDE.md for AI context

#### Phase 2 Deliverables
4. **Search & Discovery**
   - Algolia integration with faceted search
   - AI-powered recommendations
   - Multi-language support

5. **Analytics Platform**
   - Real-time usage dashboard
   - Guest behavior tracking
   - Performance monitoring

#### Phase 3 Deliverables
6. **API Ecosystem**
   - RESTful API with OpenAPI spec
   - GraphQL endpoint
   - Webhook system for integrations

7. **Mobile Application**
   - React Native app (iOS/Android)
   - Offline capability
   - Push notifications

### 12. Future Enhancement Roadmap

> **Philosophy**: Add complexity only when core system proves valuable and ROI is clear

#### Year 1 Optimizations (Post-Launch)
- **Performance Improvements**: Based on actual usage data
- **Guest Feedback Integration**: Simple forms and review collection
- **Property Manager Efficiency**: Bulk operations, keyboard shortcuts
- **Basic Automation**: Automated backups, simple integrations

#### Year 2 Enhancements (If Proven ROI)
- **Advanced Search**: If built-in search proves insufficient
- **API Development**: If third-party integrations become essential
- **Multi-language Support**: Based on guest demographics
- **Mobile App**: Only if PWA proves insufficient
- **Analytics Dashboard**: Custom reporting if built-in analytics insufficient

#### Year 3+ Vision (Long-term)
- **AI-Assisted Content**: Automated updates, suggestions
- **Advanced Integrations**: PMS, smart locks, IoT devices
- **White-label Platform**: Scale to other STR businesses
- **Predictive Features**: Maintenance, guest preferences

#### Explicitly Deferred/Removed
- Blockchain verification (unproven ROI)
- AR wayfinding (expensive, limited utility)
- Voice assistants (complex integration)
- GraphQL APIs (over-engineering)
- Real-time WebSocket features (unnecessary complexity)
- React Native mobile app (PWA sufficient)

---

## Development Methodology

### Claude Code Integration
This project follows the Claude Code Standards for AI-assisted development:

1. **Big Picture First**: Comprehensive requirements before implementation
2. **Parallel Development**: Multiple features developed concurrently
3. **Quality Gates**: Automated testing and review at each stage
4. **Continuous Learning**: Regular retrospectives and process improvement

### Workflow Commands
Custom Claude commands for this project:
- `/explore` - Analyze existing documentation patterns
- `/plan` - Generate implementation plans
- `/code` - Develop with best practices
- `/review` - Comprehensive code review
- `/deploy` - Production deployment checklist

---

## Project Governance

**Document Version:** 2.0  
**Last Updated:** 2025-08-26  
**Status:** Ready for Implementation  
**Owner:** Snowbird HQ Team  

### Approval Matrix
| Stakeholder | Role | Approval Status |
|------------|------|----------------|
| Product Owner | Final Approval | Pending |
| Tech Lead | Technical Review | Pending |
| Operations Manager | Process Validation | Pending |

### Next Actions
1. [ ] Stakeholder review and approval
2. [ ] Initialize repository with Claude Code standards
3. [ ] Set up development environment
4. [ ] Begin Phase 0 implementation
5. [ ] Schedule weekly progress reviews

---

## References

- [Claude Code Standards](https://github.com/andrewlaery/Claude-Code-Standards)
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Obsidian API](https://docs.obsidian.md/)
- [Vercel Platform](https://vercel.com/docs)

---

*This comprehensive requirements document establishes the foundation for a transformative documentation platform that will position Snowbird HQ as the technology leader in Queenstown's short-term rental market.*