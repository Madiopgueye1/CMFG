/* ================================================================
   📁  app.js — LOGIQUE JAVASCRIPT
   ================================================================
   ⚠️  NE PAS MODIFIER sauf si vous maîtrisez JavaScript.
       Toutes les données sont dans config.js

   CONTENU :
   1. CAT / BCSS / PAGES    → Constantes internes
   2. Navigation mobile
   3. Panier (cart)
   4. Galerie images produit
   5. Mode sombre
   6. Countdown promo
   7. Récemment vus
   8. Zoom image
   9. Partage produit
   10. Filtres avancés
   11. Skeleton loading
   12. Modal produit
   13. Catalogue
   14. Page accueil
   15. Commandes (WhatsApp / Email)
   16. Wishlist / Favoris
   17. Initialisation (DOMContentLoaded)
================================================================ */

/* ════════════════════════════════════════════════════════
   ⚙️  LOGIQUE DU SITE — ne pas modifier
════════════════════════════════════════════════════════ */
const CAT = {
  mode:"Mode & Vêtements", bijoux:"Bijoux & Accessoires",
  electronique:"Électronique", beaute:"Beauté & Soins",
  maison:"Maison & Décoration", sport:"Sport & Loisirs",
  Chaussure:"Chaussure", autres:"Autres", tous:"Tous les produits"
};
const BCSS = {new:"bg-new",promo:"bg-promo",top:"bg-top",rupture:"bg-rupture"};
const PAGES = ["pg-home","pg-cat","pg-about","pg-contact","pg-faq","pg-livraison"];

let cart=[], curCat="tous", curQ="", curP=null, mQty=1;
let wishlist=[], gImgs=[], gIdx=0;
const $ = id => document.getElementById(id);
const CART_KEY = "cmfg_cart_v1";
const WISH_KEY = "cmfg_wish_v1";

/* ── Mobile nav drawer ── */
function toggleMobileNav(){
  const nav=$("catnav"), ov=$("nav-ov");
  if(!nav) return;
  if(nav.classList.contains("mobile-open")) closeMobileNav();
  else { nav.classList.add("mobile-open"); ov.classList.add("show"); document.body.style.overflow="hidden"; }
}
function closeMobileNav(){
  const nav=$("catnav"), ov=$("nav-ov");
  if(nav) nav.classList.remove("mobile-open");
  if(ov)  ov.classList.remove("show");
  document.body.style.overflow="";
}

/* ── Navigation ── */
function showPg(id){
  PAGES.forEach(p=>{ const e=$(p); if(e) e.style.display = p===id?"block":"none"; });
  closeMobileNav();
  window.scrollTo({top:0,behavior:"smooth"});
}
function goHome()     { showPg("pg-home"); renderHome(); }
function goAbout()    { showPg("pg-about"); }
function goContact()  { showPg("pg-contact"); }
function goFAQ()      { showPg("pg-faq"); filterFAQ("tous"); }
function goLivraison(){ showPg("pg-livraison"); }
function filterCat(cat){
  curCat=cat; curQ="";
  const inp=$("s-input"); if(inp) inp.value="";
  showPg("pg-cat"); renderCat();
}

/* ── Back to top ── */
function scrollTop(){ window.scrollTo({top:0,behavior:"smooth"}); }
function doSearch(){
  const q=($("s-input")?.value||"").trim();
  const c=$("s-cat")?.value||"";
  curQ=q; curCat=c||"tous";
  if(q||c){ showPg("pg-cat"); renderCat(); } else goHome();
}

