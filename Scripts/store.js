'use strict';

const paths = {
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  heart: '<path d="m12 20-7.25-7.2a4.55 4.55 0 0 1 6.44-6.44l.81.81.81-.81a4.55 4.55 0 0 1 6.44 6.44Z"/>',
  user: '<circle cx="12" cy="8" r="3.1"/><path d="M5 20v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2Z"/>',
  cart: '<path d="M2 4h3l2.4 11h11.7L22 7H6"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  right: '<path d="m9 5 7 7-7 7"/>',
  down: '<path d="m5 9 7 7 7-7"/>',
  play: '<path d="m8 5 11 7-11 7Z"/>',
  pause: '<path d="M9 5v14m6-14v14"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.3"/><path d="m3 17 5-4 3 3 4-5 6 6"/>',
};
const icons = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
const money = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
const currency = (value) => money.format(value);
const escape = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const get = (selector) => document.querySelector(selector);
const query = new URLSearchParams(location.search);
const page = document.body.dataset.page;
const adultSizes = ['XS', 'S', 'M', 'L', 'XL'];
const kidsSizes = ['90', '100', '110', '120', '130', '140', '150'];
const storedSizes = new Set([...adultSizes, ...kidsSizes, ...products.flatMap((product) => product.sizes ?? [])]);
const desktop = matchMedia('(min-width: 761px)');
const audience = audiences.indexOf(query.get('for'));
const heroIndex = Math.max(audience, 0);
const activeGroup = page === 'index' ? heroIndex : audience;

function read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem('puccicot.' + key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem('puccicot.' + key, JSON.stringify(value));
  } catch {
    // The current page remains usable when browser storage is unavailable.
  }
}

let favorites = read('favorites', []);
let cart = read('cart', []);
const mainNav = [
  ['index', 'Trang chủ'], ['shop', 'Cửa hàng'], ['blog', 'Nhật ký'], ['contact', 'Liên hệ'],
];
const productById = (id) => products.find((product) => product.id === id);
const belongsTo = (product, group) => group < 0 || product.for.includes(group);
const sizesFor = (product) => product.sizes ?? (belongsTo(product, 2) ? kidsSizes : adultSizes);
const categoryById = (id) => categories.find((category) => category.id === id);
const primaryCategory = (product) => categoryById(primaryCategoryByType[product.type] ?? product.type);

function inCategory(product, id) {
  if (categoryCollections.has(id)) return product.collections?.includes(id) ?? false;
  const types = categoryTypes[id];
  return types ? types.includes(product.type) : product.type === id;
}

function availableCategories(group) {
  const ids = group < 0 ? categories.map(({ id }) => id) : audienceCategories[group];
  return ids.filter((id) => products.some((product) => belongsTo(product, group) && inCategory(product, id)));
}
function productUrl(product, color) {
  const params = new URLSearchParams({ id: product.id });
  if (color) params.set('color', color.id);
  if (activeGroup >= 0 && belongsTo(product, activeGroup)) params.set('for', audiences[activeGroup]);
  return 'product.html?' + params;
}
const navLabels = ['Women', 'Men', 'Kids', 'Baby'];
const colorsFor = (product) => productColors[product.id] ?? [];
const colorFor = (product, id) => colorsFor(product).find((color) => color.id === id);
const defaultColor = (product) => colorsFor(product).find((color) => color.image) ?? colorsFor(product)[0];
const colorImage = (product, color, cover = false) => color
  ? { ...product, image: color.image || (cover ? product.image : ''), hex: color.hex }
  : product;

function colorOptions(product, selected) {
  const colors = colorsFor(product);
  if (!colors.length) return '';
  return `<fieldset class="color-picker"><legend>Màu sắc <strong id="color-name">${escape(selected.name)}</strong></legend>
    <div class="swatches">${colors.map((color) => `<label title="${escape(color.name)}"><input type="radio" name="color" value="${color.id}" aria-label="${escape(color.name)}"${color === selected ? ' checked' : ''}><span style="--swatch:${color.hex}" aria-hidden="true"></span></label>`).join('')}</div></fieldset>`;
}

function variantText(product, row) {
  const color = colorFor(product, row.color);
  return [color?.name, 'Size ' + row.size].filter(Boolean).join(' · ');
}

function shopUrl(category = '', selectedAudience = audience, keyword = '') {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (selectedAudience >= 0) params.set('for', audiences[selectedAudience]);
  if (keyword) params.set('q', keyword);
  return 'shop.html' + (params.size ? '?' + params : '');
}

function homeUrl(group = activeGroup) {
  return group >= 0 ? 'index.html?for=' + encodeURIComponent(audiences[group]) : 'index.html';
}

function media(item, label, eager = false) {
  const image = item.image ? 'Images/' + encodeURIComponent(item.image) : '';
  const mobile = item.mobileImage ? 'Images/' + encodeURIComponent(item.mobileImage) : '';
  if (image || mobile) {
    return `<span class="media"><picture>${mobile ? `<source media="(max-width: 760px)" srcset="${mobile}">` : ''}<img src="${image || mobile}" alt="${escape(item.alt ?? '')}" loading="${eager ? 'eager' : 'lazy'}"></picture></span>`;
  }
  const color = item.hex ? ` style="--image-tint:${item.hex}"` : '';
  return `<span class="media${color ? ' tinted-media' : ''}" aria-hidden="true"${color}><span class="placeholder">${icons('image')}<span>${escape(label)}</span></span></span>`;
}

