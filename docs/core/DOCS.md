
# Core System Documentation

---

# /cmd/server

## Purpose
Entry point for the core runtime.

## Responsibilities
- Initialize core HTTP server
- Wire system modules together

---

# /internal/api

## Purpose
HTTP API layer for the core system.

## Responsibilities
- Define API routes
- Handle incoming requests
- Return API responses

---

# /internal/content

## Purpose
Content management layer.

## Responsibilities
- Manage content operations
- Handle content state lifecycle

---

# /internal/layout

## Purpose
Layout resolution system.

## Responsibilities
- Resolve page structure
- Compose layout output

---

# /internal/publish

## Purpose
Publishing system.

## Responsibilities
- Handle content publishing flow
- Manage publish state transitions

---

# /internal/graph

## Purpose
Content relationship system.

## Responsibilities
- Manage structural relationships between content entities

---

# /internal/cache

## Purpose
Caching layer.

## Responsibilities
- Cache frequently used data
- Improve response performance

---

# /internal/db

## Purpose
Database access layer.

## Responsibilities
- Handle database interactions
- Execute queries and persistence operations

---

# /pkg

## Purpose
Shared internal utilities.

## Responsibilities
- Provide reusable helper functions
- Shared system utilities