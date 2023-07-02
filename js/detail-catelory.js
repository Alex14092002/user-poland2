
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
            <div class="product-item col-6 col-md-3">
            <div class="product-mini">
                <a href="../detail-product.html?id_catelory=${id_catoley}&id=${key}">
                    <div class="img-product">
                        <img src="${value.img1}" alt="${value.img1}" width="100%">
                    </div>
                </a>
              
                
                <div class="name-product">
                    <h2>${value.name}</h2>
                </div>
                <div class="price-product">
                    <h2>${value.price} Złoty</h2>
                </div>
                <div class="btn-add-cart">
                    <a href="../detail-product.html?id=${key}&id_catelory=${id_catoley}">Patrz szczegóły</a>
                </div>

            </div>
            
        </div>   
            `
            }
            
        }
       
    }

    


})();