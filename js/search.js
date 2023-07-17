
(async () => {
  // Hiển thị loading
  const loadingElement = document.getElementById('loading');
  loadingElement.style.display = 'block';

  const key = JSON.parse(localStorage.getItem("keySearch"));
  const title = document.querySelector(".search-kq h5 span");
  title.innerHTML += key;
  const productSearch = document.querySelector('#search');
  const res = await fetch(`https://db-ecomer-pola-default-rtdb.firebaseio.com/.json`);
  const data = await res.json();

  const categories = Object.keys(data);

  for (const category of categories) {
    const products = data[category];

    if (typeof products === "object" && products !== null) {
      for (const productId in products) {
        const product = products[productId];
        const productName = product && product.name;
        const productLower = productName && productName.toLowerCase();
        const keyLower = key && key.toLowerCase();  

        if (productLower && keyLower && productLower.includes(keyLower)) {
          const keyFirebase = productId;
          productSearch.innerHTML += `
          <div class="row-sp col-6 col-md-2 mb-4">
            <!-- Chi tiết sản phẩm -->
            <div class="card">
              <a href="../detail-product.html?id=${keyFirebase}&id_catelory=${category}">
                <img class="card-img-top" src="${product.img1}" alt="Product Image" />
                <div class="view-details">Zobacz więcej</div>
              </a>
              <div class="card-body">
                <p class="name-detail"><small class="text-muted"></small></br>${product.name}</p>
                <div class="price-detail">
                  <p class="m-0">${product.price} zł netto</p>
                  <p class="end-price m-0">(${product.price2} zł brutto)</p> 
                </div>
              </div>
              <div class="btn-add-cart">
                <a href="../detail-product.html?id=${keyFirebase}&id_catelory=${category}">Patrz szczegóły</a>
              </div>
            </div>
            </div>
          `;
        }
      }
    }
  }

  // Ẩn hiển thị loading sau khi tìm kiếm hoàn tất
  loadingElement.style.display = 'none';
})();