/* ── Rendu carte ── */
function mkCard(p){
  if(!p.active) return "";
  const img=p.img||`https://placehold.co/300x300?text=${encodeURIComponent(p.name)}`;
  const disc=p.badge==="promo"&&p.priceOld?`-${Math.round((1-p.price/p.priceOld)*100)}%`:
             {new:"Nouveau",top:"Bestseller",rupture:"Rupture"}[p.badge]||p.badge;
  const stockInfo = p.stock===0 ? `<div style="font-size:11px;color:var(--red);margin-bottom:5px;">⛔ Rupture de stock</div>` :
                    p.stock<=5  ? `<div style="font-size:11px;color:#b8860b;margin-bottom:5px;">⚠️ Plus que ${p.stock} en stock</div>` : "";
  return `<div class="pc" onclick="openModal(${p.id})">
    <div class="pc-img">
      <img src="${img}" alt="${p.name}" loading="lazy" onerror="this.src='https://placehold.co/300x300?text=Produit'">
      ${p.badge?`<span class="pc-badge ${BCSS[p.badge]||"bg-new"}">${disc}</span>`:""}
      <button class="wish-btn pc-wish${wishlist.includes(p.id)?' wishlisted':''}" onclick="event.stopPropagation();toggleWish(${p.id})" title="Ajouter aux favoris" id="wish-card-${p.id}"><i class="${wishlist.includes(p.id)?'fas':'far'} fa-heart"></i></button>
      <div class="pc-acts">
        <button class="pc-act" onclick="event.stopPropagation();quickWA(${p.id})" title="WhatsApp"><i class="fab fa-whatsapp"></i></button>
        <button class="pc-act" onclick="event.stopPropagation();addToCart(${p.id})" title="Panier"><i class="fas fa-cart-plus"></i></button>
      </div>
    </div>
    <div class="pc-info">
      <div class="pc-cat">${CAT[p.cat]||p.cat}</div>
      <div class="pc-name">${p.name}</div>
      <div class="pc-stars">⭐⭐⭐⭐⭐ <small>(${p.reviews||0} avis)</small></div>
      ${stockInfo}
      <div class="pc-foot">
        <div>${p.priceOld?`<div class="pc-old">${p.priceOld.toLocaleString()} FCFA</div>`:""}
          <div class="pc-price">${p.price.toLocaleString()} FCFA</div></div>
        <button class="btn-add" onclick="event.stopPropagation();addToCart(${p.id})"${p.stock===0?' disabled':''}>
          <i class="fas fa-plus"></i> Ajouter
        </button>
      </div>
    </div>
  </div>`;
}

/* ── Accueil ── */
function renderHome(){
  const feat=PRODUITS.filter(p=>p.active&&p.featured);
  const newA=PRODUITS.filter(p=>p.active&&p.newArr);
  const gf=$("grid-featured"); if(gf) gf.innerHTML=feat.length?feat.map(mkCard).join(""):`<p style="padding:20px;color:var(--muted);">Ajoutez <code>featured:true</code> dans le catalogue.</p>`;
  const gn=$("grid-new");       if(gn) gn.innerHTML=newA.length?newA.map(mkCard).join(""):`<p style="padding:20px;color:var(--muted);">Ajoutez <code>newArr:true</code> dans le catalogue.</p>`;
  setTimeout(animCards,120);
}

/* ── Catalogue ── */
function renderCat(){
  showSkeleton("grid-cat", 6);
  setTimeout(()=>{
  let list=PRODUITS.filter(p=>p.active);
  if(curCat!=="tous") list=list.filter(p=>p.cat===curCat);
  if(curQ){ const q=curQ.toLowerCase(); list=list.filter(p=>p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q)||(p.tags||[]).some(t=>t.toLowerCase().includes(q))); }
  list = list.filter(p=>p.price<=filterMaxPrice);
  if(filterStock==="in") list=list.filter(p=>p.stock>5);
  else if(filterStock==="low") list=list.filter(p=>p.stock>0&&p.stock<=5);
  if(filterBadge!=="all") list=list.filter(p=>p.badge===filterBadge);
  const s=$("sort-sel")?.value||"def";
  if(s==="pa") list.sort((a,b)=>a.price-b.price);
  else if(s==="pd") list.sort((a,b)=>b.price-a.price);
  else if(s==="new") list.sort((a,b)=>b.id-a.id);
  else if(s==="az") list.sort((a,b)=>a.name.localeCompare(b.name));
  const tEl=$("cat-title"); if(tEl) tEl.innerHTML=curQ?`Résultats pour "<em>${curQ}</em>"`:CAT[curCat]||curCat;
  const cEl=$("cat-count"); if(cEl) cEl.textContent=`${list.length} produit${list.length!==1?"s":""}`;
  const gr=$("grid-cat"), em=$("cat-empty");
  if(gr){ if(list.length){ gr.innerHTML=list.map(mkCard).join(""); if(em) em.style.display="none"; } else { gr.innerHTML=""; if(em) em.style.display="block"; } }
  const sb=$("sbar-cats");
  if(sb){ const all=[["tous","Tous les produits"],...Object.entries(CAT).filter(([k])=>k!=="tous")];
    sb.innerHTML=all.map(([v,l])=>`<div class="sbci${v===curCat?" act":""}" onclick="filterCat('${v}')">${l}<span class="sbci-n">${PRODUITS.filter(p=>p.active&&(v==="tous"||p.cat===v)).length}</span></div>`).join(""); }
  setTimeout(animCards,120);
  }, 300);
}

