let basketList = [];
let basketCount = document.querySelector('.basket__count');
let basketText = document.querySelector('.basket-text');

document.getElementById('signout').addEventListener('click', () => {
  localStorage.setItem('isAuth', JSON.stringify(false));
  window.location.href = '../auth.html';
});


const state = new Proxy({
  basketList: localStorage.getItem('basket'),
  // basketList: [],
  products: [
  {
    id: 0,
    preview: './images/1.svg',
    title: 'Устрицы по рокфеллеровски',
    description: 'Значимость этих проблем настолько очевидна, что укрепление и развитие структуры',
    price: 2700
  },
  {
    id: 1,
    preview: './images/2.svg',
    title: 'Свиные ребрышки на гриле с зеленью',
    description: 'Не следует, однако забывать, что реализация намеченных плановых',
    price: 1600
  },
  {
    id: 2,
    preview: './images/3.svg',
    title: 'Креветки по-королевски в лимонном соке',
    description: 'Значимость этих проблем настолько очевидна, что укрепление и развитие структуры обеспечивает широкому кругу',
    price: 1820
  },
  {
    id: 3,
    preview: './images/1.svg',
    title: 'Значимость этих проблем настолько очевидна, что укрепление и развитие структуры',
    description: 'Устрицы по Русски',
    price: 1000
  }
  ],
  isBasketOpen: false,
  basketListId: null,
},{
  set: (targetObject, property, value) =>  {
    targetObject[property] = value;

    if (property === 'basketList')  {
      localStorage.setItem('basket', JSON.stringify(targetObject.basketList));
      updateBasketSum();
    }
    if (property === 'isBasketOpen') openBasket();
  }
})

const renderCards = () =>  {
  const productsList = document.querySelector('.products-list');
  productsList.innerHTML = '';

  state.products.forEach(product =>  {
    const { id, preview, title, description, price} = product;
    const productsCard = document.createElement('div');
    productsCard.classList.add('products-card');
    productsCard.setAttribute('data-id', id);

    const productsCardPreview = document.createElement('img');
    productsCardPreview.src = preview;
    productsCardPreview.classList.add('products-card__preview');

    const productsCardTitle = document.createElement('h2');
    productsCardTitle.classList.add('products-card__title');
    productsCardTitle.textContent = title;

    const productsCardDescription = document.createElement('p');
    productsCardDescription.classList.add('products-card__description');
    productsCardDescription.textContent = description;

    productsCard.appendChild(productsCardPreview);
    productsCard.appendChild(productsCardTitle);
    productsCard.appendChild(productsCardDescription);

    const productsCardBottom = document.createElement('div');
    productsCardBottom.classList.add('products-card__bottom');

    const productsCardPrice = document.createElement('span');
    productsCardPrice.classList.add('products-card__bottom-price');
    productsCardPrice.textContent = `${price} ₽`;

    const productsCardButton = document.createElement('button');
    productsCardButton.classList.add('products-card__bottom-btn');
    productsCardButton.addEventListener('click', () =>  {
      const basketListForProxy = [...state.basketList];
      const addedProductIndex = basketListForProxy.findIndex(item => item.id === id);
      if (addedProductIndex >= 0)  {
        basketListForProxy[addedProductIndex] = {
          ...basketListForProxy[addedProductIndex],
          count: basketListForProxy[addedProductIndex].count + 1
        }
      } else  {
        basketListForProxy.push({
          ...state.products[id],
          count: 1
        })
      }
      state.basketList = basketListForProxy;
      updateBasketSum();
    })

    productsCardBottom.appendChild(productsCardPrice);
    productsCardBottom.appendChild(productsCardButton);

    productsCard.appendChild(productsCardBottom);

    productsList.appendChild(productsCard);
  })
}

