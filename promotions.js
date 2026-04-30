/* ================================================================
   📁  promotions.js — PROMOTIONS & CODES
   ================================================================
   Modifiez ce fichier pour :
     • Activer / désactiver la bannière promo
     • Changer le code promo affiché
     • Changer la durée du compte à rebours
     • Ajouter des offres spéciales

   ⚠️  Le countdown se remet à zéro automatiquement
       à chaque fois que le timer expire.
================================================================ */

const PROMO = {

  /* ── Bannière countdown ─────────────────────────────────────────
     active  → true  = afficher la bannière en haut du site
               false = masquer complètement (1 seule ligne à changer !)
     texte   → Message affiché avant le timer
     code    → Code promo affiché (mettre "" pour ne pas afficher)
     dureeH  → Durée du compte à rebours en heures
  ─────────────────────────────────────────────────────────────── */
  active  : true,
  texte   : "🔥 Offre spéciale Tabaski — Se termine dans :",
  code    : "CMFG10",
  dureeH  : 8,

  /* ── Offres spéciales sur les produits ─────────────────────────
     Ces étiquettes s'affichent sur les cartes produit.
     Pour appliquer une offre à un produit, dans produits.js :
       badge:"promo"  → affiche le badge PROMO rouge
       priceOld:3000  → affiche l'ancien prix barré + calcul de réduction
  ─────────────────────────────────────────────────────────────── */
  // (Géré directement dans produits.js pour chaque produit)

};
