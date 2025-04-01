// filters.js

import { cards } from './data.js';

export function filterBySearch(searchText) {
  const term = searchText.toLowerCase();
  return cards.filter(card =>
    card.title.toLowerCase().includes(term) ||
    card.tags.some(tag => tag.toLowerCase().includes(term))
  );
}

export function filterByCategory(category) {
  return category === 'All'
    ? cards
    : cards.filter(card => card.category.toLowerCase() === category.toLowerCase());
}

export function filterFavorites() {
  return cards.filter(card => card.favorite);
}