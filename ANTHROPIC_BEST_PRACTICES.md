# Official Anthropic Best Practices Integration

This document integrates the latest official best practices from Anthropic's engineering team with our existing Claude Code standards. These practices come directly from Anthropic's internal teams and the broader Claude Code community.

## 📚 Source Integration

This integration incorporates insights from:
- [Anthropic's Official Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [How Anthropic Teams Use Claude Code](https://www.anthropic.com/news/how-anthropic-teams-use-claude-code)
- Internal Anthropic engineering workflows

## 🎯 Key Official Patterns

### 1. Advanced CLAUDE.md Management

#### Dynamic CLAUDE.md Updates
Use the `#` key during Claude Code sessions to automatically add instructions to CLAUDE.md:
```bash
# While in Claude Code, press # and type:
# Always run typecheck after making changes
# Use ES modules syntax, not CommonJS
# Prefer single test runs for performance
```

#### CLAUDE.md Optimization Techniques
- **Prompt Improvement**: Run CLAUDE.md files through Anthropic's prompt improver tool
- **Emphasis Tuning**: Add "IMPORTANT" or "YOU MUST" for critical instructions
- **Iterative Refinement**: Experiment with different phrasings to improve instruction following

#### Strategic CLAUDE.md Placement
```
project-root/
├── CLAUDE.md                    # Shared team standards (check into git)
├── CLAUDE.local.md              # Personal preferences (gitignored)
├── ~/.claude/CLAUDE.md          # Global personal settings
└── subdirectory/CLAUDE.md       # Directory-specific context
```

### 2. Extended Thinking Integration

#### Thinking Levels (Official Mapping)
```markdown
# Mapped directly to increasing thinking budget:
"think" < "think hard" < "think harder" < "ultrathink"

# Examples:
- "think about the best approach for this OAuth implementation"
- "think hard about potential security vulnerabilities"  
- "think harder about edge cases we should handle"
- "ultrathink about the architectural implications"
```

#### When to Use Extended Thinking
- Complex architectural decisions
- Security implementation reviews
- Multi-step implementation planning
- Edge case analysis
- Performance optimization strategies

### 3. Official Workflow Patterns

#### Pattern 1: Explore, Plan, Code, Commit
```markdown
# Official Anthropic workflow:
1. **Explore**: "Read the logging files but don't write code yet"
2. **Plan**: "Think hard about the approach and create a plan"
3. **Code**: "Implement the solution following the plan"
4. **Commit**: "Commit with a descriptive message and create PR"

# Use subagents for complex exploration:
"Use subagents to investigate the authentication system before planning"
```

#### Pattern 2: Test-Driven Development (TDD)
```markdown
# Anthropic's favorite workflow:
1. "Write tests for expected input/output - we're doing TDD"
2. "Run tests and confirm they fail - don't write implementation"
3. "Commit the tests when satisfied"
4. "Write code to pass tests - don't modify tests"
5. "Use subagents to verify implementation isn't overfitting"
6. "Commit when all tests pass"
```

#### Pattern 3: Visual Iteration
```markdown
# For UI/UX development:
1. "Take a screenshot of current state"
2. "Compare to this design mock [attach image]"
3. "Implement changes to match the mock"
4. "Take another screenshot and iterate"
5. "Commit when visual match is achieved"
```

### 4. Advanced Tool Management

#### Permission Optimization
```bash
# Strategic allowlist management:
/permissions add Edit                    # Always allow file edits
/permissions add Bash(git commit:*)      # Allow git commits
/permissions add mcp__puppeteer__*       # Allow Puppeteer tools
```

#### Custom Slash Commands with Parameters
`.claude/commands/fix-github-issue.md`:
```markdown
Please analyze and fix the GitHub issue: $ARGUMENTS.

Follow these steps:
1. Use `gh issue view` to get issue details
2. Understand the problem described
3. Search codebase for relevant files
4. Implement necessary changes
5. Write and run tests to verify fix
6. Ensure code passes linting and type checking
7. Create descriptive commit message
8. Push and create PR

Remember to use GitHub CLI (`gh`) for all GitHub-related tasks.
```

Usage: `/project:fix-github-issue 1234`

### 5. Safe YOLO Mode (Official Pattern)

#### Container-Based Safe Automation
```bash
# Use with Docker dev containers for safety:
claude --dangerously-skip-permissions

# Reference implementation:
# https://github.com/anthropics/claude-code/tree/main/.devcontainer
```

#### Ideal Use Cases
- Fixing lint errors
- Generating boilerplate code
- Mass file migrations
- Automated refactoring

### 6. Multi-Claude Workflows (Official Advanced Pattern)

#### Pattern A: Parallel Verification
```bash
# Terminal 1: Implementation
claude # Write the feature

# Terminal 2: Review
claude # Review the code from Terminal 1

# Terminal 3: Integration
claude # Integrate based on feedback from Terminal 2
```

#### Pattern B: Git Worktrees (Official Recommendation)
```bash
# Create worktrees for parallel development:
git worktree add ../project-feature-a feature-a
git worktree add ../project-feature-b feature-b

# Launch Claude in each:
cd ../project-feature-a && claude  # Terminal 1
cd ../project-feature-b && claude  # Terminal 2

# Clean up when done:
git worktree remove ../project-feature-a
```

#### Pattern C: Headless Automation
```bash
# Fan-out pattern for large migrations:
claude -p "migrate foo.py from React to Vue. Return OK if succeeded, FAIL if failed." \
  --allowedTools Edit Bash(git\ commit:*)

# Pipeline integration:
claude -p "analyze this log for anomalies" --output-format stream-json | next_command
```

### 7. Advanced Data Integration

#### Multiple Input Methods
```bash
# Pipe data directly:
cat error.log | claude "What's causing these errors?"

# Large dataset processing:
tail -f app.log | claude -p "Slack me if anomalies appear"

# URL fetching:
claude "Read https://api.company.com/docs and implement client"
```

#### GitHub CLI Integration
Claude Code has deep `gh` CLI integration:
```bash
# Claude automatically uses gh for:
- Creating issues and PRs
- Reading comments and reviews  
- Fixing failing builds
- Categorizing open issues
- One-shot review comment fixes
```

### 8. Jupyter Notebook Workflows

#### Data Science Integration
```markdown
# Recommended workflow:
1. Open Claude Code and .ipynb side-by-side in VS Code
2. Ask Claude to interpret outputs and images
3. Have Claude clean up notebooks before sharing
4. Use "make this aesthetically pleasing" for visualizations
```

### 9. Context Management (Official Strategies)

#### Active Collaboration Techniques
```bash
# Course correction tools:
1. Ask for plans before coding: "Plan first, don't code yet"
2. Press Escape to interrupt and redirect
3. Double-tap Escape to edit previous prompts
4. Ask Claude to undo changes when needed
```

#### Context Window Management
```bash
# Use /clear frequently between tasks
/clear

# For complex workflows, use external scratchpads:
"Create a checklist in migration-progress.md and work through it item by item"
```

### 10. Production Integration Patterns

#### Issue Triage Automation
```yaml
# GitHub Actions example:
- uses: anthropics/claude-code-action@v1
  with:
    prompt: "Analyze this issue and assign appropriate labels"
    files: ${{ github.event.issue.body }}
```

#### Code Review Automation
```yaml
# Subjective code review beyond traditional linting:
- uses: anthropics/claude-code-action@v1
  with:
    prompt: "Review for typos, stale comments, misleading names"
    files: ${{ github.event.pull_request.changed_files }}
```

## 🔄 Integration with Existing Standards

### Enhanced Claude.md Template
Update your existing Claude.md with these official patterns:

```markdown
# Project: [YOUR_PROJECT_NAME]

## Core Principles
**IMPORTANT**: Follow SOLID design principles. YOU MUST adhere to these patterns.

## Extended Thinking Usage
- Use "think hard" for complex architectural decisions
- Use "ultrathink" for security-critical implementations
- Always plan before coding on complex features

## Official Workflows
1. For TDD: Write tests first, commit tests, then implement
2. For UI: Take screenshots, compare to mocks, iterate visually
3. For complex features: Explore → Plan → Code → Commit

## Tool Permissions
# Add to your allowlist:
- Edit (always allow file editing)
- Bash(git commit:*) (allow git operations)
- Web browsing for documentation

## Subagent Usage
- Use subagents for complex codebase exploration
- Use subagents to verify implementation quality
- Use subagents for parallel investigation tasks
```

### Enhanced Commands
Add these official patterns to your `.claude/commands/`:

1. **explore-plan-code.md** - Official Anthropic workflow
2. **tdd-workflow.md** - Test-driven development pattern
3. **visual-iteration.md** - UI development with screenshots
4. **multi-claude-review.md** - Parallel verification workflow

## 📊 Official Performance Metrics

From Anthropic's internal usage:
- **Onboarding Time**: Significant reduction in ramp-up time
- **Engineer Load**: 90%+ of git interactions handled by Claude
- **Research Time**: 80% reduction (from 1 hour to 10-20 minutes)
- **Incident Response**: 20+ minutes saved during critical outages

## 🎯 Next Steps

1. **Update your Claude.md** with extended thinking patterns
2. **Implement official workflows** in your commands
3. **Set up safe YOLO mode** with containers
4. **Experiment with multi-Claude patterns** for complex projects
5. **Integrate headless mode** into your CI/CD pipelines

---

*This integration document ensures your Claude Code standards align with Anthropic's official best practices and internal team workflows.*