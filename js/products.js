let carsArray = [];
let url= "https://japceibal.github.io/emercado-api/cats_products/101.json";

function showCategoriesList(array){
    let htmlContentToAppend = "";


    for (let i = 0; i < array.length; i++){ 
        let car = array[i];
        
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + car.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ car.name + " - " + car.currency + " " + car.cost + `</h4> 
                        <p> `+ car.description +`</p> 
                        </div>
                        <small class="text-muted">` + car.soldCount + ` ventas</small> 
                    </div>

                </div>
            </div>
        </div>
        `
    }
    document.getElementById("cat-list-container").innerHTML += htmlContentToAppend;
}




document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            carsArray = resultObj.data.products;
            showCategoriesList(carsArray);
        }
    });
    
})
