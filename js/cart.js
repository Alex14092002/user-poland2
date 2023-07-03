const deleteCart = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart"));

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      cart.splice(i, 1);
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  setTimeout(function () {
    window.location.reload();
  }, 100);
};

var cart = JSON.parse(localStorage.getItem("cart"));

const formCustomer = document.querySelector(".info-customer");
var sum = 0;

if (cart != null && cart.length > 0) {
  cart.map((value) => {
    document.querySelector("#cart-main").innerHTML += `
    <div class="cart-main row">
    <div class="item-cart-main col-3 col-md-4">
        <img src="${value.img1}" alt="${value.name}"  >
    </div>
    <div class="item-cart-main col-4 col-md-3">
        <h3>${value.name}</h3>

      
    </div>
    <div class="item-cart-main col-3">
        <h2>${value.price} zł</h2>
    </div>   
    <div class="item-cart-main col-2">
        <button onclick="deleteCart(${value.id})"><i class="fa fa-times" aria-hidden="true"></i>
        </button>
    </div>          
</div>

    `;
    sum += value.price;
  });

  formCustomer.innerHTML += `
      <div class="row layout-form">
            <div class="input-item col-12 col-md-6">
                <label for="">Imię</label> 
                <input type="text" name="" id="firstName" placeholder="Wpisz swoje imię" value="">
            </div>
            <div class="input-item col-12 col-md-6">
                <label for="">Nazwisko</label> 
                <input type="text" name="" id="lastName" placeholder="Wpisz swoje nazwisko">
            </div>
           
            <div class="input-item col-12 col-md-6">
                <label for="">Adres</label> 
                <input type="text" name="" id="address" placeholder="Podaj adres ">
            </div>
           
           
           
          
            <div class="input-item col-12 col-md-6">
                <label for="">Numer telefonu</label> 
                <input type="number" name="" id="phoneNumber" placeholder="Wpisz numer telefonu" >
            </div>
            <div class="input-item col-12 ">
            <label for="">Uwaga Zamówienie</label> 
            <input type="text" name="" id="noteOrder" placeholder="Wprowadź kolejność notatek" >
        </div>
        </div>
        <div class="btn-pushData">
            <button id="btn-push">Zamów teraz</button>
        </div>
    `;
  document.querySelector("#cart-main").innerHTML += `
       
    <div class="sumPrice"> 
    <h1>
    Całkowita kwota pieniędzy : <strong> ${sum} zł</strong>
</h1>
    </div>

    <div class="content-total">
        <h5>Proszę zapłacić za zamówienie i wprowadzić swoje dane</h5>
        <h5>KONTO BANKOWE: 51 1240 1503 1111 0011 1065 1719</h5>
    </div>
`;
} else {
  document.querySelector("#cart-main").innerHTML += `
        <div class="no-cart">
            <h1>Koszyk jest pusty, proszę wybrać produkt!</h1>
        </div>  
    `;
}

const btnPush = document.querySelector("#btn-push");
btnPush.addEventListener("click", () => {
  // Lấy thông tin khách hàng
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const address = document.querySelector("#address").value;
  const phoneNumber = document.querySelector("#phoneNumber").value;
  const noteOrder = document.querySelector('#noteOrder').value;
  const cartItems = JSON.parse(localStorage.getItem("cart"));
  const status = "Delivering";
  // Tạo đối tượng khách hàng
  const customer = {
    status: status,
    firstName: firstName,
    lastName: lastName,
    address: address,
    phoneNumber: phoneNumber,
    cartItems: cartItems,
    total: sum,
  };

  // Gửi dữ liệu khách hàng đến máy chủ
  fetch("https://db-ecomer-pola-default-rtdb.firebaseio.com/customer.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Xử lý phản hồi từ máy chủ

      // Display success notification
      Swal.fire(
        "Powodzenie",
        "Twoje zamówienie zostało zrealizowane, skontaktujemy się z Tobą w celu dostarczenia",
        "success"
      ).then(() => {
        window.location.href = "index.html"; // Chuyển hướng đến trang login
      });
  
          // Clear shopping cart in local storage
      localStorage.removeItem("cart");
      // Clear input values
      document.querySelector("#firstName").value = "";
      document.querySelector("#lastName").value = "";
      document.querySelector("#address").value = "";
      document.querySelector("#phoneNumber").value = "";
      document.querySelector('#noteOrder').value = "";
      
    })
    .catch((error) => {
      console.error(error); // Xử lý lỗi
    });
});
