(async () => {
  const slider = document.querySelector(".slider-home");

  const res = await fetch(
    `https://db-ecomer-pola-default-rtdb.firebaseio.com/home.json`
  );
  const data = await res.json();

  const dataMain = await data[0];

  slider.innerHTML = `
  <div id="carousel">
  <div id="slide-container">
    <div class="slide" data-slideIndex="0">
      <img
        width="100%"
        height="700px"
        src="${dataMain.img1}"
        alt "${dataMain.img1}"
      />
    </div>
    <div class="slide" data-slideIndex="1">
    
      <img
        width="100%"
        height="700px"
        src="${dataMain.img2}"
        alt="slider-home"
      />
    </div>
    <div class="slide" data-slideIndex="2">
     
      <img
        width="100%"
        height="700px"
        src="${dataMain.img3}"
        alt="slider-home"
      />
    </div>
    <div class="slide" data-slideIndex="3">
    
      <img
        width="100%"
        height="700px"
        src="${dataMain.img4}"
        alt="slider-home"
      />
    </div>
    <div class="slide" data-slideIndex="4">
     
      <img
        width="100%"
        height="700px"
        src="${dataMain.img5}"
        alt="slider-home"
      />
    </div>
  </div>
  <div id="back-button" class="arrows back">
    <i class="fa fa-chevron-left" aria-hidden="true"></i>
  </div>
  <div id="forward-button" class="arrows forward">
    <i class="fa fa-chevron-right" aria-hidden="true"></i>
  </div>
  <div class="slide-indicators">
    <div class="slide-indicator active"></div>
    <div class="slide-indicator"></div>
    <div class="slide-indicator"></div>
    <div class="slide-indicator"></div>
    <div class="slide-indicator"></div>
  </div>
</div>
  `;

  function autoplayCarousel() {
    const carouselEl = document.getElementById("carousel");
    const slideContainerEl = carouselEl.querySelector("#slide-container");
    const slideEl = carouselEl.querySelector(".slide");
    let slideWidth = slideEl.offsetWidth;
    // Add click handlers
    document
      .querySelector("#back-button")
      .addEventListener("click", () => navigate("backward"));
    document
      .querySelector("#forward-button")
      .addEventListener("click", () => navigate("forward"));
    document.querySelectorAll(".slide-indicator").forEach((dot, index) => {
      dot.addEventListener("click", () => navigate(index));
      dot.addEventListener("mouseenter", () => clearInterval(autoplay));
    });
    // Add keyboard handlers
    document.addEventListener("keydown", (e) => {
      if (e.code === "ArrowLeft") {
        clearInterval(autoplay);
        navigate("backward");
      } else if (e.code === "ArrowRight") {
        clearInterval(autoplay);
        navigate("forward");
      }
    });
    // Add resize handler
    window.addEventListener("resize", () => {
      slideWidth = slideEl.offsetWidth;
    });
    // Autoplay
    const autoplay = setInterval(() => navigate("forward"), 3000);
    slideContainerEl.addEventListener("mouseenter", () =>
      clearInterval(autoplay)
    );
    // Slide transition
    const getNewScrollPosition = (arg) => {
      const gap = 10;
      const maxScrollLeft = slideContainerEl.scrollWidth - slideWidth;
      if (arg === "forward") {
        const x = slideContainerEl.scrollLeft + slideWidth + gap;
        return x <= maxScrollLeft ? x : 0;
      } else if (arg === "backward") {
        const x = slideContainerEl.scrollLeft - slideWidth - gap;
        return x >= 0 ? x : maxScrollLeft;
      } else if (typeof arg === "number") {
        const x = arg * (slideWidth + gap);
        return x;
      }
    };
    const navigate = (arg) => {
      slideContainerEl.scrollLeft = getNewScrollPosition(arg);
    };
    // Slide indicators
    const slideObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slideIndex = entry.target.dataset.slideindex;
            carouselEl
              .querySelector(".slide-indicator.active")
              .classList.remove("active");
            carouselEl
              .querySelectorAll(".slide-indicator")
              [slideIndex].classList.add("active");
          }
        });
      },
      { root: slideContainerEl, threshold: 0.1 }
    );
    document.querySelectorAll(".slide").forEach((slide) => {
      slideObserver.observe(slide);
    });
  }
  autoplayCarousel();
})();

