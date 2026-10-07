#!/usr/bin/env sh
# Runs inside the db-backup container; dumps over the docker network to postgres.
set -eu

DB_HOST="${POSTGRES_HOST:-postgres}"
DB_USER="${POSTGRES_USER:-postgres}"
DB_NAME="${POSTGRES_DB:-shop}"
INTERVAL="${BACKUP_INTERVAL_SECONDS:-86400}"
KEEP_DAYS="${BACKUP_KEEP_DAYS:-14}"

echo "db-backup loop: host=$DB_HOST db=$DB_NAME interval=${INTERVAL}s keep=${KEEP_DAYS}d"

while true; do
  STAMP="$(date +%Y%m%d_%H%M%S)"
  FILE="/backups/shop_${STAMP}.sql.gz"
  echo "[$(date -Iseconds)] dumping -> $FILE"
  if pg_dump -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" --no-owner --no-acl | gzip -c > "$FILE"; then
    echo "[$(date -Iseconds)] OK $(wc -c < "$FILE") bytes"
  else
    echo "[$(date -Iseconds)] DUMP FAILED" >&2
    rm -f "$FILE"
  fi
  find /backups -type f -name 'shop_*.sql.gz' -mtime +"$KEEP_DAYS" -print -delete 2>/dev/null || true
  sleep "$INTERVAL"
done
