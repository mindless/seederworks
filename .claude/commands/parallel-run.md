---
description: Run multiple features in parallel worktrees from a single prompt
allowed-tools: Bash(git worktree:*), Bash(git status:*), Bash(git branch:*), Bash(mkdir:*), Bash(cp:*), Bash(claude:*), Bash(tmux:*), Bash(echo:*), Bash(cat:*)
argument-hint: "Feature 1: [description] | Feature 2: [description] | Feature 3: [description]"
model: inherit
---

# Run Multiple Features in Parallel

Execute multiple features simultaneously in isolated worktrees. Each feature runs in its own Claude Code process.

## Input Format

Provide features separated by `|` or as a multiline list:

**Option 1: Pipe-separated**
```
/parallel:run "Feature 1: Dark mode toggle | Feature 2: User auth | Feature 3: Search bar"
```

**Option 2: Multiline** (recommended for clarity)
```
/parallel:run "
Feature 1: Dark mode toggle with localStorage persistence and smooth transitions
Feature 2: User authentication with email/password, JWT tokens, bcrypt hashing
Feature 3: Full-text search with debouncing, pagination, keyboard navigation
"
```

**Option 3: Numbered list**
```
/parallel:run "
1. Dark mode toggle with localStorage
2. User authentication system
3. Search functionality
"
```

## What This Command Does

1. **Parses features** from your prompt
2. **Creates isolated worktrees** (one per feature)
3. **Spawns parallel Claude processes** (one per feature)
4. **Runs all features simultaneously**
5. **Aggregates results** when complete

## Step 1: Parse Features

Extract individual features from the input:

!`echo "$ARGUMENTS" | grep -E "^(Feature [0-9]+:|[0-9]+\.)" | sed 's/^Feature [0-9]*: *//' | sed 's/^[0-9]*\. *//'`

Store features in a temporary file:

!`echo "$ARGUMENTS" | grep -E "^(Feature [0-9]+:|[0-9]+\.)" | sed 's/^Feature [0-9]*: *//' | sed 's/^[0-9]*\. *//' > /tmp/parallel-features-$$.txt`

Count features:

!`FEATURE_COUNT=$(wc -l < /tmp/parallel-features-$$.txt | tr -d ' '); echo "Found $FEATURE_COUNT features to implement"`

## Step 2: Verify Repository State

Check current state:

!`git status --short`

!`git worktree list`

Ensure we're on main branch:

!`git branch --show-current`

## Step 3: Create Worktrees

Generate unique feature names and create worktrees:

!`mkdir -p trees`

!`cat /tmp/parallel-features-$$.txt | nl -w1 -s' ' | while read num desc; do FEATURE_NAME="feature-$(date +%s)-$num"; FEATURE_BRANCH="parallel/$FEATURE_NAME"; echo "Creating worktree for: $desc"; git worktree add -b "$FEATURE_BRANCH" "trees/$FEATURE_NAME" 2>&1; [ -f .env.local ] && cp .env.local "trees/$FEATURE_NAME/.env.local" 2>/dev/null || true; echo "$desc" > "trees/$FEATURE_NAME/.feature-spec.txt"; done`

List created worktrees:

!`git worktree list | grep trees/`

!`ls -la trees/`

## Step 4: Launch Parallel Processes

**Using tmux** (recommended - allows monitoring):

Create a tmux session with one pane per feature:

!`TMUX_SESSION="parallel-$(date +%s)"; tmux new-session -d -s "$TMUX_SESSION"; FIRST=1; for dir in trees/feature-*; do FEATURE_SPEC=$(cat "$dir/.feature-spec.txt"); FEATURE_NAME=$(basename "$dir"); if [ $FIRST -eq 1 ]; then tmux send-keys -t "$TMUX_SESSION" "cd $dir && echo 'Working on: $FEATURE_SPEC' && claude --prompt 'Implement this feature using TDD approach: $FEATURE_SPEC. When complete, create RESULTS.md documenting your implementation, then commit all changes.'" C-m; FIRST=0; else tmux split-window -t "$TMUX_SESSION" -h; tmux send-keys -t "$TMUX_SESSION" "cd $dir && echo 'Working on: $FEATURE_SPEC' && claude --prompt 'Implement this feature using TDD approach: $FEATURE_SPEC. When complete, create RESULTS.md documenting your implementation, then commit all changes.'" C-m; fi; done; tmux select-layout -t "$TMUX_SESSION" tiled; echo "Tmux session created: $TMUX_SESSION"; echo "Attach with: tmux attach -t $TMUX_SESSION"`

**Alternative: Background processes** (runs completely in background):

!`for dir in trees/feature-*; do FEATURE_SPEC=$(cat "$dir/.feature-spec.txt"); FEATURE_NAME=$(basename "$dir"); echo "Launching parallel process for: $FEATURE_SPEC"; (cd "$dir" && claude --prompt "Implement this feature using TDD approach: $FEATURE_SPEC. When complete, create RESULTS.md documenting your implementation, then commit all changes." > "$dir/execution.log" 2>&1) & echo "Started process $! for $FEATURE_NAME"; done`

