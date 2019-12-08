let container   = document.querySelector(".container")            //container que tiene el esqueleto de productos
let login       = document.getElementById('login');
let registro    = document.getElementById('registro');
let menuUsuario = document.getElementById('menuUsuario')
let inputDatos  = document.getElementById('inputDatos')
let actualCookie = document.cookie.indexOf('refreshtoken');

cookieExists()
loadProducts()
function cookieExists() {
    if(actualCookie == 0) { //si es diferente de -1, existe la cookie
        login.classList.add('hidden');
        registro.classList.add('hidden');
    } else {
        menuUsuario.classList.add('hidden');
    }
}

function loadProducts(){
    let req = new XMLHttpRequest()
    req.open("GET", "http://localhost:3000/api/inicio"  + window.location.href.toString().split(window.location.host)[1] , true)
    req.send();
 
    req.onload = () => {      
        showProducts(JSON.parse(req.response))     
    };
}

function showProducts(products){
    let colums = getAllColumns()

    while(colums.length > 0){
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

    let link = getLink(colElements)
    setLink(link, product)
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
    img.classList.add('zoom');
    img.height = 250
    img.width = 250
    image.appendChild(img)
}

function getPrice(col){ return col[2] }
function setPrice(price, product){
    let priceP = document.createElement("p");                                       //crear la etiqueta <h3>
    let node = document.createTextNode("Precio actual: $" + product.precioActual);  //crear el contenido que va dentro de h1
    priceP.appendChild(node);                                                       //agrega el contenido del nodo (node)
    price.appendChild(priceP)
}

function getLink(col) {return col[4]}
function setLink(link, product) {
   if(actualCookie != -1){
    let button = document.createElement("button")
    let node = document.createTextNode("subastar")
    button.addEventListener("click", () => window.open(window.location.pathname + "productos/" + product._id, "_self"))
    button.appendChild(node)
    link.appendChild(button)
   }
   else{
    let button = document.createElement("button")
    let node = document.createTextNode("subastar")
    button.addEventListener("click", () => window.open(window.location.pathname + "login/", "_self"))
    button.appendChild(node)
    link.appendChild(button)
   }
}

function catFilter(categoria){
    console.log(categoria)
    let req = new XMLHttpRequest()
    req.open("GET", "http://localhost:3000/api/inicio/?categoria=" + categoria , true)
    req.send();
    
    req.onload = () => {      
        console.log(req.response)
        if(req.status == 200){
            showProducts(JSON.parse(req.response))     
        }        
    };
}

function logout(){
    let req = new XMLHttpRequest()
    req.open("GET", "http://localhost:3000/api/logout", true)
    req.send();
    
    req.onload = () => {      
        if(req.status == 200) 
            alert("Cerraste sesion")
        else
            alert("No tienes una sesion activa")
     
        location.reload(); 
    };
}

function busqueda(){
    if(inputDatos.value != ""){
        console.log(inputDatos.value)
        window.open("http://localhost:3000/?nombre=" + inputDatos.value, "_self")
    }

    console.log(inputDatos.value)

}