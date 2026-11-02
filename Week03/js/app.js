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

// Builds one <article class="card"> from one destination object.
function createCard(place) {
  const card = document.createElement('article');
  card.className = 'card';

  card.innerHTML = `
    ${pictureHtml(place, '(max-width: 768px) 90vw, 280px')}
    <h3>${escapeHtml(place.name)}</h3>
    <p class="meta">
      <span class="badge ${getCategoryClass(place.category)}">${escapeHtml(place.category)}</span>
      ${escapeHtml(place.district)} District
    </p>
    <p class="description">${escapeHtml(place.description)}</p>
    <p class="fee">Entry: ${formatFee(place.entryFeeUSD)}${priceBand(place.entryFeeUSD, 'card')}</p>
    <div class="card-actions">
      <a href="details.html?id=${place.id}">View details</a>
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
initHomePage();
initDestinationsPage();
initDetailsPage();
initEnquiryForm();
