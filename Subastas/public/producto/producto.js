let productId = window.location.href.split("productos/")[1].replace("/","")

let mimage       = document.getElementById("img")
let mtitle       = document.getElementById("title")
let mdescripcion = document.getElementById("descripcion")
let mcondicion   = document.getElementById("condicion")
let mtiempo      = document.getElementById("tiempo")
let msubasta     = document.getElementById("subasta")
let msubastar    = document.getElementById("subastar")
let subastaVal   = document.getElementById("subastaValue")

let response

getElement()
function getElement(){
    let req = new XMLHttpRequest()
    req.open("GET","http://localhost:3000/api/producto/:" + productId, true)
    req.send(null)
    
    req.onload = () => {    
        if(req.status == 200){
            response = JSON.parse(req.response)
            assignValues()
        }  
        else{
            //no se encontro ese id
        }
    };
}

function assignValues(){
    loadImage()
    loadTitle()
    loadDescription()
    loadCondicion()
    getTime()
    loadSubasta()
}

function loadImage(){
    let image = document.createElement("img");                    //crear la etiqueta <img>
    image.setAttribute('src', response[0].image)
    image.width = 350
    image.height = 350
    mimage.appendChild(image)
}

function loadTitle(){
    let title = document.createElement("h2");                    //crear la etiqueta <img>
    let node = document.createTextNode(response[0].titulo);    
    title.appendChild(node)
    mtitle.appendChild(title)
}

function loadDescription(){
    let descripcion = document.createElement("p")
    let node = document.createTextNode(response[0].descripcion)
    descripcion.appendChild(node)
    mdescripcion.appendChild(descripcion)
}

function loadCondicion(){
    let descripcion = document.createElement("p")
    let node = document.createTextNode(response[0].estado)
    descripcion.appendChild(node)
    mcondicion.appendChild(descripcion)

    descripcion.style.color = "red"
}

function getTime(){
    let currentD = new Date()
    let productD = new Date( response[0].finFechaDia + " " +  response[0].finFechaHora)

    let currentTime = currentD.getTime();
    let eventTime   = productD.getTime();

    let remTime = eventTime - currentTime;

    let s = Math.floor(remTime / 1000);
    let m = Math.floor(s / 60);
    let h = Math.floor(m / 60);
    let d = Math.floor(h / 24);

    h %= 24;
    m %= 60;
    s %= 60;

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    document.getElementById('days').textContent = d;

    document.getElementById('hours').textContent = h;
    document.getElementById('minutes').textContent = m;
    document.getElementById('seconds').textContent = s;

    setTimeout(getTime, 1000);
}

function loadSubasta(){
    let subasta = document.createElement("p")
    let node = document.createTextNode(response[0].precioActual)
    subasta.appendChild(node)
    msubasta.appendChild(subasta)
}

function onClickButton(){
    if(subastaVal.value <= response[0].precioActual) alert("No puedes subastar menos del precio actual")
    else{
        let req = new XMLHttpRequest()
        req.open("PATCH","http://localhost:3000/api/producto/:" + productId, true)
        req.setRequestHeader('Content-Type','application/json')
        req.send(JSON.stringify(new getForm(subastaVal.value)))

        req.onload = () => {      
            if(req.status == 200){
                 alert("Oferta exitosa")
            }   
            else  alert("Oferta fallida")
        };
    }
}

function getForm(pActual){
    this.precioActual = pActual
}