/* ── Wishlist ── */
function loadWish(){
  try{ const r=localStorage.getItem(WISH_KEY); if(r){ const a=JSON.parse(r); if(Array.isArray(a)) wishlist=a; } }catch(e){ wishlist=[]; }
}
function saveWish(){ try{ localStorage.setItem(WISH_KEY,JSON.stringify(wishlist)); }catch(e){} }
function updWishCount(){
  const el=$("wish-count");
  if(!el) return;
  if(wishlist.length){ el.textContent=wishlist.length; el.style.display="flex"; }
  else { el.style.display="none"; }
}
function toggleWish(id){
  const idx=wishlist.indexOf(id);
  if(idx>=0) wishlist.splice(idx,1);
  else wishlist.push(id);
  saveWish(); updWishCount();
  /* Update card button */
  const btn=$(`wish-card-${id}`);
  if(btn){ btn.classList.toggle("wishlisted",wishlist.includes(id)); btn.querySelector("i").className=wishlist.includes(id)?"fas fa-heart":"far fa-heart"; }
  /* Update modal button if open */
  if(curP&&curP.id===id) syncModalWishBtn();
  toast(wishlist.includes(id)?`❤️ "${PRODUITS.find(p=>p.id===id)?.name}" ajouté aux favoris !`:`🤍 Retiré des favoris`);
}
function syncModalWishBtn(){
  const btn=$("m-wish-btn"); if(!btn||!curP) return;
  const on=wishlist.includes(curP.id);
  btn.classList.toggle("wishlisted",on);
  btn.title=on?"Retirer des favoris":"Ajouter aux favoris";
}
function toggleWishModal(){ if(curP) toggleWish(curP.id); }
function openWishlist(){
  renderWishlist();
  $("wish-ov")?.classList.add("open");
  $("wish-pan")?.classList.add("open");
  document.body.style.overflow="hidden";
}
function closeWishlist(){
  $("wish-ov")?.classList.remove("open");
  $("wish-pan")?.classList.remove("open");
  document.body.style.overflow="";
}
function renderWishlist(){
  const body=$("wish-body"); if(!body) return;
  const items=PRODUITS.filter(p=>wishlist.includes(p.id));
  if(!items.length){
    body.innerHTML=`<div class="wish-empty"><i class="far fa-heart"></i><p>Vos favoris sont vides</p><small>Cliquez sur ❤️ pour sauvegarder des produits.</small></div>`;
    return;
  }
  body.innerHTML=items.map(p=>`
    <div class="ci" style="cursor:pointer;" onclick="closeWishlist();openModal(${p.id})">
      <img src="${p.img||'https://placehold.co/78x78'}" alt="${p.name}" onerror="this.src='https://placehold.co/78x78'">
      <div class="ci-inf">
        <div class="ci-name">${p.name}</div>
        <div class="ci-cat">${CAT[p.cat]||p.cat}</div>
        <div class="ci-row">
          <div class="ci-price">${p.price.toLocaleString()} FCFA</div>
          <div class="ci-ctrls">
            <button class="qbtn" style="background:var(--red);color:#fff;border-radius:var(--r);padding:6px 10px;font-size:11px;font-weight:700;" onclick="event.stopPropagation();addToCart(${p.id});"><i class="fas fa-cart-plus"></i> Panier</button>
            <button class="ci-del" onclick="event.stopPropagation();toggleWish(${p.id});renderWishlist();" title="Retirer"><i class="fas fa-heart-broken"></i></button>
          </div>
        </div>
      </div>
    </div>`).join("");
}

/* ════════════════════════════════════════════════════════
   🖼️ GALERIE / CAROUSEL IMAGES PRODUIT
════════════════════════════════════════════════════════ */
function setGalleryImg(idx){
  gIdx = Math.max(0, Math.min(idx, gImgs.length-1));
  const mi=$("m-img");
  if(mi){
    mi.style.opacity="0";
    setTimeout(()=>{ mi.src=gImgs[gIdx]; mi.style.opacity="1"; }, 200);
  }
  /* Compteur */
  const ctr=$("g-counter");
  if(ctr) ctr.textContent=`${gIdx+1} / ${gImgs.length}`;
  /* Thumbs actif */
  document.querySelectorAll(".pm-thumb").forEach((t,i)=>{
    t.classList.toggle("act", i===gIdx);
  });
  /* Flèches : masquer si une seule image */
  const single = gImgs.length<=1;
  const prev=$("g-prev"), next=$("g-next");
  if(prev) prev.style.display = single ? "none" : "flex";
  if(next) next.style.display = single ? "none" : "flex";
  if(ctr)  ctr.style.display  = single ? "none" : "block";
}
function galleryNav(d){
  if(!gImgs.length) return;
  setGalleryImg((gIdx + d + gImgs.length) % gImgs.length);
}
function buildThumbs(){
  const tb=$("m-thumbs"); if(!tb) return;
  if(gImgs.length<=1){ tb.innerHTML=""; tb.style.display="none"; return; }
  tb.style.display="flex";
  tb.innerHTML = gImgs.map((src,i)=>
    `<img src="${src}" class="pm-thumb${i===0?" act":""}" onclick="setGalleryImg(${i})"
          onerror="this.style.display='none'" alt="Vue ${i+1}" loading="lazy">`
  ).join("");
}

