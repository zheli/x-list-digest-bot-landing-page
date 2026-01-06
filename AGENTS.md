# Agent Guidelines for x-list-digest-bot-landing-page

This document establishes principles and guidelines for all agents (human and AI) working on this repository.

## Core Principles

### 1. Simplicity Above All
- **Prefer simple, standard solutions over complex custom implementations**
- Use built-in tools and standard Unix utilities (bash, sed, make) instead of introducing heavy dependencies
- Avoid frameworks, build tools, or runtimes unless absolutely necessary
- Ask: "Can this be done with standard tools?" before adding dependencies

### 2. Minimal Dependencies
- This is a static HTML landing page - keep it that way
- No Node.js, npm, webpack, or other build systems unless there's a compelling reason
- No frameworks unless the complexity truly justifies them
- Document any dependency additions and the reasoning behind them

### 3. Standard Tools First
- For simple text transformations: use `sed`, `awk`, or basic bash
- For build automation: use `make` (standard on all Unix systems)
- For CI/CD: use GitHub Actions with minimal custom scripts
- Prefer tools that are likely already installed on developer machines

### 4. Developer Experience
- Local development should work with minimal setup
- Common tasks should be automated via Makefile
- Clear README with straightforward instructions
- Support .env files for local configuration without requiring special tools

## Examples of Good vs. Bad Decisions

### ✅ Good Decisions
- Using `sed` for simple search/replace operations
- Using a Makefile for build automation
- Using bash scripts for simple file manipulations
- Loading .env files with standard shell commands
- Static HTML/CSS/JS without transpilation

### ❌ Bad Decisions
- Using Node.js script for simple text replacement
- Requiring npm/yarn for basic operations
- Adding webpack/rollup for a static site
- Using TypeScript compilation for a simple landing page
- Adding React/Vue for what can be done with vanilla JS

## Decision Framework

Before adding any tool, dependency, or complexity, ask:

1. **Is this solving a real problem?** (Not just "nice to have")
2. **Can standard Unix tools do this?** (sed, awk, make, bash)
3. **Will this still make sense in 5 years?** (Avoid trendy solutions)
4. **Does this burden future developers?** (Setup complexity, learning curve)
5. **Is this the simplest solution?** (YAGNI - You Aren't Gonna Need It)

## Reviewing Changes

When reviewing PRs or working on issues:

- Question any new dependencies or tools
- Suggest simpler alternatives when available
- Prioritize maintainability over cleverness
- Ensure changes don't break the "open and run" simplicity

## Bottom Line

**This is a static landing page. It should remain simple enough that anyone with basic HTML/CSS/JS knowledge can maintain it without special tools or complex setup.**

When in doubt, choose boring, proven, simple solutions.
