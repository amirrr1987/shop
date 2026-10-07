#!/usr/bin/env sh
# Restore a gzipped SQL dump into Postgres (docker). DESTRUCTIVE for target DB.
set -eu

ROOT="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"
CONTAINER="${POSTGRES_CONTAINER:-shop-postgres}"
DB_USER="${POSTGRES_USER:-postgres}"
DB_NAME="${POSTGRES_DB:-shop}"
DB_PASSWORD="${POSTGRES_PASSWORD:-postgres}"

DUMP="${1:-}"
if [ -z "$DUMP" ]; then
  echo "Usage: $0 <path-to-shop_YYYYMMDD_HHMMSS.sql.gz>" >&2
  exit 1
fi

if [ ! -f "$DUMP" ]; then
  echo "Dump not found: $DUMP" >&2
  exit 1
fi

BASENAME="$(basename "$DUMP")"

echo "WARNING: restoring into $DB_NAME (container=$CONTAINER)"
echo "File: $DUMP"
printf "Type YES to continue: "
read -r CONFIRM
if [ "$CONFIRM" != "YES" ]; then
  echo "Aborted."
  exit 1
fi

docker cp "$DUMP" "$CONTAINER:/tmp/$BASENAME"
docker cp "$ROOT/scripts/db-restore-inner.sh" "$CONTAINER:/tmp/db-restore-inner.sh"
docker exec -e PGPASSWORD="$DB_PASSWORD" "$CONTAINER" \
  sh /tmp/db-restore-inner.sh "$BASENAME" "$DB_NAME" "$DB_USER"
