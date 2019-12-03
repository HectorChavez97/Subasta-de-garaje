let container = document.querySelector(".container")            //container que tiene el esqueleto de productos

function loadProducts(){
    let req = new XMLHttpRequest()
    req.open("GET","http://localhost:3000/productos", true)
    req.send(null)
    
    req.onload = () => {      
        if(req.status == 200) showProducts(JSON.parse(req.response))            
        else alert(req.status + ': ' + req.statusText)
    };
}

function showProducts(products){
    let colums = getAllColumns()

    while(colums.length > 0){
        colums[0].addEventListener("click", productListener)
        addData(colums[0], products[0])
        colums.shift()
        products.shift()
    }    
}

function addData(col, product){
    let colElements = col.querySelectorAll('div')
    let title = getTitle(colElements)
    setTitle(title, product)

    let image = getImage(colElements)
    setImage(image, product)

    let price = getPrice(colElements)
    setPrice(price, product)

    let clock = getClock(colElements)
    setClock(clock, product)
}

function getAllColumns(){
    let arrayCols = new Array()

    arrayCols.push(document.getElementById('colOne'))
    arrayCols.push(document.getElementById('colTwo'))
    arrayCols.push(document.getElementById('colThree'))
    arrayCols.push(document.getElementById('colFour'))
    arrayCols.push(document.getElementById('colFive'))
    arrayCols.push(document.getElementById('colSix'))
    arrayCols.push(document.getElementById('colSeven'))
    arrayCols.push(document.getElementById('colEight'))
    arrayCols.push(document.getElementById('colNine'))

    return arrayCols
}

function getTitle(col){ return col[0] }
function setTitle(title, product){
    let titleH1 = document.createElement("h4");                 //crear la etiqueta <h1>
    let node = document.createTextNode(product.titulo);         //crear el contenido que va dentro de h1
    titleH1.appendChild(node);                                  //agrega el contenido del nodo (node)
    title.appendChild(titleH1)
}

function getImage(col){ return col[1] }
function setImage(image, product){
    let img = document.createElement("img");                    //crear la etiqueta <img>
    img.setAttribute('src', product.image);
    img.height = 250
    img.width = 250
    image.appendChild(img)
}


function getPrice(col){ return col[2] }
function setPrice(price, product){
    let priceP = document.createElement("p");                   //crear la etiqueta <h3>
    let node = document.createTextNode(product.precioInicial);  //crear el contenido que va dentro de h1
    priceP.appendChild(node);                                   //agrega el contenido del nodo (node)
    price.appendChild(priceP)
}

function getClock(col){ return col[3] }
function setClock(clock, product){
    let clockP = document.createElement("p");                   //crear la etiqueta <h4>
    let node = document.createTextNode("");                     //crear el contenido que va dentro de h1
    clockP.appendChild(node)
    clock.appendChild(clockP)

    jjj(node, product)
}

function jjj(node, product){
    let currentT = new Date()
    let productT = new Date("November 19, 2019 " + product.finFechaHora)

    let currentTime = currentT.getTime()
    let productTime = productT.getTime()

    let hour = ddd(productTime - currentTime)
    node.textContent = hour

    setTimeout(loadProducts,  1000);
    //setInterval(jjj(node, product), 1000)
}

function ddd(hour){
    let s = Math.floor(hour / 1000);
    let m = Math.floor(s / 60);
    let h = Math.floor(m / 60);
    let d = Math.floor(h / 24);

    h %= 24;
    m %= 60;
    s %= 60;

    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    return h + ":" + m  + ":" + s 
}

function productListener(){ 
    window.open("producto.html")
}

loadProducts()


/*
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var arrayProductos = JSON.parse(this.responseText);
    document.getElementById("demo").innerHTML = myObj.name;
  }
};
xmlhttp.open("GET", "http://localhost:3000/productos", true);
xmlhttp.send();


*/