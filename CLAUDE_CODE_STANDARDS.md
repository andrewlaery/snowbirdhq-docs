# Claude Code Standards - Complete Reference Guide

## Table of Contents
1. [Core Principles](#core-principles)
2. [Big Prompt Engineering](#big-prompt-engineering)
3. [AI Labor Methodology](#ai-labor-methodology)
4. [Claude.md Configuration](#claudemd-configuration)
5. [Commands and Context](#commands-and-context)
6. [Version Control Standards](#version-control-standards)
7. [Code Quality and Design](#code-quality-and-design)
8. [Project Structure Guidelines](#project-structure-guidelines)
9. [Feedback and Iteration](#feedback-and-iteration)
10. [Advanced Techniques](#advanced-techniques)

## Core Principles

### 1. Think Big, Not Small
- **DO**: Give Claude Code vision-level instructions that describe outcomes
- **DON'T**: Micromanage individual functions or files
- **Example Good**: "Build a complete expense tracking application with analytics"
- **Example Bad**: "Create component/expense_list.tsx and add functions to display data"

### 2. AI as Labor, Not Tool
- Treat Claude Code as a team of 1000+ developers working in perfect coordination
- Scale your use of AI labor by avoiding micromanagement bottlenecks
- Focus on critical thinking, architecture, and design while Claude handles implementation

### 3. Context is Everything
- Context narrows the target from broad instructions to precise outcomes
- Always provide sufficient context for the specific task at hand
- Balance specificity with creative freedom

## Big Prompt Engineering

### The 1000X Approach
Instead of 5-10X improvements from small prompts, aim for 1000X improvements with comprehensive prompts.

#### Structure of Effective Big Prompts
```markdown
APPLICATION OVERVIEW:
[High-level vision and purpose]

CORE FEATURES:
[Complete feature list with detail]

TECHNICAL REQUIREMENTS:
[Specific technologies, frameworks, patterns]

DESIGN REQUIREMENTS:
[UI/UX specifications, styling approach]

SPECIFIC FUNCTIONALITY:
[Detailed behavioral requirements]
```

#### Example Big Prompt Template
```markdown
I want you to create a modern, professional [APPLICATION TYPE]. Here's my vision:

APPLICATION OVERVIEW:
Build a complete [description] that helps users [primary purpose]. The app should feel modern, intuitive, and professional.

CORE FEATURES:
- [Feature 1 with details]
- [Feature 2 with details]
- [Feature 3 with details]

TECHNICAL REQUIREMENTS:
- [Framework] with [specific version]
- [Language] for type safety
- [Styling approach] for design
- [State management approach]
- [Testing framework and requirements]

DESIGN REQUIREMENTS:
- [Design aesthetic and principles]
- [Responsive requirements]
- [Accessibility standards]

SPECIFIC FUNCTIONALITY:
- [Detailed behavioral requirements]
- [Integration requirements]
- [Performance requirements]

Please create this as a complete, production-ready application. When you're done, provide instructions on how to run and test all features.
```

### Best-of-N Pattern
Leverage AI's speed and cost advantages to explore multiple solutions:

```markdown
Can you go back to the prior branch and repeat this process, but solve the underlying problem in a different and wildly valuable way? Surprise me with your creativity.
```

## AI Labor Methodology

### Scale Through Autonomy
- **Principle**: Give Claude Code big tasks that allow autonomous work
- **Avoid**: Constant approval loops and micromanagement
- **Goal**: Step back and let AI labor scale while you focus on higher-order thinking

### Challenge AI with Bold Requirements
```markdown
# Good Prompting Examples:
- "Act like the typical user of this application, then create different ways of sorting, filtering, and displaying expenses that are incredibly powerful and useful."
- "Look at this list of expenses. How could we make it incredibly bold, beautiful, and modern? Blow my mind with the elegance, simplicity, and beauty of your user interface."
- "When I'm trying to prepare my small business taxes, I find it really hard to gather all relevant expenses. Create something amazing to solve that problem for me."
```

## Claude.md Configuration

The `CLAUDE.md` file provides persistent global context for every interaction. Use the **CONTEXT Framework**:

- **C**lear and Concise Instructions
- **O**perational Processes  
- **N**aming and Standards
- **T**esting and Quality Gates
- **E**xamples and References
- **X**pectations and Boundaries
- **T**ools and Dependencies

### Essential Claude.md Structure

```markdown
# Project: [Project Name]

## Core Principles
**IMPORTANT**: [Critical principles that must ALWAYS be followed]

## Development Workflow
1. Before making any changes, create and checkout a feature branch named `feature-[brief-description]`
2. Write comprehensive tests for all new functionality
3. Compile code and run all tests before committing
4. Write detailed commit messages explaining changes and rationale
5. Commit all changes to the feature branch

## Architecture Overview
- **Frontend**: [Framework and version]
- **Backend**: [Technology stack]
- **Database**: [Database choice]
- **Testing**: [Testing frameworks]

## Code Standards
- [Language-specific standards]
- [Framework conventions]
- [File organization patterns]
- [Naming conventions]

## Quality Gates
- All code must compile without warnings
- Test coverage must remain above [X]%
- All tests must pass before committing
- [Linting tool] must pass without errors

## File Organization
- [Clear directory structure guidelines]
```

### Example: Web Application Claude.md

```markdown
# Project: TaskFlow Web Application

## Core Principles
**IMPORTANT**: Whenever you write code, it MUST follow SOLID design principles. Never write code that violates these principles. If you do, you will be asked to refactor it.

## Development Workflow
1. Before making any changes, create and checkout a feature branch named `feature-[brief-description]`
2. Write comprehensive tests for all new functionality
3. Compile code and run all tests before committing
4. Write detailed commit messages explaining the changes and rationale
5. Commit all changes to the feature branch

## Architecture Overview
- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **State Management**: Zustand for client state, React Query for server state
- **Backend**: Node.js with Express and Prisma ORM
- **Database**: PostgreSQL
- **Testing**: Jest for unit tests, Playwright for E2E

## Code Standards
- Use TypeScript for all new code with strict type checking
- Follow the existing component structure in `/src/components`
- API routes follow RESTful conventions in `/src/pages/api`
- Use Prisma schema definitions for all database operations
- CSS classes should use Tailwind utilities; custom CSS only when necessary

## Quality Gates
- All code must compile without warnings
- Test coverage must remain above 80%
- All tests must pass before committing
- ESLint and Prettier must pass without errors

## File Organization
- Components: `/src/components/[feature]/[ComponentName].tsx`
- Pages: `/src/pages/[route].tsx`
- Utilities: `/src/lib/[category]/[utility].ts`
- Types: `/src/types/[domain].ts`
```

## Commands and Context

Commands provide **TARGETED** context for specific, repeatable tasks:

- **T**ask-Specific Instructions
- **A**rguments and Placeholders
- **R**eusable Process Steps
- **G**uided Examples and References
- **E**xplicit Output Requirements
- **T**emplate-Based Naming
- **E**rror Handling and Edge Cases
- **D**ocumentation and Context

### Command Structure
Store commands as markdown files in `.claude/commands/` directory:
- Project-specific: `.claude/commands/` (versioned with project)
- Global commands: `~/.claude/commands/` (available across all projects)

### Example: Code Review Command
`.claude/commands/code-review.md`

```markdown
# Code Review Command

Carefully perform a comprehensive code review of $ARGUMENTS.

## Review Standards
Examples of excellent code that you should match the design/style/conventions of:
- `src/components/UserProfile/UserProfile.tsx` (React components)
- `src/utils/dataValidation.ts` (utility functions)
- `src/hooks/useUserData.ts` (custom hooks)

## Process
1. **First**: Read the example files above to understand our design patterns
2. **Second**: Analyze $ARGUMENTS against these standards
3. **Third**: Create detailed critique covering:
   - Code structure and organization
   - Adherence to established patterns
   - Performance considerations
   - Security implications
   - Maintainability concerns
   - Test coverage gaps

## Output Requirements
- Save review as `ai-code-reviews/{filename}.review.md` for each file reviewed
- Include specific line references for issues
- Provide concrete suggestions for improvements
- Rate overall quality: Excellent/Good/Needs Improvement/Poor
- Estimate refactoring effort: Low/Medium/High

## Review Checklist
- Follows project naming conventions
- Proper error handling implemented
- No hardcoded values or magic numbers
- Appropriate comments and documentation
- Follows existing design principles
- No obvious security vulnerabilities
- Performance optimizations considered
```

## Version Control Standards

### Branch Strategy
Always use feature branches for isolation and easy rollback:

```markdown
## Required in Claude.md:
Before you make any change, create and check out a feature branch named `feature-[brief-description]`. Make all your changes in this branch and commit them.
```

### Branch Naming Conventions
- Feature branches: `feature-[description]`
- AI-created branches: `ai-feature-[description]` (to differentiate from human-created)
- Integration branches: `integration-[description]`
- Bug fixes: `fix-[description]`

### Commit Message Standards
Claude Code excels at detailed commit messages. Example instruction:

```markdown
Write detailed commit messages that include:
- What was changed and why
- Any architectural decisions made
- Breaking changes or migration notes
- Related issue numbers or requirements
```

### Parallel Development with Worktrees
Use Git worktrees for simultaneous feature development:

```bash
# Create worktrees for parallel development
git worktree add ../project-feature1 feature/feature1
git worktree add ../project-feature2 feature/feature2

# Work in separate Claude Code instances
cd ../project-feature1 && claude  # Terminal 1
cd ../project-feature2 && claude  # Terminal 2
```

## Code Quality and Design

### Design Principles Integration
Leverage well-known design principles efficiently:

```markdown
# Token-efficient instructions:
- "Follow SOLID design principles"
- "Use functional programming patterns"
- "Apply Domain-Driven Design principles"
- "Implement clean architecture patterns"
```

### Quality Assurance Process
Always include in Claude.md:

```markdown
## Quality Gates
1. Write tests for all new functionality
2. Compile code and run all tests before committing
3. Run linter and formatter before committing
4. Ensure all tests pass
5. Verify no compilation errors or warnings
```

### Code Review and Evaluation
Use AI to evaluate its own work:

```markdown
After implementing any feature:
1. Run all tests and ensure they pass
2. Perform a self-review of the code
3. Check adherence to project standards
4. Verify proper error handling
5. Confirm documentation is complete
```

## Project Structure Guidelines

### Token-Efficient Organization
Structure projects for immediate AI comprehension:

**Good Structure** (immediately understandable):
```
src/
├── components/
│   ├── expense/
│   ├── dashboard/
│   └── analytics/
├── hooks/
├── utils/
├── types/
└── store/
    ├── slices/
    ├── reducers/
    └── actions/
```

**Poor Structure** (requires exploration):
```
src/
├── stuff/
├── things/
├── misc/
└── code/
```

### Naming Conventions
- Use standard, widely-adopted naming patterns
- Follow framework conventions (Next.js, React, etc.)
- Make directory and file names descriptive and predictable
- Avoid custom or unusual organizational patterns

### File Organization Best Practices
```markdown
## Standard Organization Patterns:
- Components: `/src/components/[feature]/[ComponentName].tsx`
- Utilities: `/src/lib/[category]/[utility].ts`
- Types: `/src/types/[domain].ts`
- Tests: `/src/__tests__/[component].test.ts`
- Hooks: `/src/hooks/use[HookName].ts`
```

## Feedback and Iteration

### Being Claude's Hands, Eyes, and Ears
When Claude Code cannot automatically test something:

1. **Capture Context**: Screenshot errors, copy error messages
2. **Provide Specificity**: "Clicking add expense creates this error: [error text]"
3. **Close the Loop**: Give Claude the feedback it needs to fix issues
4. **Minimize Manual Testing**: Build automated testing where possible

### Self-Checking Requirements
Include in Claude.md:

```markdown
## Self-Checking Requirements:
Before completing any task:
1. Compile the code and fix any compilation errors
2. Run all tests and ensure they pass
3. Test the functionality manually if no automated tests exist
4. Verify all requirements have been met
5. Check for proper error handling
```

### Think First, Code Second
For complex features, use extended thinking:

```markdown
# Thinking Levels:
- "think" - Basic analysis
- "think hard" - Deeper evaluation  
- "think harder" - Comprehensive analysis
- "ultrathink" - Maximum thinking budget

# Example:
Think hard about implementing a machine learning expense categorization system. 
Analyze the technical challenges, data requirements, ML approaches, privacy concerns, 
user experience, edge cases, and deployment strategy. Save the plan to development_plan.txt
```

## Advanced Techniques

### Multimodal Prompting
Use images, sketches, and screenshots for complex requirements:

```markdown
# Effective for:
- UI/UX design and layout
- Spatial relationships
- Color schemes and visual hierarchy
- Performance profiling results
- Bug reports with visual issues
- Design handoffs from mockups
```

### Subagents and Parallel Tasks
Use Claude Code's subagent system for complex projects:

```markdown
# Examples:
- "Run two subagents: one analyzing backend improvements, one analyzing frontend improvements"
- "Explore the codebase using 4 tasks in parallel, each exploring different directories"
- "Create parallel worktrees and spawn subagents to work on separate features simultaneously"
```

### In-Context Learning
Teach through examples rather than explicit rules:

```markdown
# Teaching by Example:
"Examples of excellent code that you should match the design/style/conventions of:
- [file1.ts] (component patterns)
- [file2.ts] (utility patterns)  
- [file3.ts] (testing patterns)

Read these files first to understand our style, then implement the new feature following the same patterns."
```

### Process Improvement Focus
When Claude Code makes mistakes:

1. **Don't just fix the code** - update Claude.md or commands
2. **Ask**: "What context was missing that caused this mistake?"
3. **Update**: Add specificity, instructions, or examples to prevent recurrence
4. **Goal**: Build increasingly reliable, repeatable processes

### Integration Commands
Create reusable commands for common workflows:

```markdown
# Example: Parallel Work Integration
`.claude/commands/integrate-parallel-work.md`

I have features developed in parallel worktrees that I need to integrate: $ARGUMENTS

Please help me integrate these features:
1. Create integration branch "integration/parallel-features"
2. Merge each feature branch into integration branch
3. Resolve any merge conflicts
4. Test that all features work together
5. Run all tests to ensure nothing is broken
6. Merge to main and clean up branches when successful
```

## Quick Reference Checklist

### Before Starting Any Project
- [ ] Create comprehensive Claude.md file
- [ ] Set up version control standards
- [ ] Define project structure conventions
- [ ] Create essential commands for common tasks
- [ ] Establish quality gates and testing requirements

### For Every Feature Request
- [ ] Use big prompt approach, not micromanagement
- [ ] Provide sufficient context for the task
- [ ] Specify branch naming and commit requirements
- [ ] Include testing and quality verification steps
- [ ] Consider if examples or references would help

### When Issues Occur
- [ ] Provide Claude with error context and feedback
- [ ] Update Claude.md or commands to prevent recurrence
- [ ] Focus on process improvement, not just code fixes
- [ ] Verify Claude performs self-checking before completion

### For Complex Projects
- [ ] Consider Best-of-N approach for multiple solutions
- [ ] Use "think first" approach for architectural decisions
- [ ] Leverage subagents for parallel development
- [ ] Use worktrees for feature isolation
- [ ] Plan integration strategy early

---

*This standards document is based on the complete Claude Code course materials and represents best practices for scaling AI labor in software development.*