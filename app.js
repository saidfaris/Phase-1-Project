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