function photoTiles(tiles, eager = false) {
  return `<span class="photo-tiles">${tiles.map((image) => media({ image }, 'Ảnh bộ sưu tập', eager)).join('')}</span>`;
}

function linkIcon(href, icon, label, countId = '') {
  return `<a class="icon" href="${href}" aria-label="${label}">${icons(icon)}${countId ? `<span class="badge" id="${countId}" hidden></span>` : ''}</a>`;
}

function renderHeader() {
  get('#header').innerHTML = `<div class="mainbar"><div class="wrap">
      <a class="brand" href="index.html" aria-label="PucciCot, trang chủ"><span>PUCCI</span><span>COT</span></a>
      <nav class="audience" aria-label="Mua sắm theo nhóm">${navLabels.map((name, index) => {
        const href = page === 'index' ? homeUrl(index) : shopUrl('', index);
        const selected = activeGroup === index;
        return `<a href="${href}"${selected ? ' aria-current="page"' : ''}>${name}</a>`;
      }).join('')}</nav>
      ${searchForm('header-search')}
      <div class="tools">
        <button type="button" class="icon mobile-search" data-action="search" aria-label="Tìm kiếm">${icons('search')}</button>
        ${linkIcon('wishlist.html', 'heart', 'Yêu thích', 'saved-count')}
        <button type="button" class="icon" data-action="account" aria-label="Tài khoản">${icons('user')}</button>
        ${linkIcon('cart.html', 'cart', 'Giỏ hàng', 'cart-count')}
        <button type="button" class="icon menu-toggle" data-action="menu" aria-label="Mở điều hướng">${icons('menu')}</button>
      </div>
    </div></div>`;
  updateCounts();
}

function updateCounts() {
  for (const [id, total] of [['saved-count', favorites.length], ['cart-count', cart.reduce((sum, row) => sum + row.qty, 0)]]) {
    const badge = document.getElementById(id);
    badge.hidden = !total;
    badge.textContent = total;
  }
}

function renderFooter() {
  get('#footer').innerHTML = `<div class="wrap footer-main">
    <section><a class="brand" href="index.html" aria-label="PucciCot, trang chủ"><span>PUCCI</span><span>COT</span></a><p>Thời trang Nữ, Nam, Trẻ em và Em bé.</p></section>
    <nav class="foot-links" aria-label="Liên kết cuối trang"><h2>Khám phá PucciCot</h2><a href="${shopUrl('', activeGroup)}">Cửa hàng</a><a href="blog.html">Nhật ký</a><a href="contact.html">Liên hệ và hỗ trợ</a><a href="wishlist.html">Danh sách yêu thích</a></nav>
    <section><h2>Bản tin điện tử</h2><p>Đăng ký để thử biểu mẫu nhận tin.</p><form class="newsletter" data-form="newsletter"><input type="email" name="email" aria-label="Email nhận bản tin" placeholder="Địa chỉ email" required><button class="button red">Đăng ký</button></form></section>
  </div><div class="footer-base"><div class="wrap"><span>© PucciCot</span><a href="#main">Về đầu trang</a></div></div>`;
}

function departments(list = categories, selected = '') {
  const open = desktop.matches ? ' open' : '';
  return `<details class="dept"${open}><summary>${icons('menu')}<span>Danh mục sản phẩm</span>${icons('down')}</summary>
    <div class="dept-links">${list.map((category) => `<a href="${shopUrl(category.id)}"${category.id === selected ? ' aria-current="page"' : ''}>${escape(category.name)}${icons('right')}</a>`).join('')}
    <a href="${shopUrl()}">Xem tất cả${icons('right')}</a></div>
  </details>`;
}

function searchForm(className = '') {
  return `<form class="search ${className}" action="shop.html" method="get">
    <input type="search" name="q" value="${escape(query.get('q') ?? '')}" placeholder="Bạn đang tìm sản phẩm gì?" aria-label="Tìm kiếm sản phẩm">
    ${activeGroup >= 0 ? `<input type="hidden" name="for" value="${audiences[activeGroup]}">` : ''}<button type="submit" aria-label="Tìm kiếm">${icons('search')}</button></form>`;
}

