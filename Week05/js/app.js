// ===== 1. MOBILE MENU (WEEK 02) =====
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', function () {
    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // Close the menu after choosing a link on a small screen.
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
    });
  });
}

// ===== 1b. DARK MODE (WEEK 05) =====
const THEME_KEY = 'lankaExplorerTheme';
const themeToggle = document.querySelector('.theme-toggle');

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark', isDark);
  if (themeToggle) {
    themeToggle.textContent = isDark ? 'Light mode' : 'Dark mode';
    themeToggle.setAttribute('aria-pressed', String(isDark));
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', function () {
    const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    safeSet(THEME_KEY, newTheme);
    applyTheme(newTheme);
  });
}

const savedTheme = safeGet(THEME_KEY);
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

// ===== 2. LOAD DATA =====
let destinationsCache = null;

async function loadDestinations() {
  if (destinationsCache !== null) {
    return destinationsCache;
  }

  const response = await fetch('data/destinations.json');
  if (!response.ok) {
    throw new Error('Could not load destinations (status ' + response.status + ')');
  }

  const destinations = await response.json();
  if (!Array.isArray(destinations)) {
    throw new Error('destinations.json must contain an array.');
  }

  destinationsCache = destinations;
  return destinations;
}

// ===== 3. HELPER FUNCTIONS =====
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function safeGet(key) {
  try { return localStorage.getItem(key); } catch (error) { return null; }
}

function safeSet(key, value) {
  try { localStorage.setItem(key, value); } catch (error) { return false; }
  return true;
}

// Responsive WebP image with a JPEG fallback (Lighthouse image-delivery fix).
function pictureHtml(place, sizes, eager) {
  const fullWebp = escapeHtml(place.imageWebp || place.image);
  const smallWebp = escapeHtml(place.imageSmallWebp || place.imageWebp || place.image);
  const fullJpg = escapeHtml(place.image);
  const smallJpg = escapeHtml(place.imageSmall || place.image);
  const safeSizes = escapeHtml(sizes);
  const loading = eager ? 'loading="eager"' : 'loading="lazy"';
  return `
    <picture>
      <source type="image/webp" srcset="${smallWebp} 600w, ${fullWebp} 1200w" sizes="${safeSizes}">
      <img src="${fullJpg}" srcset="${smallJpg} 600w, ${fullJpg} 1200w" sizes="${safeSizes}" alt="${escapeHtml(place.name)}" ${loading} decoding="async">
    </picture>
  `;
}

// 0 becomes "Free", 35 becomes "USD 35".
function formatFee(fee) {
  if (fee === 0) {
    return 'Free';
  }
  return 'USD ' + fee;
}

// Week 03 extension: four price bands.
function getPriceLabel(fee) {
  if (fee === 0) {
    return 'Free';
  } else if (fee <= 15) {
    return 'Budget';
  } else if (fee <= 30) {
    return 'Mid-range';
  } else {
    return 'Premium';
  }
}

function priceBand(fee, mode) {
  if (fee === 0) {
    return '';  // avoids the "Free (Free)" repetition
  }
  return mode === 'card' ? ' · ' + getPriceLabel(fee) : ' (' + getPriceLabel(fee) + ')';
}

function getCategoryClass(category) {
  switch (category) {
    case 'Heritage': return 'badge-heritage';
    case 'Beach': return 'badge-beach';
    case 'Nature': return 'badge-nature';
    case 'Wildlife': return 'badge-wildlife';
    default: return 'badge-other';
  }
}

// Week 04 extension: a small icon for each WMO weather code.
function getWeatherIcon(code) {
  if (code === 0) return '☀️';
  if (code <= 3) return '⛅';
  if (code === 45 || code === 48) return '🌫️';
  if (code >= 51 && code <= 57) return '🌦️';
  if (code >= 61 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 80 && code <= 82) return '🌦️';
  if (code >= 95) return '⛈️';
  return '🌡️';
}