/* ════════════════════════════════════════════════════════
   🌙 MODE SOMBRE
════════════════════════════════════════════════════════ */
const DARK_KEY = "cmfg_dark_v1";
function toggleDark(){
  document.body.classList.toggle("dark");
  const on = document.body.classList.contains("dark");
  localStorage.setItem(DARK_KEY, on ? "1" : "0");
  const lbl=$("dark-lbl"), btn=$("dark-btn");
  if(lbl) lbl.textContent = on ? "Jour" : "Nuit";
  if(btn){ const ic=btn.querySelector("i"); if(ic) ic.className = on ? "fas fa-sun" : "fas fa-moon"; }
}
function loadDark(){
  const on = localStorage.getItem(DARK_KEY) === "1";
  if(on){ document.body.classList.add("dark");
    const lbl=$("dark-lbl"); if(lbl) lbl.textContent="Jour";
    const btn=$("dark-btn"); if(btn){ const ic=btn.querySelector("i"); if(ic) ic.className="fas fa-sun"; }
  }
}

/* ════════════════════════════════════════════════════════
   ⏰ COUNTDOWN PROMO
   Pour activer/désactiver : changer CFG.promoActive (true/false)
   Pour changer le texte   : changer CFG.promoText
   Pour changer le code    : changer CFG.promoCode
   Pour changer la durée   : changer CFG.promoDureeH
════════════════════════════════════════════════════════ */
function startCountdown(){
  const bar=$("countdown-bar"); if(!bar) return;
  /* Si promo désactivée dans CFG → on masque et on arrête */
  if(!PROMO.active){ bar.style.display="none"; return; }
  /* Injecter le texte et le code depuis PROMO */
  const txtEl=$("cd-text"); if(txtEl) txtEl.textContent=PROMO.texte||"🔥 Offre spéciale :";
  const codeEl=$("cd-code"); if(codeEl) codeEl.textContent=PROMO.code||"";
  const codeWrap=$("cd-code-wrap"); if(codeWrap) codeWrap.style.display=PROMO.code?"inline":"none";
  /* Timer */
  const KEY="cmfg_cd_end_v2";
  let end = parseInt(localStorage.getItem(KEY)||"0");
  const duree = (PROMO.dureeH||8)*3600*1000;
  if(!end || end < Date.now()){ end = Date.now() + duree; localStorage.setItem(KEY, end); }
  bar.style.display="flex";
  function tick(){
    const diff = end - Date.now();
    if(diff <= 0){ bar.style.display="none"; return; }
    const h=Math.floor(diff/3600000), m=Math.floor((diff%3600000)/60000), s=Math.floor((diff%60000)/1000);
    const f=n=>String(n).padStart(2,"0");
    const hE=$("cd-h"),mE=$("cd-m"),sE=$("cd-s");
    if(hE) hE.textContent=f(h); if(mE) mE.textContent=f(m); if(sE) sE.textContent=f(s);
  }
  tick(); setInterval(tick,1000);
}

/* ════════════════════════════════════════════════════════
   🕒 RÉCEMMENT VUS
════════════════════════════════════════════════════════ */
const RV_KEY = "cmfg_rv_v1";
let recentlyViewed = [];
function loadRV(){ try{ const r=localStorage.getItem(RV_KEY); if(r) recentlyViewed=JSON.parse(r)||[]; }catch(e){ recentlyViewed=[]; } }
function saveRV(){ try{ localStorage.setItem(RV_KEY,JSON.stringify(recentlyViewed)); }catch(e){} }
function addRV(id){
  recentlyViewed = recentlyViewed.filter(x=>x!==id);
  recentlyViewed.unshift(id);
  if(recentlyViewed.length > 8) recentlyViewed = recentlyViewed.slice(0,8);
  saveRV(); renderRV();
}
function clearRecentlyViewed(){ recentlyViewed=[]; saveRV(); renderRV(); }
function renderRV(){
  const sec=$("rv-section"), list=$("rv-list"); if(!sec||!list) return;
  const items=recentlyViewed.map(id=>PRODUITS.find(p=>p.id===id)).filter(Boolean);
  if(!items.length){ sec.style.display="none"; return; }
  sec.style.display="block";
  list.innerHTML=items.map(p=>`
    <div class="rv-item" onclick="openModal(${p.id})">
      <img src="${p.img||'https://placehold.co/140x140?text=Produit'}" alt="${p.name}" onerror="this.src='https://placehold.co/140x140'">
      <div class="rv-item-info">
        <div class="rv-item-name">${p.name}</div>
        <div class="rv-item-price">${p.price.toLocaleString()} FCFA</div>
      </div>
    </div>`).join("");
}