function card(product) {
  const colors = colorsFor(product);
  const selected = defaultColor(product);
  const url = productUrl(product, selected?.image ? selected : null);
  return `<article class="product" data-product="${product.id}">
    <a class="product-image" href="${url}" aria-label="${escape(product.name)}">${media(colorImage(product, selected, true), 'Ảnh sản phẩm')}</a>
    ${product.bestseller ? '<span class="product-bestseller">Bán chạy</span>' : ''}
    <button type="button" class="icon save" data-fav="${product.id}" aria-label="Yêu thích ${escape(product.name)}" aria-pressed="${favorites.includes(product.id)}">${icons('heart')}</button>
    <div class="caption">${escape(primaryCategory(product).name)}${colors.length ? ' · ' + colors.length + ' màu' : ''}</div>
    <h3><a class="product-title" href="${url}">${escape(product.name)}</a></h3><span class="price">${currency(product.price)}</span>
    ${selected ? `<div class="card-colors" role="group" aria-label="Chọn màu cho ${escape(product.name)}">
      ${colors.map((color) => `<button type="button" data-card-color="${color.id}" title="${escape(color.name)}" aria-label="${escape(color.name)}" aria-pressed="${color === selected}"><span style="--swatch:${color.hex}" aria-hidden="true"></span></button>`).join('')}
      <small class="card-color-name" aria-live="polite">${escape(selected.name)}</small></div>` : ''}
  </article>`;
}

function renderHero() {
  const hero = heroes[heroIndex];
  const section = get('#hero');
  section.dataset.layout = ['collage', 'men', 'standard', 'standard'][heroIndex];
  section.dataset.tone = hero.tone;
  if (heroIndex === 0) {
    const collage = Array.from({ length: 4 }, (_, column) => `<div>${heroTiles.slice(column * 2, column * 2 + 2).map((tile, index) => media(tile, 'Ảnh ' + (column * 2 + index + 1), true)).join('')}</div>`).join('');
    section.innerHTML = `<div class="hero-collage">${hero.image || hero.mobileImage ? media(hero, 'Ảnh banner chính', true) : collage}</div>
      <div class="hero-promo"><a class="sale-square" href="${shopUrl('uu-dai', heroIndex)}">
        <span>Ưu đãi mùa đông</span><h1>Mùa đông<br>đã đến</h1><strong>${saleDates()}</strong></a>${timer()}</div>`;
  } else if (heroIndex === 1) {
    section.innerHTML = `<div class="wrap men-layout"><div class="men-copy"><h1><a href="${shopUrl(hero.category, heroIndex)}">${escape(hero.title)}</a></h1><p>${escape(hero.description)}</p></div>
      <a class="men-art" href="${shopUrl(hero.category, heroIndex)}" aria-label="Xem trang phục giữ ấm Nam">${hero.image || hero.mobileImage
        ? media(hero, 'Ảnh banner Nam', true)
        : `<span class="men-grid"><span class="men-mark">PUCCICOT<br><strong>GIỮ ẤM</strong></span>${menTiles.map((tile, index) => media(tile, 'Ảnh ' + (index + 1), true)).join('')}</span>`}</a></div>`;
  } else {
    const background = hero.image || hero.mobileImage || !hero.tiles?.length
      ? media(hero, 'Ảnh banner chính', true)
      : photoTiles(hero.tiles, true);
    section.innerHTML = `<div class="hero-background">${background}</div>
      <div class="hero-content"><span class="eyebrow">${escape(hero.tag)}</span><h1><a href="${shopUrl(hero.category, heroIndex)}">${escape(hero.title)}</a></h1><p>${escape(hero.description)}</p></div>`;
  }
  get('#category-grid').innerHTML = availableCategories(heroIndex).map((id) => {
    const category = categoryById(id);
    const badges = { 'giu-nhiet': 'GIỮ ẤM', sport: 'SPORT', 'dac-biet': 'COLLAB', 'hoa-tiet': 'PRINT', 'uu-dai': 'ƯU ĐÃI', 'gia-moi': 'SALE', restock: 'VỀ LẠI', new: 'NEW' };
    let image = audienceCategoryImages[heroIndex]?.[id] || (heroIndex === 0 ? category.image : '');
    if (!image && !badges[id]) {
      image = products.find((product) => belongsTo(product, heroIndex) && inCategory(product, id) && product.image)?.image;
    }
    const art = image || !badges[id] ? media({ image }, 'Ảnh danh mục') : `<span class="category-badge" data-category="${id}" aria-hidden="true">${badges[id]}</span>`;
    return `<a class="category-card" href="${shopUrl(id, heroIndex)}">${art}<strong>${escape(category.name)}</strong></a>`;
  }).join('');
  get('#all-categories').href = shopUrl('', heroIndex);
  const saleLink = get('#black-friday-link');
  if (saleLink) saleLink.href = shopUrl('uu-dai', heroIndex);
  updateTimers();
}

const saleDates = () => blackFriday.startLabel + ' – ' + blackFriday.endLabel;

function timer() {
  return `<div class="sale-timer"><p data-timer-label></p><div class="timer-units" role="timer" aria-label="Thời gian ưu đãi">
    ${['Ngày', 'Giờ', 'Phút', 'Giây'].map((unit) => `<span class="timer-unit"><span data-time>00</span><small>${unit}</small></span>`).join('')}</div></div>`;
}

