# Parallel Development Commands

Custom Claude Code commands for managing parallel git worktrees with independent development workflows.

## Overview

These commands enable you to develop the same feature simultaneously using multiple independent implementations, then select the best approach.

## Commands

### `/init` - Initialize Parallel Worktrees

Creates N isolated git worktrees with separate branches for parallel development.

**Usage:**
```bash
/init [feature-name] [num-versions]
```

**Examples:**
```bash
/init login-feature 3      # Creates 3 worktrees for login-feature
/init api-redesign 5       # Creates 5 worktrees for api-redesign
/init payment-flow         # Creates 3 worktrees (default)
```

**What it creates:**
- `trees/[feature-name]-1/` → branch `[feature-name]-1`
- `trees/[feature-name]-2/` → branch `[feature-name]-2`
- `trees/[feature-name]-3/` → branch `[feature-name]-3`
- Copies `.env` and `.env.local` to each worktree

---

### `/execute` - Execute Parallel Development

Template command to run inside each worktree for consistent, independent implementation.

**Usage:**
```bash
/execute [feature-description-or-file]
```

**Examples:**

**Inline specifications** (simple features):
```bash
/execute "Dark mode toggle with localStorage and smooth transitions"
/execute "Add search with debouncing and keyboard navigation"
/execute "Feature: Auth. Requirements: 1. Email login 2. JWT tokens 3. Rate limiting. Constraints: Next.js 16, TDD"
```

**File-based specifications** (complex features):
```bash
/execute specs/login-feature.md
/execute requirements/payment-flow.md
```

**What it does:**
- Accepts inline description OR file path
- Identifies current worktree/branch
- Guides through TDD implementation
- Creates `RESULTS.md` documenting approach
- Enforces independent development

---

### `/cleanup` - Clean Up Worktrees

Removes worktrees and optionally deletes branches after selecting the best implementation.

**Usage:**
```bash
/cleanup [feature-name]
```

**Examples:**
```bash
/cleanup login-feature      # Removes all login-feature-* worktrees
/cleanup api-redesign       # Removes all api-redesign-* worktrees
```

**What it removes:**
- All worktrees in `trees/[feature-name]-*/`
- Prunes stale git references
- Optionally deletes feature branches
- Removes empty `trees/` directory

---

## Complete Workflow

### 1. Initialize Worktrees

Start a parallel development session:

```bash
/init user-auth 3
```

This creates:
- `trees/user-auth-1/` (branch: user-auth-1)
- `trees/user-auth-2/` (branch: user-auth-2)
- `trees/user-auth-3/` (branch: user-auth-3)

### 2. Open Multiple Claude Code Sessions

In separate terminal windows/tabs:

```bash
# Terminal 1
cd trees/user-auth-1 && claude

# Terminal 2
cd trees/user-auth-2 && claude

# Terminal 3
cd trees/user-auth-3 && claude
```

### 3. Execute in Each Session

In each Claude Code instance, choose inline or file-based specification:

**Option A: Inline** (for simple features):
```bash
/execute "User authentication with email/password, JWT tokens, bcrypt hashing, rate limiting"
```

**Option B: File-based** (for complex features):
```bash
/execute specs/user-auth-spec.md
```

Each instance will:
- Implement the feature independently
- Use different approaches/patterns
- Create `RESULTS.md` with documentation
- Write tests and commit changes

### 4. Compare Implementations

After all instances complete, review:

```bash
# Compare RESULTS.md files
cat trees/user-auth-1/RESULTS.md
cat trees/user-auth-2/RESULTS.md
cat trees/user-auth-3/RESULTS.md

# Review code differences
git diff user-auth-1 user-auth-2
git diff user-auth-1 user-auth-3
```

### 5. Select Best Implementation

Choose the best approach and merge it:

```bash
# Return to main repository
cd /Users/marco/Sites/seederworks

# Merge selected version
git merge user-auth-2  # Or whichever you prefer
```

### 6. Clean Up

Remove all worktrees and branches:

```bash
/cleanup user-auth
```

---

## Benefits

✅ **Parallel Exploration**: Develop multiple solutions simultaneously
✅ **Isolated State**: Each worktree has independent file state
✅ **No Cloning**: Shared git objects, minimal disk usage
✅ **Easy Comparison**: Review different approaches side-by-side
✅ **Risk Reduction**: Test multiple architectures before committing
✅ **Team Learning**: Share different implementation strategies

---

## Inline vs File-Based Specifications

### When to Use Inline Specifications

