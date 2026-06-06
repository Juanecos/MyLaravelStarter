#!/bin/sh
set -e

chown -R appuser:appuser /var/www/html/application/storage /var/www/html/application/bootstrap/cache 2>/dev/null || true

exec su-exec appuser "$@"