function updateTimers() {
  const now = Date.now();
  const start = Date.parse(blackFriday.startsAt);
  const end = Date.parse(blackFriday.endsAt);
  const seconds = Math.max(0, Math.ceil(((now < start ? start : end) - now) / 1000));
  const values = [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
  document.querySelectorAll('.sale-timer').forEach((clock) => {
    clock.querySelector('[data-timer-label]').textContent = now >= end ? 'Ưu đãi đã kết thúc' : now < start ? 'Ưu đãi bắt đầu sau' : 'Ưu đãi kết thúc sau';
    clock.querySelector('.timer-units').hidden = now >= end;
    clock.querySelectorAll('[data-time]').forEach((cell, index) => {
      const value = String(values[index]).padStart(2, '0');
      if (cell.textContent !== value) cell.textContent = value;
    });
  });
}

function promoCard(campaign) {
  const hasImage = campaign.image || campaign.mobileImage;
  const product = productById(campaign.product);
  const href = product ? productUrl(product) : shopUrl(campaign.category, heroIndex);
  let cover = media(campaign, 'Ảnh bộ sưu tập');
  if (campaign.video) {
    cover = `<video class="promo-video" muted playsinline loop preload="metadata" aria-hidden="true">
      <source src="Videos/${encodeURIComponent(campaign.video)}" type="video/mp4"></video>`;
  }
  if (!hasImage && campaign.tiles?.length) cover = photoTiles(campaign.tiles);
  if (!hasImage && !campaign.video && !campaign.tiles?.length && campaign.centered) {
    cover = `<span class="mosaic" aria-hidden="true">${Array.from({ length: 6 }, () => media({}, '')).join('')}</span>`;
  }
  const copy = `<div class="promo-copy">${campaign.tag ? `<span class="eyebrow">${escape(campaign.tag)}</span>` : ''}<h2>${escape(campaign.title)}</h2><p>${escape(campaign.description)}</p>${product ? `<strong class="promo-price">${currency(product.price)}</strong>` : ''}</div>`;
  if (!campaign.video) return `<a class="promo${campaign.centered ? ' promo-red' : ''}" data-tone="${campaign.tone}" href="${href}">${cover}${copy}</a>`;
  return `<article class="promo video-promo" data-tone="${campaign.tone}">${cover}
    <a class="video-promo-link" href="${href}">${copy}</a>
    <button type="button" class="icon video-toggle" aria-label="Phát video ${escape(campaign.title)}" data-title="${escape(campaign.title)}">${icons('play')}</button></article>`;
}

function initCampaignVideos() {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.video-promo').forEach((banner) => {
    const video = banner.querySelector('video');
    const control = banner.querySelector('.video-toggle');
    let userPaused = false;
    const update = () => {
      control.innerHTML = icons(video.paused ? 'play' : 'pause');
      control.setAttribute('aria-label', `${video.paused ? 'Phát' : 'Tạm dừng'} video ${control.dataset.title}`);
    };
    control.addEventListener('click', () => {
      userPaused = !video.paused;
      if (userPaused) video.pause();
      else video.play().catch(() => showStatus('Chưa phát được video.'));
    });
    video.addEventListener('play', update);
    video.addEventListener('pause', update);
    if (typeof IntersectionObserver === 'function') {
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) video.pause();
        else if (!userPaused && !motion.matches) video.play().catch(() => {});
      }, { threshold: 0.25 });
      observer.observe(banner);
    }
  });
}

function babyHome() {
  const feature = productById(babyFeature.product);
  const sweaters = colorsFor(feature);
  const picks = products.filter((product) => belongsTo(product, 3) && !babyLeggings.includes(product.id));
  const artwork = babyFeature.artwork
    ? `<span class="baby-artwork" aria-hidden="true"><img src="Images/${encodeURIComponent(babyFeature.artwork)}" alt="" loading="lazy"></span>`
    : '';
  return `<section class="wrap section baby-leggings" aria-labelledby="baby-leggings-title">
      <h2 id="baby-leggings-title" class="section-title">Quần legging cho bé</h2>
      <div class="product-grid">${babyLeggings.map(productById).map(card).join('')}</div>
    </section>
    <a class="baby-feature" href="${productUrl(feature)}">
      <div class="baby-feature-copy">${artwork}<h2>${escape(babyFeature.title)}</h2><p>${escape(babyFeature.description)}</p><strong>${currency(feature.price)}</strong></div>
      <div class="baby-feature-photos">${babyFeature.image ? media(babyFeature, 'Ảnh áo nỉ')
        : babyFeature.artwork ? `<span class="baby-feature-reference"><img src="Images/${encodeURIComponent(babyFeature.artwork)}" alt="Áo nỉ Chú Sâu Háu Ăn màu kem và xám" loading="lazy"></span>`
        : sweaters.map((color) => media(colorImage(feature, color), 'Ảnh áo nỉ ' + color.name)).join('')}</div>
    </a>
    <section class="wrap section" aria-labelledby="baby-picks-title">
      <h2 class="section-title" id="baby-picks-title">Thời trang cho bé</h2>
      <div class="product-grid">${picks.map(card).join('')}</div>
    </section>`;
}