/* ════════════════════════════════════════════════════════
   🔍 ZOOM IMAGE
════════════════════════════════════════════════════════ */
function openZoom(){
  const src=$("m-img")?.src; if(!src) return;
  const ov=$("zoom-ov"), zi=$("zoom-img");
  if(ov&&zi){ zi.src=src; ov.classList.add("open"); document.body.style.overflow="hidden"; }
}
function closeZoom(){
  const ov=$("zoom-ov"); if(ov) ov.classList.remove("open");
  if(!$("pm-ov")?.classList.contains("open")) document.body.style.overflow="";
}

/* ════════════════════════════════════════════════════════
   📤 PARTAGE PRODUIT
════════════════════════════════════════════════════════ */
function shareWA(){
  if(!curP) return;
  const msg=`👀 Regarde ce produit !\n\n🛍️ *${curP.name}*\n💰 Prix : *${curP.price.toLocaleString("fr-FR")} FCFA*${curP.priceOld?`\n~~Ancien prix : ${curP.priceOld.toLocaleString("fr-FR")} FCFA~~`:""}\n\n📲 Pour commander, contacte CMFG-UniversShop :\nhttps://wa.me/${CFG.whatsapp}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`,"_blank");
}
function copyLink(){
  if(!curP) return;
  const txt=`🛍️ ${curP.name} — ${curP.price.toLocaleString("fr-FR")} FCFA\nCommandez sur CMFG-UniversShop :\nhttps://wa.me/${CFG.whatsapp}`;
  /* Méthode 1 : API Clipboard moderne */
  if(navigator.clipboard && window.isSecureContext){
    navigator.clipboard.writeText(txt).then(()=>toast("🔗 Lien copié !")).catch(()=>fallbackCopy(txt));
  } else {
    fallbackCopy(txt);
  }
}
function fallbackCopy(txt){
  /* Méthode 2 : textarea temporaire (fonctionne partout) */
  const ta=document.createElement("textarea");
  ta.value=txt; ta.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0;";
  document.body.appendChild(ta); ta.focus(); ta.select();
  try{ document.execCommand("copy"); toast("🔗 Lien copié dans le presse-papiers !"); }
  catch(e){ toast("📋 Texte prêt — faites Ctrl+C pour copier !"); }
  document.body.removeChild(ta);
}

/* ════════════════════════════════════════════════════════
   🔧 FILTRES AVANCÉS
════════════════════════════════════════════════════════ */
let filterMaxPrice=25000, filterStock="all", filterBadge="all";
function onPriceFilter(el){
  filterMaxPrice=parseInt(el.value);
  const pct=Math.round((filterMaxPrice-500)/(25000-500)*100);
  el.style.setProperty("--pct",pct+"%");
  $("price-val").textContent=filterMaxPrice.toLocaleString()+" FCFA";
  renderCat();
}
function onStockFilter(el){
  document.querySelectorAll("[data-stock]").forEach(b=>b.classList.remove("act"));
  el.classList.add("act"); filterStock=el.dataset.stock; renderCat();
}
function onBadgeFilter(el){
  document.querySelectorAll("[data-badge]").forEach(b=>b.classList.remove("act"));
  el.classList.add("act"); filterBadge=el.dataset.badge; renderCat();
}
function resetFilters(){
  filterMaxPrice=25000; filterStock="all"; filterBadge="all";
  const pr=$("price-max"); if(pr){ pr.value=25000; pr.style.setProperty("--pct","100%"); }
  const pv=$("price-val"); if(pv) pv.textContent="25 000 FCFA";
  document.querySelectorAll("[data-stock]").forEach(b=>b.classList.toggle("act",b.dataset.stock==="all"));
  document.querySelectorAll("[data-badge]").forEach(b=>b.classList.toggle("act",b.dataset.badge==="all"));
  renderCat();
}

/* ════════════════════════════════════════════════════════
   🦴 SKELETON LOADING
════════════════════════════════════════════════════════ */
function showSkeleton(containerId, count=6){
  const el=$(containerId); if(!el) return;
  el.innerHTML=Array(count).fill(`<div class="skl-card"><div class="skl-img"></div><div class="skl-line"></div><div class="skl-line short"></div><div class="skl-line xshort" style="margin-bottom:14px;"></div></div>`).join("");
}

