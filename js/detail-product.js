(async () => {

  let params = new URLSearchParams(location.search);
  let id_item = params.get('id');
  let id_catelory = params.get('id_catelory');

  const res = await fetch(`https://db-ecomer-pola-default-rtdb.firebaseio.com/${id_catelory}/${id_item}.json`);
  const product = await res.json();

  const detail = document.querySelector('#detail');
  console.log(product);
  if (product) {
    detail.innerHTML += `
    <div class="main-detail row " >
      <div class="item-detail col-12 col-md-6" id="slider-product">
        <div class="main">
          <span class="control prev">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </span>
          <span class="control next" id="next">
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </span>
          <div class="img-wrap">
            <img src="${product.img1}" alt="${product.name}" />
          </div>
        </div>
        <div class="list-img">
          <div>
            <img src="${product.img1}" alt="${product.name}" />
          </div>
          <div>
            <img src="${product.img2}" alt="${product.name}" />
          </div>
          <div>
            <img src="${product.img3}" alt="${product.name}" />
          </div>
          <div>
            <img src="${product.img4}" alt="${product.name}" />
          </div>
          <div>
            <img src="${product.img5}" alt="${product.name}" />
          </div>
        </div>
      </div>
      <div class="item-detail col-12 col-md-6" id="content-product">
        <h1>${product.name}</h1>
        <p>${product.describe}</p>
        <div class="price-detail">
          <h3>${product.price} zł netto</h3>
          <h3>(${product.price2}zł brutto)</h3>
        </div>
        <div class="quantity speacial-quantity">
          <div class="btn-quantity">
            <button id="tru">-</button>
          </div>
          <div class="valQuantity">
            <input type="text" value="4" id="valquantity" />
          </div>
          <div class="btn-quantity">
            <button id="cong">+</button>
          </div>
        </div>
        <button class="addtoCart">Dodaj do koszyka</button>
      </div>
    </div>
    `;
  }

  const btnQuantityDecrease = document.querySelector("#tru");
  const btnQuantityIncrease = document.querySelector("#cong");
  const valQuantity = document.querySelector("#valquantity");

  btnQuantityIncrease.addEventListener("click", () => {
    valQuantity.value = parseInt(valQuantity.value) + 4;
  });

  btnQuantityDecrease.addEventListener("click", () => {
    if (parseInt(valQuantity.value) > 4) {
      valQuantity.value = parseInt(valQuantity.value) - 4;
    }
  });

  const valquantity = document.querySelector("#valquantity");
  const addtoCart = document.querySelector(".addtoCart");

  addtoCart.addEventListener("click", () => {
    giohang(
      product.id,
      product.name,
      product.price2,
      product.img1,
      valquantity.value,
      "none",
      "none",
      "none"
    );
  });

  let listDivImg = document.querySelectorAll('.list-img div');
  let next = document.querySelector('.next');
  let prev = document.querySelector('.prev');
  let imgWrap = document.querySelector('.img-wrap img');
  let currentIndex = 0;

  setCurrent(currentIndex);

  function setCurrent(index) {
    currentIndex = index;
    imgWrap.src = listDivImg[currentIndex].querySelector('img').src;

    listDivImg.forEach((item) => {
      item.classList.remove('active');
    });

    listDivImg[currentIndex].classList.add('active');
  }

  listDivImg.forEach((img, index) => {
    img.addEventListener('click', (e) => {
      setCurrent(index);
    });
  });

  next.addEventListener('click', () => {
    if (currentIndex == listDivImg.length - 1) {
      currentIndex = 0;
    } else currentIndex++;

    setCurrent(currentIndex);
  });

  prev.addEventListener('click', () => {
    if (currentIndex == 0) currentIndex = listDivImg.length - 1;
    else currentIndex--;

    setCurrent(currentIndex);
  });

})();
