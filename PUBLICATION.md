# Guide de Publication - CMFG-UniversShop

## Configuration Requise

Le projet utilise **Vite** et nécessite deux variables d'environnement **obligatoires** pour fonctionner:

### 1. `PORT` (Port du serveur)
- **Valeur**: Numéro du port (ex: 5173, 3000, 8080)
- **Utilisation**: Pour le serveur de développement et la preview
- **Exemple**: `PORT=5173`

### 2. `BASE_PATH` (Chemin de base de l'application)
- **Valeur**: Le chemin sur lequel votre app est déployée
- **Exemples**:
  - `BASE_PATH=/` → App à la racine du domaine
  - `BASE_PATH=/cmfg/` → App dans un sous-dossier
  - `BASE_PATH=https://cmfg-univershop.com/` → Domaine complet
- **Important**: Le chemin doit commencer ET finir par `/`

### 3. `NODE_ENV` (Optionnel)
- **Valeurs**: `development` ou `production`
- **Par défaut**: production (pour le build)

## Chemins des Images

✅ **Corrigé**: Les chemins des images ont été changés de `images/...` vers `/images/...` pour être compatibles avec le basePath configuré dans Vite.

Tous les fichiers images doivent être dans le dossier `/public/images/`.

## Commandes de Build

### Développement
```bash
export PORT=5173
export BASE_PATH=/
npm run dev
```

### Build pour Production
```bash
export PORT=5173
export BASE_PATH=/
export NODE_ENV=production
npm run build
```

Le résultat du build sera dans le dossier `dist/public/`.

### Preview du Build
```bash
export PORT=5173
export BASE_PATH=/
npm run serve
```

## Déploiement

1. **Générer le build**:
   ```bash
   BASE_PATH=/ npm run build
   ```

2. **Copier le dossier `dist/public/`** vers votre serveur

3. **Configurer votre serveur web** (Nginx, Apache, etc.) pour servir les fichiers statiques depuis ce dossier

## Vérification Pré-Publication

- ✅ Chemins d'images corrigés (`/images/...`)
- ✅ Variables d'environnement configurées
- ✅ Build sans erreurs
- ✅ Images présentes dans `/public/images/`
- ✅ Types TypeScript valides (`npm run typecheck`)

## Troubleshooting

### Erreur: "BASE_PATH environment variable is required"
→ Définissez la variable: `export BASE_PATH=/` (ou votre chemin)

### Images ne s'affichent pas après déploiement
→ Vérifiez que:
  1. Le dossier `/public/images/` a été copié sur le serveur
  2. Le `BASE_PATH` dans la variable d'env correspond au chemin réel de l'app
  3. Les permissions de fichier permettent l'accès en lecture
