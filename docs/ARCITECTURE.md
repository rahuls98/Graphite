# Architecture

## Overview

Graphite is a distributed system designed for high-performance knowledge graph construction and querying. It supports multiple interaction layers: UI, CLI, and API, all backed by a shared core backend and processing pipeline.

---

## Interaction Layers

### UI (Frontend)
- Svelte + D3
- Graph visualization
- Interactive exploration

### CLI
- Command-line interface for ingestion and querying
- Designed for developer workflows and automation

### API
- REST-based interface
- Enables programmatic access and integrations

All interaction layers communicate with the same core backend.

---

## System Components

### Frontend

Technology:
- Svelte
- D3.js

Responsibilities:
- Graph visualization
- Query interface
- Node inspection
- Progressive loading

---

### CLI Layer

Technology:
- Go-based CLI

Responsibilities:
- Trigger ingestion jobs
- Query graphs
- Retrieve nodes and relationships
- Scriptable workflows

Design:
- Thin client over API
- Consistent command structure

---

### API Layer

Technology:
- Go (Gin or Fiber)

Responsibilities:
- Expose endpoints for:
  - ingestion
  - querying
  - graph traversal
- Authentication (if required)
- Input validation

Design:
- Stateless
- Versioned endpoints
- JSON-based communication

---

### Core Backend (Go)

Responsibilities:
- Ingestion orchestration
- Graph construction
- Job management
- Pipeline execution
- Communication with intelligence layer
- Storage interaction

Modules:

Ingestion:
- File ingestion
- URL ingestion
- Sitemap processing

Pipeline:
- Normalization
- Chunking
- Metadata extraction

Graph:
- Node and edge management
- Query services

Jobs:
- Queue and worker system

Design:
- High concurrency
- Deterministic processing
- Asynchronous workflows

---

### Intelligence Layer (Python)

Technology:
- Python
- FastAPI

Responsibilities:
- Entity extraction
- Relationship inference
- Embedding generation

Characteristics:
- Stateless
- Idempotent
- Schema-driven outputs

---

### Storage Layer

Technology:
- PostgreSQL
- pgvector

Responsibilities:
- Store nodes and edges
- Support traversal queries
- Enable semantic search

---

### Queue Layer

Technology:
- Redis or NATS

Responsibilities:
- Task management
- Asynchronous execution

---

## Data Flow

1. Request initiated via UI, CLI, or API
2. Backend receives ingestion or query request
3. Content is processed through pipeline
4. Intelligence layer enriches data
5. Graph is constructed and stored
6. Query results returned to caller

---

## Design Principles

- Single source of truth (core backend)
- Multiple interaction layers (UI, CLI, API)
- Stateless interfaces
- Deterministic processing core
- Modular and extensible architecture
- High-performance data handling