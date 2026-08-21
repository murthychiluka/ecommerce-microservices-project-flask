
/* Advanced UI — style.css (shared across categories) */
/* variables */
:root{
  --bg:#0f1724;
  --glass: rgba(255,255,255,0.06);
  --card: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  --muted: #9aa6b2;
  --accent: #4aa3ff;
  --accent-2: #00d4ff;
  --radius: 14px;
  --container: 1180px;
  --shadow: 0 10px 30px rgba(2,8,23,0.6);
  --glass-border: rgba(255,255,255,0.04);
  color-scheme: dark;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

/* light theme override */
body[data-theme="light"]{
  --bg:linear-gradient(180deg,#eef2ff,#f7fafc);
  --glass: rgba(255,255,255,0.8);
  --card: linear-gradient(180deg,#ffffff,#f8fbff);
  --muted: #6b7280;
  --accent: #0f6fff;
  --accent-2: #00bcd4;
  --shadow: 0 12px 32px rgba(15,111,255,0.06);
  color-scheme: light;
}

*{box-sizing:border-box}
html,body{height:100%;margin:0;background:var(--bg);color:var(--muted);-webkit-font-smoothing:antialiased}
.container{max-width:var(--container);margin:0 auto;padding:20px}

/* preloader */
.preloader{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(180deg,rgba(0,0,0,0.6),transparent);z-index:9999}
.loader{display:flex;flex-direction:column;align-items:center;gap:8px;color:white}
.spin{width:72px;height:72px;stroke:var(--accent-2);fill:none}
.spin circle{stroke-width:8;stroke-linecap:round;stroke-dasharray:188;stroke-dashoffset:60;animation:spin 1.6s linear infinite}
@keyframes spin{to{stroke-dashoffset:0}}

/* header */
.site-header{position:sticky;top:12px;z-index:50;padding:0 10px}
.nav-inner{display:flex;align-items:center;gap:16px;padding:10px;background:var(--glass);border-radius:14px;border:1px solid var(--glass-border);box-shadow:var(--shadow);backdrop-filter: blur(8px)}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:inherit}
.logo{width:44px;height:44px;border-radius:10px;background:linear-gradient(135deg,var(--accent),var(--accent-2));display:flex;align-items:center;justify-content:center;color:white;font-weight:700}
.brand-text{font-weight:700;font-size:16px;color:var(--muted)}
.main-nav ul{list-style:none;margin:0;padding:0;display:flex;gap:12px}
.main-nav a{color:var(--muted);text-decoration:none;padding:8px 10px;border-radius:8px;transition:all .18s}
.main-nav a.active, .main-nav a:hover{color:var(--accent);background:rgba(255,255,255,0.02)}

/* nav actions */
.nav-actions{margin-left:auto;display:flex;gap:8px;align-items:center}
.icon-btn{background:transparent;border:0;padding:8px;border-radius:10px;color:var(--muted);cursor:pointer}
.search-wrap{position:relative}
#search{padding:8px 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.03);min-width:200px;background:transparent;color:var(--muted)}
#clearSearch{position:absolute;right:2px;top:2px;opacity:.6}

/* parallax layers */
.parallax{position:fixed;inset:0;pointer-events:none;z-index:-1}
.p-layer{position:absolute;border-radius:50%;filter:blur(40px);opacity:0.12}
.layer-1{width:520px;height:520px;left:-8%;top:-6%;background:linear-gradient(135deg,#1e3a8a,#06b6d4)}
.layer-2{width:420px;height:420px;right:-6%;top:-10%;background:linear-gradient(135deg,#4b5563,#60a5fa)}
.layer-3{width:260px;height:260px;right:12%;bottom:-6%;background:linear-gradient(135deg,#7c3aed,#06b6d4)}

/* main hero */
.hero{display:grid;grid-template-columns:1fr 420px;gap:22px;align-items:center;margin:28px 0}
.hero-left h1{font-size:34px;margin:0;color:var(--muted)}
.lead{color:var(--muted);margin-top:8px}
.hero-cta{margin-top:16px;display:flex;gap:10px}
.btn{padding:10px 16px;border-radius:12px;border:0;cursor:pointer}
.btn.primary{background:linear-gradient(90deg,var(--accent),var(--accent-2));color:white;box-shadow:0 8px 20px rgba(0,0,0,0.12)}
.btn.ghost{background:transparent;border:1px solid rgba(255,255,255,0.04);color:var(--muted)}
.hero-right .hero-card{background:var(--card);border-radius:16px;padding:12px;box-shadow:var(--shadow);display:flex;gap:12px;align-items:center}
.hero-card img{width:180px;height:120px;object-fit:cover;border-radius:12px}
.hero-info{display:flex;flex-direction:column;gap:6px}
.hero-info #hero-name{font-weight:800;color:var(--muted)}
.hero-info #hero-price{font-weight:800;color:var(--accent)}

/* controls */
.controls{display:flex;justify-content:space-between;align-items:center;padding:12px 0}
.controls-left label{margin-right:12px;color:var(--muted)}
.controls-right{display:flex;align-items:center;gap:12px}

/* grid */
.catalog{margin-top:12px}
.grid-view{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
@media(max-width:1040px){.grid-view{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.grid-view{grid-template-columns:1fr}}
.card{
  background:var(--card);border-radius:14px;padding:12px;box-shadow:var(--shadow);overflow:hidden;display:flex;flex-direction:column;gap:10px;transition:transform .28s,box-shadow .28s;
  border:1px solid rgba(255,255,255,0.02);
}
.card:hover{transform:translateY(-8px) scale(1.01);box-shadow:0 18px 40px rgba(2,8,23,0.5)}
.thumb{height:180px;border-radius:10px;overflow:hidden;display:flex;align-items:center;justify-content:center;background:linear-gradient(180deg,rgba(0,0,0,0.03),transparent)}
.thumb img{max-width:100%;max-height:100%;object-fit:contain;transition:transform .6s}
.card:hover .thumb img{transform:scale(1.06)}
.meta{display:flex;justify-content:space-between;align-items:center}
.title{font-weight:700;color:var(--muted)}
.price{font-weight:800;color:var(--accent)}

/* carousel */
.carousel-view{display:none}
.carousel-view .swiper{padding:20px 0}
.swiper-slide{display:flex;justify-content:center}
.swiper-card{width:320px}

/* modal */
.modal-backdrop{position:fixed;inset:0;background:rgba(2,6,23,0.6);display:none;align-items:center;justify-content:center;z-index:90}
.modal-card{width:min(860px,96%);background:var(--card);padding:18px;border-radius:12px;box-shadow:var(--shadow)}
.modal-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.modal-media img{width:100%;border-radius:8px}
.close{background:transparent;border:0;font-size:20px;color:var(--muted);cursor:pointer}

/* cart sidebar */
.cart{position:fixed;right:20px;top:84px;width:360px;max-width:94vw;background:var(--card);box-shadow:var(--shadow);padding:16px;border-radius:12px;transform:translateX(120%);transition:transform .36s;z-index:85}
.cart.open{transform:translateX(0)}
.cart-header{display:flex;justify-content:space-between;align-items:center}
.cart-list{max-height:48vh;overflow:auto;margin-top:12px}
.cart-item{display:flex;gap:12px;align-items:center;padding:12px 0;border-bottom:1px dashed rgba(255,255,255,0.03)}
.cart-item img{width:64px;height:64px;object-fit:cover;border-radius:8px}
.cart-footer{margin-top:12px}

/* footer */
.site-footer{margin-top:40px;padding:20px 0;color:var(--muted)}

.muted{color:var(--muted)}
.price{color:var(--accent);font-weight:800}

/* reveal helper */
.reveal{opacity:0;transform:translateY(18px);transition:all .6s ease}

/* small util */
.small{padding:6px 10px;font-size:14px}
.icon{width:20px;height:20px}

/* responsive tweaks */
@media(max-width:980px){
  .hero{grid-template-columns:1fr}
  .hero-right{order:-1}
  .nav-inner{padding:12px}
}
