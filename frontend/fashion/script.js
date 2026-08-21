/* Shared product page interactions with DB-backed cart */
const catalog = {
  fashion: [
    { id: 'f1', name: 'PS England Shoes', price: 3129, img: '', rating: 4.2, desc: 'Smart lace-up shoes for everyday styling.' },
    { id: 'f2', name: 'PS England Jacket', price: 1448, img: '', rating: 4.0, desc: 'Lightweight jacket with a clean urban fit.' },
    { id: 'f3', name: 'PS England Shirt', price: 2288, img: '', rating: 4.6, desc: 'Classic shirt for office and casual wear.' },
    { id: 'f4', name: 'PS England T-Shirt', price: 859, img: '', rating: 4.7, desc: 'Soft cotton t-shirt with a relaxed silhouette.' },
    { id: 'f5', name: 'PS England Bag', price: 779, img: '', rating: 4.1, desc: 'Compact fashion bag for daily carry.' },
    { id: 'f6', name: 'PS England Sunglass', price: 524, img: '', rating: 4.5, desc: 'UV-protected sunglasses with a sleek frame.' },
    { id: 'f7', name: 'PS England Casual Sneakers', price: 3668, img: '', rating: 4.8, desc: 'Streetwear sneakers with cushioned comfort.' },
    { id: 'f8', name: 'PS England Denim Shirt', price: 2559, img: '', rating: 4.4, desc: 'Denim shirt with a modern layered look.' },
    { id: 'f9', name: 'PS England Travel Backpack', price: 1999, img: '', rating: 4.3, desc: 'Roomy backpack with polished fashion details.' },
    { id: 'f10', name: 'PS England Watch', price: 2999, img: '', rating: 4.5, desc: 'Minimal wristwatch for everyday outfits.' },
    { id: 'f11', name: 'PS England Hoodie', price: 1899, img: '', rating: 4.4, desc: 'Soft pullover hoodie for cool evenings.' },
    { id: 'f12', name: 'PS England Chinos', price: 2199, img: '', rating: 4.2, desc: 'Slim-fit chinos for work and casual wear.' },
    { id: 'f13', name: 'PS England Leather Belt', price: 699, img: '', rating: 4.1, desc: 'Classic belt with a polished buckle.' },
    { id: 'f14', name: 'PS England Wallet', price: 899, img: '', rating: 4.3, desc: 'Compact wallet with clean stitch detailing.' },
    { id: 'f15', name: 'PS England Kurti Set', price: 2499, img: '', rating: 4.6, desc: 'Printed kurti set with soft festive fabric.' },
    { id: 'f16', name: 'PS England Handbag', price: 1799, img: '', rating: 4.5, desc: 'Structured handbag for daily styling.' },
    { id: 'f17', name: 'PS England Scarf', price: 599, img: '', rating: 4.0, desc: 'Lightweight scarf with a refined pattern.' },
    { id: 'f18', name: 'PS England Sports Shoes', price: 3299, img: '', rating: 4.7, desc: 'Cushioned sports shoes for active days.' },
    { id: 'f19', name: 'PS England Formal Blazer', price: 4999, img: '', rating: 4.6, desc: 'Tailored blazer for meetings and events.' },
    { id: 'f20', name: 'PS England Maxi Dress', price: 2799, img: '', rating: 4.5, desc: 'Flowing dress with a comfortable fit.' },
    { id: 'f21', name: 'PS England Cap', price: 499, img: '', rating: 4.1, desc: 'Adjustable cap for casual outdoor looks.' },
    { id: 'f22', name: 'PS England Sandals', price: 1299, img: '', rating: 4.2, desc: 'Comfort sandals for everyday wear.' }
  ]
};

