 (async () => {
    const productsPerPage = 20; // Số lượng sản phẩm hiển thị trên mỗi trang
    let currentPage = 1; // Trang hiện tại, bắt đầu từ 1
    let totalProducts = 0; // Tổng số sản phẩm

    const params = new URLSearchParams(location.search);
    let id_catoley = params.get('catolery');
    let pageParam = params.get('page');
    if (!pageParam) {
      pageParam = 1;
    } else {
      pageParam = parseInt(pageParam);
    }
    currentPage = pageParam;

    // Hàm để lấy danh sách sản phẩm theo trang
    const getProductsByPage = async (page) => {
      const res = await fetch(`https://db-ecomer-pola-default-rtdb.firebaseio.com/${id_catoley}.json`);
      const products = await res.json();
      console.log(products);
      totalProducts = Object.entries(products).length;
      const startIndex = (page - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      return Object.entries(products).slice(startIndex, endIndex);
    };

    // Hàm hiển thị sản phẩm lên giao diện
    const displayProducts = async (page) => {
      const products = await getProductsByPage(page);
      const services = document.querySelector('#services');
      services.innerHTML = ''; // Xóa nội dung hiện tại của services trước khi thêm sản phẩm mới

      products.forEach(([key, value]) => {
        if (value != null) {
          services.innerHTML += `
            <!-- Thêm các phần tử sản phẩm vào giao diện -->
            <div class="col-6 col-md-3 mb-4">
              <!-- Chi tiết sản phẩm -->
              <div class="card">
                <a href="../detail-product.html?id=${key}&id_catelory=${id_catoley}">
                  <img class="card-img-top" src="${value.img1}" alt="Product Image" />
                  <div class="view-details">Zobacz więcej</div>
                </a>
                <div class="card-body">
                  <p class="name-detail"><small class="text-muted"></small></br>${value.name}</p>
                  <div class="price-detail">
                    <p class="m-0">${value.price} zł netto</p>
                    <p class="end-price m-0">(${value.price2} zł brutto)</p> 
                  </div>
                </div>
                <div class="btn-add-cart">
                  <a href="../detail-product.html?id=${key}&id_catelory=${id_catoley}">Patrz szczegóły</a>
                </div>
              </div>
            </div>`;
        }
      });

      // Hiển thị phân trang
      const pagination = document.querySelector('.pagination');
      console.log(pagination);
      pagination.innerHTML = '';

      const totalPages = Math.ceil(totalProducts / productsPerPage);

      // Nút Previous
      if (currentPage > 1) {
        pagination.innerHTML += `<li><a href="../detail-catolery.html?catolery=${id_catoley}&page=${currentPage - 1}">&lt;</a></li>`;
      } else {
        pagination.innerHTML += `<li><span class="disabled">&lt;</span></li>`;
      }

      // Hiển thị các nút số trang
      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
          if (i === currentPage) {
            pagination.innerHTML += `<li><span class="active">${i}</span></li>`;
          } else {
            pagination.innerHTML += `<li><a href="../detail-catolery.html?catolery=${id_catoley}&page=${i}">${i}</a></li>`;
          }
        } else if (i === currentPage - 2 || i === currentPage + 2) {
          pagination.innerHTML += `<li><span class="dots">...</span></li>`;
        }
      }

      // Nút Next
      if (currentPage < totalPages) {
        pagination.innerHTML += `<li><a href="../detail-catolery.html?catolery=${id_catoley}&page=${currentPage + 1}">&gt;</a></li>`;
      } else {
        pagination.innerHTML += `<li><span class="disabled">&gt;</span></li>`;
      }
    };

    // Hiển thị sản phẩm lên trang đầu tiên khi tải trang
    displayProducts(currentPage);

    // Thêm sự kiện click cho các nút phân trang
    document.addEventListener("click", (event) => {
      if (event.target.tagName === "A" && event.target.parentElement.classList.contains("pagination")) {
        event.preventDefault();
        const pageNumber = parseInt(event.target.innerText);
        displayProducts(pageNumber);
      }
    });
  })();