// (async () => {

//   const res = await fetch(
//     `https://db-ecomer-pola-default-rtdb.firebaseio.com/patelnia.json`
//   );

//   const product = await res.json();

//   const services = document.querySelector("#products-for-nail");

//   if (product) {
//     for (const [key, value] of Object.entries(product)) {
//       if (value != null) {
//         services.innerHTML += `
//         <div class="col-6 col-md-3 mb-4">
//           <div class="card">
//             <a href="../detail-product.html?id=${key}&id_catelory=patelnia">
//               <img class="card-img-top" src="${value.img1}" alt="Product Image" />
//               <div class="view-details">Zobacz więcej</div>
//             </a>
//             <div class="card-body">
//               <p class="name-detail"><small class="text-muted"></small></br>${value.name}</p>
//               <div class="price-detail">
//                 <p class="m-0">${value.price} zł netto</p>
//                 <p class="end-price m-0">(${value.price2} zł brutto)</p> 
//               </div>
//             </div>
//             <div class="btn-add-cart">
//               <a href="../detail-product.html?id=${key}&id_catelory=patelnia">Patrz szczegóły</a>
//             </div>
//           </div>
//         </div>`;
//       }
//     }
//   }
// })();



(async () => {
  const productsPerPage = 20; // Số lượng sản phẩm hiển thị trên mỗi trang
  let currentPage = 1; // Trang hiện tại, bắt đầu từ 1
  let totalProducts = 0; // Tổng số sản phẩm

  const params = new URLSearchParams(location.search);
  let pageParam = params.get('page');
  if (!pageParam) {
    pageParam = 1;
  } else {
    pageParam = parseInt(pageParam);
  }
  currentPage = pageParam;

  // Hàm để lấy danh sách sản phẩm theo trang
  const getProductsByPage = async (page) => {
    const res = await fetch(`https://db-ecomer-pola-default-rtdb.firebaseio.com/patelnia.json`);
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
    const services = document.querySelector('#products-for-nail');
    services.innerHTML = ''; // Xóa nội dung hiện tại của services trước khi thêm sản phẩm mới

    products.forEach(([key, value]) => {
      if (value != null) {
        services.innerHTML += `
          <!-- Thêm các phần tử sản phẩm vào giao diện -->
          <div class="col-6 col-md-3 mb-4">
            <!-- Chi tiết sản phẩm -->
            <div class="card">
              <a href="../detail-product.html?id=${key}&id_catelory=patelnia">
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
                <a href="../detail-product.html?id=${key}&id_catelory=patelnia">Patrz szczegóły</a>
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
      pagination.innerHTML += `<li><a href="../detail-catolery.html?catolery=patelnia&page=${currentPage - 1}">&lt;</a></li>`;
    } else {
      pagination.innerHTML += `<li><span class="disabled">&lt;</span></li>`;
    }

    // Hiển thị các nút số trang
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        if (i === currentPage) {
          pagination.innerHTML += `<li><span class="active">${i}</span></li>`;
        } else {
          pagination.innerHTML += `<li><a href="../detail-catolery.html?catolery=patelnia&page=${i}">${i}</a></li>`;
        }
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pagination.innerHTML += `<li><span class="dots">...</span></li>`;
      }
    }

    // Nút Next
    if (currentPage < totalPages) {
      pagination.innerHTML += `<li><a href="../detail-catolery.html?catolery=patelnia&page=${currentPage + 1}">&gt;</a></li>`;
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
