---
description: Clean up parallel git worktrees after feature selection and merge
allowed-tools: Bash(git worktree:*), Bash(git branch:*), Bash(git log:*), Bash(rm:*), Bash(rmdir:*), Bash(ls:*)
argument-hint: [feature-name]
model: inherit
---

# Clean Up Parallel Worktrees

Remove worktrees and branches for a completed parallel development cycle.

## Variables

- **FEATURE_NAME**: $1 (required)

## Safety First

Before cleanup, let's verify the current state and ensure the selected implementation has been merged.

### Current Repository State

Show recent commits to verify merge:
!`git log --oneline -10`

Show current branch:
!`git branch --show-current`

List all worktrees:
!`git worktree list`

List all branches matching the feature:
!`git branch --list "$1-*"`

## Pre-Cleanup Verification

**⚠️ IMPORTANT SAFETY CHECKS**

Before proceeding, verify:

1. ✅ You are on the `main` branch (or the appropriate target branch)
2. ✅ The selected implementation has been merged to main
3. ✅ All important changes are committed and merged
4. ✅ You've reviewed and documented the selected approach

**If any of the above are NOT true, STOP and do not proceed with cleanup.**

## Cleanup Steps

### Step 1: List Worktrees to Remove

Show all worktrees for this feature:
!`ls -la trees/ 2>/dev/null | grep "$1-" || echo "No worktrees found for $1"`

!`git worktree list | grep "$1-" || echo "No worktrees found in git worktree list"`

### Step 2: Remove Worktrees

Remove all worktrees for the feature (this removes the directories):

!`for i in 1 2 3 4 5 6 7 8 9; do git worktree remove trees/$1-$i --force 2>/dev/null && echo "Removed worktree trees/$1-$i" || true; done`

### Step 3: Prune Stale References

Clean up stale worktree administrative files:

!`git worktree prune`

Verify worktrees are removed:
!`git worktree list`

### Step 4: Branch Cleanup (Optional)

**Should we delete the feature branches?**

Branches to potentially delete:
!`git branch --list "$1-*"`

These branches contain the work from each worktree. Options:

**Option A: Keep branches** (for historical reference)
- Branches remain in git history
- Can review approaches later
- Takes minimal space

**Option B: Delete branches** (clean slate)
- Removes branches entirely
- Clean git branch list
- Can't easily review old approaches

**To delete branches** (after user confirmation):

!`for i in 1 2 3 4 5 6 7 8 9; do git branch -d $1-$i 2>/dev/null && echo "Deleted branch $1-$i" || true; done`

**Note**: If branches have unmerged changes, use `-D` instead of `-d`:

!`for i in 1 2 3 4 5 6 7 8 9; do git branch -D $1-$i 2>/dev/null && echo "Force deleted branch $1-$i" || true; done`

### Step 5: Remove Empty Directories

Remove the trees directory if it's empty:

!`rmdir trees 2>/dev/null && echo "Removed empty trees directory" || echo "Trees directory not empty or doesn't exist (this is fine)"`

## Verification

### Final State Check

Confirm worktrees are removed:
!`git worktree list`

Show remaining branches (if any):
!`git branch --list "$1-*"`

Check trees directory:
!`ls -la trees/ 2>/dev/null || echo "Trees directory removed or empty"`

## Summary

Cleanup complete for feature: **$1**

### What Was Cleaned

- ✅ Removed all worktrees for `$1-*`
- ✅ Pruned stale worktree references
- ✅ (Optionally) Deleted feature branches
- ✅ (If empty) Removed trees directory

### What Remains

The selected implementation is now merged into your main branch. The parallel development workflow is complete!

## Troubleshooting

**If worktree removal fails:**
- Check if any processes are using files in the worktree
- Manually remove with: `rm -rf trees/$1-*`
- Then run: `git worktree prune`

**If branch deletion fails:**
- Branches may have unmerged changes
- Use `git branch -D` to force delete
- Or keep them for historical reference

**If you removed the wrong worktrees:**
- Check out the branches: `git checkout $1-1`
- Recreate worktrees: `git worktree add trees/$1-1 $1-1`

## Next Parallel Development Cycle

To start a new parallel development cycle:

```bash
/init [new-feature-name] [num-versions]
```

---

**Parallel development workflow complete!** 🎉
