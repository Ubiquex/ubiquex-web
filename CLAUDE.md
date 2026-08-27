# CLAUDE.md — ubiquex-web

## What this is

The Ubiquex marketing/product site (Next.js — `app/`, `components/`,
`content/`, `mdx-components.tsx`). Coordinating repo:
`github.com/ubiquex/ubiquex`.

## Git rules

- No git workflow convention for this repo has been recorded by a session
  yet — until the founder confirms otherwise, treat it as PR-only, never
  self-merge, matching every repo in this org except `ubiquex` itself and
  `ubiquex-docs` (both explicitly confirmed direct-push, for stated reasons
  recorded in their own `CLAUDE.md`).
- Before pushing more commits to a branch with an open PR, confirm it is
  STILL open (`gh pr list --state open` or `gh pr view <n>`) — a merged PR's
  branch looks identical to any other from `git status` alone, and a push
  after merge lands nowhere near `main`, silently.
- NO AI attribution anywhere in commits or PR bodies.

## Before touching anything

- This file is new as of UBI-183 (2026-08-27) — a first-pass `CLAUDE.md`
  written from the repo's own real file listing and description, not from
  any session having actually worked here yet. Update it with real,
  specific conventions once a session does.
