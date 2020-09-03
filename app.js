// DOM cache for cart
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
// DOM cache for products
const productsDOM = document.querySelector(".products-list"); // Products list div
// DOM cache for arrays
let cart = []; // Main cart array
let buttonsDOM = [];
// DOM cache for title
const sectionTitle = document.querySelector(".section-title");

// Products class *(Object is an instance of a class)
/* products class will get the list of products from the JSON file */
class Products {
// Getting list of products
async getProducts() {
  try {
    /* Await before settling request, Await before delivering JSON format */
    let result = await fetch('products.json'); 
    let data = await result.json(); 

    // Array from JSON file, items is the name of the array
    let products = data.items; 
    // Reassign products array -> then map methods to array
    products = products.map( items => {
      const {title, price} = items.fields;
      const {id} = items.sys;
      const image = items.fields.image.fields.file.url;
      return {title, price, id, image};      
    })
    return products;
  } catch (error) {
    console.log(error);
  }
};
}

// UI: display the properties formatted in HTML
class UI {
  displayProducts(products) {
    let result = '';
    products.forEach(product => { /** Product is defined here */
    result += `    
   <!-- single product -->
        <article class="product">
          <div class="img-container">
            <img src=${product.image} alt="product" class="product-img"/>
            <button class="bag-btn" data-id=${product.id}>
              <i class="fa fa-shopping-cart"></i>add to bag</button>
          </div>
          <h3>${product.title}</h3>
          <h4>£${product.price}</h4>
        </article>
        <!-- end of single product -->
   `;
    });
    productsDOM.innerHTML = result;
  }

  
}

// Event trigger for when everything is loaded
document.addEventListener("DOMContentLoaded", () => {
  // ui and products object
  const ui = new UI();
  const products = new Products();

  products.getProducts().then(products => ui.displayProducts(products));
});

