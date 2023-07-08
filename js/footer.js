const footer = document.querySelector('#footer')


footer.innerHTML += `
<div class="footer row">
<div class="item-footer col-6 col-md-3">
    <img src="./image/cropped-logo-new-11-512x512-1.png" alt="logo" width="50%">
</div>
<div class="item-footer col-6 col-md-3">
    <ul>
        <li>Często zadawane pytania</li>
        <li>SKONTAKTUJ SIĘ Z NAMI</li>
        <li>WYSYŁKA I ZWROT</li>
        <li>KARIERY </li>
    </ul>
</div>
<div class="item-footer col-6 col-md-3">
    <ul>
        
        <li>konto bankowe: 51 1240 1503 1111 0011 1065 1719</li>
        <li>Tel : 787162641</li>
        <li>Gmail : agdmulti1@gmail.com</li>
        <li>Adress : Marywilska 44 : Box : B89</li>
    </ul>
</div>

<div class="item-footer col-6 col-md-3">
    <h5>Zostaw kontaktowy adres e-mail</h5>
    <input type="text"  placeholder="Wprowadź swój email..">
    <button>Wysłać</button>
    <p>W pierwszej kolejności udostępniamy nowe produkty, promocje i wiadomości branżowe osobom z wewnątrz.</p>
</div>
</div>
`

const inputEmail = footer.querySelector('input[type="text"]');
const buttonSend = footer.querySelector('button');
buttonSend.addEventListener('click', () => {
    
    const email = inputEmail.value;
  
    const data = { email };
  
    fetch('https://db-ecomer-pola-default-rtdb.firebaseio.com/email.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        console.log('Data sent successfully:', result);
        // Thực hiện các hành động khác sau khi dữ liệu được gửi thành công
      })
      .catch(error => {
        console.error('Error sending data:', error);
        // Xử lý lỗi nếu gửi dữ liệu không thành công
      });
  });