function showLoading(element, text) {
  element.innerHTML = `
    <div class="loading">
      <span class="spinner" aria-hidden="true"></span>
      <span>${escapeHtml(text)}</span>
    </div>
  `;
}

function showError(element, text) {
  element.innerHTML = `<p class="error">${escapeHtml(text)}</p>`;
}

// Week 04/05 extensions: optional LKR price and optional card trip button.
function createCard(place, rate, tripEnabled) {
  const card = document.createElement('article');
  card.className = 'card';
  const showLkr = typeof formatLkr === 'function' && rate && place.entryFeeUSD > 0;
  const lkrHtml = showLkr
    ? `<span class="fee-lkr"> ≈ ${formatLkr(place.entryFeeUSD * rate)}</span>`
    : '';

  let tripButtonHtml = '';
  if (tripEnabled && typeof isInTrip === 'function') {
    const added = isInTrip(place.id);
    tripButtonHtml = `
      <button type="button" class="add-to-trip-card${added ? ' added' : ''}"
              data-id="${place.id}" aria-pressed="${added}">
        ${added ? '✓ In trip' : '+ Add to trip'}
      </button>
    `;
  }

  card.innerHTML = `
    ${pictureHtml(place, '(max-width: 768px) 90vw, 280px')}
    <h3>${escapeHtml(place.name)}</h3>
    <p class="meta">
      <span class="badge ${getCategoryClass(place.category)}">${escapeHtml(place.category)}</span>
      ${escapeHtml(place.district)} District
    </p>
    <p class="description">${escapeHtml(place.description)}</p>
    <p class="fee">Entry: ${formatFee(place.entryFeeUSD)}${lkrHtml}${priceBand(place.entryFeeUSD, 'card')}</p>
    <div class="card-actions">
      <a href="details.html?id=${place.id}">View details</a>
      ${tripButtonHtml}
    </div>
  `;

  return card;
}

// ===== 4. HOME PAGE =====
async function initHomePage() {
  const featuredSection = document.querySelector('#featured');
  if (!featuredSection) return;

  const status = document.querySelector('#featured-status');
  if (status) {
    if (typeof showLoading === 'function') {
      showLoading(status, 'Loading featured destinations...');
    } else {
      status.textContent = 'Loading featured destinations...';
    }
  }

  try {
    const destinations = await loadDestinations();
    const featured = destinations.filter(function (place) { return place.featured === true; });
    if (status) status.remove();

    const tripEnabled = typeof isInTrip === 'function';
    for (const place of featured) {
      featuredSection.appendChild(createCard(place, null, tripEnabled));
    }

    // Week 05 extension: add/remove directly from a Home card.
    if (tripEnabled) {
      featuredSection.addEventListener('click', function (event) {
        const button = event.target.closest('.add-to-trip-card');
        if (!button) return;
        const id = Number(button.dataset.id);
        if (isInTrip(id)) {
          removeFromTrip(id);
        } else {
          addToTrip(id);
        }
        if (typeof refreshCardTripButtons === 'function') refreshCardTripButtons();
      });
    }
  } catch (error) {
    if (status) {
      if (typeof showError === 'function') {
        showError(status, 'Featured destinations could not be loaded.');
      } else {
        status.innerHTML = '<p class="error">Featured destinations could not be loaded.</p>';
      }
    }
    console.error(error);
  }
}

