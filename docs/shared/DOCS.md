# Shared Layer Documentation

---

# /shared/graph

## Purpose

Defines the core graph data model used across the system.

## Responsibilities

- Define node structures
- Define edge structures
- Define graph structure
- Maintain relationships between entities

---

# /shared/schemas

## Purpose

Defines input, output, and intermediate schemas for data flow between components.

## Responsibilities

- Define ingestion request schemas
- Define pipeline intermediate representations
- Define graph construction outputs
- Enforce validation contracts

---

# /shared/types

## Purpose

Defines shared enums and type definitions used across the system.

## Responsibilities

- Standardize type usage
- Prevent inconsistent string usage
- Provide strict typing across services

---

# /shared/events

## Purpose

Defines event contracts for asynchronous processing and inter-service communication.

## Responsibilities

- Standardize event payloads
- Enable decoupled processing
- Support queue-based workflows