/* ════════════════════════════════════════════════════════
   🔍 MODAL produit (+ recently viewed)
════════════════════════════════════════════════════════ */
function openModal(id){
  const p=PRODUITS.find(x=>x.id===id); if(!p) return;
  curP=p; mQty=1;
  addRV(id);
  /* ── Galerie ── */
  gImgs = (Array.isArray(p.imgs) && p.imgs.length) ? p.imgs : [p.img || `https://placehold.co/500x500/F5F5F7/999?text=${encodeURIComponent(p.name)}`];
  gIdx  = 0;
  const mi=$("m-img");
  if(mi){ mi.style.opacity="1"; mi.src=gImgs[0]; mi.alt=p.name; }
  buildThumbs();
  setGalleryImg(0);
  const set=(eid,v)=>{ const e=$(eid); if(e) e.innerHTML=v; };
  set("m-cat",`<i class="fas fa-tag"></i> ${CAT[p.cat]||p.cat}`);
  set("m-name",p.name);
  set("m-price",`${p.price.toLocaleString()} FCFA`);
  set("m-rev",`(${p.reviews||0} avis)`);
  set("m-qty","1");
  set("m-desc",p.desc);
  const mo=$("m-old"), md=$("m-disc");
  if(mo&&md){ if(p.priceOld){ mo.textContent=`${p.priceOld.toLocaleString()} FCFA`; md.textContent=`-${Math.round((1-p.price/p.priceOld)*100)}%`; md.style.display="block"; } else { mo.textContent=""; md.style.display="none"; } }
  const ms=$("m-stock");
  if(ms){ if(p.stock===0){ ms.textContent="⛔ Rupture de stock"; ms.className="pm-stock out"; } else if(p.stock<=5){ ms.textContent=`⚠️ Plus que ${p.stock} en stock`; ms.className="pm-stock low"; } else { ms.textContent=`✅ En stock (${p.stock} disponibles)`; ms.className="pm-stock ok"; } }
  const mt=$("m-tags"); if(mt) mt.innerHTML=(p.tags||[]).map(t=>`<span class="pm-tag">#${t}</span>`).join("");
  const ab=$("m-add-btn"); if(ab){ ab.disabled=p.stock===0; ab.style.opacity=p.stock===0?".45":"1"; }
  const ov=$("pm-ov"); if(ov) ov.classList.add("open");
  document.body.style.overflow="hidden";
  syncModalWishBtn();
}
function closeModal(){ const ov=$("pm-ov"); if(ov) ov.classList.remove("open"); document.body.style.overflow=""; }
function closeMOv(e){ if(e.target===$("pm-ov")) closeModal(); }
function mQtyChange(d){ const max=curP?curP.stock||99:99; mQty=Math.min(max,Math.max(1,mQty+d)); const e=$("m-qty"); if(e) e.textContent=mQty; }
function addFromModal(){ if(curP&&curP.stock!==0){ addToCart(curP.id,mQty); closeModal(); } }
function quickOrderWA(){ if(!curP) return; const msg=`Bonjour CMFG-UniversShop ! 👋\n\nJe voudrais commander :\n• *${curP.name}* × ${mQty}\n💰 ${(curP.price*mQty).toLocaleString()} FCFA\n\nMerci de confirmer disponibilité & livraison !`; window.open(`https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(msg)}`,"_blank"); }

/* ── Panier ── */
function addToCart(id,qty=1){
  const p=PRODUITS.find(x=>x.id===id); if(!p) return;
  if(p.stock===0){ toast("⛔ Ce produit est en rupture de stock !"); return; }
  const ex=cart.find(i=>i.id===id);
  if(ex) ex.qty=Math.min(ex.qty+qty,p.stock||99);
  else cart.push({id,name:p.name,img:p.img,price:p.price,cat:p.cat,qty});
  updCart(); toast(`🛍️ "${p.name}" ajouté au panier !`);
}
function rmCart(id){ cart=cart.filter(i=>i.id!==id); updCart(); renderCart(); }
function chQty(id,d){
  const item=cart.find(i=>i.id===id); const prod=PRODUITS.find(p=>p.id===id);
  if(!item) return; item.qty+=d;
  if(item.qty<=0) rmCart(id); else { if(prod) item.qty=Math.min(item.qty,prod.stock||99); updCart(); renderCart(); }
}
function updCart(){
  const n=cart.reduce((s,i)=>s+i.qty,0);
  const e=$("cart-count"); if(e) e.textContent=n;
  /* Persist to localStorage so panier survives page reloads */
  try{ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }catch(e){}
}
function loadCart(){
  try{
    const raw=localStorage.getItem(CART_KEY);
    if(raw){ const arr=JSON.parse(raw); if(Array.isArray(arr)) cart=arr; }
  }catch(e){ cart=[]; }
}
function openCart(){ renderCart(); $("cart-ov")?.classList.add("open"); $("cart-pan")?.classList.add("open"); document.body.style.overflow="hidden"; }
function closeCart(){ $("cart-ov")?.classList.remove("open"); $("cart-pan")?.classList.remove("open"); document.body.style.overflow=""; }
function renderCart(){
  const body=$("cart-body"), ftr=$("cart-ftr"); if(!body) return;
  if(!cart.length){ body.innerHTML=`<div class="cart-empty-msg"><i class="fas fa-shopping-cart"></i><p>Votre panier est vide</p><small>Explorez le catalogue et ajoutez des produits !</small></div>`; if(ftr) ftr.style.display="none"; return; }
  if(ftr) ftr.style.display="block";
  body.innerHTML=cart.map(it=>`<div class="ci"><img src="${it.img||"https://placehold.co/78x78"}" alt="${it.name}" onerror="this.src='https://placehold.co/78x78'"><div class="ci-inf"><div class="ci-name">${it.name}</div><div class="ci-cat">${CAT[it.cat]||it.cat}</div><div class="ci-row"><div class="ci-price">${(it.price*it.qty).toLocaleString()} FCFA</div><div class="ci-ctrls"><button class="qbtn" onclick="chQty(${it.id},-1)">−</button><span class="qval">${it.qty}</span><button class="qbtn" onclick="chQty(${it.id},1)">+</button><button class="ci-del" onclick="rmCart(${it.id})"><i class="fas fa-trash"></i></button></div></div></div></div>`).join("");
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const sub=$("c-sub"); if(sub) sub.textContent=`${total.toLocaleString()} FCFA`;
  const tot=$("c-tot"); if(tot) tot.textContent=`${total.toLocaleString()} FCFA`;
}

