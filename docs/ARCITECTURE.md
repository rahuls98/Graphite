# ARCHITECTURE.md — Graphite

## Overview

Graphite is a modular, service-oriented content platform built with a Go-based core system, a Python-based intelligence layer, a PostgreSQL data layer, Redis caching, and a SvelteKit PWA frontend.

The architecture is designed to separate deterministic system execution from probabilistic intelligence processing while maintaining a unified content model across all layers.

---

# System Architecture

## Core Backend (Go Services)

### Role

Primary execution layer responsible for deterministic content operations and system state management.

### Responsibilities

- Content CRUD operations
- Schema validation and enforcement
- Draft and published state management
- Layout resolution and page composition
- Relationship resolution (structural graph)
- Publishing pipeline execution
- API request handling (REST/gRPC)
- Cache coordination and invalidation

### Characteristics

- Stateless service design
- High-performance request handling
- Strict consistency guarantees
- Minimal external dependencies

---

## Intelligence Layer (Python FastAPI Microservices)

### Role

Independent microservice layer responsible for AI-driven content understanding and enrichment.

### Responsibilities

- Semantic analysis of content
- Embedding generation and storage
- Content classification and tagging
- Similarity and relevance computation
- Content summarization and enrichment
- Graph augmentation (semantic relationships)
- NLP-based content extraction
- AI request orchestration

### Characteristics

- Event-driven and API-driven execution
- Horizontally scalable microservices
- Independent deployment lifecycle
- Model-agnostic AI integration layer

---

## Data Layer

### PostgreSQL

#### Role

Primary structured data store.

#### Responsibilities

- Content storage
- Schema definitions
- Relationship storage (structural graph)
- Version history tracking
- Publishing state persistence

---

### Redis

#### Role

High-performance caching layer.

#### Responsibilities

- Cached API responses
- Precomputed page layouts
- Session and rate limiting support
- Cache invalidation coordination

---

## Semantic Storage Layer

### pgvector (PostgreSQL Extension)

#### Role

Vector storage for semantic intelligence.

#### Responsibilities

- Embedding storage
- Semantic similarity queries
- Content clustering support
- AI-driven relationship enrichment

---

## Frontend Layer

### SvelteKit PWA

#### Role

Primary user interface for content management and system interaction.

### Responsibilities

- Content creation and editing UI
- Schema-driven form rendering
- Page and layout composition tools
- Content preview system
- Authentication and session management
- Offline-capable editing experience

### Characteristics

- Progressive Web Application (PWA)
- Reactive UI architecture
- Schema-driven rendering system

---

## API Layer

### Go API Services

#### Role

Primary interface between frontend, backend, and external systems.

### Responsibilities

- Content retrieval and manipulation
- Page resolution and layout composition
- Relationship traversal queries
- Publishing operations
- Authentication and authorization handling

---

## Event System

### Role

Asynchronous communication layer across system components.

### Responsibilities

- Propagation of content lifecycle events
- Triggering AI processing workflows
- Cache invalidation signaling
- Cross-service synchronization

### Event Types

- content.created
- content.updated
- content.published
- content.deleted

---

## Observability Layer

### Role

System monitoring and operational visibility.

### Responsibilities

- Structured logging across services
- Distributed request tracing
- Performance metrics collection
- AI processing observability

---

# Core System Responsibilities

## Go Core System

- Deterministic content processing
- API request handling
- Layout and page resolution
- Relationship traversal (structural graph)
- Publishing pipeline execution
- Cache management coordination

---

## Python Intelligence Layer

- Semantic content understanding
- AI-based enrichment workflows
- Embedding generation and retrieval
- Content classification and analysis
- Graph augmentation (semantic relationships)

---

## Data Layer Responsibilities

- Persistent structured content storage
- Relationship mapping and version control
- High-speed caching and retrieval
- Semantic vector storage and querying

---

## Frontend Responsibilities (SvelteKit PWA)

- Content authoring experience
- Layout composition interface
- Content preview system
- Schema-driven UI rendering
- Offline-capable editing workflows

---

## Event System Responsibilities

- Decoupled service communication
- Triggering asynchronous processing pipelines
- Coordinating AI and caching workflows
- Maintaining system-wide consistency signals

---

# System Interaction Model

1. Frontend interacts with Go API layer
2. Go system processes deterministic operations
3. Events are emitted for state changes
4. Python intelligence layer consumes events
5. AI-enriched data is written back to storage
6. Enhanced data is served through API layer
7. Redis caches optimize repeated access paths

---

# Summary

Graphite is designed as a layered system:

- Go core handles deterministic system execution
- Python microservices handle intelligence and semantic processing
- PostgreSQL and Redis provide structured storage and caching
- pgvector enables semantic search capabilities
- SvelteKit PWA provides the user-facing experience
- Event system connects all layers asynchronously

This separation ensures high performance, maintainability, and extensibility while keeping the core system stable and predictable.
