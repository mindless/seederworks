# Quick Start: Parallel Development

Get started with parallel development in 5 minutes.

## 🚀 Quick Example

Let's implement a "Dark Mode Toggle" feature with 3 parallel approaches:

### 1. Initialize (30 seconds)

```bash
/init dark-mode 3
```

**What happens:**
- Creates `trees/dark-mode-1/`, `trees/dark-mode-2/`, `trees/dark-mode-3/`
- Creates branches: `dark-mode-1`, `dark-mode-2`, `dark-mode-3`
- Copies environment files to each

### 2. Create Specification (5 minutes)

```bash
# Create a simple spec
cat > specs/dark-mode-spec.md << 'EOF'
# Feature: Dark Mode Toggle

## Requirements
1. Toggle button in navigation
2. Persists user preference (localStorage)
3. Smooth theme transition
4. Updates all components

## Acceptance Criteria
- [ ] Button toggles dark/light mode
- [ ] Preference saved to localStorage
- [ ] Page reloads with saved preference
- [ ] All text remains readable
- [ ] Smooth color transitions (300ms)

## Technical Constraints
- Use Tailwind CSS dark: variants
- Client component (needs useState)
- Context provider for theme state
- No external libraries
EOF
```

### 3. Open Multiple Sessions (1 minute)

**Option A: Manual Terminals**

```bash
# Terminal 1
cd trees/dark-mode-1 && claude

# Terminal 2
cd trees/dark-mode-2 && claude

# Terminal 3
cd trees/dark-mode-3 && claude
```

**Option B: Using tmux**

```bash
# Create tmux session with 3 panes
tmux new -s dark-mode \; \
  send-keys 'cd trees/dark-mode-1 && claude' C-m \; \
  split-window -h \; \
  send-keys 'cd trees/dark-mode-2 && claude' C-m \; \
  split-window -v \; \
  send-keys 'cd trees/dark-mode-3 && claude' C-m \; \
  select-layout even-horizontal
```

### 4. Execute in Each (20 minutes)

In each Claude Code session:

```bash
/execute specs/dark-mode-spec.md
```

**What each instance will do:**
- Read the specification
- Plan their own approach
- Implement with TDD
- Create `RESULTS.md`
- Commit changes

### 5. Compare Results (5 minutes)

```bash
# Return to main repo
cd /Users/marco/Sites/seederworks

# Compare RESULTS.md files
diff trees/dark-mode-1/RESULTS.md trees/dark-mode-2/RESULTS.md
diff trees/dark-mode-1/RESULTS.md trees/dark-mode-3/RESULTS.md

# Compare code structure
git diff dark-mode-1 dark-mode-2 -- components/
git diff dark-mode-1 dark-mode-3 -- components/

# Check test coverage
cat trees/dark-mode-1/RESULTS.md | grep -A5 "Test coverage"
cat trees/dark-mode-2/RESULTS.md | grep -A5 "Test coverage"
cat trees/dark-mode-3/RESULTS.md | grep -A5 "Test coverage"
```

### 6. Select & Merge (2 minutes)

```bash
# After reviewing, select the best (e.g., version 2)
git merge dark-mode-2

# Resolve any conflicts if needed
git status
```

### 7. Clean Up (30 seconds)

```bash
/cleanup dark-mode
```

---

## 📊 Expected Outcomes

After completion, you might see approaches like:

**Version 1: Context + Custom Hook**
```typescript
// Approach: Context provider with custom hook
ThemeProvider > useTheme > components
```

**Version 2: Zustand Store**
```typescript
// Approach: Global state with Zustand
useThemeStore > components
```

**Version 3: Next-themes Library**
```typescript
// Approach: Use next-themes package
next-themes provider > components
```

Each valid, each with trade-offs!

---

## 🎯 When to Use Parallel Development

**✅ Good Use Cases:**

- **New features** with unclear best approach
- **Architecture decisions** needing validation
- **Performance experiments** comparing strategies
- **Library evaluation** (e.g., Redux vs Zustand vs Context)
- **Learning opportunities** for team

**❌ Skip for:**

- Simple bug fixes
- Trivial features with obvious solution
- Tight deadlines (coordination overhead)
- Solo developer with no one to review

---

## 💡 Tips for Success

### 1. Write Clear Specs

**Good spec:**
```markdown
## Requirements
1. User can upload images up to 5MB
2. Images are optimized to WebP
3. Progress bar shows upload status
```

**Poor spec:**
```markdown
## Requirements
1. Handle images
```

### 2. Encourage Diversity

Give each version a suggested focus:

```markdown
## For Parallel Development

Version 1: Optimize for simplicity
Version 2: Optimize for performance
Version 3: Optimize for testability
```

### 3. Set Time Limits

```bash
# In /execute command
Spend maximum 30 minutes on implementation
```

### 4. Review All Versions

Don't just pick the first one done - review all approaches:
- Code quality
- Test coverage
- Performance
- Maintainability
- Future extensibility

### 5. Document Learnings

After selecting, document why:

```markdown
# Why We Chose Version 2

- Simpler component structure
- Better test coverage (95% vs 80%)
- Clearer separation of concerns
- Team familiar with this pattern
```

---

## 🔧 Common Workflows

### Workflow 1: Feature Exploration

```bash
# Unknown best approach
/init new-feature 3
# Open 3 sessions
/execute specs/new-feature.md
# Compare & select
git merge new-feature-2
/cleanup new-feature
```

### Workflow 2: Performance Comparison

```bash
# Test performance strategies
/init perf-optimization 2
# Version 1: Virtualization
# Version 2: Pagination
/execute specs/perf-spec.md
# Benchmark both
# Select fastest
```

### Workflow 3: Library Evaluation

```bash
# Compare libraries
/init state-management 3
# Version 1: Zustand
# Version 2: Jotai
# Version 3: Valtio
/execute specs/state-spec.md
# Compare bundle size & DX
```

---

## 📚 Next Steps

- Read full documentation: [README.md](./README.md)
- See command details:
  - [/init](./init.md)
  - [/execute](./execute.md)
  - [/cleanup](./cleanup.md)
- Create your first spec: [specs/example-feature.md](../../../specs/example-feature.md)

---

## ❓ Quick Troubleshooting

**Q: Command not found**
```bash
# Restart Claude Code CLI
exit
claude
```

**Q: Worktree already exists**
```bash
/cleanup old-feature
/init new-feature 3
```

**Q: How do I see available commands?**
```bash
/help
# Look for "project:parallel"
```

**Q: Can I use different numbers of versions?**
```bash
/init feature-name 2   # Just 2 versions
/init feature-name 5   # 5 versions!
```

---

**Ready to start?** Try the dark mode example above! 🌙
