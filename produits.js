/* ================================================================
   📁  produits.js — CATALOGUE PRODUITS
   ================================================================
   C'EST ICI QUE VOUS GÉREZ TOUS VOS PRODUITS.

   ✅ AJOUTER un produit   → copier un bloc { ... }, changer les valeurs
   ✅ MODIFIER un produit  → trouver son bloc et changer la valeur
   ✅ MASQUER un produit   → mettre  active: false
   ✅ SUPPRIMER un produit → effacer le bloc { ... } entier

   ┌─ CHAMPS OBLIGATOIRES ──────────────────────────────────────────
   │  id       → Numéro unique (jamais répété, toujours +1 du dernier)
   │  name     → "Nom affiché sur le site"
   │  cat      → Catégorie (voir liste ci-dessous)
   │  price    → Prix en FCFA (ex: 2500)
   │  desc     → "Description affichée dans la fiche produit"
   │  img      → "images/monfichier.png" ou URL https://...
   │  stock    → Quantité disponible  (0 = rupture de stock)
   │  active   → true = visible  |  false = caché sur le site
   │
   ├─ CATÉGORIES DISPONIBLES ───────────────────────────────────────
   │  "mode"         Mode & Vêtements
   │  "bijoux"       Bijoux & Accessoires
   │  "electronique" Électronique
   │  "beaute"       Beauté & Soins
   │  "maison"       Maison & Décoration
   │  "sport"        Sport & Loisirs
   │  "Chaussure"    Chaussures
   │  "autres"       Autres
   │
   ├─ CHAMPS OPTIONNELS ────────────────────────────────────────────
   │  priceOld → Ancien prix barré (null = pas de promo)
   │             Ex: priceOld:3000  → affiche "3 000 FCFA" barré
   │
   │  imgs     → Plusieurs photos pour le carousel de la fiche produit
   │             Ex: imgs:["images/p1.png","images/p2.png","images/p3.png"]
   │             Si omis → seule img est utilisée
   │
   │  badge    → Étiquette sur la carte produit :
   │             "new"   = NOUVEAU  (vert)
   │             "promo" = PROMO    (rouge)
   │             "top"   = BESTSELLER (doré)
   │             null    = aucune étiquette
   │
   │  reviews  → Nombre d'avis affiché (ex: 42)
   │  featured → true = affiché dans "Produits Phares" sur l'accueil
   │  newArr   → true = affiché dans "Nouvelles Arrivées" sur l'accueil
   │  tags     → ["mot1","mot2"] mots-clés pour la barre de recherche
   │
   └────────────────────────────────────────────────────────────────

   ══ EXEMPLE COMPLET ══════════════════════════════════════════════

   { id:99, name:"Mon Nouveau Produit", cat:"mode",
     price:3500, priceOld:5000,
     desc:"Description complète de mon produit.",
     img:"images/monproduit.png",
     imgs:["images/monproduit.png","images/monproduit-dos.png"],
     badge:"new", reviews:0, stock:10,
     featured:false, newArr:true, active:true,
     tags:["mode","wax","dakar"] },

   ═════════════════════════════════════════════════════════════════
================================================================ */