/* ── Commandes ── */
function buildMsg(){
  let m=`${CFG.waMsg}\n\n📋 *Commande :*\n\n`;
  cart.forEach(i=>{ m+=`• ${i.name} × ${i.qty} = ${(i.price*i.qty).toLocaleString()} FCFA\n`; });
  m+=`\n💰 *Total : ${cart.reduce((s,i)=>s+i.price*i.qty,0).toLocaleString()} FCFA*\n\n📍 Merci de confirmer disponibilité, livraison et paiement.`;
  return m;
}
function orderWA(){ if(!cart.length){ toast("⚠️ Votre panier est vide !"); openCart(); return; } window.open(`https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(buildMsg())}`,"_blank"); }
function orderEmail(){
  if(!cart.length){ toast("⚠️ Votre panier est vide !"); return; }
  let b=`Bonjour CMFG-UniversShop,\n\nJe souhaite commander :\n\n`;
  cart.forEach(i=>{ b+=`- ${i.name} × ${i.qty} = ${(i.price*i.qty).toLocaleString()} FCFA\n`; });
  b+=`\nTotal : ${cart.reduce((s,i)=>s+i.price*i.qty,0).toLocaleString()} FCFA\n\nMerci de confirmer livraison et paiement.\n\nCordialement,`;
  window.location.href=`mailto:${CFG.email}?subject=${encodeURIComponent("Commande CMFG-UniversShop")}&body=${encodeURIComponent(b)}`;
}
function quickWA(id){ const p=PRODUITS.find(x=>x.id===id); if(!p) return; window.open(`https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(`Bonjour CMFG-UniversShop ! 👋\n\nJe suis intéressé(e) par :\n• *${p.name}* — ${p.price.toLocaleString()} FCFA\n\nEst-ce disponible ? 🙏`)}`,"_blank"); }

/* ── FAQ ── */
function toggleFAQ(el){ const item=el.closest(".faq-item"); const open=item.classList.contains("open"); document.querySelectorAll(".faq-item.open").forEach(i=>i.classList.remove("open")); if(!open) item.classList.add("open"); }
function filterFAQ(cat){ document.querySelectorAll(".faq-cat-btn").forEach(b=>b.classList.toggle("act",b.dataset.cat===cat)); document.querySelectorAll(".faq-item").forEach(i=>{ i.style.display=(cat==="tous"||i.dataset.cat===cat)?"block":"none"; }); }

/* ── Contact ── */
function sendContact(){
  const nom=($("c-nom")?.value||"").trim(), email=($("c-email")?.value||"").trim(), tel=($("c-tel")?.value||"").trim(), sujet=($("c-sujet")?.value||"").trim(), message=($("c-message")?.value||"").trim();
  if(!nom||!message){ toast("⚠️ Merci de remplir votre nom et votre message !"); return; }
  const txt=`Bonjour CMFG-UniversShop ! 👋\n\n📋 *Message de contact*\n\n👤 *Nom :* ${nom}\n${email?`📧 *Email :* ${email}\n`:""}${tel?`📱 *Tél :* ${tel}\n`:""}${sujet?`📌 *Sujet :* ${sujet}\n`:""}\n💬 *Message :*\n${message}`;
  window.open(`https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(txt)}`,"_blank");
}

