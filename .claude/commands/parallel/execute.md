---
description: Execute parallel feature development in an isolated worktree with independent implementation approach
allowed-tools: Bash(git status:*), Bash(git branch:*), Bash(ls:*), Bash(pwd:*), Bash(git worktree:*)
argument-hint: [spec-file]
model: inherit
---

# Execute Parallel Feature Development

Implement a feature specification independently in this worktree, exploring your own unique approach.

## Variables

- **SPEC_FILE**: ${1:-specs/feature-spec.md}

## Context

### Current Worktree Information

Working directory:
!`pwd`

Current branch:
!`git branch --show-current`

Worktree status:
!`git worktree list | grep $(basename $(pwd))`

Repository status:
!`git status --short`

### Feature Specification

Read and analyze the specification file:

**Specification location**: `${1:-specs/feature-spec.md}`

If the file exists, read it now to understand requirements.

## Core Principles

You are working in **ONE of multiple parallel worktrees** developing the same feature. Other Claude Code instances are working simultaneously in their own worktrees.

### Key Guidelines

1. **Work Independently**
   - Do NOT coordinate with other Claude instances
   - Do NOT try to synchronize approaches
   - Explore your own unique solution path

2. **Embrace Different Approaches**
   - Alternative architectures are encouraged
   - Different tech choices are welcome
   - Unique patterns and abstractions are valuable

3. **Document Decisions**
   - Create `RESULTS.md` in this worktree
   - Explain your implementation approach
   - Document key architectural decisions
   - Describe trade-offs considered

4. **Test-Driven Development**
   - Write tests FIRST before implementation
   - Follow the Red-Green-Refactor cycle
   - Aim for high test coverage
   - Include both unit and integration tests

5. **No Server Starting**
   - Focus only on code changes
   - Do not run dev servers or watch modes
   - Avoid long-running processes

6. **Commit Frequently**
   - Make atomic commits
   - Write clear commit messages
   - Keep changes reviewable

## Implementation Workflow

### Phase 1: Planning (10-15 minutes)

1. **Analyze the specification thoroughly**
   - Identify all requirements
   - Note acceptance criteria
   - List technical constraints

2. **Design your approach**
   - Sketch component architecture
   - Plan data flow
   - Identify key abstractions
   - Consider edge cases

3. **Create implementation plan**
   - Break down into tasks
   - Prioritize features
   - Identify dependencies

### Phase 2: Test-Driven Implementation

1. **Write failing tests** (RED)
   - Test the specification requirements
   - Cover happy paths and edge cases
   - Test error scenarios

2. **Implement minimal code** (GREEN)
   - Make tests pass
   - Don't optimize prematurely
   - Focus on correctness

3. **Refactor** (REFACTOR)
   - Improve code quality
   - Extract reusable patterns
   - Enhance readability

4. **Repeat** for each requirement

### Phase 3: Documentation

Create `RESULTS.md` with the following sections:

```markdown
# Implementation Results

## Approach Summary
Brief overview of your implementation strategy

## Key Architectural Decisions
- Decision 1: [Why this choice?]
- Decision 2: [Trade-offs considered?]
- Decision 3: [Alternative approaches?]

## Implementation Highlights
- Notable patterns used
- Unique solutions to challenges
- Code organization strategy

## Testing Strategy
- Test coverage achieved
- Testing approach (unit, integration, e2e)
- Key test scenarios covered

## Trade-offs & Limitations
- Known limitations
- Future improvements
- Technical debt notes

## Time Spent
- Planning: X minutes
- Implementation: X minutes
- Testing: X minutes
- Total: X minutes
```

### Phase 4: Verification

1. **Run all tests**
   ```bash
   npm test
   ```

2. **Check linting**
   ```bash
   npm run lint
   ```

3. **Verify build**
   ```bash
   npm run build
   ```

4. **Review your changes**
   ```bash
   git diff main
   git log --oneline
   ```

## Success Criteria

Your implementation is complete when:

✅ All specification requirements are met
✅ Tests pass with good coverage
✅ Code follows project conventions
✅ No linting errors
✅ Build succeeds
✅ `RESULTS.md` documents your approach
✅ Commits are clean and well-messaged

## Git Workflow

### Committing Changes

Stage and commit your work frequently:

```bash
git add .
git commit -m "Implement [feature]: [description]"
```

### Checking Status

See what's changed:

```bash
git status
git diff
git log --oneline -5
```

### DO NOT Push or Merge

- Stay in your worktree branch
- Do not push to remote (yet)
- Do not merge to main (that's for later comparison)

## After Completion

When you've finished implementing:

1. **Notify the developer** that this worktree is ready for review
2. **Developer will review** `RESULTS.md` across all worktrees
3. **Best implementation** will be selected and merged
4. **Other worktrees** will be cleaned up via `/cleanup`

## Troubleshooting

**If you encounter conflicts:**
- You shouldn't - each worktree is isolated
- If you see conflicts, verify you're in the correct worktree directory

**If tests fail:**
- Fix them before marking complete
- Document any blockers in RESULTS.md

**If stuck:**
- Document the blocker in RESULTS.md
- Proceed with what you can complete
- Note areas needing clarification

---

**Remember**: Your goal is to produce a **working, well-tested implementation** that explores your own unique approach. Don't worry about matching other implementations - diversity is the goal!
