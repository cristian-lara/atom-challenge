# AtomChallenge

Aplicación fullstack de lista de tareas construida con Nx Monorepo, Angular 17, Express (TypeScript) y Firebase (Hosting + Cloud Functions + Firestore).

## Descripción

Este proyecto es un reto técnico fullstack que implementa:
- **Frontend:** Angular 17 (SPA, responsivo, buenas prácticas, arquitectura modular)
- **Backend:** Express + TypeScript, desplegado como Cloud Function
- **Base de datos:** Firestore
- **Monorepo:** Nx para gestión de apps y librerías compartidas
- **CI/CD:** GitHub Actions para despliegue automático


## Estructura del monorepo

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

## Requerimientos de versiones
- **Node.js:** >= 22.x  (usa `.nvmrc` o `.node-version` para forzar versión)
- **Angular:** 17.x
- **Nx:** última versión estable
- **pnpm:** recomendado para manejo de dependencias

## Scripts útiles

- `pnpm nx build frontend` — Build del frontend Angular
- `pnpm nx build backend` — Build del backend Express
- `firebase deploy` — Despliegue manual a Firebase
- `firebase emulators:start` — Prueba local con emuladores

## CI/CD
- Workflows de GitHub Actions para deploy automático de frontend y backend
- Uso de secretos seguros (`FIREBASE_TOKEN`, `FIREBASE_SERVICE_ACCOUNT`, `FIREBASE_PROJECT_ID`). [Aquí puedes ver cómo configurar los secretos en GitHub Actions.](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)

## Cómo empezar

1. Clona el repo y entra a la carpeta raíz
2. Instala dependencias:
   ```bash
   pnpm install
   ```
3. Selecciona la versión de Node recomendada:
   ```bash
   nvm use 22
   # o
   node --version # debe ser 22.x
   ```
4. Configura tus variables de entorno y secretos
5. Build y deploy manual:
   ```bash
   pnpm nx build frontend
   pnpm nx build backend
   firebase deploy
   ```

## Onboarding para desarrolladores

Para integrarse a este proyecto, no es necesario crear un nuevo proyecto en Firebase. Siga los siguientes pasos para configurar su entorno de desarrollo y conectarse al proyecto existente:

1. Clone este repositorio y acceda a la carpeta raíz.
2. Instale las dependencias del proyecto:
   ```bash
   pnpm install
   ```
3. Instale la CLI de Firebase si aún no la tiene instalada:
   ```bash
   npm install -g firebase-tools
   ```
4. Inicie sesión con una cuenta de Google que cuente con los permisos necesarios en el proyecto de Firebase:
   ```bash
   firebase login
   ```
5. El archivo `.firebaserc` ya está configurado para apuntar al proyecto correcto, por lo que no es necesario crear uno nuevo.
6. Si requiere realizar despliegues, asegúrese de contar con los secretos y permisos necesarios, o solicítelos a un administrador del proyecto.
7. Para desarrollo local, puede utilizar los emuladores de Firebase ejecutando:
   ```bash
   firebase emulators:start
   ```

