# Laravel + Inertia + React + Tailwind — Starter Kit

Kit de inicio completo para aplicaciones web modernas con **Laravel 13**, **Inertia.js v3**, **React 19**, **Tailwind CSS v4**, TypeScript y Vite.

Incluye ejemplos funcionales de **login**, **registro** y **dashboard protegido** con autenticación por sesión.

## Stack

| Capa         | Tecnología                        |
| ------------ | ---------------------------------- |
| Backend      | Laravel 13 + PHP 8.3              |
| Frontend     | React 19 + Inertia.js v3          |
| Estilos      | Tailwind CSS v4 + CVA + clsx      |
| Build        | Vite 8                            |
| BD           | PostgreSQL 16                     |
| Cache/Colas  | Redis 7                           |
| Contenedor   | Docker + docker-compose           |

## Requisitos

- Docker y Docker Compose
- **Linux**: asegúrate de que tu usuario tenga Docker instalado
- **macOS / Windows**: Docker Desktop

## Compatibilidad multiplataforma

El contenedor crea un usuario (`appuser`) con el mismo **UID/GID** que el usuario del host para que los archivos se puedan editar desde cualquier editor sin problemas de permisos.

| Plataforma | UID típico | Notas |
|------------|-----------|-------|
| **Linux**  | 1000      | Coincide con el primer usuario creado |
| **macOS**  | 501       | Si `id -u` devuelve 501, edita `.env` y pon `UID=501` |
| **Windows**| —         | Docker Desktop traduce permisos automáticamente, funciona sin cambios |

Si tienes un UID distinto, verifícalo con `id -u` y ajústalo en el archivo `.env` de la raíz del proyecto antes de construir los contenedores.

## Uso rápido

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd tutorial

# 2. Iniciar los contenedores
docker compose up -d --build

# 3. Eliminar el historial de git para empezar tu propio proyecto
rm -rf .git

# 4. Entrar al contenedor
docker compose exec app /bin/bash

# Dentro del contenedor:
cd application
composer run dev
```

Este comando levanta el servidor PHP, las colas, los logs y Vite simultáneamente.  
Abre tu navegador en **http://localhost:8000** para ver la aplicación.

Servicios que se inician:
- **PHP-FPM** en `:8000`
- **Vite** en `:5173`
- **PostgreSQL** en `:5432`
- **Redis** en `:6379`
- **Nginx** en `:8082`

## Editar el código

El contenedor ejecuta los procesos como `appuser`, que tiene el mismo **UID/GID** que tu usuario local. Esto significa que los archivos que crees o modifiques desde el contenedor serán editables directamente desde el **host** con cualquier editor (VS Code, PHPStorm, Sublime, vim, etc.).

No necesitas Dev Containers ni extensiones especiales.

## Comandos útiles dentro del contenedor

```bash
# Generar key de la aplicación (solo la primera vez)
php artisan key:generate

# Migrar la base de datos
php artisan migrate

# Instalar dependencias frontend (si agregas nuevos paquetes)
npm install && npm run build

# Ejecutar tests
php artisan test

# Ver cola de logs en tiempo real
php artisan pail

# Correr solo el servidor (sin colas ni vite)
php artisan serve --host=0.0.0.0 --port=8000
```

## Estructura del proyecto

```
├── application/          ← código fuente de Laravel
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── resources/
│   │   ├── js/pages/     ← componentes React (Inertia)
│   │   │   ├── Auth/Login.tsx
│   │   │   ├── Auth/Register.tsx
│   │   │   └── Dashboard.tsx
│   │   └── views/        ← blade principal
│   ├── routes/web.php    ← rutas de la aplicación
│   └── ...
├── docker/               ← config de nginx
├── Dockerfile            ← imagen PHP 8.3 + Node + Composer
├── docker-compose.yml    ← servicios (app, nginx, postgres, redis)
└── README.md
```

## Base de datos

Las credenciales por defecto (definidas en `docker-compose.yml`):

| Variable       | Valor      |
| -------------- | ---------- |
| DB_CONNECTION  | pgsql      |
| DB_HOST        | postgres   |
| DB_DATABASE    | laravel    |
| DB_USERNAME    | laravel    |
| DB_PASSWORD    | secret     |

Puedes cambiarlas editando `docker-compose.yml` y el `.env` de la aplicación.

## Variables de entorno

### Archivo `.env` (raíz del proyecto)

Define el UID/GID del usuario local (ajusta en macOS si es necesario):

```
# UID y GID de tu usuario local ( ejecuta `id -u` e `id -g` para verificarlos )
UID=1000
GID=1000
```

### Archivo `application/.env` (configuración de Laravel)

```
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
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
```
