---
description: Quick start guide for parallel multi-feature development
allowed-tools: None
argument-hint:
model: inherit
---

# Quick Start: Parallel Multi-Feature Development

Run multiple features simultaneously from a single prompt.

## The 3-Step Workflow

### 1. Run Multiple Features

**Single command, multiple features:**

```bash
/parallel:run "
Feature 1: Dark mode toggle with localStorage persistence
Feature 2: User authentication with JWT and bcrypt
Feature 3: Search bar with debouncing and pagination
"
```

This will:
- ✅ Parse 3 features from your prompt
- ✅ Create 3 isolated worktrees
- ✅ Launch 3 parallel Claude processes
- ✅ All run simultaneously

### 2. Monitor Progress

```bash
/parallel:status
```

Shows:
- Which features are complete
- Current commits and changes
- Any errors detected

**View specific feature:**
```bash
/parallel:status 2    # See details for feature 2
```

**Watch live logs:**
```bash
/parallel:status watch
```

### 3. Review & Cleanup

```bash
# Review aggregated results
cat PARALLEL-RESULTS.md

# Merge features you want (e.g., 1 and 3)
/parallel:cleanup "1 3"

# Or merge all
git branch --list 'parallel/feature-*' | xargs -n 1 git merge --no-edit
/parallel:cleanup
```

---

## Complete Example

```bash
# Step 1: Run 3 features in parallel
/parallel:run "
Feature 1: Add dark mode toggle with smooth transitions
Feature 2: Implement user profile page with avatar upload
Feature 3: Create search functionality with keyboard shortcuts
"

# Step 2: Monitor progress
/parallel:status

# (Wait for features to complete...)

# Step 3: Review results
cat PARALLEL-RESULTS.md

# Step 4: Merge the ones you like
git merge parallel/feature-TIMESTAMP-1
git merge parallel/feature-TIMESTAMP-3

# Step 5: Clean up
/parallel:cleanup
```

---

## Feature Format

**Simple:**
```bash
Feature 1: Dark mode toggle
Feature 2: User auth
Feature 3: Search
```

**Detailed (recommended):**
```bash
Feature 1: Dark mode - localStorage persistence, Tailwind dark: variants, smooth 300ms transitions, ThemeProvider context

Feature 2: User authentication - email/password, JWT tokens, bcrypt hashing, rate limiting 5/15min, Server Actions Result<T> pattern

Feature 3: Search - debounced 300ms, pagination 20/page, keyboard nav up/down/enter, PostgreSQL full-text
```

**Numbered list also works:**
```bash
1. Dark mode toggle
2. User authentication
3. Search functionality
```

---

## Advanced Usage

### Tmux Monitoring (Recommended)

The command creates a tmux session with split panes:

```bash
# Attach to see all features running live
tmux attach -t parallel-TIMESTAMP

# Navigate between panes: Ctrl+B then arrow keys
# Detach: Ctrl+B then D
```

### Background Execution

Features run in background by default. Check logs:

```bash
# View a specific feature log
tail -f trees/feature-TIMESTAMP-1/execution.log

# Check all logs
ls -la trees/feature-*/execution.log
```

### Selective Merge

Only merge the features you want:

```bash
# Merge only features 1 and 2
/parallel:cleanup "1 2"

# Branches 3, 4, 5 will be deleted without merging
```

---

## What Gets Created

```
trees/
  feature-TIMESTAMP-1/          # Worktree for feature 1
    .feature-spec.txt           # Feature description
    RESULTS.md                  # Implementation results
    execution.log               # Claude execution log
    (your implementation...)
  feature-TIMESTAMP-2/          # Worktree for feature 2
  feature-TIMESTAMP-3/          # Worktree for feature 3

PARALLEL-RESULTS.md             # Aggregated results from all features
```

---

## Tips for Success

### 1. Write Clear Specifications

**Good:**
```
Feature 1: Dark mode with localStorage, smooth CSS transitions (300ms), Tailwind dark: prefix
```

**Too vague:**
```
Feature 1: Dark mode
```

### 2. Include Technical Constraints

```
Feature 1: User auth - MUST use Server Actions with Result<T>, bcrypt for passwords, JWT tokens
```

### 3. Specify Testing Requirements

```
Feature 1: Search - TDD approach, 90%+ coverage, test keyboard navigation
```

### 4. Keep Features Independent

**Good (independent):**
```
Feature 1: Dark mode toggle
Feature 2: User profile page
Feature 3: Search bar
```

**Bad (dependent):**
```
Feature 1: User registration
Feature 2: User login (depends on registration)
Feature 3: User dashboard (depends on login)
```

### 5. Limit to 3-5 Features

More than 5 features can be resource-intensive. For large batches:

```bash
# Batch 1
/parallel:run "Feature 1, 2, 3"
# Wait for completion
/parallel:cleanup "1 2 3"

# Batch 2
/parallel:run "Feature 4, 5, 6"
```

---

## Troubleshooting

**No features detected:**
- Start with "Feature N:" or "N."
- Check format matches examples

**Process hangs:**
- Check status: `/parallel:status`
- View logs: `tail -f trees/feature-*/execution.log`
- Kill if needed: `pkill -f claude`

**Claude command not found:**
- Ensure Claude Code CLI is installed
- Check: `which claude`

**Tmux not available:**
- Install: `brew install tmux`
- Or check logs manually instead

**Merge conflicts:**
- Review conflicting files
- Resolve manually
- Commit resolved changes

---

## Command Reference

| Command | Purpose |
|---------|---------|
| `/parallel:run "..."` | Start parallel features |
| `/parallel:status` | Check progress |
| `/parallel:status 2` | View feature 2 details |
| `/parallel:status watch` | Watch logs live |
| `/parallel:cleanup` | Clean up all |
| `/parallel:cleanup "1 3"` | Merge & clean features 1 and 3 |

---

**Ready to build features in parallel!** 🚀

**Next:** Try a simple 2-feature test run to see it in action.
