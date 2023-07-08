fetch('db.json')
  .then(response => response.json())
  .then(data => {
    const groceries = data.groceries;
    const list = document.querySelector('.list');

    groceries.forEach(grocery => {
      const newDiv = document.createElement('div');
      newDiv.classList.add('item');
      newDiv.innerHTML = `
        <img src="${grocery.image}">
        <div class="title">${grocery.name}</div>
        <div class="price">$${grocery.price.toFixed(2)}</div>
        <button onclick="addToCard(${grocery.id})">Add to Cart</button>
      `;
      list.appendChild(newDiv);
    });
  })
  .catch(error => {
    console.log('Error:', error);
  });


  let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
  body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
  body.classList.remove('active');
});

let products = [
  {
    "id": 1,
    "name": "Apples",
    "category": "Fruits",
    "price": 1.99,
    "quantity": 10,
    "image": "images/apple.png"
  },
  {
    "id": 2,
    "name": "Bananas",
    "category": "Fruits",
    "price": 0.99,
    "quantity": 15,
    "image": "images/banana.png"
  },
  {
    "id": 3,
    "name": "Milk",
    "category": "Dairy",
    "price": 2.49,
    "quantity": 5,
    "image": "images/milk.png"
  },
  {
    "id": 4,
    "name": "Eggs",
    "category": "Dairy",
    "price": 1.79,
    "quantity": 12,
    "image": "images/eggs.png"
  },
  {
    "id": 5,
    "name": "Bread",
    "category": "Bakery",
    "price": 2.99,
    "quantity": 8,
    "image": "images/bread.png"
  },
  {
    "id": 6,
    "name": "Cheese",
    "category": "Meat",
    "price": 4.99,
    "quantity": 3,
    "image": "images/cheese.png"
  }
];
let listCards = [];

function addToCard(id) {
  let selectedProduct = products.find(product => product.id === id);

  if (selectedProduct) {
    let existingItem = listCards.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
      } else {
        listCards.push({
          ...selectedProduct,
          quantity: 1
        });
      }
  
      reloadCard();
    }
  }
  function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
  
    listCards.forEach(item => {
      let newDiv = document.createElement('li');
      newDiv.innerHTML = `
        <div><img src="${item.image}" /></div>
        <div>${item.name}</div>
        <div>${(item.price * item.quantity).toFixed(2)}</div>
        <div>
          <button onclick="changeQuantity(${item.id}, ${item.quantity - 1})">-</button>
          <div class="count">${item.quantity}</div>
          <button onclick="changeQuantity(${item.id}, ${item.quantity + 1})">+</button>
        </div>`;
      listCard.appendChild(newDiv);
  
      count += item.quantity;
      totalPrice += item.price * item.quantity;
    });
  
    total.innerText = totalPrice.toFixed(2);
    quantity.innerText = count;
  }