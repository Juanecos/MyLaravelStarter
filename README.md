# Ejemplo variables para coorer el entorno:
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=secret

REDIS_CLIENT=phpredis
REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379

CACHE_STORE=redis
QUEUE_CONNECTION=redi:s
SESSION_DRIVER=redis

# Instrucciones de uso

- Crear la carpeta de aplicación si es que no existe
docker compose exec app laravel new application

- configurar archivo .env

- Para editar cambiar el usuario propietario de la carpeta application sudo chwon -R usuario:usuario application

editar composer.json en los scripts
{
  "scripts": {
    "dev": [
      "Composer\\Config::disableProcessTimeout",
      "npx concurrently -c \"#93c5fd,#c4b5fd,#fb7185,#fdba74\" \"php artisan serve --host=0.0.0.0 --port=8000\" \"php artisan queue:listen --tries=1 --timeout=0\" \"php artisan pail --timeout=0\" \"npm run dev -- --host=0.0.0.0 --port=5173\" --names=server,queue,logs,vite --kill-others"
    ]
  }
}

## Comandos luego de entrar al contenedor

- Se entra con docker compose exec app /bin/bash
- php artisan key:generate
- npm install && npm run build
- composer run dev
- php artisan migrate (si es que ya se definio la base de datos)