function buildCatalogImage(categoryKey, name, index) {
  const itemName = String(name || '').trim();
  const itemKey = itemName.toLowerCase();
  let searchTerms = `${itemName},product`;

  if (categoryKey === 'phones') {
    if (itemKey.includes('fold')) searchTerms = `${itemName},foldable,smartphone`;
    else if (itemKey.includes('watch')) searchTerms = `${itemName},smartwatch,wearable`;
    else searchTerms = `${itemName},smartphone,mobile,phone`;
  } else if (categoryKey === 'earphones') {
    if (itemKey.includes('neckband')) searchTerms = `${itemName},neckband,earphones`;
    else if (itemKey.includes('sport') || itemKey.includes('fit')) searchTerms = `${itemName},sport,earbuds`;
    else searchTerms = `${itemName},earphones,earbuds,headphones`;
  } else if (categoryKey === 'computers') {
    if (itemKey.includes('chromebox') || itemKey.includes('mini pc') || itemKey.includes('tower')) searchTerms = `${itemName},desktop,computer`;
    else if (itemKey.includes('slate') || itemKey.includes('classboard')) searchTerms = `${itemName},tablet,computer`;
    else searchTerms = `${itemName},computer,laptop,desktop`;
  } else if (categoryKey === 'electronics') {
    if (itemKey.includes('cam')) searchTerms = `${itemName},security,camera`;
    else if (itemKey.includes('router') || itemKey.includes('mesh')) searchTerms = `${itemName},wifi,router`;
    else if (itemKey.includes('doorbell')) searchTerms = `${itemName},smart,doorbell`;
    else if (itemKey.includes('speaker') || itemKey.includes('hub')) searchTerms = `${itemName},electronics,gadgets,smart,home`;
    else if (itemKey.includes('remote')) searchTerms = `${itemName},remote,electronics`;
    else searchTerms = `${itemName},electronics,gadgets,technology`;
  } else if (categoryKey === 'fashion') {
    if (itemKey.includes('shoe') || itemKey.includes('sneaker')) searchTerms = `${itemName},fashion,shoes`;
    else if (itemKey.includes('jacket')) searchTerms = `${itemName},fashion,jacket`;
    else if (itemKey.includes('shirt')) searchTerms = `${itemName},fashion,shirt`;
    else if (itemKey.includes('hoodie')) searchTerms = `${itemName},fashion,hoodie`;
    else if (itemKey.includes('chinos') || itemKey.includes('trousers')) searchTerms = `${itemName},fashion,pants`;
    else if (itemKey.includes('belt')) searchTerms = `${itemName},fashion,belt`;
    else if (itemKey.includes('wallet')) searchTerms = `${itemName},fashion,wallet`;
    else if (itemKey.includes('kurti')) searchTerms = `${itemName},fashion,kurti`;
    else if (itemKey.includes('scarf')) searchTerms = `${itemName},fashion,scarf`;
    else if (itemKey.includes('blazer')) searchTerms = `${itemName},fashion,blazer`;
    else if (itemKey.includes('dress')) searchTerms = `${itemName},fashion,dress`;
    else if (itemKey.includes('cap')) searchTerms = `${itemName},fashion,cap`;
    else if (itemKey.includes('sandal')) searchTerms = `${itemName},fashion,sandals`;
    else if (itemKey.includes('bag') || itemKey.includes('backpack')) searchTerms = `${itemName},fashion,bag`;
    else if (itemKey.includes('sunglass')) searchTerms = `${itemName},fashion,sunglasses`;
    else if (itemKey.includes('watch')) searchTerms = `${itemName},fashion,watch`;
    else searchTerms = `${itemName},fashion,clothing,accessories`;
  }

  return `https://tse1.mm.bing.net/th?q=${encodeURIComponent(searchTerms)}&w=600&h=400&c=7&rs=1&p=0&o=5&pid=1.7`;
}

function stableImageLock(value) {
  return Array.from(String(value)).reduce((hash, char) => {
    return (hash * 31 + char.charCodeAt(0)) % 100000;
  }, 17) + 1;
}
function applyNameMatchedImages() {
  Object.entries(catalog).forEach(([catalogKey, items]) => {
    items.forEach((item, index) => {
      item.img = buildCatalogImage(catalogKey, item.name, index);
    });
  });
}

