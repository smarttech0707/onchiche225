# Onchiche225 — version backend securisee

Site HTML/CSS/JS avec backend Node.js/Express :
- authentification admin cote serveur,
- session via cookie HTTP-only,
- gestion des produits via API protegee.

## Installation

```bash
npm install
```

## Configuration

1. Copiez `.env.example` vers `.env`
2. Modifiez au minimum :
   - `ADMIN_ID`
   - `ADMIN_PASSWORD`
   - `JWT_SECRET`
   - `ADMIN_PAGE_PATH` (ex: `/espace-admin-225`)
   - `ADMIN_PAGE_KEY` (cle secrete pour ouvrir l'URL admin)
   - `PROMO_ENABLED`, `PROMO_TITLE_FR`, `PROMO_TITLE_EN`, `PROMO_END_AT` (bandeau promo)

## Lancer en local

```bash
npm start
```

Puis ouvrez [http://localhost:3000](http://localhost:3000).
La page admin est accessible via votre chemin prive (`ADMIN_PAGE_PATH`) et, si `ADMIN_PAGE_KEY` est defini, avec la cle en query string:
`/votre-chemin-admin?k=votre-cle`.
Sans la bonne cle, la page renvoie `404`.

## Promo configurable

- `PROMO_ENABLED=true|false` active/desactive le bandeau promo.
- `PROMO_TITLE_FR` et `PROMO_TITLE_EN` definissent le texte de l'offre.
- `PROMO_END_AT` definit la fin du compte a rebours au format ISO (ex: `2026-12-31T23:59:59+00:00`).

## Donnees produits

- Source: `data/products.json`
- API publique lecture: `GET /api/products`
- API admin:
  - `POST /api/auth/login`
  - `POST /api/auth/logout`
  - `GET /api/auth/status`
  - `POST /api/products`
  - `DELETE /api/products/:id`

## Notes securite

- Le cookie d'auth est `httpOnly` (non accessible en JavaScript).
- En production, utilisez HTTPS et gardez `JWT_SECRET` fort et secret.
