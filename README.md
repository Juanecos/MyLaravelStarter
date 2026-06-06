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
- Visual Studio Code con extensión **Dev Containers** (ms-vscode-remote.remote-containers)

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

Los archivos dentro del contenedor pertenecen al usuario `root`, por lo que no se pueden editar directamente desde el host.  
Para editar:

1. Abre el proyecto en **VS Code**
2. Presiona `F1` → **"Dev Containers: Reopen in Container"**
3. Una vez dentro del contenedor puedes editar, instalar paquetes y ejecutar comandos libremente

Alternativamente, puedes editar los archivos desde la terminal dentro del contenedor con `nano` o `vim`.

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
