#!/bin/sh
set -e

APP_DIR=/var/www/html/application

# First-time setup
if [ ! -d "$APP_DIR/vendor" ]; then
    echo ">>> First-time setup: installing dependencies and initializing Laravel..."
    echo ""

    cd "$APP_DIR"

    echo '--- Composer install ---'
    composer install --no-interaction --prefer-dist

    echo ''
    echo '--- npm install ---'
    npm install

    echo ''
    echo '--- Building frontend assets ---'
    npm run build

    echo ''
    echo '--- Generating APP_KEY ---'
    php artisan key:generate --force

    echo ''
    echo '--- Waiting for database and running migrations ---'
    for i in $(seq 1 30); do
        php artisan migrate --force 2>/dev/null && break
        echo "Waiting for database... ($i/30)"
        sleep 2
    done

    echo ''
    echo '>>> Setup complete! You can now run: composer run dev'
fi

exec "$@"