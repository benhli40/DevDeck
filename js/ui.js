// ui.js

import { cards } from './data.js';
import { saveDeckToStorage } from './script.js';

const cardContainer = document.getElementById('card-container');

// Main render function
export function renderCards(cardList, onFavoriteToggle) {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';

  cardList.forEach(card => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');

    cardEl.innerHTML = `
      <div class="card-header">
        <h3>${card.title}</h3>
        <span class="category">${card.category}</span>
      </div>
      <p class="description">${card.description}</p>
      <pre><code>${card.code}</code></pre>
      <div class="tags">
        ${card.tags.map(tag => `<span class="tag">#${tag}</span>`).join(' ')}
      </div>
      <button class="fav-btn" data-id="${card.id}">
        ${card.favorite ? "⭐ Favorited" : "☆ Favorite"}
      </button>
    `;

    const favBtn = cardEl.querySelector('.fav-btn');
    favBtn.addEventListener('click', () => {
      if (onFavoriteToggle) onFavoriteToggle(card.id);
    });

    cardContainer.appendChild(cardEl);
  });
}