/* ── Newsletter ── */
function subscribeNL(){ const inp=$("nl-email"); if(!inp||!inp.value.includes("@")){ toast("⚠️ Entrez une adresse email valide !"); return; } toast("🎉 Merci ! Vous êtes abonné(e) aux nouveautés CMFG-UniversShop !"); inp.value=""; }

/* ── Toast ── */
function toast(msg){ const t=$("toast"),m=$("toast-msg"); if(!t||!m) return; m.textContent=msg; t.classList.add("show"); clearTimeout(t._t); t._t=setTimeout(()=>t.classList.remove("show"),3500); }

/* ── Animations ── */
const obs=new IntersectionObserver(e=>{ e.forEach(x=>{ if(x.isIntersecting){ x.target.style.opacity="1"; x.target.style.transform="translateY(0)"; } }); },{threshold:.05});
function animCards(){ document.querySelectorAll(".pc,.av-item,.cat-card,.feat,.soc-card,.val-item,.pay-method,.del-step").forEach(el=>{ if(!el.dataset.a){ el.style.opacity="0"; el.style.transform="translateY(20px)"; el.style.transition="opacity .4s ease,transform .4s ease"; el.dataset.a="1"; obs.observe(el); } }); }

/* ── Hero rotation ── */
const HIMGS=["images/CollJersey.png","images/ParfumHuile.png","images/Chouchou.png","images/ChaussuresNgaye.png"];
let hIdx=0;

/* ════════════════════════════════════════════════════════
   🚀  INITIALISATION — tout démarre ici
════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function() {
  /* 1. Charger le panier sauvegardé (localStorage) */
  loadCart();
  loadWish();
  updWishCount();
  loadDark();
  loadRV();
  renderRV();
  startCountdown();

  /* 2. Afficher uniquement l'accueil */
  PAGES.forEach(p=>{ const e=$(p); if(e) e.style.display=p==="pg-home"?"block":"none"; });

  /* 3. Remplir les grilles */
  renderHome();

  /* 4. Compteur panier */
  updCart();

  /* 5. Recherche clavier */
  const inp=$("s-input");
  if(inp) inp.addEventListener("keydown", e=>{ if(e.key==="Enter") doSearch(); });

  /* 6. Hero slideshow */
  const hImg=$("hero-img");
  if(hImg){
    hImg.style.transition="opacity .4s ease";
    setInterval(()=>{
      hIdx=(hIdx+1)%HIMGS.length;
      hImg.style.opacity="0";
      setTimeout(()=>{ hImg.src=HIMGS[hIdx]; hImg.style.opacity="1"; },420);
      document.querySelectorAll(".dot").forEach((d,i)=>d.classList.toggle("act",i===hIdx));
    },4500);
  }

  /* 7. Animations initiales */
  setTimeout(animCards,200);

  /* 8. Touche Échap : ferme modal, panier, menu mobile */
  document.addEventListener("keydown", e=>{
    if(e.key==="Escape"){
      const pmOv=$("pm-ov");
      if(pmOv && pmOv.classList.contains("open")) { closeModal(); return; }
      const zOv=$("zoom-ov");
      if(zOv && zOv.classList.contains("open")) { closeZoom(); return; }
      const ctOv=$("cart-ov");
      if(ctOv && ctOv.classList.contains("open")) { closeCart(); return; }
      const wOv=$("wish-ov");
      if(wOv && wOv.classList.contains("open")) { closeWishlist(); return; }
      const navEl=$("catnav");
      if(navEl && navEl.classList.contains("mobile-open")) { closeMobileNav(); return; }
    }
  });

  /* 9. Bouton "retour en haut" : visible après 400px de scroll */
  const btt=$("btt");
  if(btt){
    const onScroll=()=>{ btt.classList.toggle("show", window.scrollY>400); };
    window.addEventListener("scroll", onScroll, {passive:true});
    onScroll();
  }

  /* 10. Ferme le menu mobile en cas de redimensionnement vers desktop */
  let lastW=window.innerWidth;
  window.addEventListener("resize", ()=>{
    const w=window.innerWidth;
    if(w>768 && lastW<=768){ closeMobileNav(); }
    lastW=w;
  });

  /* 11. Swipe tactile pour galerie produit */
  let tsX=null;
  const gallMain=$("pm-ov");
  if(gallMain){
    gallMain.addEventListener("touchstart",e=>{ tsX=e.touches[0].clientX; },{passive:true});
    gallMain.addEventListener("touchend",e=>{
      if(tsX===null||gImgs.length<=1) return;
      const dx=e.changedTouches[0].clientX-tsX;
      if(Math.abs(dx)>45){ galleryNav(dx<0?1:-1); }
      tsX=null;
    },{passive:true});
  }
});