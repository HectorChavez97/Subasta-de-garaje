let publicarB = document.getElementById("publicar-button")
let container = document.querySelector(".container")
publicarB.addEventListener("click", publicarBListener)
let form = document.getElementById('form');

let actualCookie = document.cookie.indexOf('refreshtoken');
let login = document.getElementById('login');
let registro = document.getElementById('registro');

let productId = window.location.href.split("editar/")[1].replace("/","")

cookieExists()

function cookieExists() {

    if(actualCookie != -1) { //si es diferente de -1, existe la cookie
        console.log('cookie existe')
        login.classList.add('hidden');
        registro.classList.add('hidden');
    } else {
        console.log('cookie noexiste')
        menuUsuario.classList.add('hidden');
    }
}


function publicarBListener(event){
    console.log(productId)
    publishProduct()
    
    event.preventDefault()
}


function publishProduct(){
    console.log(productId)
    let req = new XMLHttpRequest()
    req.open("PUT","http://localhost:3000/api/editar/" + productId , true)
    req.setRequestHeader('Content-Type','application/json')
    req.send(JSON.stringify(new getForm()))

    req.onload = () => {
        if(req.status == 200) {
            alert("Publish successful")
            window.open("/login","_self")
        }
        else  alert(req.status + ': ' + req.statusText)
    };
}


function getForm(){
    this.titulo = getTitulo()
    this.descripcion = getDescription()
    this.categoria = getCategoria();
    this.image = getFile()
    this.estado = getEstado()
    this.finFechaDia = getDay()
    this.finFechaHora = getHour()
    this.precioInicial = getPrice()
    this.precioActual = getPrice()
}
function getTitulo(){
    return container.getElementsByTagName("input")[0].value
}

function getDescription(){
    return document.getElementById("description").value
}

function getCategoria() {
    return document.getElementById('categoria').value;
}

function getEstado(){
    if(container.getElementsByTagName("input")[2].checked) return container.getElementsByTagName("input")[2].value
    
    return container.getElementsByTagName("input")[3].value
}

function getDay(){
    return container.getElementsByTagName("input")[3].value 
}

function getHour(){
    return container.getElementsByTagName("input")[4].value
}

function getPrice(){
    return container.getElementsByTagName("input")[5].value
}

function getFile(){
    return container.getElementsByTagName("input")[6].value
}

function getURL() {
return window.path
}


