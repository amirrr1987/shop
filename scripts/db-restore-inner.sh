#!/usr/bin/env sh
# Runs inside the postgres container. Args: <dump-basename> <db-name> <db-user>
set -eu

BASENAME="${1:?dump basename required}"
DB_NAME="${2:?db name required}"
DB_USER="${3:?db user required}"
REMOTE="/tmp/$BASENAME"

psql -U "$DB_USER" -d postgres -v ON_ERROR_STOP=1 -c \
  "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$DB_NAME' AND pid <> pg_backend_pid();" \
  >/dev/null 2>&1 || true

psql -U "$DB_USER" -d postgres -v ON_ERROR_STOP=1 -c "DROP DATABASE IF EXISTS \"$DB_NAME\";"
psql -U "$DB_USER" -d postgres -v ON_ERROR_STOP=1 -c "CREATE DATABASE \"$DB_NAME\";"
gunzip -c "$REMOTE" | psql -U "$DB_USER" -d "$DB_NAME" -v ON_ERROR_STOP=1
rm -f "$REMOTE"
echo "Restore complete."