applyNameMatchedImages();
const SERVICE_API_QUEUE_KEY = "googleStoreApiQueue";
const SERVICE_CART_CACHE_KEY = "googleStoreServiceCart";
const USER_KEY = 'googleStoreUser';
const FASHION_IMAGE_FALLBACK = 'https://tse1.mm.bing.net/th?q=fashion%20clothes%20shopping%20product&w=600&h=400&c=7&rs=1&p=0&o=5&pid=1.7';

const body = document.body;
const category = body.getAttribute('data-category') || 'fashion';
let products = catalog[category] || [];
let cart = {};
let cartItems = [];
let lazyEnabled = true;

const preloader = document.getElementById('preloader');
const gridView = document.getElementById('gridView');
const carouselView = document.getElementById('carouselView');
const swiperWrapper = document.getElementById('swiperWrapper');
const pageTitle = document.getElementById('page-title');
const heroName = document.getElementById('hero-name');
const heroPrice = document.getElementById('hero-price');
const heroImage = document.getElementById('hero-image');
const cartBtn = document.getElementById('cartBtn');
const cartEl = document.getElementById('cart');
const cartList = document.getElementById('cartList');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const modalAdd = document.getElementById('modalAdd');
const searchInput = document.getElementById('search');
const sortEl = document.getElementById('sort');
const gridBtn = document.getElementById('gridBtn');
const carouselBtn = document.getElementById('carouselBtn');
const viewToggle = document.getElementById('viewToggle');
const themeToggle = document.getElementById('themeToggle');
const toggleLazy = document.getElementById('toggleLazy');
const clearSearch = document.getElementById('clearSearch');

clearSearch.innerHTML = '&times;';
viewToggle.innerHTML = '&#128257;';
themeToggle.innerHTML = '&#9790;';

pageTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
document.getElementById('year').textContent = new Date().getFullYear();

const fmt = n => 'Rs. ' + Number(n || 0).toLocaleString('en-IN');

function readCurrentUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

function getCurrentUserEmail() {
  const user = readCurrentUser();
  return user?.email || '';
}

function requireLoggedIn(action) {
  const email = getCurrentUserEmail();
  if (email) return email;
  alert(`Please login on the home page before you ${action}.`);
  return '';
}

function getServiceName() {
  if (typeof categoryKey !== "undefined") return categoryKey;
  if (typeof category !== "undefined") return category;
  return "service";
}

function getServiceCartKey(email) {
  return `${email || "guest"}:${getServiceName()}`;
}

function readServiceCart(email) {
  try {
    const allCarts = JSON.parse(localStorage.getItem(SERVICE_CART_CACHE_KEY) || "{}");
    return allCarts[getServiceCartKey(email)] || [];
  } catch {
    return [];
  }
}

function writeServiceCart(email, items) {
  let allCarts = {};
  try {
    allCarts = JSON.parse(localStorage.getItem(SERVICE_CART_CACHE_KEY) || "{}");
  } catch {
    allCarts = {};
  }
  allCarts[getServiceCartKey(email)] = items;
  localStorage.setItem(SERVICE_CART_CACHE_KEY, JSON.stringify(allCarts));
}

function queueMainIndexRequest(path, options = {}) {
  let queue = [];
  try {
    queue = JSON.parse(localStorage.getItem(SERVICE_API_QUEUE_KEY) || "[]");
  } catch {
    queue = [];
  }
  const rawBody = options.body || "{}";
  const body = typeof rawBody === "string" ? JSON.parse(rawBody || "{}") : rawBody;
  queue.push({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    path,
    method: options.method || "POST",
    body,
    source: getServiceName()
  });
  localStorage.setItem(SERVICE_API_QUEUE_KEY, JSON.stringify(queue));
}

