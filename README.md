# Angular – Spring Boot Project

Ce projet contient deux parties principales :
- **Backend** : Développé avec **Spring Boot** (responsabilité de Syaka)
- **Frontend** : Développé avec **Angular** (responsabilité de [Nom de ton ami])

---

## 📂 Structure du projet

```
angular-spring-project/
│
├── backend/                  # Projet Spring Boot (API REST)
│   ├── src/
│   ├── pom.xml
│   └── ...
│
├── frontend/                 # Projet Angular (Interface utilisateur)
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

## 🎯 Rôles de chacun

- **Syaka (moi)** → Développement du backend avec Spring Boot
- **[Nom de ton ami]** → Développement du frontend avec Angular

---

## 🚀 Lancer uniquement le frontend (pour [Nom de ton ami])

1. **Cloner le projet**
   ```bash
   git clone https://github.com/Fa-Syaka-diouf/Angular-spring-project.git
   cd Angular-spring-project
   ```

2. **Aller dans le dossier frontend**
   ```bash
   cd frontend
   ```

3. **Installer les dépendances**
   ```bash
   npm install
   ```

4. **Lancer le projet Angular**
   ```bash
   ng serve
   ```
   ➜ L’application sera accessible sur [http://localhost:4200](http://localhost:4200)

⚠️ Pas besoin de lancer le backend si tu ne développes que le frontend.

---

## 🔗 API Backend
Quand le backend sera prêt :
- Base URL de l’API : `http://localhost:8080/api`
- Exemple d’endpoint :
  - `GET /api/users` → Liste des utilisateurs
  - `POST /api/users` → Créer un utilisateur

Ton Angular devra consommer ces endpoints via les services Angular (`api.service.ts`).

---

## 🛠 Outils nécessaires

### Frontend
- [Node.js](https://nodejs.org/) (LTS recommandé)
- [Angular CLI](https://angular.io/cli)
  ```bash
  npm install -g @angular/cli
  ```
- Éditeur recommandé : VS Code

### Backend
- [Java 17+](https://adoptium.net/)
- [Maven](https://maven.apache.org/)
- Éditeur recommandé : IntelliJ IDEA

---

## 💡 Notes
- Ne pas modifier le backend (réservé à Syaka)
- Le développement frontend doit rester dans `frontend/`
- Respecter la structure du projet
