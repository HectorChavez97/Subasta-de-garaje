let registerB = document.getElementById("register-button")
let container = document.querySelector(".container")
let form = document.getElementById('form');
let botonRegistro = document.getElementById('register-button');
let firstPassword = document.getElementById('firstPassword').value;
let newPassword = document.getElementById('newPassword').value;
let invalidInput = form.querySelectorAll('input:invalid');

//form.addEventListener('click',(e) => registerBListener(e));
let actualCookie = document.cookie.indexOf('refreshtoken');
let login = document.getElementById('login');
let registro = document.getElementById('registro');

cookieExists()

function cookieExists() {
    if(actualCookie != -1) { //si esta logueado
        login.classList.add('hidden');
        registro.classList.add('hidden');
    } else {
        menuUsuario.classList.add('hidden');
        let a = document.getElementsByClassName(a).onclick = function(){alert('Debes ingresar sesion')};
    }
}
registerB.addEventListener("click", registerBListener)

/*
function validandoDatos(e) {
    if (invalidInput.length == 6) {
        botonRegistro.disabled = true;
    } else {
        if (firstPassword === newPassword) {
            botonRegistro.disabled = false;
        } else {
            botonRegistro.disabled = true;
        }
    }
}*/

function registerBListener(event){
    registerUser()

    event.preventDefault()
}

function validateCompleteData(){
    let inputs = container.getElementsByTagName("input")
    let complete = true 

    for(i = 0; i < inputs.length; i++){
        if(inputs[i].type != "radio" && inputs[i].value == "") complete = false
    }

    return complete
}

function registerUser(){
    let req = new XMLHttpRequest()

    req.open('POST', "http://localhost:3000/api/registro", true)
    req.setRequestHeader('Content-Type','application/json')
    req.send(JSON.stringify(new getForm()))

    req.onload = () => {
        if(req.status == 200) {
            alert("Register successful")
            window.open("login.html","_self")
        }
        else  alert(req.status + ': ' + req.statusText)
    };
}

function getForm(){
    this.nombre = getName()
    this.correo = getEmail()
    this.sexo   = getSex()
    this.ciudad = getCity()
    this.estado = getState()
    this.contrasena = getPassword()
}

function getName(){
    let name = container.getElementsByTagName("input")[0].value
    let lastName = container.getElementsByTagName("input")[1].value

    return name + " " + lastName
}

function getEmail(){
    return container.getElementsByTagName("input")[2].value
}

function getSex(){
    if(container.getElementsByTagName("input")[3].checked) return container.getElementsByTagName("input")[3].value
    if(container.getElementsByTagName("input")[4].checked) return container.getElementsByTagName("input")[4].value

    return container.getElementsByTagName("input")[5].value
}

function getState(){
    return document.getElementById("inputState").value
}

function getCity(){
    return container.getElementsByTagName("input")[6].value 
}

function getPassword(){
    return container.getElementsByTagName("input")[7].value
}