function currentServiceEmail() {
  if (typeof getCurrentUserEmail !== "undefined") return getCurrentUserEmail() || "";
  if (typeof readCurrentUser !== "undefined") return readCurrentUser()?.email || "";
  return "";
}

function clearSyncedServiceQueue(email = "") {
  let queue = [];
  try {
    queue = JSON.parse(localStorage.getItem(SERVICE_API_QUEUE_KEY) || "[]");
  } catch {
    return;
  }
  const serviceName = getServiceName();
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const filteredQueue = queue.filter((request) => {
    if (request.source !== serviceName) return true;
    const requestEmail = String(request.body?.email || "").trim().toLowerCase();
    return normalizedEmail && requestEmail && requestEmail !== normalizedEmail;
  });
  localStorage.setItem(SERVICE_API_QUEUE_KEY, JSON.stringify(filteredQueue));
}

function readEmailFromCartPath(path) {
  try {
    const query = String(path).split("?")[1] || "";
    return new URLSearchParams(query).get("email") || "";
  } catch {
    return "";
  }
}

async function apiRequest(path, options = {}) {
  const method = String(options.method || "GET").toUpperCase();
  const rawBody = options.body || "{}";
  const body = typeof rawBody === "string" ? JSON.parse(rawBody || "{}") : rawBody;
  const email = body.email || readEmailFromCartPath(path) || currentServiceEmail();

  if (method === "GET") {
    if (String(path).startsWith("/cart")) return { items: readServiceCart(email) };
    if (String(path).startsWith("/users/")) return { user: typeof readCurrentUser !== "undefined" ? readCurrentUser() : null };
    return {};
  }

  if (String(path).startsWith("/cart/items")) {
    const items = readServiceCart(email);
    const index = items.findIndex((item) => item.product_id === body.product_id);
    if (method === "DELETE" || (method === "PUT" && Number(body.quantity || 0) <= 0)) {
      if (index >= 0) items.splice(index, 1);
    } else if (index >= 0) {
      items[index] = {
        ...items[index],
        ...body,
        quantity: method === "POST" ? Number(items[index].quantity || 0) + Number(body.quantity || 1) : Number(body.quantity || 1),
        subtotal: Number(body.price || items[index].price || 0) * (method === "POST" ? Number(items[index].quantity || 0) + Number(body.quantity || 1) : Number(body.quantity || 1))
      };
    } else {
      items.push({ ...body, quantity: Number(body.quantity || 1), subtotal: Number(body.price || 0) * Number(body.quantity || 1) });
    }
    writeServiceCart(email, items);
  }

  const syncBody = String(path).startsWith("/orders") && !Array.isArray(body.items)
    ? { ...body, items: readServiceCart(email) }
    : body;
  let backendResult = null;
  try {
    const response = await fetch(`/api${path}`, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options,
      method,
      body: JSON.stringify(syncBody)
    });
    const responseData = await response.json().catch(() => ({}));
    if (response.ok) {
      backendResult = responseData;
    } else {
      console.warn("Backend sync failed", responseData.error || response.statusText);
    }
  } catch (error) {
    console.warn("Backend sync unavailable", error);
  }

  if (backendResult && String(path).startsWith("/orders")) {
    clearSyncedServiceQueue(email);
  }

  if (!backendResult) {
    queueMainIndexRequest(path, { ...options, method, body: syncBody });
  }

  if (String(path).startsWith("/orders")) {
    writeServiceCart(email, []);
  }

  return backendResult || { message: "Queued for main index backend sync" };
}

function getById(id) {
  return Object.values(catalog).flat().find(item => item.id === id);
}

function syncCartState(items) {
  cartItems = items || [];
  cart = {};
  cartItems.forEach(item => {
    cart[item.product_id] = Number(item.quantity || 0);
  });
}