// ===== 5. DESTINATIONS PAGE =====
async function initDestinationsPage() {
  const list = document.querySelector('#destination-list');
  if (!list) return;

  const searchInput = document.querySelector('#search');
  const categorySelect = document.querySelector('#category');
  const sortSelect = document.querySelector('#sort');
  const resultCount = document.querySelector('#result-count');
  const clearButton = document.querySelector('#clear-filters');
  let allDestinations = [];

  if (typeof showLoading === 'function') {
    showLoading(list, 'Loading destinations...');
  } else {
    list.innerHTML = '<p class="no-results">Loading destinations...</p>';
  }

  try {
    allDestinations = await loadDestinations();
  } catch (error) {
    if (typeof showError === 'function') {
      showError(list, 'Sorry, destinations could not be loaded. Please try again later.');
    } else {
      list.innerHTML = '<p class="error">Sorry, destinations could not be loaded.</p>';
    }
    console.error(error);
    return;
  }

  // Week 04 extension: show the rupee price on every card. USD still works if this fails.
  let rate = null;
  if (typeof getUsdToLkrRate === 'function') {
    try {
      rate = await getUsdToLkrRate();
    } catch (error) {
      console.error(error);
    }
  }

  if (typeof showAllDestinationsMap === 'function') {
    showAllDestinationsMap(allDestinations);
  }

  function updateList() {
    const searchText = searchInput.value.trim().toLowerCase();
    const category = categorySelect.value;
    const sortBy = sortSelect.value;

    // 1. FILTER: search name, district and description (Week 03 extension).
    const results = allDestinations.filter(function (place) {
      const haystack = [
        place.name,
        place.district,
        place.description,
        place.category
      ].join(' ').toLowerCase();
      const matchesSearch = haystack.includes(searchText);
      const matchesCategory = category === 'all' || place.category === category;
      return matchesSearch && matchesCategory;
    });

    // 2. SORT the filtered copy.
    if (sortBy === 'name') {
      results.sort(function (a, b) { return a.name.localeCompare(b.name); });
    } else if (sortBy === 'fee-low') {
      results.sort(function (a, b) { return a.entryFeeUSD - b.entryFeeUSD; });
    } else if (sortBy === 'fee-high') {
      results.sort(function (a, b) { return b.entryFeeUSD - a.entryFeeUSD; });
    }

    // 3. DRAW the cards.
    list.innerHTML = '';
    if (results.length === 0) {
      list.innerHTML = '<p class="no-results">No destinations match your search.</p>';
    } else {
      const tripEnabled = typeof isInTrip === 'function';
      for (const place of results) {
        list.appendChild(createCard(place, rate, tripEnabled));
      }
    }

    resultCount.textContent = `Showing ${results.length} of ${allDestinations.length} destinations`;

    // Week 04 extension: only the matching destinations stay on the map.
    if (typeof updateMapMarkers === 'function') {
      updateMapMarkers(results);
    }
  }

  searchInput.addEventListener('input', updateList);
  categorySelect.addEventListener('change', updateList);
  sortSelect.addEventListener('change', updateList);

  // Week 03 extension: reset all three controls with one button.
  if (clearButton) {
    clearButton.addEventListener('click', function () {
      searchInput.value = '';
      categorySelect.value = 'all';
      sortSelect.value = 'name';
      updateList();
      searchInput.focus();
    });
  }

  // Week 05 extension: add/remove directly from a Destinations card.
  if (typeof addToTrip === 'function' && typeof removeFromTrip === 'function') {
    list.addEventListener('click', function (event) {
      const button = event.target.closest('.add-to-trip-card');
      if (!button) return;
      const id = Number(button.dataset.id);
      if (isInTrip(id)) {
        removeFromTrip(id);
      } else {
        addToTrip(id);
      }
      if (typeof refreshCardTripButtons === 'function') refreshCardTripButtons();
    });
  }

  updateList();
}

// ===== 5b. API: WEATHER (OPEN-METEO) =====
function describeWeather(code) {
  if (code === 0) {
    return 'Clear sky';
  } else if (code <= 3) {
    return 'Partly cloudy';
  } else if (code === 45 || code === 48) {
    return 'Foggy';
  } else if (code >= 51 && code <= 57) {
    return 'Drizzle';
  } else if (code >= 61 && code <= 67) {
    return 'Rain';
  } else if (code >= 71 && code <= 77) {
    return 'Snow';
  } else if (code >= 80 && code <= 82) {
    return 'Rain showers';
  } else if (code >= 95) {
    return 'Thunderstorm';
  } else {
    return 'Mixed conditions';
  }
}

