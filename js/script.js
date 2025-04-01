// script.js

import { renderCards } from './ui.js';
import { filterBySearch, filterByCategory, filterFavorites } from './filters.js';
import { cards } from './data.js';

// Use a local, mutable deck
let deck = [...cards];

const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-select');
const favoriteToggle = document.getElementById('favorite-toggle');

// New card form inputs
const titleInput = document.getElementById('new-title');
const categoryInput = document.getElementById('new-category');
const descriptionInput = document.getElementById('new-description');
const codeInput = document.getElementById('new-code');
const tagsInput = document.getElementById('new-tags');
const addCardBtn = document.getElementById('add-card-btn');

let showFavoritesOnly = false;

// Unified render with all filters applied
function applyFilters() {
  let filtered = [...deck];

  if (showFavoritesOnly) {
    filtered = filterFavorites(filtered);
  }

  const category = categorySelect.value;
  if (category !== 'All') {
    filtered = filterByCategory(filtered, category);
  }

  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    filtered = filterBySearch(filtered, searchTerm);
  }

  renderCards(filtered);
}

// Event Listeners
searchInput.addEventListener('input', applyFilters);
categorySelect.addEventListener('change', applyFilters);

favoriteToggle.addEventListener('click', () => {
  showFavoritesOnly = !showFavoritesOnly;
  favoriteToggle.textContent = showFavoritesOnly ? '⭐ Showing Favorites' : '☆ Show Favorites';
  applyFilters();
});

addCardBtn.addEventListener('click', () => {
  const newCard = {
    id: `card-${Date.now()}`,
    title: titleInput.value.trim(),
    category: categoryInput.value.trim(),
    description: descriptionInput.value.trim(),
    code: codeInput.value.trim(),
    tags: tagsInput.value.split(',').map(tag => tag.trim()).filter(Boolean),
    favorite: false
  };

  if (!newCard.title || !newCard.category || !newCard.code) {
    alert("Please fill in at least the title, category, and code.");
    return;
  }

  deck.unshift(newCard);
  clearFormInputs();
  applyFilters();
});

function clearFormInputs() {
  titleInput.value = '';
  categoryInput.value = '';
  descriptionInput.value = '';
  codeInput.value = '';
  tagsInput.value = '';
}

// Init
window.addEventListener('DOMContentLoaded', () => {
  applyFilters();
});