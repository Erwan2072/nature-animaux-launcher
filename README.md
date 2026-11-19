
# 🐾 Nature & Animaux VDI — Launcher

### Écran de démarrage animé | R-One Vidéaste

![Version](https://img.shields.io/badge/Version-1.0.0-green)
![Application](https://img.shields.io/badge/Application-Nature_%26_Animaux_VDI-blue)
![Licence](https://img.shields.io/badge/Licence-Propri%C3%A9taire-red)
![Copyright](https://img.shields.io/badge/Copyright-R--One_Vid%C3%A9aste-black)

---

## 📖 Présentation

**Nature & Animaux Launcher** est un écran de démarrage animé développé par **R-One Vidéaste** pour l'application **Nature & Animaux VDI**.

Son objectif est d'améliorer l'expérience utilisateur lors du démarrage de l'application, notamment lorsque le serveur hébergé sur Render est en veille ou en cours de redémarrage.

Le launcher est hébergé indépendamment sur **GitHub Pages**, afin de pouvoir afficher une animation pendant que le serveur principal devient disponible.

### 🎯 Objectifs

- Afficher une animation cinématographique sur le thème des animaux.
- Vérifier automatiquement la disponibilité du serveur Render.
- Accéder directement à l'application lorsque le serveur est prêt.
- Éviter une attente artificielle lorsque le serveur est déjà actif.
- Proposer un affichage responsive sur ordinateur, tablette et smartphone.

---

## 🎬 Animation de démarrage

L'animation a été réalisée pour l'univers de **Nature & Animaux**.

| Caractéristique | Description |
|---|---|
| Durée | 20 secondes |
| Format | MP4 |
| Résolution | 1280 × 720 |
| Format original | 16:9 |
| Mobile | Recadrage centré en 9:16 |
| Lecture | Automatique, silencieuse et en boucle |
| Réalisation | R-One Vidéaste |

Une seule vidéo est utilisée pour tous les appareils.

L'adaptation responsive est assurée par CSS grâce à `object-fit: cover` et `object-position: center`.

---

## ⚙️ Fonctionnement

Lorsqu'un utilisateur ouvre le launcher :

1. Le navigateur charge la page depuis GitHub Pages.
2. Le launcher vérifie la disponibilité du serveur Render.
3. Si le serveur est disponible, l'utilisateur est redirigé vers l'application.
4. Si le serveur est indisponible, l'animation reste visible pendant son démarrage.
5. Dès que le serveur répond correctement, la redirection est automatique.

**Important :** le système de vérification nécessite un endpoint `/api/health` sur le serveur principal, ainsi qu'une configuration CORS adaptée.

---

## 🏗️ Architecture

```text
nature-animaux-launcher/
│
├── index.html
├── style.css
├── script.js
├── videos/
│   └── nature-animaux.mp4
├── LICENSE
└── README.md
```

### Technologies utilisées

- HTML5 — Structure de l'écran de lancement.
- CSS3 — Responsive et animation de chargement.
- JavaScript — Vérification de disponibilité et redirection.
- GitHub Pages — Hébergement statique.
- Render — Hébergement de l'application principale.

---

## 🌐 Accès

### Launcher

https://erwan2072.github.io/nature-animaux-launcher/

### Application principale

https://nature-animaux-vdi.onrender.com

Le launcher constitue un point d'entrée indépendant. Il ne remplace pas le serveur ni les fonctionnalités de l'application VDI.

---

## 🔐 Sécurité et confidentialité

Le launcher ne gère directement :

- Aucun compte utilisateur.
- Aucune facture.
- Aucun bon de commande.
- Aucune donnée client.
- Aucune donnée de paiement.

Les fonctionnalités métier restent hébergées dans l'application principale Nature & Animaux VDI.

Le contrôle de disponibilité du serveur doit utiliser un endpoint public ne divulguant aucune information sensible.

---

## 📋 État du développement

**Version du launcher : 1.0.0**

- [x] Création du dépôt GitHub.
- [x] Création de la structure HTML, CSS et JavaScript.
- [x] Intégration de la vidéo de démarrage.
- [x] Adaptation responsive prévue pour les mobiles.
- [ ] Activation et vérification de GitHub Pages.
- [ ] Configuration de l'endpoint `/api/health` sur Render.
- [ ] Tests de redirection et de réveil du serveur.
- [ ] Validation finale sur ordinateur et smartphone.

---

## ©️ Propriété intellectuelle

**© 2026 R-One Vidéaste — Tous droits réservés.**

Le code original, les animations, les vidéos et les créations graphiques de ce projet sont protégés par le droit d'auteur.

Toute reproduction, modification, redistribution ou exploitation non autorisée est interdite, sous réserve des exceptions légales et des droits des tiers.

La publication de ce dépôt sur GitHub ne constitue pas une autorisation générale de réutilisation.

Pour connaître les conditions applicables, consulter le fichier [LICENSE](./LICENSE).

**R-One Vidéaste se réserve le droit d'engager les démarches légales appropriées en cas d'utilisation non autorisée de ses créations protégées.**

---

## 🎥 Réalisation et développement

**R-One Vidéaste**

Création audiovisuelle, développement web et solutions numériques.

🌐 Site officiel : https://www.ronevideaste.fr

📧 Contact : rone.sonsvideos@gmail.com

---

*Nature & Animaux Launcher — Une réalisation R-One Vidéaste.*