✅ **Use inline for:**
- Simple features (1-5 requirements)
- Quick experiments and prototypes
- Time-sensitive tasks
- Features with obvious implementation
- Learning exercises

**Example:**
```bash
/execute "Add pagination to user list: 20 items per page, previous/next buttons, show total count"
```

### When to Use File-Based Specifications

✅ **Use files for:**
- Complex features (6+ requirements)
- Multiple acceptance criteria
- Detailed technical constraints
- Reusable specifications
- Team collaboration
- Features requiring diagrams/visuals

**Example:**
```bash
/execute specs/complex-payment-integration.md
```

### Recommended Inline Format

Structure your inline specifications for clarity:

```
Feature: [Name]
Requirements: 1. [req1] 2. [req2] 3. [req3]
Constraints: [technical constraints]
Acceptance: [key success criteria]
```

**Examples:**

**Simple:**
```bash
/execute "Dark mode toggle with localStorage persistence"
```

**Detailed:**
```bash
/execute "Feature: Search Bar. Requirements: 1. Full-text search across products 2. Debounced input (300ms) 3. Results dropdown with keyboard nav 4. Highlight matching text 5. Empty state handling. Constraints: React Server Components, PostgreSQL FTS, < 200ms response. Acceptance: Tests pass, accessible (WCAG AA), works on mobile"
```

---

## Best Practices

### Specification Files

For complex features, create detailed specifications in `specs/` directory:

```markdown
# Feature: User Authentication

## Requirements
1. Email/password login
2. JWT token generation
3. Password hashing with bcrypt
4. Rate limiting on login attempts

## Acceptance Criteria
- [ ] User can log in with valid credentials
- [ ] Invalid credentials return 401
- [ ] Tokens expire after 24 hours
- [ ] 5 failed attempts = 15 minute lockout

## Technical Constraints
- Use Next.js 16 Server Actions
- PostgreSQL for user storage
- Return Result<T> types
```

### Independent Development

Each Claude Code instance should:
- ❌ NOT coordinate with other instances
- ❌ NOT check other worktrees
- ✅ Explore unique approaches
- ✅ Make independent architectural decisions
- ✅ Document reasoning in RESULTS.md

### Selection Criteria

When choosing the best implementation, consider:
- Code quality and maintainability
- Test coverage
- Performance characteristics
- Alignment with project conventions
- Simplicity and clarity
- Future extensibility

---

## Tips

### Create Specification Templates

```bash
mkdir -p specs
cat > specs/feature-template.md << 'EOF'
# Feature: [Name]

## Requirements
1.
2.

## Acceptance Criteria
- [ ]
- [ ]

## Technical Constraints
-
-
EOF
```

### Use tmux for Session Management

```bash
# Start tmux session
tmux new -s parallel-dev

# Split into 3 panes
Ctrl+b %    # Vertical split
Ctrl+b "    # Horizontal split

# Navigate to each worktree and start Claude
cd trees/feature-1 && claude
cd trees/feature-2 && claude
cd trees/feature-3 && claude
```

### Track Time per Implementation

In each `RESULTS.md`, document:
- Planning time
- Implementation time
- Testing time
- Total time invested

This helps evaluate efficiency across approaches.

---

## Troubleshooting

### Worktree Already Exists

```bash
# Remove existing worktree first
git worktree remove trees/feature-name-1
# Or force remove
git worktree remove trees/feature-name-1 --force
```

### Branch Already Exists

```bash
# Delete branch first
git branch -d feature-name-1
# Or force delete
git branch -D feature-name-1
```

### Directory Not Empty

```bash
# Manual cleanup
rm -rf trees/feature-name-*
git worktree prune
```

---

## Advanced Usage

### Custom Number of Versions

```bash
/init complex-feature 5     # 5 parallel implementations
/init quick-test 2          # Just 2 versions
```

### Different Specification Per Worktree

```bash
# In worktree 1
/execute specs/approach-A.md

# In worktree 2
/execute specs/approach-B.md

# Test two completely different strategies
```

### Keep Branches for Reference

After cleanup, optionally keep branches:

```bash
# Don't delete branches when cleanup asks
# Later, review historical approaches:
git diff main feature-name-1
git diff main feature-name-2
```

---

## See Also

- [Git Worktree Documentation](https://git-scm.com/docs/git-worktree)
- [Test-Driven Development Guide](../../../CLAUDE.md#test-driven-development-workflow)
- [Result<T> Pattern](../../../CLAUDE.md#1-server-actions)

---

**Happy Parallel Development!** 🚀