let serviceToastTimer;
function showServiceToast(message, type = 'success') {
  let toast = document.getElementById('serviceToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'serviceToast';
    toast.style.cssText = 'position:fixed;right:22px;bottom:22px;z-index:9999;max-width:min(340px,calc(100vw - 32px));padding:12px 16px;border-radius:8px;background:#16a34a;color:#fff;font-weight:800;box-shadow:0 16px 34px rgba(15,23,42,.24);opacity:0;transform:translateY(18px);pointer-events:none;transition:opacity .24s ease,transform .24s ease;';
    document.body.appendChild(toast);
  }
  toast.textContent = type === 'error' ? message : `☁ ${message}`;
  toast.style.background = type === 'error' ? '#dc2626' : '#16a34a';
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';
  clearTimeout(serviceToastTimer);
  serviceToastTimer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(18px)';
  }, 2200);
}

async function refreshCartFromServer() {
  const email = getCurrentUserEmail();
  if (!email) {
    syncCartState([]);
    renderCart();
    return;
  }
  try {
    const data = await apiRequest(`/cart?email=${encodeURIComponent(email)}`);
    syncCartState(data.items || []);
    renderCart();
  } catch (error) {
    console.error('Cart load failed', error);
    cartList.innerHTML = '<div class="muted">Unable to load cart</div>';
  }
}

window.GoogleStoreCart = {
  apiRequest,
  getCurrentUserEmail,
  getCartItems: () => cartItems.slice(),
  readCurrentUser,
  refreshCart: refreshCartFromServer,
  requireLoggedIn
};

function renderGrid(items) {
  gridView.innerHTML = '';
  if (!items.length) {
    gridView.innerHTML = '<div class="muted">No products found.</div>';
    return;
  }
  items.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card tilt';
    card.innerHTML = `
      <div class="thumb"><img ${lazyEnabled ? 'loading="lazy"' : ''} src="${p.img}" alt="${p.name}"></div>
      <div class="meta"><div class="title">${p.name}</div><div class="price">${fmt(p.price)}</div></div>
      <div class="muted" style="font-size:13px">Rating ${p.rating} - ${p.desc}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px">
        <div><button class="btn small quick" data-id="${p.id}">Quick view</button>
             <button class="btn small ghost add" data-id="${p.id}">Add</button></div>
        <button class="btn small ghost fav" data-id="${p.id}">Wish</button>
      </div>
    `;
    gridView.appendChild(card);
  });

  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll('.tilt'), { max: 8, speed: 400, glare: true, 'max-glare': 0.08 });
  }
  gridView.querySelectorAll('.quick').forEach(button => {
    button.onclick = () => openModal(getById(button.dataset.id));
  });
  gridView.querySelectorAll('.add').forEach(button => {
    button.onclick = () => addToCart(button.dataset.id, 1);
  });
}

let swiperInstance = null;
function renderCarousel(items) {
  swiperWrapper.innerHTML = '';
  if (!items.length) {
    swiperWrapper.innerHTML = '<div class="muted">No products</div>';
    return;
  }
  items.forEach(p => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `<div class="swiper-card card">
        <div class="thumb"><img ${lazyEnabled ? 'loading="lazy"' : ''} src="${p.img}" alt="${p.name}"></div>
        <div class="meta"><div class="title">${p.name}</div><div class="price">${fmt(p.price)}</div></div>
        <div class="muted" style="font-size:13px">Rating ${p.rating}</div>
        <div style="margin-top:10px;display:flex;gap:8px"><button class="btn small quick" data-id="${p.id}">Quick view</button><button class="btn small ghost add" data-id="${p.id}">Add</button></div>
      </div>`;
    swiperWrapper.appendChild(slide);
  });

  if (typeof Swiper !== 'undefined') {
    if (swiperInstance) swiperInstance.destroy(true, true);
    swiperInstance = new Swiper('.mySwiper', {
      slidesPerView: 1.3,
      centeredSlides: true,
      spaceBetween: 18,
      loop: false,
      breakpoints: { 640: { slidesPerView: 1.6 }, 980: { slidesPerView: 2.2 }, 1200: { slidesPerView: 3 } },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      pagination: { el: '.swiper-pagination', clickable: true }
    });
  }

  document.querySelectorAll('.quick').forEach(button => {
    button.onclick = () => openModal(getById(button.dataset.id));
  });
  document.querySelectorAll('.add').forEach(button => {
    button.onclick = () => addToCart(button.dataset.id, 1);
  });
}

