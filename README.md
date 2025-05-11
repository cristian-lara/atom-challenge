# AtomChallenge

Aplicación fullstack de lista de tareas construida con Nx Monorepo, Angular 17, Express (TypeScript) y Firebase (Hosting + Cloud Functions + Firestore).

## Descripción

Este proyecto es un reto técnico fullstack que implementa:
- **Frontend:** Angular 17 (SPA, responsivo, buenas prácticas, arquitectura modular)
- **Backend:** Express + TypeScript, desplegado como Cloud Function
- **Base de datos:** Firestore
- **Monorepo:** Nx para gestión de apps y librerías compartidas
- **CI/CD:** GitHub Actions para despliegue automático

## Requerimientos

### Versiones
- **Node.js:** >= 22.x  (usa `.nvmrc` o `.node-version` para forzar versión)
- **Angular:** 17.x
- **Nx:** última versión estable
- **pnpm:** recomendado para manejo de dependencias

### Herramientas
- **Firebase CLI:** Necesaria para desarrollo local y despliegue
  ```bash
  npm install -g firebase-tools
  ```

## Estructura del Proyecto

```
atom-challenge/
├── apps/
│   ├── frontend/   # Angular 17
│   └── backend/    # Express + TypeScript
├── libs/
│   └── shared/     # Modelos e interfaces comunes
├── dist/
├── .github/workflows/ # Workflows de CI/CD
├── firebase.json
├── .firebaserc
├── pnpm-workspace.yaml
├── package.json
└── ...
```

## Desarrollo Local

### Configuración Inicial

1. Clona el repositorio y accede a la carpeta raíz
2. Instala las dependencias:
   ```bash
   pnpm install
   ```
3. Selecciona la versión correcta de Node:
   ```bash
   nvm use 22
   # o
   node --version # debe ser 22.x
   ```
4. Inicia sesión en Firebase (si aún no lo has hecho):
   ```bash
   firebase login
   ```

### Ejecución del Proyecto

1. Inicia el frontend en modo desarrollo:
   ```bash
   pnpm nx serve frontend
   ```
   El servidor de desarrollo de Angular estará disponible en `http://localhost:4200`

2. En una nueva terminal, inicia los emuladores de Firebase:
   ```bash
   firebase emulators:start
   ```
   Esto iniciará:
   - Emulador de Functions en `http://localhost:5001`
   - Emulador de Firestore en `http://localhost:8080`
   - Emulador de Hosting en `http://localhost:5000`
   - UI de Emuladores en `http://localhost:4000`

### Monitoreo y Logs

- Accede a la UI de Emuladores en `http://localhost:4000`
- Navega a la sección "Logs" para ver los logs de Functions y Firestore
- Los logs también aparecerán en la consola donde ejecutaste `firebase emulators:start`

### Detener los Servicios

- Frontend: `Ctrl+C` en la terminal donde corre `nx serve`
- Emuladores: `Ctrl+C` en la terminal de emuladores o `firebase emulators:stop`

## Scripts Útiles

- `pnpm nx build frontend` — Build del frontend Angular
- `pnpm nx build backend` — Build del backend Express
- `firebase deploy` — Despliegue manual a Firebase
- `firebase emulators:start` — Prueba local con emuladores

## Despliegue

### Manual
1. Build de las aplicaciones:
   ```bash
   pnpm nx build frontend
   pnpm nx build backend
   ```
2. Despliegue a Firebase:
   ```bash
   firebase deploy
   ```

### Automático (CI/CD)
- El proyecto usa GitHub Actions para despliegue automático
- Se utilizan secretos seguros para la configuración:
  - `FIREBASE_TOKEN`
  - `FIREBASE_SERVICE_ACCOUNT`
  - `FIREBASE_PROJECT_ID`
- [Guía para configurar secretos en GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)

## Notas para Desarrolladores

- El archivo `.firebaserc` ya está configurado para el proyecto correcto
- Para realizar despliegues, se requieren los secretos y permisos necesarios
- Solicita acceso a un administrador del proyecto si no tienes los permisos necesarios
- Los emuladores de Firebase son suficientes para desarrollo local

