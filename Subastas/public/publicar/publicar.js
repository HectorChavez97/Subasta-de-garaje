let publicarB = document.getElementById("publicar-button")
let container = document.querySelector(".container")
publicarB.addEventListener("click", publicarBListener)
let form = document.getElementById('form');

//form.addEventListener('change',(e) => publicarBListener(event));


function publicarBListener(event){
    console.log(validateCompleteData())
    if(validateCompleteData()){
        publishProduct()
    }

    event.preventDefault()
}

function validateCompleteData(e){
    let inputs = container.getElementsByTagName("input")
    let complete = true 

    for(i = 0; i < inputs.length; i++){
        console.log(inputs[i])
        if(inputs[i].type != "radio" && inputs[i].value == "") complete = false
    }

    let description = document.getElementById("description")
    if(description.value <= 0) complete = false

    return complete
}

function publishProduct(){
    let req = new XMLHttpRequest()
    req.open("POST","http://localhost:3000/api/publicar", true)
    req.setRequestHeader('Content-Type','application/json')
    req.send(JSON.stringify(new getForm()))

    req.onload = () => {
        if(req.status == 200) {
            alert("Publish successful")
            window.open("login.html","_self")
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
    this.autor = "test"
    this.precioInicial = getPrice()
    this.precioActual = "0"
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


