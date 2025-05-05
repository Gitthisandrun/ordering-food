
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
    title: '',
    description: 'Устрицы по Русски',
    price: 1000
  }
]

window.onload = () => {
  renderProductsCardsToDom();
}

// Пример объекта добавленного в корзину
// let basketList = [
//   {
//     id: 0,
//     preview: './images/1.svg',
//     title: 'Устрицы по рокфеллеровски',
//     count: 1,
//     price: 2700
//   },
// ]

let basketList = [];
let basketCount = document.querySelector('.basket__count');
let basketText = document.querySelector('.basket-text')

// класс и метод для создания карточки продукта
class ProductsCard  {
  constructor ({ id, preview, title, description, price})  {
    this.id = id;
    this.preview = preview;
    this.title = title;
    this.description = description;
    this.price = price;
  }

  generateProductsCard()  {
    let productsCard = document.createElement('div');
    productsCard.classList.add('products-card');
    productsCard.setAttribute('data-id', this.id);
    productsCard.setAttribute('data-preview', this.preview);
    productsCard.setAttribute('data-description', this.description);
    productsCard.setAttribute('data-price', this.price);

    let productsCardPreview = document.createElement('img');
    productsCardPreview.classList.add('products-card__preview');
    productsCardPreview.src = `./images/${this.id}.svg`;
    productsCard.append(productsCardPreview);

    let productsCardTitle = document.createElement('h2');
    productsCardTitle.classList.add('products-card__title');
    productsCardTitle.innerHTML = `${this.title}`;
    productsCard.append(productsCardTitle);

    let productsCardDescription = document.createElement('p');
    productsCardDescription.classList.add('products-card__description');
    productsCardDescription.innerHTML = `${this.description}`;
    productsCard.append(productsCardDescription);

    let productsCardBottom = document.createElement('div');
    productsCardBottom.classList.add('products-card__bottom');

    let productsCardPrice = document.createElement('span');
    productsCardPrice.classList.add('products-card__bottom-price');
    productsCardPrice.innerHTML = `${this.price} ₽`;

    let productsCardBtn = document.createElement('button');
    productsCardBtn.classList.add('products-card__bottom-btn');
    productsCardBtn.id = 'add-basket';

    //добавление продукта в корзину (в массив products)
    productsCardBtn.addEventListener('click', () =>  {
      basketList.push(products[this.id]);
      basketCount.innerHTML = `${basketList.length}`;
      updateBasketSum();
    })

    productsCardBottom.append(productsCardPrice);
    productsCardBottom.append(productsCardBtn);

    productsCard.append(productsCardBottom);

    return productsCard;
  }
}

// функция для создания массива карточек с продуктами
const generateProductsCards = (products) =>  {
  let productsCards = [];
  products.forEach(productsCard =>  {
    productsCards.push(new ProductsCard(productsCard));
  })
  return productsCards;
}

//функция для добавления карточки с продуктами в DOM
const renderProductsCardsToDom = () =>  {
  let productsCardsWrapper = document.querySelector('.products-list');
  generateProductsCards(products).forEach(productsCard =>  {
    productsCardsWrapper.append(productsCard.generateProductsCard())
  });
}


const openBusket = ()  =>  {
 let modal = document.createElement('div');
 modal.classList.add('modal');
 document.body.append(modal);
 modal.style.visibility = 'visible';

 let modalOverlay = document.createElement('div');
 modalOverlay.classList.add('modal__overlay');
 modal.append(modalOverlay);

 let modalInner = document.createElement('div');
 modalInner.classList.add('modal__inner');
 modal.append(modalInner);

 let closeBtn = document.createElement('span');
 closeBtn.classList.add('modal__inner-close');
 modalInner.append(closeBtn);

 closeBtn.addEventListener('click', () =>  {
  modal.remove();
 });

 let modalInnerTitle = document.createElement('h3');
 modalInnerTitle.innerText = 'Корзина с выбранными товарами';
 modalInnerTitle.classList.add('modal__inner-title');
 modalInner.append(modalInnerTitle);

 let modalInnerList = document.createElement('div');
 modalInnerList.classList.add('modal__inner-list');
 modalInner.append(modalInnerList);

generateBasketCards(basketList).forEach(basketCard =>  {
  modalInnerList.append(basketCard.generateBasketCard())
})
}

// класс и метод для создания карточки в корзине
class BasketCard  {
  constructor ({ id, preview, title, description, price})  {
    this.id = id;
    this.preview = preview;
    this.title = title;
    this.description = description;
    this.price = price;
  }

  generateBasketCard()  {
    let basketCard = document.createElement('div');
    basketCard.classList.add('products-card');
    basketCard.setAttribute('data-id', this.id);
    basketCard.setAttribute('data-preview', this.preview);
    basketCard.setAttribute('data-description', this.description);
    basketCard.setAttribute('data-price', this.price);

    let basketCardPreview = document.createElement('img');
    basketCardPreview.classList.add('products-card__preview');
    basketCardPreview.src = `./images/${this.id}.svg`;
    basketCard.append(basketCardPreview);

    let basketCardTitle = document.createElement('h2');
    basketCardTitle.classList.add('products-card__title');
    basketCardTitle.innerHTML = `${this.title}`;
    basketCard.append(basketCardTitle);

    let basketCardCount = document.createElement('div');
    basketCardCount.classList.add('products-card__count', 'card__count');

    let countMinus = document.createElement('span');
    countMinus.classList.add('card__count-minus');
    countMinus.innerHTML = `-`;
    countMinus.id = 'plus';


    let countResult = document.createElement('span');
    countResult.classList.add('card__count-result');
    countResult.innerHTML = `1`;
    countResult.id = 'count-product';

    let countPlus = document.createElement('span');
    countPlus.classList.add('card__count-plus');
    countPlus.innerHTML = `+`;
    countPlus.id = 'minus';

    basketCardCount.append(countMinus, countResult, countPlus);
    basketCard.append(basketCardCount);

    let basketCardBottom = document.createElement('div');
    basketCardBottom.classList.add('products-card__bottom');

    let basketCardPrice = document.createElement('span');
    basketCardPrice.classList.add('products-card__bottom-price');
    basketCardPrice.innerHTML = `${this.price}`;

    let basketCardBtn = document.createElement('button');
    basketCardBtn.classList.add('products-card__bottom-btn');
    basketCardBtn.id = 'remove-basket';

    // удаление продукта из списка
    basketCardBtn.addEventListener('click', () =>  {
      const index = basketList.findIndex(item => item.id === this.id);
      basketList.splice(index, 1); //удаляем продукт из массива basketList
      basketCount.innerHTML = `${basketList.length}`;
      updateBasketSum();
      basketCard.remove();
    })

    basketCardBottom.append(basketCardPrice, basketCardBtn);

    basketCard.append(basketCardBottom);

    return basketCard;
  }
}

// функция для подсчёта общей суммы
const updateBasketSum = () =>  {
  const sum = basketList.reduce((sum, item) => sum + item.price, 0);
  basketText.innerHTML = `${basketList.length} товара <br> на сумму ${sum.toString()} ₽`;
}

// функция для создания массива карточек с продуктами в корзине
const generateBasketCards = (basketList) =>  {
  let basketCards = [];
  basketList.forEach(basketCard =>  {
    basketCards.push(new BasketCard(basketCard));
  })
  return basketCards;
}

const busket = document.querySelector('.header__inner-products');
busket.addEventListener('click', () =>  {
  openBusket();
});