/* ════════════════════════════════════════════════════════
   📦  CATALOGUE PRODUITS
   ════════════════════════════════════════════════════════
   Pour AJOUTER un produit  → copier un bloc { ... } et changer les valeurs
   Pour MASQUER un produit  → mettre  active: false
   Pour SUPPRIMER           → effacer le bloc { ... } entier

   ┌─ CHAMPS OBLIGATOIRES ────────────────────────────────
   │  id       → Numéro unique (jamais répété, toujours +1)
   │  name     → "Nom du produit"
   │  cat      → "mode" | "bijoux" | "electronique" | "beaute"
   │             "maison" | "sport" | "Chaussure" | "autres"
   │  price    → Prix en FCFA (ex: 2500)
   │  desc     → "Description affichée dans la fiche produit"
   │  img      → Image principale  "images/monfichier.png"
   │  stock    → Quantité dispo (0 = rupture de stock)
   │  active   → true = visible  |  false = caché
   │
   ├─ CHAMPS OPTIONNELS ──────────────────────────────────
   │  priceOld → Ancien prix barré (null si pas de promo)
   │             ⚠️ Pour afficher "-30%", remplir priceOld
   │  imgs     → Tableau de plusieurs images pour le carousel
   │             Ex: ["images/p1.png","images/p2.png","images/p3.png"]
   │             Si omis → seule img est utilisée
   │  badge    → "new"     = badge NOUVEAU (vert)
   │             "promo"   = badge PROMO (rouge)
   │             "top"     = badge BESTSELLER (doré)
   │             null      = aucun badge
   │  reviews  → Nombre d'avis affiché (ex: 42)
   │  featured → true = affiché dans "Produits Phares" sur l'accueil
   │  newArr   → true = affiché dans "Nouvelles Arrivées"
   │  tags     → ["mot1","mot2"] mots-clés pour la recherche
   └──────────────────────────────────────────────────────

   EXEMPLE COMPLET :
   { id:99, name:"Mon Nouveau Produit", cat:"mode",
     price:3500, priceOld:5000,
     desc:"Description de mon produit.",
     img:"images/monproduit.png",
     imgs:["images/monproduit.png","images/monproduit2.png"],
     badge:"new", reviews:0, stock:10,
     featured:false, newArr:true, active:true,
     tags:["mode","wax","dakar"] },
════════════════════════════════════════════════════════ */
const PRODUITS = [

  /* ── BIJOUX & ACCESSOIRES ── */
  { id:1, name:"Foulards muslim🛍️", cat:"mode", price:1500, priceOld:2000,
    desc:"Foulard en tissu wax africain, idéal pour les femmes musulmanes. Grande taille 180×90 cm, parfait pour le hijab ou comme accessoire de mode. Fait main à Dakar.",
    img:"images/collFille.png", imgs:["images/collFille.png","images/Collpashmina.png","images/CollChoix.png"], badge:"promo", reviews:42, stock:25, featured:true, newArr:false, active:true,
    tags:["coll","foulard","pashima","mode"] },

  { id:2, name:"Foulards pashmina🛍️", cat:"mode", price:1500, priceOld:2000,
    desc:"Foulards pashmina en tissu wax africain, doux et légers. Taille 180×90 cm, parfaits pour le cou ou comme accessoire de mode. Fait main à Dakar.",
    img:"images/Collpashmina.png", imgs:["images/Collpashmina.png","images/collFille.png","images/CollChoix.png"], badge:"promo", reviews:27, stock:40, featured:false, newArr:false, active:true,
    tags:["coll","foulard","pashima","mode"] },

  { id:3, name:"Coll jersey avec casquette🧢🛍️", cat:"mode", price:1500, priceOld:2000,
    desc:"Ensemble collier et casquette en tissu jersey imprimé africain. Collier ras du cou avec pendentif assorti à la casquette snapback. Style urbain et tendance.",
    img:"images/CollJersey.png", imgs:["images/CollJersey.png","images/CollJerseyNonSimple.png","images/CollJerseyFriser.png"], badge:"promo", reviews:31, stock:8, featured:true, newArr:false, active:true,
    tags:["coll","casque","jersy","mode"] },

  { id:4, name:"Manche🛍️", cat:"mode", price:2000, priceOld:null,
    desc:"Manche en tissu wax africain, accessoire polyvalent pour bras ou jambe. Taille unique, élastique et confortable. Parfait pour ajouter une touche de style à n'importe quelle tenue.",
    img:"images/Manche.png", imgs:["images/Manche.png","images/cagoule.png"], badge:"new", reviews:14, stock:5, featured:true, newArr:true, active:true,
    tags:["manche","mode","coll","beaute"] },

  { id:5, name:"Bonet", cat:"mode", price:500, priceOld:null,
    desc:"Bonet en tissu wax africain, accessoire de mode polyvalent. Taille unique, élastique et confortable. Parfait pour ajouter une touche de style à n'importe quelle tenue.",
    img:"images/Bonet.png", imgs:["images/Bonet.png","images/cagoule.png","images/Manche.png"], badge:"new", reviews:11, stock:18, featured:false, newArr:true, active:true,
    tags:["bague","argent","touareg","massif"] },

  { id:6, name:"Coll jersey non simple🛍️", cat:"mode", price:18000, priceOld:25000,
    desc:"Collier en tissu jersey imprimé africain, design original avec motifs géométriques. Ras du cou ajustable, parfait pour un look urbain et moderne.",
    img:"images/CollJerseyNonSimple.png", imgs:["images/CollJerseyNonSimple.png","images/CollJersey.png","images/CollJerseyFriser.png"], badge:"top", reviews:58, stock:10, featured:false, newArr:false, active:true,
    tags:["mode","coll","foulard","jersiy"] },

  /* ── MODE & MAROQUINERIE ── */
  { id:7, name:"Cagoule 🛍️", cat:"mode", price:1500, priceOld:null,
    desc:"Cagoule en tissu wax africain, accessoire de mode polyvalent pour la tête et le cou. Taille unique, élastique et confortable. Parfait pour ajouter une touche de style à n'importe quelle tenue.",
    img:"images/cagoule.png", imgs:["images/cagoule.png","images/Bonet.png","images/Manche.png"], badge:"new", reviews:18, stock:12, featured:true, newArr:true, active:true,
    tags:["cagoule","foulard","mode","beaute"] },

  { id:8, name:"Coll choix🛍️", cat:"mode", price:1500, priceOld:null,
    desc:"Collier en tissu wax africain, design original avec motifs géométriques. Ras du cou ajustable, parfait pour un look urbain et moderne.",
    img:"images/CollChoix.png", imgs:["images/CollChoix.png","images/collFille.png","images/Collpashmina.png"], badge:"new", reviews:9, stock:20, featured:false, newArr:true, active:true,
    tags:["mode","foulard","coll","vetement"] },

  { id:9, name:"Coll jersey friser🛍️", cat:"mode", price:1500, priceOld:2000,
    desc:"Collier en tissu jersey frisé, design original avec motifs géométriques. Ras du cou ajustable, parfait pour un look urbain et moderne.",
    img:"images/CollJerseyFriser.png", imgs:["images/CollJerseyFriser.png","images/CollJersey.png","images/CollJerseyNonSimple.png"], badge:"promo", reviews:22, stock:15, featured:true, newArr:false, active:true,
    tags:["coll","jersey","friser","mode"] },

  { id:10, name:"Chouchou 🛍️", cat:"mode", price:500, priceOld:null,
    desc:"Chouchou en tissu wax africain, accessoire de mode polyvalent pour les cheveux. Taille unique, élastique et confortable. Parfait pour ajouter une touche de style à n'importe quelle coiffure.",
    img:"images/Chouchou.png", imgs:["images/Chouchou.png","images/Bonet.png"], badge:null, reviews:35, stock:30, featured:false, newArr:false, active:true,
    tags:["chouchou","wax","cheveux","mode"] },

  /* ── BEAUTÉ & SOINS ── */
  { id:11, name:"Parfum huile🛍️", cat:"beaute", price:1000, priceOld:1500,
    desc:"Parfum huile en flacon roll-on 10ml, formule légère et non grasse. Parfum inspiré des senteurs africaines, parfait pour une touche de fraîcheur toute la journée.",
    img:"images/ParfumHuile.png", imgs:["images/ParfumHuile.png","images/Chouchou.png"], badge:"top", reviews:64, stock:50, featured:true, newArr:false, active:true,
    tags:["huille","naturel","soin","peau","parfum","bio"] },

  { id:12, name:"Chaussures 👞 ngaye🛍️", cat:"mode", price:2500, priceOld:null,
    desc:"Chaussures traditionnelles sénégalaises en cuir, fabriquées à la main par des artisans locaux. Confortables et durables, parfaites pour un style authentique et élégant.",
    img:"images/ChaussuresNgaye.png", imgs:["images/ChaussuresNgaye.png","images/ChaussuresNgaye1.png"], badge:"new", reviews:29, stock:80, featured:false, newArr:true, active:true,
    tags:["chaussire","mode","ngay","naturel","senegal"] },

  { id:13, name:"Chaussures 👞 ngaye🛍️", cat:"mode", price:5500, priceOld:7000,
    desc:"Chaussures traditionnelles sénégalaises en cuir, fabriquées à la main par des artisans locaux. Confortables et durables, parfaites pour un style authentique et élégant.",
    img:"images/ChaussuresNgaye1.png", imgs:["images/ChaussuresNgaye1.png","images/ChaussuresNgaye.png"], badge:"promo", reviews:47, stock:35, featured:false, newArr:false, active:true,
    tags:["chaussire","mode","ngay","naturel","senegal"] },

  /* ── MAISON & DÉCORATION ── */
  { id:14, name:"Nappe Wax Festive", cat:"maison", price:12000, priceOld:15000,
    desc:"Nappe en tissu wax aux couleurs vives. 140×250 cm (8 personnes). Lavable à 30°C.",
    img:"images/CollJersey.png", badge:"promo", reviews:16, stock:20, featured:false, newArr:false, active:false,
    tags:["nappe","wax","décoration","maison"] },

  { id:15, name:"Coussin Déco Kente", cat:"maison", price:8000, priceOld:null,
    desc:"Housse de coussin 45×45 cm en tissu kente multicolore. Fermeture éclair dissimulée. Garnissage non inclus.",
    img:"images/Chouchou.png", badge:"new", reviews:8, stock:25, featured:false, newArr:true, active:false,
    tags:["coussin","kente","déco","maison"] },

  /* ── Chaussure ── */
  { id:16, name:"Bissap Séché Premium", cat:"Chaussure", price:3000, priceOld:null,
    desc:"Fleurs d'hibiscus séchées 100% naturelles. Idéal pour jus de bissap, infusions et cocktails. Sachet 250g.",
    img:"images/ParfumHuile.png", badge:"top", reviews:53, stock:60, featured:false, newArr:false, active:false,
    tags:["bissap","hibiscus","jus","naturel","sénégal"] },

  { id:17, name:"Thiébou Yapp Épices Mix", cat:"Chaussure", price:2000, priceOld:null,
    desc:"Mélange d'épices traditionnel pour thiébou yapp. Recette sénégalaise authentique. Sachet 100g. Sans glutamate.",
    img:"images/Collpashmina.png", badge:null, reviews:38, stock:100, featured:false, newArr:false, active:false,
    tags:["épices","thiébou","cuisine","sénégalais"] },

  /* ── SPORT & LOISIRS ── */
  { id:18, name:"Maillot Lion de la Teranga", cat:"sport", price:15000, priceOld:20000,
    desc:"Maillot de football style équipe nationale du Sénégal. Tissu respirant DryFit. Motif wax. Tailles S à XXL.",
    img:"images/collFille.png", badge:"promo", reviews:41, stock:30, featured:false, newArr:false, active:false,
    tags:["maillot","football","sénégal","sport","teranga"] }

  /* ────────────────────────────────────────────────────
     ➕  AJOUTEZ UN NOUVEAU PRODUIT :
     Copiez un bloc ci-dessus, collez-le ici avec une
     virgule avant le { , changez l'id et les valeurs.
  ──────────────────────────────────────────────────── */

]; /* ← NE PAS SUPPRIMER */
