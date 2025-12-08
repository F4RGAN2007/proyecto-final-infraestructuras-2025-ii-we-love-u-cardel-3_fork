FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias (incluye devDependencies)
RUN npm install

# Copiar el resto del backend
COPY . .

# Exponer el puerto de la API (coincidir con PORT=4000 pendejotes)
EXPOSE 4000

# Comando de inicio (producción)
CMD ["npm", "start"]