## Step 5: Monitor Progress

**If using tmux:**
```bash
# Attach to the tmux session
tmux attach -t parallel-TIMESTAMP

# Navigate between panes:
# Ctrl+B then arrow keys

# Detach: Ctrl+B then D
```

**If using background processes:**

Check logs:
!`ls -la trees/feature-*/execution.log`

Watch a specific feature:
!`tail -f trees/feature-TIMESTAMP-1/execution.log`

Check if processes are still running:
!`ps aux | grep claude | grep -v grep`

## Step 6: Collect Results

Once all features are complete, gather results:

!`echo "=== PARALLEL IMPLEMENTATION RESULTS ===" > PARALLEL-RESULTS.md; echo "" >> PARALLEL-RESULTS.md; for dir in trees/feature-*; do FEATURE_NAME=$(basename "$dir"); FEATURE_SPEC=$(cat "$dir/.feature-spec.txt" 2>/dev/null || echo "Unknown"); echo "## Feature: $FEATURE_SPEC" >> PARALLEL-RESULTS.md; echo "" >> PARALLEL-RESULTS.md; echo "**Worktree:** $dir" >> PARALLEL-RESULTS.md; echo "**Branch:** $(cd "$dir" && git branch --show-current)" >> PARALLEL-RESULTS.md; echo "" >> PARALLEL-RESULTS.md; if [ -f "$dir/RESULTS.md" ]; then cat "$dir/RESULTS.md" >> PARALLEL-RESULTS.md; else echo "*No RESULTS.md found - implementation may be incomplete*" >> PARALLEL-RESULTS.md; fi; echo "" >> PARALLEL-RESULTS.md; echo "---" >> PARALLEL-RESULTS.md; echo "" >> PARALLEL-RESULTS.md; done; cat PARALLEL-RESULTS.md`

## Step 7: Review & Merge

Review the aggregated results:

!`cat PARALLEL-RESULTS.md`

For each feature you want to keep:

```bash
# Merge a specific feature
git merge parallel/feature-TIMESTAMP-1

# Or merge all features
for branch in $(git branch --list 'parallel/feature-*'); do
  git merge "$branch" --no-edit
done
```

## Step 8: Cleanup

Remove all parallel worktrees:

!`for dir in trees/feature-*; do git worktree remove "$dir" --force 2>/dev/null && echo "Removed $dir" || true; done`

!`git worktree prune`

Delete feature branches (optional):

!`git branch --list 'parallel/feature-*' | xargs -n 1 git branch -d 2>/dev/null || true`

Remove trees directory:

!`rmdir trees 2>/dev/null || true`

Clean up temp files:

!`rm -f /tmp/parallel-features-$$.txt`

## Example Usage

**Simple 3-feature example:**

```bash
/parallel:run "
Feature 1: Dark mode toggle
Feature 2: User profile page
Feature 3: Search bar
"
```

**Detailed specifications:**

```bash
/parallel:run "
Feature 1: Dark mode toggle with localStorage persistence, Tailwind dark: variants, smooth 300ms transitions, ThemeProvider context
Feature 2: User authentication with email/password login, JWT tokens, bcrypt hashing, rate limiting (5 attempts = 15min lockout), Server Actions with Result<T>
Feature 3: Full-text search with debounced input (300ms), results pagination (20 per page), keyboard navigation (up/down/enter), PostgreSQL full-text search
"
```

## Success Criteria

✅ All features parsed correctly
✅ One worktree created per feature
✅ Parallel Claude processes launched
✅ Each feature runs independently
✅ RESULTS.md created in each worktree
✅ Changes committed in each worktree
✅ PARALLEL-RESULTS.md aggregates all results

## Troubleshooting

**No features detected:**
- Ensure features start with "Feature N:" or "N."
- Check format matches examples above

**Claude command not found:**
- Ensure Claude Code CLI is installed
- Try `which claude` to verify

**Tmux session fails:**
- Install tmux: `brew install tmux`
- Or use background processes instead

**Processes hang:**
- Attach to tmux session to see progress
- Check execution logs in each worktree
- Kill hung processes: `pkill -f "claude --prompt"`

## Advanced Options

**Limit parallel execution** (if system resources limited):

Instead of launching all at once, launch in batches:
```bash
# Launch 2 at a time
# (requires manual implementation)
```

**Custom prompts per feature:**

Use more detailed specifications in your features:
```bash
/parallel:run "
Feature 1: Dark mode. Technical approach: Use Next.js 16 Server Components, Context API for state, localStorage for persistence, Tailwind CSS dark: prefix. Testing: 100% coverage required.
"
```

---

**Ready to run parallel features!** 🚀
