# 1Question_4Answers_Game

Un petit quiz interactif construit avec Vue 3 et Vite. Le principe : une question s'affiche avec 4 propositions, un chrono limite la réponse et un système de score / animation accompagne le déroulé.

Ce README fournit un aperçu du projet, comment l'exécuter localement, la structure des fichiers et quelques notes pour personnaliser le jeu.

## Fonctionnalités

- Questions à choix multiple (4 réponses)
- Chronomètre visuel (SVG) avec rebouclage entre questions
- Indication visuelle des réponses correctes / incorrectes
- Écran d'accueil, écran de quiz et écran de fin avec transitions animées

## Prérequis

- Node.js (v16+ recommandé)
- npm (ou pnpm/yarn si vous préférez)

## Installation

Ouvrez un terminal dans le dossier `Game` puis :

npm install

## Scripts utiles

- `npm run dev` — démarre le serveur de développement (Vite) avec hot-reload
- `npm run build` — construit l'application pour la production

## Structure du projet (principaux fichiers)

- `index.html` — point d'entrée ; contient la structure globale et la pseudo-élément CSS qui affiche le fond d'écran
- `src/App.vue` — conteneur principal, gère les écrans (accueil, quiz, fin), transitions et le footer
- `src/components/Question.vue` — affiche l'énoncé et l'image associée
- `src/components/Answer.vue` — composant de réponse 
- `src/components/Timer.vue` — chronomètre visuel en SVG
- `src/components/Score.vue` — affiche des informations de score
- `src/data/quiz.json` — contenu des questions / réponses (format JSON)

## Personnalisation rapide

- Modifier le fond d'écran : éditez `index.html` -> `#background::before { background: url("../public/images/background.webp") ... }`.
- Changer la durée du chrono : passez une valeur différente à la prop `:timeLimit` du composant `<timer />` dans `App.vue`(ligne 204).
- Ajouter ou modifier des questions : éditez `src/data/quiz.json` (structure : tableau d'objets question avec `answers` et `answerId`).

## Animations 

- Les transitions entre écrans utilisent des `<transition name="fade" mode="out-in">` avec des règles CSS définies dans `App.vue` (classe `.fade-*`).

## Développement

- Le projet est configuré avec Vite et ESLint. Utilisez un IDE (VS Code + Volar) pour profiter du typage et du linting Vue.
- Tests : ce dépôt ne contient pas de tests automatisés — vous pouvez ajouter Jest / Vitest selon vos préférences.

## Contribuer

- N'hésitez pas à ouvrir une PR, signaler un bug ou proposer une amélioration.

## Auteur

Alla-Eddine BOUKABOU — créateur du projet