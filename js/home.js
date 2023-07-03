(async () =>{
  const slider = document.querySelector('.slider-home')
  
  const res = await fetch(`https://db-ecomer-pola-default-rtdb.firebaseio.com/home.json`)
  const data = await res.json()

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
  `

  function autoplayCarousel() {
    const carouselEl = document.getElementById("carousel");
    const slideContainerEl = carouselEl.querySelector("#slide-container");
    const slideEl = carouselEl.querySelector(".slide");
    let slideWidth = slideEl.offsetWidth;
    // Add click handlers
    document.querySelector("#back-button")
        .addEventListener("click", () => navigate("backward"));
    document.querySelector("#forward-button")
        .addEventListener("click", () => navigate("forward"));
    document.querySelectorAll(".slide-indicator")
        .forEach((dot, index) => {
            dot.addEventListener("click", () => navigate(index));
            dot.addEventListener("mouseenter", () => clearInterval(autoplay));
        });
    // Add keyboard handlers
    document.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowLeft') {
            clearInterval(autoplay);
            navigate("backward");
        } else if (e.code === 'ArrowRight') {
            clearInterval(autoplay);
            navigate("forward");
        }
    });
    // Add resize handler
    window.addEventListener('resize', () => {
        slideWidth = slideEl.offsetWidth;
    });
    // Autoplay
    const autoplay = setInterval(() => navigate("forward"), 3000);
    slideContainerEl.addEventListener("mouseenter", () => clearInterval(autoplay));
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
    }
    const navigate = (arg) => {
        slideContainerEl.scrollLeft = getNewScrollPosition(arg);
    }
    // Slide indicators
    const slideObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const slideIndex = entry.target.dataset.slideindex;
                carouselEl.querySelector('.slide-indicator.active').classList.remove('active');
                carouselEl.querySelectorAll('.slide-indicator')[slideIndex].classList.add('active');
            }
        });
    }, { root: slideContainerEl, threshold: .1 });
    document.querySelectorAll('.slide').forEach((slide) => {
        slideObserver.observe(slide);
    });
  }
  autoplayCarousel();

})();




(async () => {
  const res = await fetch(
    `https://db-ecomer-pola-default-rtdb.firebaseio.com/najlepsza_wyprzedaz.json`
  );

  const product = await res.json();

  const services = document.querySelector("#products-for-nail");

  if (product) {
    for (const [key, value] of Object.entries(product)) {
      if(value != null){
        services.innerHTML += `
        <div class="col-6 col-md-4 mb-4">
        <div class="card">
            <img class="card-img-top" src="${value.img1}" alt="" />
            <div class="card-body">
                <p class="name-detail"><small class="text-muted"></small></br>${value.name}</p>
                
                <div class="price-detail">
                <p class=" m-0">${value.price} zł netto</p>
                <p class="end-price m-0">(${value.price2} zł brutto)</p> 
                </div>
            </div>
            <div class="btn-add-cart">
                <a  href="../detail-product.html?id=${key}&id_catelory=najlepsza_wyprzedaz" >Patrz szczegóły</a>
            </div>
        </div>
    </div>

    
        `;
      }
     
    }
  
  }
})();

(async () => {
  const res = await fetch(
    `https://data-nail-hl-default-rtdb.firebaseio.com/handmadeproduct.json`
  );

  const product = await res.json();

  const services = document.querySelector("#hand");

  if (product) {
    for (const [key, value] of Object.entries(product)) {
      if(value !=null){
        services.innerHTML += `
        <div class="product-item col-6 col-md-3">
        <div class="product-mini">
            <a href="./detail-hand.html?id=${key}">
                <div class="img-product">
                    <img src="${value.img1}" alt="" width="100%">
                </div>
            </a>
          
            
            <div class="name-product">
                <h2>${value.name}</h2>
            </div>
            <div class="price-product">
                <h2>$${value.price} zł</h2>
            </div>
            <div class="btn-add-cart">
                <a  href="./detail-hand.html?id=${key}" >VIEWS DETAILS</a>
            </div>

        </div>
        
    </div>   
        `;
      } 
     
    }
  
  }
})();




