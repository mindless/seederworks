---
description: Initialize parallel git worktrees for feature development with multiple independent implementations
allowed-tools: Bash(git worktree:*), Bash(git status:*), Bash(git branch:*), Bash(mkdir:*), Bash(cp:*), Bash(ls:*)
argument-hint: [feature-name] [num-versions]
model: inherit
---

# Initialize Parallel Worktrees

Create multiple isolated git worktrees to enable parallel development of the same feature with different approaches.

## Variables

- **FEATURE_NAME**: $1 (required)
- **NUM_VERSIONS**: ${2:-3} (default: 3)

## Instructions

You are setting up **${2:-3}** parallel development environments for the feature: **$1**

Each worktree will have its own branch and working directory, allowing independent Claude Code sessions to work simultaneously without conflicts.

### Step 1: Verify Current State

Check the repository status and existing worktrees:

!`git status`

!`git worktree list`

### Step 2: Create Worktrees Container

Create the `trees/` directory to house all parallel worktrees:

!`mkdir -p trees`

### Step 3: Create Numbered Worktrees

For each version from 1 to ${2:-3}, create a worktree with its own branch:

!`for i in $(seq 1 ${2:-3}); do git worktree add -b $1-$i trees/$1-$i 2>&1 || echo "Worktree $1-$i may already exist"; done`

### Step 4: Copy Environment Files

Copy essential configuration files to each worktree:

!`for i in $(seq 1 ${2:-3}); do [ -f .env ] && cp .env trees/$1-$i/.env 2>/dev/null || true; [ -f .env.local ] && cp .env.local trees/$1-$i/.env.local 2>/dev/null || true; done`

### Step 5: Verify Setup

List all created worktrees:

!`git worktree list`

Show created directories:

!`ls -la trees/`

### Next Steps

**Parallel Development Workflow:**

1. **Open separate terminal windows/tabs** (one for each worktree):

   ```bash
   # Terminal 1
   cd trees/$1-1 && claude

   # Terminal 2
   cd trees/$1-2 && claude

   # Terminal 3
   cd trees/$1-3 && claude
   ```

2. **In each Claude Code instance**, run the execution command:

   **Option A: Inline specification** (simple features):
   ```bash
   /execute "Dark mode toggle with localStorage, Tailwind CSS dark: variants, smooth 300ms transitions"
   ```

   **Option B: File-based specification** (complex features):
   ```bash
   /execute specs/your-spec.md
   ```

   **Example inline specifications:**
   ```bash
   # Simple
   /execute "Add user profile page with avatar upload"

   # Detailed
   /execute "Feature: Search. Requirements: 1. Full-text search 2. Debounced input 3. Results pagination 4. Keyboard navigation. Constraints: Use React Server Components, PostgreSQL FTS, TDD approach"
   ```

3. **Each instance will work independently** on the same specification, exploring different implementation approaches.

4. **After completion**, compare the implementations:
   - Review `RESULTS.md` in each worktree
   - Compare code quality, architecture, and test coverage
   - Select the best implementation to merge

5. **Merge the selected version** back to main:

   ```bash
   cd /Users/marco/Sites/seederworks
   git merge $1-2  # Or whichever version you prefer
   ```

6. **Clean up** the worktrees:

   ```bash
   /cleanup $1
   ```

## Success Criteria

✅ ${2:-3} worktrees created in `trees/$1-{1..${2:-3}}/`
✅ ${2:-3} branches created: `$1-{1..${2:-3}}`
✅ Environment files copied to each worktree
✅ All worktrees listed and verified

**You are now ready for parallel development!** 🚀
