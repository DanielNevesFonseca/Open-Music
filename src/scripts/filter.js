import {renderCards, verifyMaxPrice} from "./render.js"

export const filterByCategory = (products, categoryToFilter) => products.filter(product => product.category == categoryToFilter);

export const filterByRange = (products) => {

  const inputRange = document.querySelector('.price-range__input');
  const price = document.querySelector('.manage-filters__price-range > p');
  const cardsContainer = document.querySelector('.render-cards__container');
  const cardItem = document.createElement('li');

  cardItem.innerText = "Nenhum Produto encontrado!";
  cardItem.classList.add('text3');
  inputRange.max = verifyMaxPrice(products);
  
  inputRange.addEventListener('input', () => {
    price.innerText = "R$" + Number(inputRange.value).toFixed(2);
    
    const filtered = products.filter(product => product.price <= inputRange.value);
    

    if(filtered.length === 0){
      cardsContainer.innerHTML = '';
      cardsContainer.appendChild(cardItem);
    } else {
      renderCards(filtered);
    }
  })
}