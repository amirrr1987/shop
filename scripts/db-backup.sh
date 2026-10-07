#!/usr/bin/env sh
# Dump Postgres (docker) to ./backups as gzipped SQL.
set -eu

ROOT="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"
BACKUP_DIR="${BACKUP_DIR:-$ROOT/backups}"
CONTAINER="${POSTGRES_CONTAINER:-shop-postgres}"
DB_USER="${POSTGRES_USER:-postgres}"
DB_NAME="${POSTGRES_DB:-shop}"
DB_PASSWORD="${POSTGRES_PASSWORD:-postgres}"
KEEP_DAYS="${BACKUP_KEEP_DAYS:-14}"

mkdir -p "$BACKUP_DIR"

if ! docker inspect "$CONTAINER" >/dev/null 2>&1; then
  echo "Container $CONTAINER not found. Start postgres first." >&2
  exit 1
fi

STAMP="$(date +%Y%m%d_%H%M%S)"
FILE="shop_${STAMP}.sql.gz"
OUT="$BACKUP_DIR/$FILE"
REMOTE="/tmp/$FILE"

echo "Backing up $DB_NAME from $CONTAINER -> $OUT"
docker exec -e PGPASSWORD="$DB_PASSWORD" "$CONTAINER" \
  sh -c "pg_dump -U \"$DB_USER\" -d \"$DB_NAME\" --no-owner --no-acl | gzip -c > \"$REMOTE\""

docker cp "$CONTAINER:$REMOTE" "$OUT"
docker exec "$CONTAINER" rm -f "$REMOTE" >/dev/null 2>&1 || true

echo "OK: $OUT ($(wc -c < "$OUT") bytes)"

find "$BACKUP_DIR" -type f -name 'shop_*.sql.gz' -mtime +"$KEEP_DAYS" -print -delete 2>/dev/null || true
