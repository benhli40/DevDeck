// script.js

import { renderCards } from './ui.js';
import { filterBySearch, filterByCategory, filterFavorites } from './filters.js';
import { cards } from './data.js';

// === Storage Setup ===
const STORAGE_KEY = 'devdeck-cards';

function saveDeckToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
}

function loadDeckFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

// Merge default + saved cards (avoiding duplicates)
const savedCards = loadDeckFromStorage();
const deck = [...savedCards, ...cards.filter(c => !savedCards.find(s => s.id === c.id))];

// === DOM References ===
const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-select');
const favoriteToggle = document.getElementById('favorite-toggle');

const titleInput = document.getElementById('new-title');
const categoryInput = document.getElementById('new-category');
const descriptionInput = document.getElementById('new-description');
const codeInput = document.getElementById('new-code');
const tagsInput = document.getElementById('new-tags');
const addCardBtn = document.getElementById('add-card-btn');

const resetBtn = document.getElementById('reset-deck-btn');

let showFavoritesOnly = false;

// === Core Filtering Logic ===
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

  renderCards(filtered, onFavoriteToggle);
}

// === Favorite Toggle Callback (needed in renderCards) ===
function onFavoriteToggle(cardId) {
  const card = deck.find(c => c.id === cardId);
  if (card) {
    card.favorite = !card.favorite;
    saveDeckToStorage();
    applyFilters();
  }
}

// === Form Submission ===
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
  saveDeckToStorage(); // ✅ save it
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

// === Filter & UI Events ===
searchInput.addEventListener('input', applyFilters);
categorySelect.addEventListener('change', applyFilters);

favoriteToggle.addEventListener('click', () => {
  showFavoritesOnly = !showFavoritesOnly;
  favoriteToggle.textContent = showFavoritesOnly ? '⭐ Showing Favorites' : '☆ Show Favorites';
  applyFilters();
});

// === Optional Reset Deck Button ===
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    const confirmReset = confirm("Reset DevDeck to default?");
    if (confirmReset) {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }
  });
}

// === App Init ===
window.addEventListener('DOMContentLoaded', () => {
  applyFilters();
});

const exportBtn = document.getElementById('export-btn');
const importInput = document.getElementById('import-input');

exportBtn.addEventListener('click', () => {
  const json = JSON.stringify(deck, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'devdeck-backup.json';
  link.click();

  URL.revokeObjectURL(url);
});

importInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const importedDeck = JSON.parse(e.target.result);
      if (Array.isArray(importedDeck)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(importedDeck));
        location.reload();
      } else {
        alert('Invalid DevDeck file.');
      }
    } catch (err) {
      alert('Error importing deck: ' + err.message);
    }
  };
  reader.readAsText(file);
});