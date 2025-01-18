const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const loadingSpinner = document.getElementById('loading-spinner');
const noResultsMessage = document.getElementById('no-results-message');

// Showing Loading Spinner
const showLoadingSpinner = () => {
  loadingSpinner.style.display = 'block';
  productList.innerHTML = '';
};

// Hiding Loading Spinner
const hideLoadingSpinner = () => {
  loadingSpinner.style.display = 'none';
};

// Displaying No Results Message
const showNoResultsMessage = () => {
  noResultsMessage.style.display = 'block';
};

// Hiding No Results Message
const hideNoResultsMessage = () => {
  noResultsMessage.style.display = 'none';
};



const fetchProducts = async () => {
  showLoadingSpinner();
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    hideLoadingSpinner();
    showNoResultsMessage();
  }
};


const displayProducts = (products) => {
  hideLoadingSpinner();
  hideNoResultsMessage();
  productList.innerHTML = '';
  if (products.length === 0) {
    showNoResultsMessage();
  } else {
    products.forEach((product) => {
      productList.innerHTML += `
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">$${product.price.toFixed(2)}</p>
              <p class="card-text">${product.description}</p> <!-- Description -->
              <div class="d-flex justify-content-between">
                <a href="#" class="btn btn-primary btn-sm">View Product</a> <!-- View Product button -->
                <a href="#" class="btn btn-success btn-sm">Add to Cart</a> <!-- Add to Cart button -->
              </div>
            </div>
          </div>
        </div>
      `;
    });
  }
};



searchBtn.addEventListener('click', () => {
  const query = searchInput.value.toLowerCase();
  if (!query) return;

  showLoadingSpinner();
  fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((products) => {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
      displayProducts(filteredProducts);
    })
    .catch((error) => {
      console.error('Error during search:', error);
      hideLoadingSpinner();
      showNoResultsMessage();
    });
});



fetchProducts();
