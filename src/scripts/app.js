//////////////////////////////////////////////////////////////////////variables

const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart-btn');
const clearCartBtn = document.querySelector('.clear-cart-btn');
const buyAllItems = document.querySelector('.buy-all-btn');
const cartContainer = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items-counter');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsContainer = document.querySelector('.products-container');

let cart = [];
let btnsDOM = [];

//////////////////////////////////////////////////////////////////////classes

//_____________________getting products_____________________

class Products {
  async getProducts() {
    try {
      let result = await fetch('./src/scripts/products.json');
      let data = await result.json();
      let products = data.items;

      products = products.map((item) => {
        const { name, price, brand, category, gender, imgUrl, id } = item;
        return { name, price, brand, category, gender, imgUrl, id };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

//_____________________display products_____________________

class UI {
  displayProducts(products) {
    let result = '';
    products.forEach((product) => {
      result += `
        <div class="card">
          <div class="product-img">
            <img
              src=${product.imgUrl}
              alt="imagen de producto"
            />
          </div>
          <div class="product-info">
            <h3 class="product-name">
              ${product.name}
            </h3>
            <p class="product-price">$${product.price}</p>
            <select name="talles" id="">
              <option disabled selected>Elegí tu talle</option>
              <option value="talle 35">35</option>
              <option value="talle 36">36</option>
              <option value="talle 37">37</option>
              <option value="talle 38">38</option>
              <option value="talle 39">39</option>
              <option value="talle 40">40</option>
              <option value="talle 41">41</option>
              <option value="talle 42">42</option>
              <option value="talle 43">43</option>
              <option value="talle 44">44</option>
            </select>
            <button class="to-cart-btn" data-id=${product.id}>Agregar a Carrito</button>
          </div>
        </div>
      `;
    });
    productsContainer.innerHTML = result;
  }

  buyingBtn() {
    const toCartBtns = [...document.querySelectorAll('.to-cart-btn')];
    btnsDOM = toCartBtns;
    toCartBtns.forEach((button) => {
      let id = button.dataset.id;
      let inCart = cart.find((item) => item.id === id);
      if (inCart) {
        button.innerHTML = 'En Carrito';
        button.disabled = true;
      }
      button.addEventListener('click', (e) => {
        e.target.innerText = 'En Carrito';
        e.target.disabled = true;

        //get products from products//
        let cartItem = { ...Storage.getProduct(id), amount: 1 };

        //sent products to cart
        cart = [...cart, cartItem];

        //store cart items in local storage//
        Storage.storeCart(cart);

        //set cart values//
        this.setCartValues(cart);

        //display cart items//
        this.addCartItem(cartItem);

        //show cart//
        this.showCart();
      });
    });
  }

  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;

    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerHTML = tempTotal.toFixed(2);
    cartItems.innerHTML = itemsTotal;
  }

  //_____________________add items to cart_____________________
  addCartItem(item) {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
        <img
            src=${item.imgUrl}
            alt="product"
        />
        <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
            <span class="remove-item" data-id=${item.id}>Remove</span>
        </div>
    `;
    cartContent.appendChild(div);
  }

  showCart() {
    cartOverlay.classList.add('transparentBcg');
    cartContainer.classList.add('show-cart');
  }

  setupApp() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.fillCart(cart);
    cartBtn.addEventListener('click', this.showCart);
    closeCartBtn.addEventListener('click', this.hideCart);
  }

  fillCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }

  hideCart() {
    cartOverlay.classList.remove('transparentBcg');
    cartContainer.classList.remove('show-cart');
  }

  cartLogic() {
    clearCartBtn.addEventListener('click', () => {
      this.clearCart();
    });

    cartContent.addEventListener('click', (event) => {
      if (event.target.classList.contains('remove-item')) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        cartContent.removeChild(removeItem.parentElement.parentElement);

        this.removeItem(id);
      }
    });

    buyAllItems.addEventListener('click', () => {
      const items = document.querySelectorAll('.cart-content .cart-item');
      if (!items.length) {
        return;
      }
      const congrats = document.createElement('div');
      congrats.innerHTML = `
        <h2 class='congrats-message'>¡Muchas gracias por correr con nosotros!</h3>
      `;

      cartContent.appendChild(congrats);

      setTimeout(() => {
        this.clearCart();
      }, 3000);
    });
  }

  clearCart() {
    let cartItems = cart.map((item) => item.id);
    cartItems.forEach((id) => this.removeItem(id));
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
    this.hideCart();
  }

  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    this.setCartValues(cart);
    Storage.storeCart(cart);
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `
        <button class="to-cart-btn" data-id="id">Agregar a Carrito</button>
    `;
  }

  getSingleButton(id) {
    return btnsDOM.find((button) => button.dataset.id === id);
  }
}

//_____________________local storage_____________________
class Storage {
  static storeProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem('products'));
    return products.find((product) => product.id === id);
  }

  static storeCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  static getCart() {
    return localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
  }
}

//////////////////////////////////////////////////////////////////////events

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const products = new Products();

  ui.setupApp();

  //_____________________get all products_____________________
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.storeProducts(products);
    })
    .then(() => {
      ui.buyingBtn();
      ui.cartLogic();
    });
});

//////////////////////////////////////////////////////////////////////functions
