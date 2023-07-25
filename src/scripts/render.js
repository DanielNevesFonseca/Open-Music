import { filterByRange,  filterByCategory } from "./filter.js";

function createCard(product) {
  const card = document.createElement('li');
  const cardImage = document.createElement('img');
  const cardBandNameAndYear = document.createElement('p');
  const cardAlbumTitle = document.createElement('h2');

  const buyContainer = document.createElement('span');
  const productPrice = document.createElement('p');
  const buyButton = document.createElement('button');

  card.classList.add('render-cards__item');
  cardImage.classList.add('item__image');
  cardBandNameAndYear.classList.add('item__name-and-year', 'text3');
  cardAlbumTitle.classList.add('item__album-title', 'text2');

  buyContainer.classList.add('item__buy-container');
  productPrice.classList.add('price', 'text2');
  buyButton.classList.add('btn-buy', 'btn-default');

  cardImage.src = product.img;
  cardImage.alt = `Imagem do álbum ${product.title}`;


  cardBandNameAndYear.innerText = `${product.band} ${product.year}`;
  cardAlbumTitle.innerText = product.title;
  productPrice.innerText = "R$ " + product.price.toFixed(2);
  buyButton.innerText = 'Comprar';

  buyContainer.append(productPrice, buyButton);
  card.append(cardImage, cardBandNameAndYear, cardAlbumTitle, buyContainer);

  return card;
}

export function createCategoryButtons(categories) {
  const buttonsContainer = document.querySelector('.manage-filters__buttons-container');
  categories.forEach((category, index) => {

      const buttonsItem = document.createElement('li');
      const button = document.createElement('button');

      button.innerText = category;

      buttonsItem.classList.add('item');
      button.classList.add('btn-default', 'item__btn');
      button.dataset.ButtonId = index + 1;

      buttonsItem.appendChild(button);
      buttonsContainer.appendChild(buttonsItem);
  })
}

export function renderCards(array) {
  const cardsContainer = document.querySelector('.render-cards__container');
  cardsContainer.innerHTML = ""
  array.forEach((card) => {
      const createdCard = createCard(card);
      cardsContainer.appendChild(createdCard);
  })
}

export function verifyMaxPrice(products) {
  const prices = [];
  products.forEach(products => {
      prices.push(products.price)
  })
  const max = Math.max(...prices);
  return max;
}

export function renderFilterByCategory(products, categories) {
  const buttons = document.querySelectorAll('.item__btn');
  
  buttons.forEach((button) => {

      button.addEventListener('click', (event) => {
          const buttonText = event.target.innerText; 
          if (buttonText === 'Todos') {
            renderCards(products);
            filterByRange(products);
          } else {
              let indexCategory = categories.findIndex((category) => category == buttonText);
              console.log(indexCategory);
              const filtered = filterByCategory(products, indexCategory);
              renderCards(filtered);
              filterByRange(filtered);
          }
      })
  })
}

export function renderDarkMode() {
  const darkModeButton = document.querySelector('.header__btn-dark-mode')
  const html = document.querySelector('html');
  const localStoragePreference = JSON.parse(localStorage.getItem('darkMode'));

  if (localStoragePreference) {
      darkModeButton.src = './src/assets/icons/sun-icon.svg';
      html.classList.add('dark-mode');
  } else {
      darkModeButton.src = './src/assets/icons/moon-icon.svg';
      html.classList.remove('dark-mode');
  }

  darkModeButton.addEventListener('click', () => {
      html.classList.toggle('dark-mode');
      if (html.classList.contains('dark-mode')) {
          darkModeButton.src = './src/assets/icons/sun-icon.svg';
          localStorage.setItem('darkMode', true);
      } else {
          darkModeButton.src = './src/assets/icons/moon-icon.svg';
          localStorage.setItem('darkMode', false);
      }
  })
}