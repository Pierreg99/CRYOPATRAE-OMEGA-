# Security Policy

## Scope

CRYOPATRAE OMEGA packages the GLOSSOPETRAE research engine and related experiment material. The repository contains dual-use research components, so security reports should focus on defects that can affect users, infrastructure, data integrity, or the safety boundaries around the research tooling.

## Reporting a vulnerability

Please use GitHub's private vulnerability reporting / Security Advisory flow when available. Do not post credentials, private datasets, exploit payloads, or sensitive reproduction details in a public issue.

A useful report includes:

- affected file or component;
- observed and expected behavior;
- minimal, non-sensitive reproduction steps;
- environment and runtime version;
- impact assessment;
- a proposed mitigation when known.

## Secrets

Never commit API keys or tokens. Experiment credentials belong in local environment files such as `.env.local`, which must remain untracked.

## Research safety

Security fixes, detection improvements, sanitization, measurement quality, and defensive analysis are in scope. Changes whose primary purpose is to improve covert delivery, guardrail evasion, or exploitation are intentionally excluded from this maintenance track.
