# PokedexPersonas

Proyecto full-stack sencillo con Node.js (Express), PostgreSQL, y React (Vite) que permite:
- Registro e inicio de sesión con JWT.
- Formulario de perfil: nombre, edad, sexo, raza, orientación sexual, descripción.
- Listado de tarjetas con los datos de todas las personas registradas (incluyéndote).
- API REST con CRUD básico sobre usuarios.

## Requisitos
- Node.js 18+
- PostgreSQL 14+
- Windows PowerShell (v5.1) o similar

## Estructura
- `server/`: API REST (Express, JWT, PostgreSQL)
- `client/`: SPA (Vite + React)

## Configuración de base de datos (PostgreSQL)
1. Crea una base de datos (ajusta usuario y nombre):
```powershell
psql -U postgres -c "CREATE DATABASE pokedexpersonas;"
```
2. Copia `.env.example` a `.env` en `server/` y ajusta valores:
```
PORT=4000
DATABASE_URL=postgres://postgres:TU_PASSWORD@localhost:5432/pokedexpersonas
JWT_SECRET=cambia-este-secreto
CORS_ORIGIN=http://localhost:5173
```
3. Inicializa el esquema:
```powershell
cd "server"; npm run db:init
```

## Instalación
```powershell
# En el directorio raíz del proyecto
cd "server"; npm install; cd ..; cd "client"; npm install
```

## Ejecución en desarrollo
En dos terminales:
```powershell
# Terminal 1: API
cd "server"; npm run dev

# Terminal 2: Frontend
cd "client"; npm run dev
```
- API: `http://localhost:4000/api`
- Web: `http://localhost:5173`

## Flujo de uso
1. Abre la web, regístrate o inicia sesión.
2. Completa el formulario de perfil (o edítalo si ya existe).
3. Verás tu tarjeta y las de otras personas registradas.

## Endpoints principales
- `POST /api/auth/register` { username, password }
- `POST /api/auth/login` { username, password }
- `GET /api/auth/me` (JWT)
- `GET /api/users` (JWT) lista perfiles (sin contraseñas)
- `PUT /api/users/me` (JWT) actualiza tu perfil
- `DELETE /api/users/me` (JWT) elimina tu cuenta (opcional)

## Notas
- Este proyecto es educativo y mínimo. Mejora validaciones, seguridad y gestión de errores para uso en producción.
- Campos sensibles (sexo, raza, orientación) se tratan de forma opcional y respetuosa; compártelos sólo si lo deseas.