async function showWeather(place) {
  const box = document.querySelector('#weather');
  if (!box) return;

  showLoading(box, 'Loading weather...');

  const url = 'https://api.open-meteo.com/v1/forecast'
    + `?latitude=${place.lat}&longitude=${place.lng}`
    + '&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code'
    + '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max'
    + '&timezone=Asia%2FColombo&forecast_days=3';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Weather API error (status ' + response.status + ')');
    }
    const data = await response.json();
    const current = data.current;
    const daily = data.daily;

    if (!current || !daily || !Array.isArray(daily.time)) {
      throw new Error('Unexpected weather API response.');
    }

    let forecastHtml = '';
    for (let i = 0; i < daily.time.length; i++) {
      const dayName = new Date(daily.time[i] + 'T00:00:00').toLocaleDateString('en-GB', {
        weekday: 'short', day: 'numeric', month: 'short'
      });
      const code = daily.weather_code[i];
      const rain = daily.precipitation_probability_max[i] ?? 0;
      forecastHtml += `
        <div class="forecast-day">
          <strong>${dayName}</strong>
          <p><span class="weather-icon">${getWeatherIcon(code)}</span>${describeWeather(code)}</p>
          <p>${Math.round(daily.temperature_2m_max[i])}° / ${Math.round(daily.temperature_2m_min[i])}°C</p>
          <p>Rain: ${rain}%</p>
        </div>
      `;
    }

    box.innerHTML = `
      <div class="weather-now">
        <p class="temp"><span class="weather-icon">${getWeatherIcon(current.weather_code)}</span>${Math.round(current.temperature_2m)}°C</p>
        <p>${describeWeather(current.weather_code)}</p>
        <p>Humidity ${current.relative_humidity_2m}% · Wind ${current.wind_speed_10m} km/h</p>
      </div>
      <div class="forecast">${forecastHtml}</div>
    `;
  } catch (error) {
    showError(box, 'Weather is unavailable right now. Please try again later.');
    console.error(error);
  }
}

// ===== 5c. API: CURRENCY (FRANKFURTER) =====
let usdToLkrRate = null;   // cached rate, empty until first loaded

