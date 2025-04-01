// filters.js

export function filterBySearch(list, searchText) {
  const term = searchText.toLowerCase();
  return list.filter(card =>
    card.title.toLowerCase().includes(term) ||
    card.tags.some(tag => tag.toLowerCase().includes(term))
  );
}

export function filterByCategory(list, category) {
  return category === 'All'
    ? list
    : list.filter(card => card.category.toLowerCase() === category.toLowerCase());
}

export function filterFavorites(list) {
  return list.filter(card => card.favorite);
}