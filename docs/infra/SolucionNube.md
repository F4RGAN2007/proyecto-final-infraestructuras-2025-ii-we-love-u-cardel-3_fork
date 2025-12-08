## Solución en la Nube

Esta sección sirve como plantilla para describir el despliegue de una arquitectura en la nube utilizando servicios gestionados del proveedor seleccionado (Azure/AWS/GCloud/Otro). Sustituir nombres, comandos y servicios según el entorno real del proyecto.

---

### Iniciar sesión en la plataforma

```bash
<comando-de-login>
````

---

### Crear un grupo de recursos o equivalente

```bash
<comando-crear-grupo> --name <nombre-grupo> --location <ubicacion>
```

---

### Crear un registro de contenedores

```bash
<comando-crear-registro> --name <nombre-registro> --resource-group <grupo> --sku <sku>
```

---

### Crear un clúster de Kubernetes gestionado

```bash
<comando-crear-cluster> \

```

Obtener credenciales:

```bash
<cli-kubernetes-get-credentials> \

```

Verificar nodos:

```bash
kubectl get nodes
```

---

### Autenticación en el registro desde Docker

```bash
<cli-registry-login>
```

---

### Construcción y subida de imágenes

Backend:

```bash
docker ...
```

Frontend:

```bash
docker build ....
```

Base de datos:

```bash
docker build ....
```

Verificación:

```bash
docker ....
```

---

### Estructura de manifiestos Kubernetes

```
Estrctura carpetas
```

---

### Crear secreto para autenticación en el registro

```bash
kubectl ....
```

---

### Aplicar los manifiestos

```bash
kubectl ...
```

Reiniciar pods para tomar nuevas imágenes:

```bash
kubectl ....
```

---

### Verificación final del despliegue

```bash
kubectl ...
```

---

## Análisis de calidad de código

Para el análisis estático del código se utilizó un sistema basado en herramientas automatizables dentro de un pipeline de integración continua.

Ejemplo de comando ejecutado:

```bash
....
```

Puede incluirse evidencia en forma de capturas o reportes generados por la herramienta.

---

## Análisis y Conclusiones

### Rendimiento

Comparar el rendimiento entre el entorno local y el despliegue en la nube, mencionando latencia, tiempos de respuesta, estabilidad y factores de infraestructura.

### Escalabilidad

Explicar cómo la arquitectura contenedorizada permite aumentar réplicas o distribuir carga según la demanda.

### Fiabilidad

Describir mecanismos de recuperación, independencia entre servicios, manejo de fallos y persistencia de datos.

### Costos

Anotar consideraciones generales sobre costos en la nube en comparación con la ejecución local.

### Optimización

Mencionar límites de recursos, ajustes de contenedores, configuraciones de balanceo y cualquier mecanismo de mejora de rendimiento.

### Seguridad

Describir el manejo de variables de entorno, protección de credenciales, uso de secretos y configuraciones mínimas recomendadas para un entorno productivo.