async function getUsdToLkrRate() {
  if (usdToLkrRate !== null) {
    return usdToLkrRate;
  }

  const sources = [
    {
      url: 'https://api.frankfurter.dev/v2/rate/usd/lkr',
      read: function (data) { return Number(data.rate); }
    },
    {
      url: 'https://open.er-api.com/v6/latest/USD',
      read: function (data) { return Number(data.rates && data.rates.LKR); }
    }
  ];

  let lastError = null;
  for (const source of sources) {
    try {
      const response = await fetch(source.url);
      if (!response.ok) {
        throw new Error('Currency API error (status ' + response.status + ')');
      }
      const data = await response.json();
      const rate = source.read(data);
      if (!Number.isFinite(rate) || rate <= 0) {
        throw new Error('Currency API returned an invalid rate.');
      }
      usdToLkrRate = rate;
      return usdToLkrRate;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('No exchange-rate service is available.');
}

function formatLkr(amount) {
  return 'Rs. ' + Math.round(amount).toLocaleString('en-LK');
}

async function showFeeInLkr(place) {
  const feeBox = document.querySelector('#fee-lkr');
  if (!feeBox || place.entryFeeUSD === 0) return;

  try {
    const rate = await getUsdToLkrRate();
    feeBox.textContent = ` ≈ ${formatLkr(place.entryFeeUSD * rate)}`;
  } catch (error) {
    feeBox.textContent = '';   // fail quietly: the USD price is still shown
    console.error(error);
  }
}

// ===== 5d. API: MAPS (LEAFLET + OPENSTREETMAP) =====
let allDestinationsMap = null;
let allMapMarkers = null;

function addBaseLayer(map) {
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
}

function showMap(place) {
  const mapBox = document.querySelector('#map');
  if (!mapBox) return;

  if (typeof L === 'undefined') {
    showError(mapBox, 'The map could not be loaded.');
    return;
  }

  mapBox.textContent = '';
  const map = L.map('map').setView([place.lat, place.lng], 13);
  addBaseLayer(map);

  L.marker([place.lat, place.lng])
    .addTo(map)
    .bindPopup(`<strong>${escapeHtml(place.name)}</strong><br>${escapeHtml(place.district)} District`)
    .openPopup();

  setTimeout(function () { map.invalidateSize(); }, 100);
}

function showAllDestinationsMap(destinations) {
  const mapBox = document.querySelector('#all-map');
  if (!mapBox) return;

  if (typeof L === 'undefined') {
    showError(mapBox, 'The map could not be loaded.');
    return;
  }

  mapBox.textContent = '';
  allDestinationsMap = L.map('all-map').setView([7.6, 80.7], 7);
  addBaseLayer(allDestinationsMap);
  allMapMarkers = L.layerGroup().addTo(allDestinationsMap);
  updateMapMarkers(destinations);
}

function updateMapMarkers(destinations) {
  if (typeof L === 'undefined' || !allMapMarkers || !allDestinationsMap) return;

  allMapMarkers.clearLayers();
  const points = [];

  for (const place of destinations) {
    L.marker([place.lat, place.lng])
      .addTo(allMapMarkers)
      .bindPopup(`
        <strong>${escapeHtml(place.name)}</strong><br>
        ${escapeHtml(place.category)}<br>
        <a href="details.html?id=${place.id}">View details</a>
      `);
    points.push([place.lat, place.lng]);
  }

  if (points.length > 0) {
    allDestinationsMap.fitBounds(points, { padding: [30, 30], maxZoom: 10 });
  } else {
    allDestinationsMap.setView([7.6, 80.7], 7);
  }
}

// ===== 5e. MY TRIP STORAGE (LOCALSTORAGE) =====
const TRIP_KEY = 'lankaExplorerTrip';
const TRAVELLERS_KEY = 'lankaExplorerTravellers';

function getTrip() {
  const saved = safeGet(TRIP_KEY);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.map(Number).filter(Number.isFinite) : [];
  } catch (error) {
    return [];
  }
}

function saveTrip(trip) {
  safeSet(TRIP_KEY, JSON.stringify(trip));
  updateTripCount();
}

function isInTrip(id) {
  return getTrip().includes(id);
}

function addToTrip(id) {
  const trip = getTrip();
  if (!trip.includes(id)) {
    trip.push(id);
    saveTrip(trip);
  }
}

function removeFromTrip(id) {
  const trip = getTrip().filter(function (tripId) { return tripId !== id; });
  saveTrip(trip);
}

function updateTripCount() {
  const link = document.querySelector('nav a[href="trip.html"]');
  if (!link) return;
  const count = getTrip().length;
  link.textContent = count > 0 ? `My Trip (${count})` : 'My Trip';
}

function setupTripButton(place) {
  const button = document.querySelector('#add-to-trip');
  if (!button) return;

  function refreshButton() {
    if (isInTrip(place.id)) {
      button.textContent = '✓ In My Trip (click to remove)';
      button.classList.add('added');
      button.setAttribute('aria-pressed', 'true');
    } else {
      button.textContent = 'Add to My Trip';
      button.classList.remove('added');
      button.setAttribute('aria-pressed', 'false');
    }
  }

  button.addEventListener('click', function () {
    if (isInTrip(place.id)) {
      removeFromTrip(place.id);
    } else {
      addToTrip(place.id);
    }
    refreshButton();
    if (typeof refreshCardTripButtons === 'function') refreshCardTripButtons();
  });

  refreshButton();
}

function refreshCardTripButtons() {
  document.querySelectorAll('.add-to-trip-card').forEach(function (button) {
    const id = Number(button.dataset.id);
    const added = isInTrip(id);
    button.classList.toggle('added', added);
    button.setAttribute('aria-pressed', String(added));
    button.textContent = added ? '✓ In trip' : '+ Add to trip';
  });
}

// ===== 6b. MY TRIP PAGE =====
async function initTripPage() {
  const tableBody = document.querySelector('#trip-table tbody');
  if (!tableBody) return;

  const summary = document.querySelector('#trip-summary');
  const highlight = document.querySelector('#trip-highlight');
  const travellersInput = document.querySelector('#travellers');
  const totalUsdCell = document.querySelector('#total-usd');
  const totalLkrCell = document.querySelector('#total-lkr');
  const clearButton = document.querySelector('#clear-trip');

  showLoading(summary, 'Loading your trip...');

  let allDestinations = [];
  try {
    allDestinations = await loadDestinations();
  } catch (error) {
    showError(summary, 'Sorry, your trip could not be loaded.');
    console.error(error);
    return;
  }

  // The rupee figures are a bonus: the page still works in USD if this fails.
  let rate = null;
  try {
    rate = await getUsdToLkrRate();
  } catch (error) {
    console.error(error);
  }

  travellersInput.value = safeGet(TRAVELLERS_KEY) || 1;

  function renderTrip() {
    const tripIds = getTrip();
    const places = allDestinations.filter(function (place) { return tripIds.includes(place.id); });
    const travellers = Math.max(1, Math.min(20, Number(travellersInput.value) || 1));
    if (String(travellers) !== travellersInput.value) travellersInput.value = travellers;

    tableBody.innerHTML = '';
    if (places.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" class="no-results">
            Your trip is empty. <a href="destinations.html">Browse destinations</a> to add some.
          </td>
        </tr>
      `;
    }

    let totalPerPerson = 0;
    for (const place of places) {
      totalPerPerson += place.entryFeeUSD;
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><a href="details.html?id=${place.id}">${escapeHtml(place.name)}</a></td>
        <td><span class="badge ${getCategoryClass(place.category)}">${escapeHtml(place.category)}</span></td>
        <td>${formatFee(place.entryFeeUSD)}</td>
        <td>${rate ? formatLkr(place.entryFeeUSD * rate) : '–'}</td>
        <td><button type="button" class="remove-btn" data-id="${place.id}">Remove</button></td>
      `;
      tableBody.appendChild(row);
    }

    const groupTotal = totalPerPerson * travellers;
    totalUsdCell.textContent = 'USD ' + groupTotal;
    totalLkrCell.textContent = rate ? formatLkr(groupTotal * rate) : 'Unavailable';
    summary.textContent = `${places.length} destination(s) for ${travellers} traveller(s).`;
    if (rate) {
      summary.textContent += ` Exchange rate used: 1 USD = Rs. ${rate.toFixed(2)}.`;
    } else {
      summary.textContent += ' Live LKR conversion is unavailable; USD totals still work.';
    }

    // Week 05 extension: most expensive place and its share of the total.
    if (highlight) {
      if (places.length === 0 || totalPerPerson === 0) {
        highlight.textContent = 'Add a paid destination to see a cost breakdown.';
      } else {
        const mostExpensive = places.slice().sort(function (a, b) {
          return b.entryFeeUSD - a.entryFeeUSD;
        })[0];
        const percentage = Math.round((mostExpensive.entryFeeUSD / totalPerPerson) * 100);
        highlight.textContent = `Highest entry fee: ${mostExpensive.name} (${formatFee(mostExpensive.entryFeeUSD)}), ${percentage}% of the per-person total.`;
      }
    }

    if (clearButton) clearButton.hidden = places.length === 0;
  }

  // One listener on the table handles every Remove button (event delegation).
  tableBody.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-btn')) {
      const id = Number(event.target.dataset.id);
      removeFromTrip(id);
      renderTrip();
    }
  });

  travellersInput.addEventListener('input', function () {
    safeSet(TRAVELLERS_KEY, travellersInput.value);
    renderTrip();
  });

  if (clearButton) {
    clearButton.addEventListener('click', function () {
      if (confirm('Remove every destination from your trip?')) {
        saveTrip([]);
        renderTrip();
      }
    });
  }

  renderTrip();
}

