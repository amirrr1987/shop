#!/usr/bin/env sh
# Take a backup, restore into a throwaway DB, assert migrations table exists, drop it.
set -eu

ROOT="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"
CONTAINER="${POSTGRES_CONTAINER:-shop-postgres}"
DB_USER="${POSTGRES_USER:-postgres}"
DB_PASSWORD="${POSTGRES_PASSWORD:-postgres}"
TEST_DB="${RESTORE_TEST_DB:-shop_restore_test}"

echo "==> backup"
"$ROOT/scripts/db-backup.sh"
DUMP="$(ls -1t "$ROOT/backups"/shop_*.sql.gz | head -n 1)"
BASENAME="$(basename "$DUMP")"
echo "Using dump: $DUMP"

docker cp "$DUMP" "$CONTAINER:/tmp/$BASENAME"
docker cp "$ROOT/scripts/db-restore-test-inner.sh" "$CONTAINER:/tmp/db-restore-test-inner.sh"

echo "==> restore + verify into $TEST_DB"
docker exec -e PGPASSWORD="$DB_PASSWORD" "$CONTAINER" \
  sh /tmp/db-restore-test-inner.sh "$BASENAME" "$TEST_DB" "$DB_USER"

echo "OK: backup + restore verified."
