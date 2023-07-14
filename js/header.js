
var cart = JSON.parse(localStorage.getItem("cart")) || [];


 // khởi tạo 1 cái item tên cart trong localstorarge với kiểu là mảng rỗng

function giohang(id, ten, gia, hinh , quantity , gia2  ){
  var found = false; // biến để tìm kiếm
  
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === ten ) {
      found = true;
      break;
    }
  }
  
  if (!found) {
    
    cart.push({
      id:id,
      name:ten,
      price:gia*quantity,
      Singleprice : gia,
      price2 : gia2 * quantity,
      img1:hinh,
      quantity: quantity
    });

    
    localStorage.setItem("cart", JSON.stringify(cart));
    
    
  } else {
    console.log("Sản phẩm đã có trong giỏ hàng!");
  }

  var cartLength = cart.length;
  document.querySelector('.booking span').textContent = cartLength;
}
const header = document.querySelector('#header')

const keySearch = ()=>{
  console.log('thành công');
}



header.innerHTML += `

<nav>
<div class="search-input active-search">
  
    <input class="valueSearch" type="text"  placeholder="Wpisz szukany tekst..."/>
   
</div>
<button class="btn-submit">Submit</button>
  <div class="navbar">
    <i class="bx bx-menu"></i>
    <div class="logo">
      <a href="index.html">
        <img src="./image/logo2.jpg" alt="" width="150px">
      </a>
    </div>
    <div class="nav-links">
      <div class="sidebar-logo">
        <span class="logo-name">
          <img src="./image/logo2.jpg" alt="logo" width="150px">
        </span>
        <i class="bx bx-x"></i>
      </div>
      <ul class="links">
        <li><a href="index.html">strona główna</a></li>
        <li>
          <a href="#">Urządzenia</a>
          <i class="bx bxs-chevron-down htmlcss-arrow arrow"></i>
          <ul class="htmlCss-sub-menu sub-menu">
            <li><a href="../detail-catolery.html?catolery=patelnia">Patelnia</a></li>
            <li><a href="../detail-catolery.html?catolery=kuchenka">Kuchenka</a></li>
            <li><a href="../detail-catolery.html?catolery=radio">Radio</a></li>
            <li><a href="../detail-catolery.html?catolery=garnki">Garnki</a></li>
            <li><a href="../detail-catolery.html?catolery=lampa">Lampa</a></li>
            <li><a href="../detail-catolery.html?catolery=parasol">Parasol</a></li>
            <li><a href="../detail-catolery.html?catolery=thermos">Thermos</a></li>
            <li><a href="../detail-catolery.html?catolery=budzik">Budzik</a></li>
            <li><a href="../detail-catolery.html?catolery=wentylator">Wentylator</a></li>
            <li><a href="../detail-catolery.html?catolery=czajnik">Czajnik</a></li>
            <li><a href="../detail-catolery.html?catolery=suszarka">Suszarka</a></li>
          </ul>
        </li>
        <li>
          <a href="#">elektroniczny</a>
          <i class="bx bxs-chevron-down htmlcss-arrow arrow"></i>
          <ul class="htmlCss-sub-menu sub-menu">
            <li><a href="../detail-catolery.html?catolery=latarka">Latarka</a></li>
            <li><a href="../detail-catolery.html?catolery=golarka">Golarka</a></li>
            <li><a href="../detail-catolery.html?catolery=baterie">Baterie</a></li>
            <li><a href="../detail-catolery.html?catolery=nozycki">Nozycki</a></li>
            <li><a href="../detail-catolery.html?catolery=zabawka">Zabawka</a></li>
            <li><a href="../detail-catolery.html?catolery=akcesorie">Akcesorie</a></li>
            <li><a href="../detail-catolery.html?catolery=gaz">Gaz</a></li>
          </ul>
        </li>
        <li>
          <a href="#">moda</a>
          <i class="bx bxs-chevron-down htmlcss-arrow arrow"></i>
          <ul class="htmlCss-sub-menu sub-menu">
            <li><a href="../detail-catolery.html?catolery=obuwie">Obuwie</a></li>
            <li><a href="../detail-catolery.html?catolery=zelarko">Zelarko</a></li>
            <li><a href="../detail-catolery.html?catolery=suszarka">Suszarka</a></li>
          </ul>
        </li>
        <li><a href="../detail-catolery.html?catolery=najlepsza_wyprzedaz">Najlepsza wyprzedaz</a></li>
        <li><a href="../about.html">O nas</a></li>
      </ul>
    </div>
    <div class="booking">
      <a href="./cart.html">
        <i class="bx bxs-shopping-bag"></i>
        <span>${cart.length}</span>
      </a>
    </div>
    <div class="search">
    <button class='btn-search'>
    <i class="fa fa-search" aria-hidden="true"></i>
    </button>
    
  </div>
  </div>
</nav>

`



const inputSearch = document.querySelector('.search-input') 
const btnSearch = document.querySelector('.btn-search')

btnSearch.addEventListener('click', ()=>{
  inputSearch.classList.toggle('active-search')
})

const btnSubmit = document.querySelector('.btn-submit')
const valueSearch = document.querySelector('.valueSearch')

btnSubmit.addEventListener('click' , ()=>{
  console.log(valueSearch.value);
  localStorage.setItem("keySearch", JSON.stringify(valueSearch.value));
  window.location.href = "search.html"
})

valueSearch.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    btnSubmit.click();
  }
});