// ===== 6. DETAILS PAGE =====
async function initDetailsPage() {
  const container = document.querySelector('#destination');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id'));

  container.classList.add('destination-loading');
  if (typeof showLoading === 'function') {
    showLoading(container, 'Loading destination...');
  } else {
    container.innerHTML = '<p class="no-results">Loading destination...</p>';
  }

  try {
    const destinations = await loadDestinations();
    const place = destinations.find(function (item) { return item.id === id; });

    if (!place) {
      container.classList.remove('destination-loading');
      container.innerHTML = `
        <h1>Destination not found</h1>
        <p><a href="destinations.html">Back to all destinations</a></p>
      `;
      const button = document.querySelector('#add-to-trip');
      if (button) button.hidden = true;
      return;
    }

    document.title = `${place.name} | Lanka Explorer`;

    container.innerHTML = `
      ${pictureHtml(place, '(max-width: 768px) 90vw, 1100px', true)}
      <h1>${escapeHtml(place.name)}</h1>
      <p class="meta">
        <span class="badge ${getCategoryClass(place.category)}">${escapeHtml(place.category)}</span>
        ${escapeHtml(place.district)} District
      </p>
      <p>${escapeHtml(place.description)}</p>
      <h2>Quick Facts</h2>
      <ul>
        <li><strong>Best time to visit:</strong> ${escapeHtml(place.bestTime)}</li>
        <li><strong>Entry fee:</strong> ${formatFee(place.entryFeeUSD)}<span id="fee-lkr"></span>${priceBand(place.entryFeeUSD, 'details')}</li>
        <li><strong>Coordinates:</strong> ${place.lat}, ${place.lng}</li>
        <li><strong>Plan with:</strong> live weather, an interactive map and My Trip</li>
      </ul>
    `;
    container.classList.remove('destination-loading');

    if (typeof showWeather === 'function') showWeather(place);
    if (typeof showFeeInLkr === 'function') showFeeInLkr(place);
    if (typeof showMap === 'function') showMap(place);
    if (typeof setupTripButton === 'function') setupTripButton(place);
  } catch (error) {
    container.classList.remove('destination-loading');
    if (typeof showError === 'function') {
      showError(container, 'Sorry, this destination could not be loaded.');
    } else {
      container.innerHTML = '<p class="error">Sorry, this destination could not be loaded.</p>';
    }
    console.error(error);
  }
}

