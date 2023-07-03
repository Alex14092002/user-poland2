
(async () =>{
    let params = new URLSearchParams(location.search);
    let id_catoley = params.get('catolery')
    console.log(id_catoley);
    document.title = `${id_catoley}`
    const res = await fetch(`https://db-ecomer-pola-default-rtdb.firebaseio.com/${id_catoley}.json`)

    const product = await res.json()

    const services = document.querySelector('#services')
    console.log(product);

    if(product){

        for (const [key, value] of Object.entries(product)) {
            if(value != null){
                services.innerHTML += `
                <div class="col-6 col-md-3 mb-4">
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
            `
            }
            
        }
       
    }

    


})();