// script.js

import { renderCards } from './ui.js';
import { filterBySearch, filterByCategory, filterFavorites } from './filters.js';
import { cards } from './data.js';

const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-select');
const favoriteToggle = document.getElementById('favorite-toggle');

let showFavoritesOnly = false;

// Unified render function with all filters applied
function applyFilters() {
  let filtered = [...cards];

  if (showFavoritesOnly) {
    filtered = filterFavorites();
  }

  const category = categorySelect.value;
  if (category !== 'All') {
    filtered = filtered.filter(card => card.category === category);
  }

  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    filtered = filterBySearch(searchTerm).filter(card => filtered.includes(card));
  }

  renderCards(filtered);
}

// Event listeners
searchInput.addEventListener('input', applyFilters);

categorySelect.addEventListener('change', applyFilters);

favoriteToggle.addEventListener('click', () => {
  showFavoritesOnly = !showFavoritesOnly;
  favoriteToggle.textContent = showFavoritesOnly ? '⭐ Showing Favorites' : '☆ Show Favorites';
  applyFilters();
});

// Init
window.addEventListener('DOMContentLoaded', () => {
  renderCards(cards);
});