const mainCategory = document.querySelector('.card')
console.log((mainCategory));


mainCategory.innerHTML += `
<div class="card-header">KATEGORIE</div>
<div class="list-group list-group-flush">
    <a href="../detail-catolery.html?catolery=patelnia" class=" list-group-item list-group-item-action">Patelnia</a>
    <a href="../detail-catolery.html?catolery=kuchenka" class="list-group-item list-group-item-action">Kuchenka</a>
    <a href="../detail-catolery.html?catolery=radio" class="list-group-item list-group-item-action">Radio</a>
    <a href="../detail-catolery.html?catolery=garnki" class="list-group-item list-group-item-action">Garnki</a>
    <a href="../detail-catolery.html?catolery=lampa" class="list-group-item list-group-item-action">Lampa</a>
    <a href="../detail-catolery.html?catolery=parasol" class="list-group-item list-group-item-action">Parasol</a>
    <a href="../detail-catolery.html?catolery=thermos" class="list-group-item list-group-item-action">Thermos</a>
    <a href="../detail-catolery.html?catolery=budzik" class="list-group-item list-group-item-action">Budzik</a>
    <a href="../detail-catolery.html?catolery=wentylator" class="list-group-item list-group-item-action">Wentylator</a>
    <a href="../detail-catolery.html?catolery=czajnik" class="list-group-item list-group-item-action">Czajnik</a>
    <a href="../detail-catolery.html?catolery=suszarka" class="list-group-item list-group-item-action">Suszarka</a>
    <a href="../detail-catolery.html?catolery=latarka" class="list-group-item list-group-item-action">Latarka</a>
    <a href="../detail-catolery.html?catolery=golarka" class="list-group-item list-group-item-action">Golarka</a>
    <a href="../detail-catolery.html?catolery=baterie" class="list-group-item list-group-item-action">Baterie</a>
    <a href="../detail-catolery.html?catolery=nozycki" class="list-group-item list-group-item-action">Nozycki</a>
    <a href="../detail-catolery.html?catolery=zabawka" class="list-group-item list-group-item-action">Zabawka</a>
    <a href="../detail-catolery.html?catolery=akcesorie" class="list-group-item list-group-item-action">Akcesorie</a>
   <a href="../detail-catolery.html?catolery=obuwie" class="list-group-item list-group-item-action">Obuwie</a>
   <a href="../detail-catolery.html?catolery=zelarko" class="list-group-item list-group-item-action">Zelarko</a>
   <a href="../detail-catolery.html?catolery=suszarka" class="list-group-item list-group-item-action">Suszarka</a>
   <a href="../detail-catolery.html?catolery=najlepsza_wyprzedaz" class="list-group-item list-group-item-action">Najlepsza wyprzedaz</a>
</div>
`

  // JavaScript code để thêm lớp "active" vào liên kết tương ứng
  const links = document.querySelectorAll('.list-group-item');

  // Lấy giá trị của tham số "catolery" từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const currentCatolery = urlParams.get('catolery');

  // Kiểm tra và thêm lớp "active" vào liên kết tương ứng
  links.forEach(link => {
      const linkCatolery = link.textContent.trim().toLowerCase();
      if (currentCatolery.toLowerCase() === linkCatolery) {
          link.classList.add('active');
      }
  });