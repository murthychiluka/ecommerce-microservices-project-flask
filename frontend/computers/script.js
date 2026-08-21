/* Shared product page interactions with DB-backed cart */
const catalog = {
  computers: 
  [
  {
    id: 'c1',
    name: 'Pixelbook Go',
    price: 84999,
    img: 'https://www.google.com/chromebook/assets/static/images/pixelbook-go/pixelbook-go-m.jpg',
    rating: 4.5,
    desc: 'Ultra-portable Chromebook.'
  },
  {
    id: 'c2',
    name: 'Chromebox',
    price: 44999,
    img: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f.jpg',
    rating: 4.0,
    desc: 'Compact desktop.'
  },
  {
    id: 'c3',
    name: 'Pixel Slate',
    price: 69999,
    img: 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/01_Product_Shot_Landscape_-_Front_Viewing_Angle_-_Vv7VreY.max-1000x1000.jpg',
    rating: 4.3,
    desc: 'Tablet + keyboard.'
  },
  {
    id: 'c4',
    name: 'Google Pixelbook',
    price: 79999,
    img: 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Pixelbook.max-1000x1000.jpg',
    rating: 4.3,
    desc: 'High-end Pixelbook laptop.'
  },
  {
    id: 'c5',
    name: 'Chromebook Flex',
    price: 38999,
    img: 'https://www.google.com/chromeos/assets/static/images/flex/flex-hero.png',
    rating: 4.1,
    desc: 'Convertible design for classes and labs.'
  },
  {
    id: 'c6',
    name: 'Pixelbook Pro',
    price: 99999,
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853.jpg',
    rating: 4.6,
    desc: 'Premium build and stronger multitasking.'
  },
  {
    id: 'c7',
    name: 'Chromebase 24',
    price: 62999,
    img: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Acer_Chromebase_24.jpg',
    rating: 4.2,
    desc: 'All-in-one computer for shared counters.'
  },
  {
    id: 'c8',
    name: 'Pixel Mini PC',
    price: 52999,
    img: 'https://images.unsplash.com/photo-1588012832298-bc41bf606070.jpg',
    rating: 4.1,
    desc: 'Small desktop with cloud-first setup.'
  },
  {
    id: 'c9',
    name: 'Chromebook Air',
    price: 46999,
    img: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1.jpg',
    rating: 4,
    desc: 'Lightweight laptop for travel and notes.'
  },
  {
    id: 'c10',
    name: 'Pixel Studio',
    price: 114999,
    img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f.jpg',
    rating: 4.7,
    desc: 'Creative workstation with high-res display.'
  }
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
const COMPUTER_IMAGE_FALLBACK = 'https://tse1.mm.bing.net/th?q=computer%20laptop%20desktop%20product&w=600&h=400&c=7&rs=1&p=0&o=5&pid=1.7';

const body = document.body;
const category = body.getAttribute('data-category') || 'electronics';
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

pageTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const fmt = n => 'Rs. ' + Number(n || 0).toLocaleString('en-IN');

function safeImage(src) {
  return src || COMPUTER_IMAGE_FALLBACK;
}

function withFallbackImageMarkup(src, alt, extraAttrs = '') {
  return `<img ${extraAttrs} src="${safeImage(src)}" alt="${alt}" onerror="this.onerror=null;this.src='${COMPUTER_IMAGE_FALLBACK}'">`;
}

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
      <div class="thumb">${withFallbackImageMarkup(p.img, p.name, lazyEnabled ? 'loading="lazy"' : '')}</div>
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
        <div class="thumb">${withFallbackImageMarkup(p.img, p.name, lazyEnabled ? 'loading="lazy"' : '')}</div>
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
  modalImg.src = safeImage(product.img);
  modalImg.onerror = () => {
    modalImg.onerror = null;
    modalImg.src = COMPUTER_IMAGE_FALLBACK;
  };
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
    if (window.gsap) gsap.fromTo('#cartCount', { scale: 0.9, opacity: 0.6 }, { scale: 1, opacity: 1, duration: 0.28 });
  } catch (error) {
    alert(error.message || 'Unable to add item to cart');
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
    const image = row.product_image || fallback.img || COMPUTER_IMAGE_FALLBACK;
    const price = Number(row.price || fallback.price || 0);
    const quantity = Number(row.quantity || 0);
    const subtotal = Number(row.subtotal || price * quantity);
    const description = row.product_description || fallback.desc || '';
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `<img src="${safeImage(image)}" alt="${name}" class="cart-img" onerror="this.onerror=null;this.src='${COMPUTER_IMAGE_FALLBACK}'"><div style="flex:1">
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
  const current = body.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', next);
  themeToggle.setAttribute('aria-pressed', next === 'dark');
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
  heroImage.src = safeImage(product.img);
  heroImage.onerror = () => {
    heroImage.onerror = null;
    heroImage.src = COMPUTER_IMAGE_FALLBACK;
  };
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