function editorial(post) {
  return `<article class="editorial"><a href="article.html?id=${post.id}" aria-label="${escape(post.title)}">${media(post, 'Ảnh bài viết')}</a><time datetime="${post.date}">${dateText(post.date)}</time>
    <h3><a href="article.html?id=${post.id}">${escape(post.title)}</a></h3><p>${escape(post.summary)}</p></article>`;
}

function dateText(value) {
  return new Intl.DateTimeFormat('vi-VN').format(new Date(value + 'T00:00:00'));
}

function home() {
  const picks = ['pc006', 'pc046', 'pc003', 'pc028', 'pc018', 'pc001', 'pc014', 'pc002', 'pc047', 'pc048', 'pc049', 'pc027']
    .map(productById).filter((product) => belongsTo(product, heroIndex)).slice(0, 4);
  const groupCampaigns = campaigns.filter((campaign) => campaign.for.includes(heroIndex));
  return `<section id="hero" class="hero" aria-label="Bộ sưu tập nổi bật" aria-live="polite"></section>
    <section class="wrap home-categories" aria-labelledby="category-title">
      <h2 id="category-title">Tìm theo danh mục</h2>
      <div id="category-grid" class="category-grid"></div>
      <a id="all-categories" class="button outline pill" href="shop.html">Xem tất cả danh mục sản phẩm</a>
    </section>
    ${heroIndex === 3 ? babyHome() : `<section class="black-friday" aria-labelledby="black-friday-title">
      <a class="black-friday-link" id="black-friday-link" href="shop.html?category=uu-dai">
        <span class="black-friday-kicker">Ưu đãi có hạn</span>
        <span class="event-brand" aria-label="PucciCot">PUCCI<br>COT</span>
        <div class="event-heading"><h2 id="black-friday-title">BLACK<br>FRIDAY</h2><strong>${blackFriday.startLabel}<span>–</span>${blackFriday.endLabel}</strong></div>
      </a>${timer()}
    </section>
    <section class="wrap section" aria-labelledby="color-picks">
      <h2 class="section-title" id="color-picks">Sản phẩm có nhiều màu</h2>
      <div class="product-grid">${picks.map(card).join('')}</div>
    </section>
    ${groupCampaigns.length ? `<section class="campaigns" aria-label="Bộ sưu tập">${groupCampaigns.map(promoCard).join('')}</section>` : ''}`}`;
}

function banner(title) {
  return `<section class="page-banner"><div class="wrap"><h1>${escape(title)}</h1><div class="crumb"><a href="${homeUrl()}">Trang chủ</a> / ${escape(title)}</div></div></section>`;
}

function empty(text, link = true) {
  return `<div class="empty"><p>${escape(text)}</p>${link ? '<a class="button outline" href="shop.html">Tiếp tục mua sắm</a>' : ''}</div>`;
}

const normalize = (value) => value.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replaceAll('đ', 'd').trim();

function shop() {
  const category = categoryById(query.get('category'));
  const title = category?.name ?? 'Cửa hàng';
  const departmentIds = availableCategories(audience);
  return `${banner(title)}<div class="wrap">
    <div class="shop-row">
      <aside class="shop-sidebar">${departments(categories.filter(({ id }) => departmentIds.includes(id)), category?.id)}
        <div class="fields"><label>Mức giá<select id="filter-price"><option value="">Tất cả mức giá</option><option value="under">Dưới 500.000 ₫</option><option value="over">Từ 500.000 ₫</option></select></label></div>
      </aside>
      <section aria-label="Sản phẩm">
        <div class="shop-controls"><p id="result-count" role="status"></p><label>Sắp xếp <select id="sort"><option value="">Mặc định</option><option value="low">Giá thấp đến cao</option><option value="high">Giá cao đến thấp</option><option value="new">Mới nhất</option></select></label></div>
        <div id="results"></div>
      </section>
    </div>
  </div>`;
}

function renderResults() {
  const category = query.get('category');
  const keyword = normalize(query.get('q') ?? '');
  const price = get('#filter-price').value;
  const sort = get('#sort').value;
  const results = products.filter((product) => {
    if (!belongsTo(product, audience) || (category && !inCategory(product, category))) return false;
    if (price && (price === 'under' ? product.price >= 500000 : product.price < 500000)) return false;
    if (!keyword) return true;
    const labels = categories.filter(({ id }) => inCategory(product, id)).map(({ name }) => name);
    const terms = normalize([product.name, ...labels].join(' '));
    return keyword.split(/\s+/).every((word) => terms.includes(word));
  });
  if (sort === 'low') results.sort((a, b) => a.price - b.price);
  if (sort === 'high') results.sort((a, b) => b.price - a.price);
  if (sort === 'new') results.reverse();
  get('#result-count').textContent = results.length + ' sản phẩm';
  get('#results').innerHTML = results.length ? `<div class="product-grid">${results.map(card).join('')}</div>` : empty('Chưa tìm thấy sản phẩm phù hợp.', false);
}

