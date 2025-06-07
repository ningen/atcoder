# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository is for AtCoder competitive programming practice and notes. It consists of two main parts:

1. **AtCoder Solutions & Notes**: Python solutions to AtCoder problems stored in `notes/contests/` organized by contest (e.g., abc406). Notes are written in Markdown with frontmatter.

2. **Web Interface**: A Next.js application that displays the notes as a searchable, browsable website.

## Commands

### Web Interface Development

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## Code Structure

### AtCoder Solutions

- `notes/contests/`: Contains markdown files with problem solutions and notes organized by contest
- `notes/solutions/`: Contains reusable algorithm notes and Python library references
- `notes/run.py`: For testing solutions locally

### Web Interface

- Built with Next.js 15, React 19, and Tailwind CSS 4
- Renders markdown notes with syntax highlighting
- Features search functionality and tag filtering

The app reads markdown files from the `notes` directory, parses frontmatter metadata (title, tags), and displays them in a browsable interface.

## Workflow

1. For new AtCoder problems:
   - Create markdown files in `notes/contests/{contest_id}/` (e.g., `abc406/a.md`)
   - Use frontmatter format with title and tags
   - Add solutions in code blocks

2. For website changes:
   - The site uses Next.js App Router architecture
   - Main routes are in `src/app/`
   - Components are in `src/components/`