// ===== 7. ENQUIRY FORM =====
function initEnquiryForm() {
  const form = document.querySelector('#enquiry-form');
  if (!form) return;

  const message = document.querySelector('#form-message');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const date = document.querySelector('#date').value;
    const people = Number(document.querySelector('#people').value);
    const text = document.querySelector('#message').value.trim();
    const interests = form.querySelectorAll('input[name="interest"]:checked');
    const errors = [];

    if (name.length < 3) {
      errors.push('Please enter your full name (at least 3 characters).');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errors.push('Please enter a valid email address.');
    }

    if (date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(date + 'T00:00:00') < today) {
        errors.push('The travel date cannot be in the past.');
      }
    }

    if (!Number.isFinite(people) || people < 1 || people > 20) {
      errors.push('Number of travellers must be between 1 and 20.');
    }

    if (interests.length === 0) {
      errors.push('Please choose at least one interest.');
    }

    // Week 03 extension: message length rule.
    if (text.length > 500) {
      errors.push('Your message must be no longer than 500 characters.');
    }

    if (errors.length > 0) {
      message.className = 'form-error';
      message.innerHTML = '<ul>' + errors.map(function (item) {
        return `<li>${escapeHtml(item)}</li>`;
      }).join('') + '</ul>';
    } else {
      message.className = 'form-success';
      message.textContent = `Thank you, ${escapeHtml(name)}! We will contact you at ${escapeHtml(email)} within 24 hours.`;
      form.reset();
    }
  });
}

// ===== 8. START THE APP =====
updateTripCount();
initHomePage();
initDestinationsPage();
initDetailsPage();
initTripPage();
initEnquiryForm();
