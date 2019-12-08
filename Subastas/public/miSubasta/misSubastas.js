let container = document.querySelector(".container")            //container que tiene el esqueleto de productos
let actualCookie = document.cookie.indexOf('refreshtoken');
let login = document.getElementById('login');
let registro = document.getElementById('registro');
let menuUsuario = document.getElementById('menuUsuario')

loadProducts()
function loadProducts(){
    let req = new XMLHttpRequest()
    req.open("GET","http://localhost:3000/api/historial", true)
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

    let price = getPrice(colElements)
    setPrice(price, product)

    let status = getStatus(colElements)
    setStatus(status, product)

    let link = getLink(colElements)
    setLink(link, product)
}

function getAllColumns(){
    let arrayCols = new Array()

    arrayCols.push(document.getElementById('rowOne'))
    arrayCols.push(document.getElementById('rowTwo'))
    arrayCols.push(document.getElementById('rowThree'))
    arrayCols.push(document.getElementById('rowFour'))
    arrayCols.push(document.getElementById('rowFive'))
    arrayCols.push(document.getElementById('rowSix'))
    arrayCols.push(document.getElementById('rowSeven'))
    arrayCols.push(document.getElementById('rowEight'))
    arrayCols.push(document.getElementById('rowNine'))

    return arrayCols
}

function getTitle(col){ return col[0] }
function setTitle(title, product){
    let titleH1 = document.createElement("h4");                 //crear la etiqueta <h1>
    let node = document.createTextNode(product.titulo);         //crear el contenido que va dentro de h1
    titleH1.appendChild(node);                                  //agrega el contenido del nodo (node)
    title.appendChild(titleH1)
}

function getPrice(col){ return col[1] }
function setPrice(price, product){
    let priceP = document.createElement("p");                   //crear la etiqueta <h3>
    let node = document.createTextNode(product.precioActual);  //crear el contenido que va dentro de h1
    priceP.appendChild(node);                                   //agrega el contenido del nodo (node)
    price.appendChild(priceP)
}

function getStatus(col){ return col[2] }
function setStatus(clock, product){
    let clockP = document.createElement("p");                   //crear la etiqueta <h4>
    let node = document.createTextNode(product.precioActual);                   //crear el contenido que va dentro de h1
    clockP.appendChild(node)
    clock.appendChild(clockP)
}

function getLink(col) {return col[3]}
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
