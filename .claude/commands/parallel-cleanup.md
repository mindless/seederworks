---
description: Clean up all parallel worktrees and merge selected features
allowed-tools: Bash(git worktree:*), Bash(git branch:*), Bash(git merge:*), Bash(rm:*), Bash(rmdir:*), Bash(ls:*), Bash(cat:*)
argument-hint: [optional: feature-numbers-to-merge (e.g., "1 3 5")]
model: inherit
---

# Clean Up Parallel Worktrees

Remove all parallel worktrees and optionally merge selected features into main.

## Current State

List all parallel worktrees:

!`git worktree list | grep trees/feature- || echo "No parallel worktrees found"`

!`ls -la trees/ 2>/dev/null || echo "No trees directory found"`

List all parallel branches:

!`git branch --list 'parallel/feature-*'`

## Review Results

Show aggregated results (if available):

!`if [ -f PARALLEL-RESULTS.md ]; then cat PARALLEL-RESULTS.md; else echo "No PARALLEL-RESULTS.md found. Run results collection first."; fi`

## Merge Strategy

**Arguments provided:** $ARGUMENTS

If arguments are provided (e.g., "1 3" to merge features 1 and 3), we'll merge only those features.
If no arguments, you'll be prompted to review each feature.

### Option 1: Merge Specific Features (If Arguments Provided)

!`if [ -n "$ARGUMENTS" ]; then echo "Merging features: $ARGUMENTS"; for num in $ARGUMENTS; do BRANCH=$(git branch --list "parallel/feature-*-$num" | head -1 | tr -d ' '); if [ -n "$BRANCH" ]; then echo "Merging $BRANCH"; git merge "$BRANCH" --no-edit 2>&1; else echo "Feature $num not found"; fi; done; else echo "No features specified for merge"; fi`

### Option 2: List Features for Manual Review

Show all features with their descriptions:

!`echo "=== Available Features for Merge ==="; for dir in trees/feature-*; do if [ -d "$dir" ]; then NUM=$(basename "$dir" | grep -o '[0-9]*$'); SPEC=$(cat "$dir/.feature-spec.txt" 2>/dev/null || echo "No spec"); BRANCH=$(cd "$dir" && git branch --show-current 2>/dev/null || echo "unknown"); echo ""; echo "Feature $NUM: $SPEC"; echo "  Branch: $BRANCH"; echo "  Location: $dir"; echo "  Status: $(cd "$dir" && git status --short | wc -l | tr -d ' ') changes"; fi; done`

**To merge specific features manually:**
```bash
git merge parallel/feature-TIMESTAMP-1
git merge parallel/feature-TIMESTAMP-3
```

**To merge ALL features:**
```bash
git branch --list 'parallel/feature-*' | xargs -n 1 git merge --no-edit
```

## Cleanup Steps

### Step 1: Kill Any Running Processes

Check for running Claude processes:

!`ps aux | grep -E "(claude|trees/feature)" | grep -v grep || echo "No running processes found"`

Kill any hung processes (if needed):

!`pkill -f "claude.*trees/feature" 2>/dev/null && echo "Killed running processes" || echo "No processes to kill"`

### Step 2: Kill Tmux Sessions

List parallel tmux sessions:

!`tmux list-sessions 2>/dev/null | grep parallel || echo "No parallel tmux sessions found"`

Kill parallel tmux sessions:

!`tmux list-sessions 2>/dev/null | grep parallel | cut -d: -f1 | xargs -n 1 tmux kill-session -t 2>/dev/null && echo "Killed tmux sessions" || true`

### Step 3: Remove Worktrees

Remove all parallel feature worktrees:

!`for dir in trees/feature-*; do if [ -d "$dir" ]; then echo "Removing worktree: $dir"; git worktree remove "$dir" --force 2>&1; fi; done`

Prune stale worktree references:

!`git worktree prune`

Verify worktrees removed:

!`git worktree list`

### Step 4: Remove Branches (Optional)

**Current parallel branches:**

!`git branch --list 'parallel/feature-*'`

**Delete merged branches:**

!`git branch --list 'parallel/feature-*' | xargs -n 1 git branch -d 2>&1 || true`

**Force delete unmerged branches** (if you don't want to keep them):

!`git branch --list 'parallel/feature-*' | xargs -n 1 git branch -D 2>&1 || true`

### Step 5: Clean Up Files

Remove trees directory:

!`rmdir trees 2>/dev/null && echo "Removed trees directory" || echo "Trees directory not empty or doesn't exist"`

Remove temporary files:

!`rm -f /tmp/parallel-features-*.txt 2>/dev/null && echo "Removed temp files" || true`

Archive results (optional):

!`if [ -f PARALLEL-RESULTS.md ]; then mkdir -p .parallel-archive; mv PARALLEL-RESULTS.md ".parallel-archive/results-$(date +%Y%m%d-%H%M%S).md" && echo "Archived results to .parallel-archive/"; fi`

## Verification

Final state check:

!`echo "=== Cleanup Verification ==="`

!`echo "Worktrees:"; git worktree list`

!`echo ""; echo "Parallel branches:"; git branch --list 'parallel/feature-*' || echo "None"`

!`echo ""; echo "Trees directory:"; ls -la trees/ 2>/dev/null || echo "Removed"`

!`echo ""; echo "Running processes:"; ps aux | grep -E "(claude|trees/feature)" | grep -v grep || echo "None"`

!`echo ""; echo "Tmux sessions:"; tmux list-sessions 2>/dev/null | grep parallel || echo "None"`

## Summary

Cleanup complete!

**What was cleaned:**
- ✅ All parallel worktrees removed
- ✅ Worktree references pruned
- ✅ (Optional) Feature branches deleted
- ✅ Running processes killed
- ✅ Tmux sessions terminated
- ✅ Temporary files removed

**What remains:**
- Your merged features are now in the current branch
- Archived results in `.parallel-archive/` (if enabled)

## Quick Cleanup Examples

**Clean up without merging anything:**
```bash
/parallel:cleanup
# Then manually remove all branches
```

**Merge features 1 and 3, then clean up:**
```bash
/parallel:cleanup "1 3"
```

**Merge all features:**
```bash
# First, merge all
git branch --list 'parallel/feature-*' | xargs -n 1 git merge --no-edit
# Then clean up
/parallel:cleanup
```

---

**Parallel development cycle complete!** 🎉