function openModal(product) {
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  modalImg.src = product.img;
  modalTitle.textContent = product.name;
  modalDesc.textContent = product.desc;
  modalPrice.textContent = fmt(product.price);
  modalAdd.onclick = () => {
    addToCart(product.id, 1);
    closeModal();
  };
  if (window.gsap) gsap.fromTo('.modal-card', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 });
}

function closeModal() {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
}

modalClose.onclick = closeModal;
modal.onclick = event => {
  if (event.target === modal) closeModal();
};

async function addToCart(id, qty) {
  const email = requireLoggedIn('add items to cart');
  if (!email) return;
  const product = getById(id);
  if (!product) return;
  try {
    await apiRequest('/cart/items', {
      method: 'POST',
      body: JSON.stringify({
        email,
        product_id: product.id,
        product_name: product.name,
        product_image: product.img,
        product_description: product.desc,
        price: product.price,
        quantity: qty
      })
    });
    await refreshCartFromServer();
    showServiceToast(`${product.name} added to cart`);
    if (window.gsap) gsap.fromTo('#cartCount', { scale: 0.9, opacity: 0.6 }, { scale: 1, opacity: 1, duration: 0.28 });
  } catch (error) {
    showServiceToast(error.message || 'Unable to add item to cart', 'error');
  }
}

async function removeFromCart(id) {
  const email = getCurrentUserEmail();
  if (!email) return;
  try {
    await apiRequest('/cart/items', {
      method: 'DELETE',
      body: JSON.stringify({ email, product_id: id })
    });
    await refreshCartFromServer();
  } catch (error) {
    alert(error.message || 'Unable to remove item');
  }
}

async function changeQty(id, quantity) {
  const email = getCurrentUserEmail();
  if (!email) return;
  try {
    await apiRequest('/cart/items', {
      method: 'PUT',
      body: JSON.stringify({ email, product_id: id, quantity })
    });
    await refreshCartFromServer();
  } catch (error) {
    alert(error.message || 'Unable to update cart');
  }
}

function renderCart() {
  cartList.innerHTML = '';
  let total = 0;
  if (!cartItems.length) {
    cartList.innerHTML = '<div class="muted">Cart empty</div>';
  }

  cartItems.forEach(row => {
    const fallback = getById(row.product_id) || {};
    const name = row.product_name || fallback.name || 'Product';
    const image = row.product_image || fallback.img || FASHION_IMAGE_FALLBACK;
    const price = Number(row.price || fallback.price || 0);
    const quantity = Number(row.quantity || 0);
    const subtotal = Number(row.subtotal || price * quantity);
    const description = row.product_description || fallback.desc || '';
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `<img src="${image}" alt="${name}" class="cart-img"><div style="flex:1">
      <div style="display:flex;justify-content:space-between"><strong class="cart-name">${name}</strong><div class="price cart-price">${fmt(subtotal)}</div></div>
      <div class="muted cart-desc" style="font-size:12px;margin-top:4px;">${description}</div>
      <div style="display:flex;gap:8px;margin-top:6px;align-items:center"><button class="btn small" data-dec="${row.product_id}">-</button><div class="cart-qty">${quantity}</div><button class="btn small" data-inc="${row.product_id}">+</button><button class="btn small ghost" data-rem="${row.product_id}">Remove</button></div>
      </div>`;
    cartList.appendChild(itemEl);
    total += subtotal;
  });

  cartTotal.textContent = fmt(total);
  cartCount.textContent = cartItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  cartList.querySelectorAll('[data-inc]').forEach(button => {
    button.onclick = () => changeQty(button.dataset.inc, (cart[button.dataset.inc] || 0) + 1);
  });
  cartList.querySelectorAll('[data-dec]').forEach(button => {
    button.onclick = () => changeQty(button.dataset.dec, (cart[button.dataset.dec] || 0) - 1);
  });
  cartList.querySelectorAll('[data-rem]').forEach(button => {
    button.onclick = () => removeFromCart(button.dataset.rem);
  });
}

