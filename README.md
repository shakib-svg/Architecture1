# SysInfo Cloud – DevOps, Docker & CI/CD

> *« La computation pourrait un jour devenir un service public, accessible comme le téléphone : des services connectés auxquels les utilisateurs se branchent librement. »*  
> — Inspiré de Stoica & Shenker (2021)

---

## 📌 Présentation du projet

**SysInfo Cloud** est une micro-application développée en **Node.js / TypeScript** permettant d’exposer des informations système via une API REST.  
Ce projet illustre l’ensemble d’une chaîne **DevOps moderne**, incluant :

- Développement local (Node.js)
- Conteneurisation Docker (multi-stage)
- Tests automatisés
- Intégration Continue (CI)
- Livraison Continue (CD)
- Déploiement Cloud (Microsoft Azure)

---

## ♾️ Pipeline DevOps

![DevOps Diagram](./devops.png)  
*Fig 1 — Continuous Integration / Continuous Delivery Workflow*

---

## ✅ Fonctionnalités de l’API

L’application expose une route :
GET /api/v1/sysinfo


Elle renvoie un objet JSON contenant :

- Informations CPU  
- Charge processeur  
- Mémoire disponible / utilisée  
- Informations système (OS, version)  
- Disques  
- Interfaces réseau  
- Processus actifs  

---

<img width="582" height="433" alt="image" src="https://github.com/user-attachments/assets/327a03a5-b4d4-488f-9ace-35885b9ca084" />

# I Want Typescript

📜 Template repository for a new Node.js TypeScript project linted using ESLint with Prettier

## Usage

Install development dependencies:

```
npm install
```

Lint, then format `src/*.ts` by making in-place fixes:

```
npm run lint && npm run format
# or:
npm run fix
```

Run unit test suites:

```
npm run test
```

View coverage of unit tests:

```
npm run test:coverage
```

Build `src/*.ts` files into `dist/*.js` files:

```
npm run build
```

Serve `dist/index.js` using `node` (for production):

```
npm run start
```

Monitor file changes and serve `src/index.ts` using `nodemon` with `ts-node` (for development):

```
npm run watch
```
