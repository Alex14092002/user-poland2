
var cart = JSON.parse(localStorage.getItem("cart")) || [];


 // khởi tạo 1 cái item tên cart trong localstorarge với kiểu là mảng rỗng

function giohang(id, ten, gia, hinh , quantity ,  ){
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
      price:gia * quantity,
      Singleprice : gia,
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

header.innerHTML += `
<nav>
  <div class="navbar">
    <i class="bx bx-menu"></i>
    <div class="logo">
      <a href="index.html">
        <img src="./image/cropped-logo-new-11-512x512-1.png" alt="" width="60px">
      </a>
    </div>
    <div class="nav-links">
      <div class="sidebar-logo">
        <span class="logo-name">
          <img src="./image/cropped-logo-new-11-512x512-1.png" alt="logo" width="60px">
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
      </ul>
    </div>
    <div class="booking">
      <a href="./cart.html">
        <i class="bx bxs-shopping-bag"></i>
        <span>${cart.length}</span>
      </a>
    </div>
  </div>
</nav>

`










