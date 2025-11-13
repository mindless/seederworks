---
description: Monitor status of parallel feature development
allowed-tools: Bash(git worktree:*), Bash(git status:*), Bash(git log:*), Bash(ls:*), Bash(cat:*), Bash(ps:*), Bash(tail:*), Bash(tmux:*)
argument-hint: [optional: feature-number or "watch"]
model: inherit
---

# Monitor Parallel Development Status

Check the status of all running parallel features or monitor a specific feature.

## Overall Status

### Active Worktrees

!`git worktree list | grep trees/feature- || echo "No parallel worktrees found"`

!`ls -la trees/ 2>/dev/null | grep feature- || echo "No feature directories found"`

### Running Processes

!`echo "=== Running Claude Processes ==="; ps aux | grep -E "claude.*trees/feature" | grep -v grep | awk '{print "PID " $2 ": " $11 " " $12 " " $13 " " $14}' || echo "No running processes"`

### Tmux Sessions

!`echo "=== Active Tmux Sessions ==="; tmux list-sessions 2>/dev/null | grep parallel || echo "No parallel tmux sessions"`

## Feature Details

### List All Features

!`echo "=== Feature Summary ==="; echo ""; for dir in trees/feature-*; do if [ -d "$dir" ]; then NUM=$(basename "$dir" | grep -o '[0-9]*$'); SPEC=$(cat "$dir/.feature-spec.txt" 2>/dev/null || echo "No specification"); BRANCH=$(cd "$dir" && git branch --show-current 2>/dev/null || echo "unknown"); COMMITS=$(cd "$dir" && git log --oneline | wc -l | tr -d ' '); CHANGES=$(cd "$dir" && git status --short | wc -l | tr -d ' '); HAS_RESULTS="❌"; [ -f "$dir/RESULTS.md" ] && HAS_RESULTS="✅"; echo "Feature $NUM: $SPEC"; echo "  Branch: $BRANCH"; echo "  Commits: $COMMITS"; echo "  Uncommitted changes: $CHANGES"; echo "  RESULTS.md: $HAS_RESULTS"; echo ""; fi; done`

## Detailed View (Optional Argument)

**Argument provided:** $ARGUMENTS

### If Feature Number Provided

Show detailed status for a specific feature:

!`if [ -n "$ARGUMENTS" ] && [ "$ARGUMENTS" != "watch" ]; then FEATURE_DIR=$(ls -d trees/feature-*-"$ARGUMENTS" 2>/dev/null | head -1); if [ -n "$FEATURE_DIR" ] && [ -d "$FEATURE_DIR" ]; then echo "=== Feature $ARGUMENTS Detail ==="; echo ""; echo "Specification:"; cat "$FEATURE_DIR/.feature-spec.txt" 2>/dev/null || echo "No spec file"; echo ""; echo "Git Status:"; cd "$FEATURE_DIR" && git status; echo ""; echo "Recent Commits:"; cd "$FEATURE_DIR" && git log --oneline -5 2>/dev/null || echo "No commits yet"; echo ""; echo "Execution Log (last 20 lines):"; tail -20 "$FEATURE_DIR/execution.log" 2>/dev/null || echo "No execution log"; echo ""; echo "Results:"; cat "$FEATURE_DIR/RESULTS.md" 2>/dev/null || echo "RESULTS.md not yet created"; else echo "Feature $ARGUMENTS not found"; fi; fi`

### If "watch" Argument Provided

Watch all execution logs in real-time:

!`if [ "$ARGUMENTS" = "watch" ]; then echo "Watching all feature execution logs..."; echo "Press Ctrl+C to stop"; echo ""; for dir in trees/feature-*; do if [ -f "$dir/execution.log" ]; then NUM=$(basename "$dir" | grep -o '[0-9]*$'); echo "=== Feature $NUM ===" & tail -f "$dir/execution.log" 2>/dev/null & fi; done; wait; fi`

