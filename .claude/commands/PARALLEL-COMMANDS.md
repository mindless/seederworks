# Parallel Development Command Summary

Two workflows available:

## 1. Multi-Feature Parallel (NEW) ⭐

**Work on multiple DIFFERENT features simultaneously**

```bash
# Single command to run 3 features in parallel
/parallel:run "
Feature 1: Dark mode toggle with localStorage
Feature 2: User auth with JWT
Feature 3: Search with debouncing
"

# Monitor progress
/parallel:status

# Review and merge
/parallel:cleanup "1 3"  # Merge features 1 and 3
```

**Commands:**
- `/parallel:run` - Start multiple features from one prompt
- `/parallel:status` - Monitor all running features
- `/parallel:cleanup` - Merge and clean up
- `/parallel:quick-start` - Full guide

---

## 2. Multi-Version Parallel (Original)

**Work on SAME feature with 3 different approaches**

```bash
# Create 3 worktrees
/parallel:init dark-mode 3

# Open 3 terminals and execute in each
cd trees/dark-mode-1 && claude
cd trees/dark-mode-2 && claude
cd trees/dark-mode-3 && claude

# In each session
/parallel:execute "Dark mode with localStorage"

# Compare and merge best
git merge dark-mode-2

# Clean up
/parallel:cleanup dark-mode
```

**Commands:**
- `/parallel:init` - Create N worktrees for same feature
- `/parallel:execute` - Run in each worktree
- `/parallel:cleanup` - Remove worktrees

---

## Quick Comparison

| Aspect | Multi-Feature (NEW) | Multi-Version (Original) |
|--------|---------------------|--------------------------|
| **Use Case** | Different features in parallel | Same feature, different approaches |
| **Example** | Dark mode, Auth, Search | 3 versions of dark mode |
| **Setup** | One command | Manual terminals |
| **Execution** | Automatic parallel | Manual per terminal |
| **Best For** | Maximum productivity | Exploring approaches |

---

See full documentation in `/parallel:quick-start` and `.claude/commands/parallel/README.md`
