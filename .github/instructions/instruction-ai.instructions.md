---
description: Load these instructions for all source files to enforce coding standards, architecture consistency, and best practices.
applyTo: '**/*.{ts,tsx,js,jsx,py,java,cs,go,rb,php,cpp,c,h,rs,swift,kt,sql}'
---

# AI Coding Guidelines

These instructions define how AI must generate code, answer technical questions, and review changes in this repository.

## General Standards

- Generate production-ready, maintainable, and secure code.
- Follow SOLID principles and separation of concerns.
- Prefer clarity over cleverness.
- Avoid deprecated APIs and outdated patterns.
- Do not introduce unnecessary dependencies.

## Architecture

- Keep business logic separate from infrastructure and UI.
- Favor modular, testable components.
- Prefer composition over inheritance.
- Avoid tight coupling and hidden side effects.

## Security

- Never hardcode secrets or credentials.
- Validate and sanitize all external input.
- Prevent common vulnerabilities (SQL injection, XSS, CSRF, race conditions).
- Avoid leaking sensitive data in logs or error messages.

## Error Handling & Logging

- Do not silently swallow errors.
- Provide structured, meaningful error handling.
- Log responsibly without exposing sensitive information.

## Performance

- Avoid unnecessary allocations and blocking operations.
- Use async patterns correctly when applicable.
- Consider scalability and algorithmic complexity.

## Testing

- Write testable code.
- Suggest unit tests for non-trivial logic.
- Cover edge cases and failure paths.

## Code Review Behavior

When reviewing changes:
- Identify architectural violations and anti-patterns.
- Suggest safer, cleaner, or more idiomatic alternatives.
- Highlight technical debt and scalability risks.

The AI must behave as a senior engineer delivering production-grade implementations aligned with modern best practices.