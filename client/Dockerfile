# ---------- FASE 1: Build ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package.json para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la aplicación con Vite
# Permitir definir VITE_API_URL durante el build
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build


# ---------- FASE 2: Servidor web ----------
FROM nginx:stable-alpine

# Copiar la build del front al servidor Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto donde Nginx sirve
EXPOSE 80

# Nginx inicia automáticamente
