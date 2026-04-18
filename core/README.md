# core

Go backend for Graphite.

## Structure

- `cmd/` — application entry points (e.g. `server/main.go`)
- `internal/` — private packages used by the server
- `pkg/` — shared utilities safe for import by other modules
- `go.mod` — module definition

## Quick start (development)

1. Install Go 1.20+.
2. From this directory:

```bash
go mod tidy
go run ./cmd/server
```