function applyFilters() {
  let items = (catalog[category] || []).slice();
  const query = searchInput.value.trim().toLowerCase();
  if (query) items = items.filter(item => (item.name + item.desc).toLowerCase().includes(query));
  const sort = sortEl.value;
  if (sort === 'price-asc') items.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') items.sort((a, b) => b.price - a.price);
  if (sort === 'rating') items.sort((a, b) => b.rating - a.rating);
  renderGrid(items);
  renderCarousel(items);
}

searchInput.addEventListener('input', debounce(applyFilters, 200));
clearSearch.onclick = () => {
  searchInput.value = '';
  applyFilters();
};

gridBtn.onclick = () => {
  gridView.style.display = 'grid';
  carouselView.style.display = 'none';
  gridBtn.classList.add('active');
  carouselBtn.classList.remove('active');
  gridView.focus();
};

carouselBtn.onclick = () => {
  gridView.style.display = 'none';
  carouselView.style.display = 'block';
  carouselBtn.classList.add('active');
  gridBtn.classList.remove('active');
  carouselView.setAttribute('aria-hidden', 'false');
};

viewToggle.onclick = () => {
  if (carouselView.style.display === 'block') gridBtn.click();
  else carouselBtn.click();
};

themeToggle.onclick = () => {
  body.setAttribute('data-theme', 'dark');
  themeToggle.setAttribute('aria-pressed', true);
};

toggleLazy.onchange = event => {
  lazyEnabled = event.target.checked;
  applyFilters();
};

function revealOnScroll() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  items.forEach(item => observer.observe(item));
}

function initHero() {
  const product = products[0] || {};
  heroImage.src = product.img || FASHION_IMAGE_FALLBACK;
  heroName.textContent = product.name || 'Featured';
  heroPrice.textContent = product.price ? fmt(product.price) : '';
  if (window.gsap && document.querySelector('.hero-left .reveal')) {
    gsap.from('.hero-left .reveal', { y: 18, opacity: 0, duration: 0.8, stagger: 0.08 });
  }
  if (window.gsap && document.querySelector('.p-layer')) {
    gsap.to('.p-layer', { y: -30, duration: 20, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }
}

window.addEventListener('load', () => {
  if (window.gsap) gsap.to(preloader, { opacity: 0, duration: 0.6, onComplete: () => (preloader.style.display = 'none') });
  else preloader.style.display = 'none';
  products = catalog[category] || [];
  renderGrid(products);
  renderCarousel(products);
  initHero();
  renderCart();
  revealOnScroll();
  refreshCartFromServer();
});

cartBtn.onclick = () => {
  cartEl.classList.add('open');
  cartEl.setAttribute('aria-hidden', 'false');
  cartEl.focus();
};

document.getElementById('cartClose').onclick = () => {
  cartEl.classList.remove('open');
  cartEl.setAttribute('aria-hidden', 'true');
};

document.getElementById('emptyCart').onclick = async () => {
  const email = getCurrentUserEmail();
  if (!email || !cartItems.length) return;
  try {
    await Promise.all(
      cartItems.map(item =>
        apiRequest('/cart/items', {
          method: 'DELETE',
          body: JSON.stringify({ email, product_id: item.product_id })
        })
      )
    );
    await refreshCartFromServer();
  } catch (error) {
    alert(error.message || 'Unable to clear cart');
  }
};

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal();
    cartEl.classList.remove('open');
  }
});

if ('serviceWorker' in navigator) {
  try {
    navigator.serviceWorker.register('/sw.js');
  } catch (error) {
    console.error(error);
  }
}

function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
