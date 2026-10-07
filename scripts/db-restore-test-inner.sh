#!/usr/bin/env sh
# Runs inside the postgres container. Args: <dump-basename> <test-db> <db-user>
set -eu

BASENAME="${1:?dump basename required}"
TEST_DB="${2:?test db required}"
DB_USER="${3:?db user required}"
REMOTE="/tmp/$BASENAME"

psql -U "$DB_USER" -d postgres -c \
  "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$TEST_DB' AND pid <> pg_backend_pid();" \
  >/dev/null 2>&1 || true

psql -U "$DB_USER" -d postgres -v ON_ERROR_STOP=1 -c "DROP DATABASE IF EXISTS \"$TEST_DB\";"
psql -U "$DB_USER" -d postgres -v ON_ERROR_STOP=1 -c "CREATE DATABASE \"$TEST_DB\";"
gunzip -c "$REMOTE" | psql -U "$DB_USER" -d "$TEST_DB" -v ON_ERROR_STOP=1 >/dev/null
rm -f "$REMOTE"

COUNT="$(psql -U "$DB_USER" -d "$TEST_DB" -tAc "SELECT COUNT(*) FROM migrations;")"
COUNT="$(echo "$COUNT" | tr -d '[:space:]')"
if [ -z "$COUNT" ] || [ "$COUNT" -lt 1 ]; then
  echo "FAIL: migrations row count=$COUNT" >&2
  exit 1
fi
echo "migrations rows: $COUNT"

psql -U "$DB_USER" -d postgres -v ON_ERROR_STOP=1 -c "DROP DATABASE \"$TEST_DB\";"
echo "OK"