function productDetail() {
  const product = productById(query.get('id'));
  if (!product) return banner('Sản phẩm') + `<div class="wrap">${empty('Không tìm thấy sản phẩm này.')}</div>`;
  document.title = product.name + ' | PucciCot';
  const linkedColor = colorFor(product, query.get('color'));
  const selected = linkedColor ?? defaultColor(product);
  const category = primaryCategory(product);
  const choices = sizesFor(product);
  const groups = audience >= 0 && belongsTo(product, audience) ? [audience] : product.for;
  const primaryGroup = groups.length === 1 ? groups[0] : -1;
  const related = products.filter((item) => item.id !== product.id
    && groups.every((group) => belongsTo(item, group))
    && item.type === product.type).slice(0, 4);
  return `<div class="wrap section">
    <p class="crumb" style="margin-bottom: 15px"><a href="${homeUrl(primaryGroup)}">Trang chủ</a> / <a href="${shopUrl(category.id, primaryGroup)}">${escape(category.name)}</a></p>
    <div class="detail"><div id="detail-image">${media(colorImage(product, selected, !linkedColor), 'Ảnh sản phẩm', true)}</div>
      <div class="detail-copy"><span class="eyebrow">${escape(category.name)}</span><h1>${escape(product.name)}</h1><div class="price">${currency(product.price)}</div>
        <p>Thiết kế dễ phối cho trang phục hằng ngày.</p>
        <form class="fields" data-form="add" data-id="${product.id}">${colorOptions(product, selected)}<div class="detail-toolbar">
          <label>Kích cỡ<select name="size" required><option value="">Chọn cỡ</option>${choices.map((size) => `<option>${size}</option>`).join('')}</select></label>
          <label>Số lượng<input name="qty" type="number" min="1" max="99" value="1" required></label>
          <button class="button red">Thêm vào giỏ</button>
          <button class="icon" type="button" data-fav="${product.id}" aria-label="Yêu thích ${escape(product.name)}" aria-pressed="${favorites.includes(product.id)}">${icons('heart')}</button>
        </div></form>
        <details class="info"><summary>Chi tiết sản phẩm</summary><p>Mã sản phẩm ${product.id.toUpperCase()}. Nhóm sản phẩm ${product.for.map((index) => audiences[index]).join(', ')}.</p></details>
        <details class="info"><summary>Hướng dẫn chăm sóc</summary><p>Xem hướng dẫn giặt và bảo quản trên nhãn của sản phẩm.</p></details>
      </div>
    </div>
    ${related.length ? `<section class="section"><h2 class="section-title">Sản phẩm liên quan</h2><div class="product-grid">${related.map(card).join('')}</div></section>` : ''}
  </div>`;
}

const cartTotal = () => cart.reduce((total, row) => total + productById(row.id).price * row.qty, 0);

function orderSummary(checkout = false) {
  return `<aside class="order-box"><h2>${checkout ? 'Đơn hàng của bạn' : 'Tổng giỏ hàng'}</h2>
  ${checkout ? cart.map((row) => {
    const product = productById(row.id);
    return `<div class="order-line"><span>${escape(product.name)} (${escape(variantText(product, row))}) × ${row.qty}</span><strong class="price">${currency(product.price * row.qty)}</strong></div>`;
  }).join('') : ''}
  <div class="order-line"><span>Tổng cộng</span><strong id="total" class="price">${currency(cartTotal())}</strong></div>
  ${checkout ? '<button class="button red" form="order-form">Xác nhận đặt hàng mẫu</button>' : '<a class="button red" href="checkout.html">Tiến hành đặt hàng</a>'}</aside>`;
}

function cartPage() {
  if (!cart.length) return `${banner('Giỏ hàng')}<div class="wrap">${empty('Giỏ hàng của bạn đang trống.')}</div>`;
  return `${banner('Giỏ hàng')}<div class="wrap summary-layout"><section aria-label="Sản phẩm đã chọn">
    ${cart.map((row, index) => {
      const product = productById(row.id);
      const variant = escape(variantText(product, row));
      return `<article class="cart-row">${media(colorImage(product, colorFor(product, row.color)), 'Ảnh sản phẩm')}
        <div><a href="${productUrl(product, colorFor(product, row.color))}"><strong>${escape(product.name)}</strong></a><small>${variant} · ${currency(product.price)}</small></div>
        <input type="number" min="1" max="99" value="${row.qty}" data-qty="${index}" aria-label="Số lượng ${escape(product.name)} ${variant}">
        <strong class="price" id="line-${index}">${currency(product.price * row.qty)}</strong>
        <button class="icon" data-remove="${index}" aria-label="Xóa ${escape(product.name)} ${variant}">${icons('close')}</button>
      </article>`;
    }).join('')}
    <div class="all"><a class="button outline" href="shop.html">Tiếp tục mua sắm</a></div>
    </section>${orderSummary()}</div>`;
}