const openBasket = () =>  {
  if (state.isBasketOpen === false)  {
    const modal = document.querySelector('.modal');
    modal.remove();
  }
  const modal = document.createElement('div');
  modal.classList.add('modal');
  document.body.append(modal);
  modal.style.visibility = 'visible';


  const modalOverlay = document.createElement('div');
  modalOverlay.classList.add('modal__overlay');
  modal.append(modalOverlay);


  const modalInner = document.createElement('div');
  modalInner.classList.add('modal__inner');
  modal.append(modalInner);

  const modalInnerClose = document.createElement('span');
  modalInnerClose.classList.add('modal__inner-close');
  modalInner.append(modalInnerClose);
  modalInnerClose.addEventListener('click', () =>  {
    modal.remove();
    // state.isBasketOpen = false;
    });

  const modalInnerTitle = document.createElement('h3');
  modalInnerTitle.classList.add('modal__inner-title');
  modalInnerTitle.textContent = 'Корзина с выбранными товарами';
  modalInner.append(modalInnerTitle);

  const modalInnerList = document.createElement('div');
  modalInnerList.classList.add('modal__inner-list');
  modalInner.append(modalInnerList);


  state.basketList.forEach(product =>  {
    const { id, preview, title, count, price } = product;
    const productsCard = document.createElement('div');
    productsCard.classList.add('products-card');
    productsCard.setAttribute('data-id', id);

    const productsCardPreview = document.createElement('img');
    productsCardPreview.src = preview;
    productsCardPreview.classList.add('products-card__preview');
    productsCard.append(productsCardPreview);

    const productsCardTitle = document.createElement('h2');
    productsCardTitle.classList.add('products-card__title');
    productsCardTitle.textContent = title;
    productsCard.append(productsCardTitle);

    let basketCardCount = document.createElement('div');
    basketCardCount.classList.add('products-card__count', 'card__count');

    let countMinus = document.createElement('span');
    countMinus.classList.add('card__count-minus');
    countMinus.textContent = `-`;
    countMinus.id = 'plus';
    countMinus.addEventListener('click', () => {
      const basketListForProxy = [...state.basketList]
      const addedProductIndex = basketListForProxy.findIndex(item => item.id === id);
      
      if (addedProductIndex >= 0) {
        if (basketListForProxy[addedProductIndex].count > 1) {
          basketListForProxy[addedProductIndex] = {
          ...basketListForProxy[addedProductIndex],
          count: basketListForProxy[addedProductIndex].count - 1
          }
        } else {
          basketListForProxy.splice(addedProductIndex, 1);
          productsCard.remove();
          updateBasketSum();
        }
        state.basketList = basketListForProxy;
      }
    });


    let countResult = document.createElement('span');
    countResult.classList.add('card__count-result');
    countResult.textContent = product.count || 1;
    countResult.id = 'count-product';

    let countPlus = document.createElement('span');
    countPlus.classList.add('card__count-plus');
    countPlus.textContent = `+`;
    countPlus.id = 'minus';
    countPlus.addEventListener('click', () => {
      const basketListForProxy = [...state.basketList]
      const addedProductIndex = basketListForProxy.findIndex(item => item.id === id);
      
      if (addedProductIndex >= 0) {
        basketListForProxy[addedProductIndex] = {
        ...basketListForProxy[addedProductIndex],
        count: basketListForProxy[addedProductIndex].count + 1
      }
        updateBasketSum();
        state.basketList = basketListForProxy;
      }
    });


    basketCardCount.append(countMinus, countResult, countPlus);
    productsCard.append(basketCardCount);

    let basketCardBottom = document.createElement('div');
    basketCardBottom.classList.add('products-card__bottom');

    let basketCardPrice = document.createElement('span');
    basketCardPrice.classList.add('products-card__bottom-price');
    basketCardPrice.textContent = `${price * (product.count || 1)} ₽`;

    let basketCardBtn = document.createElement('button');
    basketCardBtn.classList.add('products-card__bottom-btn');
    basketCardBtn.id = 'remove-basket';
    basketCardBtn.addEventListener('click', () =>  {
      const basketListForProxy = [...state.basketList]
      const addedProductIndex = basketListForProxy.findIndex(item => item.id === id);
      if (addedProductIndex >= 0) {
        basketListForProxy.splice(addedProductIndex, 1);
        state.basketList = basketListForProxy;
        productsCard.remove();
        updateBasketSum();
      }
    })

    basketCardBottom.append(basketCardPrice, basketCardBtn);

    productsCard.append(basketCardBottom);
    modalInnerList.append(productsCard);
  })
}

const loadBasket = () =>  {
  const loadedBasket = localStorage.getItem('basket');
  if (loadedBasket)  {
    state.basketList = JSON.parse(loadedBasket);
    updateBasketSum();
  }
}

// // Пример объекта добавленного в корзину
// // let basketList = [
// //   {
// //     id: 0,
// //     preview: './images/1.svg',
// //     title: 'Устрицы по рокфеллеровски',
// //     count: 1,
// //     price: 2700
// //   },
// // ]

// функция для подсчёта общей суммы
const updateBasketSum = () =>  {
  const totalItems = state.basketList.reduce((sum, item) => sum + item.count, 0);
  const totalSum = state.basketList.reduce((sum, item) => sum + (item.price * item.count), 0);
  basketText.innerHTML = `${totalItems} товара <br> на сумму ${totalSum} ₽`;
  basketCount.innerHTML = `${totalItems}`;

  document.querySelectorAll('.products-card__bottom-price').forEach((priceElement, index) => {
    if (state.basketList[index]) {
      priceElement.textContent = `${state.basketList[index].price * state.basketList[index].count} ₽`;
    }
  });
}

const busket = document.querySelector('.header__inner-products');
busket.addEventListener('click', () =>  {
  state.isBasketOpen = true;
});

loadBasket();

window.onload = () => {
  renderCards();
  updateBasketSum();
}


let products = [
  {
    id: 0,
    preview: './images/1.svg',
    title: 'Устрицы по рокфеллеровски',
    description: 'Значимость этих проблем настолько очевидна, что укрепление и развитие структуры',
    price: 2700
  },
  {
    id: 1,
    preview: './images/2.svg',
    title: 'Свиные ребрышки на гриле с зеленью',
    description: 'Не следует, однако забывать, что реализация намеченных плановых',
    price: 1600
  },
  {
    id: 2,
    preview: './images/3.svg',
    title: 'Креветки по-королевски в лимонном соке',
    description: 'Значимость этих проблем настолько очевидна, что укрепление и развитие структуры обеспечивает широкому кругу',
    price: 1820
  },
  {
    id: 3,
    preview: './images/1.svg',
    title: 'Значимость этих проблем настолько очевидна, что укрепление и развитие структуры',
    description: 'Устрицы по Русски',
    price: 1000
  }
  ]
document.addEventListener('DOMContentLoaded', () =>  {
  if(!localStorage.products)  {
    localStorage.setItem('basket', JSON.stringify([]));
  }

  if(!localStorage.isAuth)  {
    localStorage.setItem('isAuth', JSON.stringify(false));
    window.location.href = '../auth.html';
  } else  {
    if (!JSON.parse(localStorage.isAuth))
    window.location.href = '../auth.html';
  }
})


