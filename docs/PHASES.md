# Phases

## Phase 1: Document Ingestion and Foundational Graph Construction

### Goal
Establish a deterministic pipeline to ingest unstructured documents and construct a foundational knowledge graph with clear structural relationships, accessible via UI, CLI, and API.

### Features

#### File-Based Ingestion
- Support ingestion of:
  - Plain text files
  - Markdown files
  - HTML files
- Batch upload capability via UI and CLI
- API endpoint for file ingestion

Purpose:
Provides controlled and predictable input sources to establish the core pipeline.

#### Content Normalization
- Strip non-content elements
- Normalize encoding
- Preserve structure

Purpose:
Ensures consistent input for processing.

#### Content Chunking
- Split into logical sections
- Maintain hierarchy

Purpose:
Enables structured graph construction.

#### Node Creation
- Document nodes
- Section nodes

Purpose:
Defines base graph schema.

#### Edge Creation
- Document → Section (contains)
- Section → Section (hierarchical)

Purpose:
Captures structural relationships.

#### Metadata Extraction
- File name
- Title
- Headings

Purpose:
Improves traceability and context.

#### Graph Storage
- Persist nodes and edges
- Maintain identifiers and timestamps

Purpose:
Enables retrieval and querying.

#### Access Interfaces

**UI**
- Upload documents
- Visualize graph

**CLI**
- Command: `graphite ingest <path>`
- Command: `graphite list`
- Command: `graphite view <graph-id>`

**API**
- POST `/ingest`
- GET `/graphs`
- GET `/graphs/{id}`

Purpose:
Ensures multiple interaction modes for different workflows.

#### Basic Visualization
- Render document hierarchy
- Expand/collapse nodes

Purpose:
Validates graph construction.

---

## Phase 2: Entity Extraction and Semantic Layer

### Goal
Introduce semantic understanding via entities and relationships across all interaction layers.

### Features

#### Entity Extraction
- Identify entities and concepts

Purpose:
Adds semantic meaning.

#### Entity Nodes
- Create entity nodes
- Attach metadata

Purpose:
Expands graph model.

#### Relationship Extraction
- Section → Entity (mentions)
- Entity → Entity (relates_to)

Purpose:
Captures semantic links.

#### Source Attribution
- Store source snippets

Purpose:
Ensures explainability.

#### Access Enhancements

**CLI**
- `graphite search <query>`
- `graphite node <id>`

**API**
- GET `/search?q=`
- GET `/nodes/{id}`

Purpose:
Enables semantic exploration beyond UI.

#### Visualization Enhancements
- Display entities and relationships

Purpose:
Improves graph usability.

---

## Phase 3: Semantic Enrichment and Similarity

### Goal
Enhance graph connectivity and retrieval through similarity and resolution.

### Features

#### Embeddings
- Generate embeddings for nodes

Purpose:
Enables semantic similarity.

#### Similarity Edges
- Section ↔ Section
- Entity ↔ Entity

Purpose:
Connects related concepts.

#### Entity Resolution
- Merge duplicates
- Canonical nodes

Purpose:
Reduces redundancy.

#### Weighted Edges
- Confidence and similarity scores

Purpose:
Supports ranking.

#### Query Enhancements

**CLI**
- `graphite similar <node-id>`

**API**
- GET `/similar/{id}`

Purpose:
Enables similarity-based retrieval.

---

## Phase 4: URL and Web Content Ingestion

### Goal
Extend ingestion to web-based content sources.

### Features

#### URL Ingestion
- Single URL ingestion via UI, CLI, API

#### Sitemap Processing
- Bulk ingestion via sitemap

#### Web Content Normalization
- Extract main content
- Remove boilerplate

#### Graph Mapping
- Treat pages as documents
- Reuse existing pipeline

**CLI**
- `graphite ingest-url <url>`
- `graphite ingest-sitemap <url>`

**API**
- POST `/ingest/url`
- POST `/ingest/sitemap`

Purpose:
Expands content sources while maintaining consistency.

---

## Phase 5: Advanced Querying and Exploration

### Goal
Provide flexible and powerful graph querying capabilities.

### Features

#### Graph Traversal API
- Neighbor expansion
- Path queries

#### Hybrid Search
- Keyword + semantic

#### Contextual Retrieval
- Subgraph extraction

#### Query Filters
- Node type, edge type, confidence

**CLI**
- `graphite traverse <node-id>`
- `graphite query "<expression>"`

**API**
- POST `/query`
- GET `/neighbors/{id}`

Purpose:
Enables structured and programmatic graph exploration.

---

## Phase 6: Performance Optimization and Scalability

### Goal
Ensure efficient operation across all interfaces at scale.

### Features

#### Asynchronous Processing
- Queue-based ingestion

#### Indexing
- Nodes, edges, embeddings

#### Incremental Updates
- Change detection

#### Caching
- Query and traversal caching

#### Graph Partitioning
- Large dataset handling

Purpose:
Maintains performance for UI, CLI, and API usage.

---

## Phase 7: Extensibility and Integration

### Goal
Enable integration with external systems and extensibility.

### Features

#### Multi-Source Ingestion
- APIs and structured data

#### Plugin Architecture
- Custom modules

#### External APIs
- Stable public API

#### CLI Extensions
- Plugin-based CLI commands

#### Data Export
- Standard formats

Purpose:
Supports ecosystem growth and integrations.

---

## Phase 8: Advanced Applications

### Goal
Enable higher-level use cases.

### Features

#### Analytical Tools
- Graph metrics

#### Domain Extensions
- Custom schemas

#### Enhanced Visualization
- Clustering and grouping

#### Integration Interfaces
- Structured outputs

Purpose:
Supports advanced workflows and applications.