function checkoutPage() {
  if (!cart.length) return `${banner('Đặt hàng')}<div class="wrap">${empty('Hãy chọn sản phẩm trước khi đặt hàng.')}</div>`;
  return `${banner('Đặt hàng')}<div class="wrap summary-layout">
    <form class="fields" id="order-form" data-form="order">
      <h2>Thông tin giao hàng</h2><p>Dùng thông tin giả để thử quy trình đặt hàng.</p>
      <label>Họ và tên<input name="name" autocomplete="name" required></label>
      <label>Số điện thoại<input type="tel" name="phone" autocomplete="tel" pattern="[0-9+ ]{8,20}" required></label>
      <label>Email<input type="email" name="email" autocomplete="email" required></label>
      <label>Địa chỉ giao hàng<input name="address" autocomplete="street-address" required></label>
      <label>Ghi chú<textarea name="note" rows="3"></textarea></label>
      <label>Phương thức thanh toán<select name="payment"><option>Thanh toán khi nhận hàng (mô phỏng)</option></select></label>
    </form>${orderSummary(true)}</div>`;
}

function wishlist() {
  const saved = products.filter((product) => favorites.includes(product.id));
  return `${banner('Danh sách yêu thích')}<div class="wrap">${saved.length ? `<div class="product-grid">${saved.map(card).join('')}</div>` : empty('Bạn chưa lưu sản phẩm yêu thích.')}</div>`;
}

function blog() {
  return `${banner('Nhật ký PucciCot')}<div class="wrap editorial-grid">${posts.map(editorial).join('')}</div>`;
}

function article() {
  const post = posts.find(({ id }) => id === query.get('id'));
  if (!post) return banner('Bài viết') + `<div class="wrap">${empty('Bài viết này không có trong nhật ký.', false)}</div>`;
  return `${banner(post.title)}<article class="wrap article">${media(post, 'Ảnh bài viết', true)}
    <p class="crumb"><a href="blog.html">Nhật ký</a> / <time datetime="${post.date}">${dateText(post.date)}</time></p>
    ${post.paragraphs.map((paragraph) => `<p>${escape(paragraph)}</p>`).join('')}
    <a class="button outline" href="${shopUrl(post.category)}">Khám phá sản phẩm</a></article>`;
}

function contact() {
  return `${banner('Liên hệ')}<div class="wrap summary-layout">
    <form class="fields" data-form="contact"><h2>Gửi lời nhắn</h2><p>Dùng dữ liệu giả để thử biểu mẫu liên hệ.</p>
      <label>Họ và tên<input name="name" autocomplete="name" required></label><label>Email<input type="email" name="email" autocomplete="email" required></label>
      <label>Nội dung<textarea name="message" rows="5" required></textarea></label><button class="button red">Gửi lời nhắn mẫu</button>
    </form>
    <aside class="order-box"><h2>Trợ giúp</h2>
      <details class="info"><summary>Tìm và lưu sản phẩm</summary><p>Dùng thanh tìm kiếm hoặc bộ lọc. Bấm biểu tượng trái tim để lưu sản phẩm.</p></details>
      <details class="info"><summary>Chỉnh sửa giỏ hàng</summary><p>Mở giỏ hàng để đổi số lượng hoặc xóa sản phẩm đã chọn.</p></details>
      <details class="info"><summary>Đơn hàng mẫu</summary><p>Trang đặt hàng mô phỏng xác nhận đơn và xóa giỏ trên trình duyệt.</p></details>
    </aside>
  </div>`;
}

const templates = { index: home, shop, product: productDetail, cart: cartPage, checkout: checkoutPage, wishlist, blog, article, contact };
const main = get('#main');
const dialog = get('#dialog');
let statusTimer;

function showStatus(message) {
  clearTimeout(statusTimer);
  const status = get('#status');
  status.textContent = message;
  status.hidden = false;
  statusTimer = setTimeout(() => { status.hidden = true; }, 3300);
}

function openDialog(title, body) {
  dialog.innerHTML = `<div class="dialog-top"><h2 id="dialog-title">${escape(title)}</h2><form method="dialog"><button class="icon" aria-label="Đóng">${icons('close')}</button></form></div><div class="dialog-body">${body}</div>`;
  if (!dialog.open) dialog.showModal();
}

function cleanStorage() {
  favorites = Array.isArray(favorites) ? favorites.filter((id) => productById(id)) : [];
  cart = Array.isArray(cart) ? cart.filter((row) => row && productById(row.id) && storedSizes.has(row.size) && Number.isInteger(row.qty) && row.qty > 0 && row.qty <= 99) : [];
  cart = cart.map((row) => ({ ...row, color: colorFor(productById(row.id), row.color)?.id ?? '' }));
}

cleanStorage();
renderHeader();
renderFooter();
main.innerHTML = templates[page]();
if (page === 'index') {
  renderHero();
  initCampaignVideos();
  setInterval(updateTimers, 1000);
  const header = get('#header');
  const refreshHeader = () => header.classList.toggle('solid', scrollY > 64);
  refreshHeader();
  addEventListener('scroll', refreshHeader, { passive: true });
}
if (page === 'shop') renderResults();
desktop.addEventListener('change', ({ matches }) => {
  document.querySelectorAll('.dept').forEach((menu) => { menu.open = matches; });
});