## Progress Indicators

### Completion Checklist

!`echo "=== Completion Status ==="; echo ""; TOTAL=0; COMPLETE=0; for dir in trees/feature-*; do if [ -d "$dir" ]; then TOTAL=$((TOTAL + 1)); NUM=$(basename "$dir" | grep -o '[0-9]*$'); SPEC=$(cat "$dir/.feature-spec.txt" 2>/dev/null | head -c 50)...; STATUS="🔄 In Progress"; if [ -f "$dir/RESULTS.md" ]; then COMMITS=$(cd "$dir" && git log --oneline | wc -l | tr -d ' '); if [ "$COMMITS" -gt 0 ]; then STATUS="✅ Complete"; COMPLETE=$((COMPLETE + 1)); fi; fi; echo "[$STATUS] Feature $NUM: $SPEC"; fi; done; echo ""; echo "Progress: $COMPLETE/$TOTAL features complete"`

### Recent Activity

!`echo "=== Recent Activity (Last 10 Commits) ==="; echo ""; for dir in trees/feature-*; do if [ -d "$dir" ]; then NUM=$(basename "$dir" | grep -o '[0-9]*$'); LATEST=$(cd "$dir" && git log --oneline -1 2>/dev/null); if [ -n "$LATEST" ]; then echo "Feature $NUM: $LATEST"; fi; fi; done`

## Quick Actions

### Attach to Tmux Session

!`TMUX_SESSION=$(tmux list-sessions 2>/dev/null | grep parallel | cut -d: -f1 | head -1); if [ -n "$TMUX_SESSION" ]; then echo "To attach to tmux session:"; echo "  tmux attach -t $TMUX_SESSION"; echo ""; echo "Once attached:"; echo "  - Navigate panes: Ctrl+B then arrow keys"; echo "  - Detach: Ctrl+B then D"; else echo "No tmux session found"; fi`

### View Individual Logs

!`echo "=== View Execution Logs ==="; echo ""; for dir in trees/feature-*; do if [ -f "$dir/execution.log" ]; then NUM=$(basename "$dir" | grep -o '[0-9]*$'); SIZE=$(wc -l < "$dir/execution.log"); echo "Feature $NUM: $SIZE lines"; echo "  tail -f $dir/execution.log"; fi; done`

### Check for Errors

!`echo "=== Checking for Errors ==="; echo ""; for dir in trees/feature-*; do if [ -f "$dir/execution.log" ]; then NUM=$(basename "$dir" | grep -o '[0-9]*$'); ERRORS=$(grep -i "error\|failed\|exception" "$dir/execution.log" 2>/dev/null | wc -l | tr -d ' '); if [ "$ERRORS" -gt 0 ]; then echo "⚠️  Feature $NUM: $ERRORS potential errors found"; echo "   Check: tail $dir/execution.log"; else echo "✅ Feature $NUM: No errors detected"; fi; fi; done`

## Usage Examples

**Check overall status:**
```bash
/parallel:status
```

**View details for feature 2:**
```bash
/parallel:status 2
```

**Watch all logs in real-time:**
```bash
/parallel:status watch
```

**Check specific log file:**
```bash
tail -f trees/feature-TIMESTAMP-1/execution.log
```

**Attach to tmux to see live progress:**
```bash
tmux attach -t parallel-TIMESTAMP
```

## Status Indicators

- 🔄 **In Progress**: Feature is being implemented
- ✅ **Complete**: RESULTS.md exists and commits made
- ❌ **Not Started**: No commits or results yet
- ⚠️ **Errors**: Potential errors detected in logs

## Next Steps

Based on status, you can:

1. **Wait for completion** - Features still running
2. **Review results** - Check RESULTS.md in each worktree
3. **Debug issues** - View logs for failed features
4. **Collect results** - Run `/parallel:run` results collection step
5. **Clean up** - Run `/parallel:cleanup` when done

---

**Monitoring your parallel features** 📊