document.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  if (button.dataset.cardColor) {
    const entry = button.closest('[data-product]');
    const product = productById(entry.dataset.product);
    const color = colorFor(product, button.dataset.cardColor);
    const image = entry.querySelector('.product-image');
    image.innerHTML = media(colorImage(product, color), 'Ảnh sản phẩm');
    image.href = productUrl(product, color);
    entry.querySelector('.product-title').href = image.href;
    entry.querySelector('.card-color-name').textContent = color.name;
    entry.querySelectorAll('[data-card-color]').forEach((swatch) => {
      swatch.setAttribute('aria-pressed', swatch === button);
    });
  }

  if (button.dataset.fav) {
    const id = button.dataset.fav;
    const saved = favorites.includes(id);
    favorites = saved ? favorites.filter((item) => item !== id) : [...favorites, id];
    write('favorites', favorites);
    updateCounts();
    if (page === 'wishlist') {
      main.innerHTML = wishlist();
      (main.querySelector('[data-fav]') ?? main).focus();
    } else {
      document.querySelectorAll(`[data-fav="${id}"]`).forEach((item) => item.setAttribute('aria-pressed', !saved));
    }
    showStatus(saved ? 'Đã bỏ khỏi danh sách yêu thích.' : 'Đã lưu vào danh sách yêu thích.');
  }

  if (button.hasAttribute('data-remove')) {
    cart.splice(Number(button.dataset.remove), 1);
    write('cart', cart);
    updateCounts();
    main.innerHTML = cartPage();
    (main.querySelector('[data-remove]') ?? main).focus();
    showStatus('Đã xóa sản phẩm khỏi giỏ hàng.');
  }

  if (button.dataset.action === 'menu') {
    const links = mainNav.map(([id, label]) => {
      const href = id === 'index' ? homeUrl() : id === 'shop' ? shopUrl('', activeGroup) : id + '.html';
      return `<a href="${href}">${label}</a>`;
    });
    openDialog('Điều hướng', `<nav class="dialog-links">${links.join('')}${audiences.map((name, index) => `<a href="${shopUrl('', index)}">${name}</a>`).join('')}</nav>`);
  }

  if (button.dataset.action === 'account') {
    openDialog('Tài khoản', '<p>Trên bản mẫu, giỏ hàng và mục yêu thích được lưu trên trình duyệt.</p><div class="all"><a class="button outline" href="wishlist.html">Xem danh sách yêu thích</a></div>');
  }

  if (button.dataset.action === 'search') {
    openDialog('Tìm kiếm sản phẩm', searchForm());
    dialog.querySelector('input[type="search"]').focus();
  }
});

document.addEventListener('change', (event) => {
  const control = event.target;
  if (control.id === 'filter-price' || control.id === 'sort') renderResults();
  if (control.hasAttribute('data-qty')) control.value = cart[Number(control.dataset.qty)].qty;
  if (control.name === 'color' && control.form?.dataset.form === 'add') {
    const product = productById(control.form.dataset.id);
    const color = colorFor(product, control.value);
    get('#color-name').textContent = color.name;
    get('#detail-image').innerHTML = media(colorImage(product, color), 'Ảnh sản phẩm', true);
  }
});

document.addEventListener('input', (event) => {
  const control = event.target;
  if (!control.hasAttribute('data-qty') || !Number.isInteger(control.valueAsNumber)) return;
  const index = Number(control.dataset.qty);
  const row = cart[index];
  row.qty = Math.min(99, Math.max(1, control.valueAsNumber));
  write('cart', cart);
  get('#line-' + index).textContent = currency(productById(row.id).price * row.qty);
  get('#total').textContent = currency(cartTotal());
  updateCounts();
});

document.addEventListener('submit', (event) => {
  const form = event.target;
  const mode = form.dataset.form;
  if (!mode) return;
  event.preventDefault();

  if (mode === 'add') {
    const data = new FormData(form);
    const id = form.dataset.id;
    const product = productById(id);
    const size = data.get('size');
    const color = colorFor(product, data.get('color'))?.id ?? '';
    const qty = Number(data.get('qty'));
    if (!sizesFor(product).includes(size) || !Number.isInteger(qty) || qty < 1 || qty > 99) return;
    const existing = cart.find((row) => row.id === id && row.size === size && row.color === color);
    if (existing) existing.qty = Math.min(99, existing.qty + qty);
    else cart.push({ id, size, color, qty });
    write('cart', cart);
    updateCounts();
    showStatus('Đã thêm sản phẩm vào giỏ hàng.');
  }

  if (mode === 'order') {
    const orderCode = 'PC-' + Date.now().toString(36).toUpperCase();
    cart = [];
    write('cart', cart);
    updateCounts();
    main.innerHTML = `${banner('Đã đặt hàng mẫu')}<div class="wrap">${empty('Mã đơn mẫu ' + orderCode + '. Cảm ơn bạn đã dùng thử PucciCot.')}</div>`;
    main.focus();
  }

  if (mode === 'contact' || mode === 'newsletter') {
    form.reset();
    showStatus(mode === 'contact' ? 'Đã hoàn tất gửi lời nhắn mẫu.' : 'Đã hoàn tất đăng ký nhận tin mẫu.');
  }
});
