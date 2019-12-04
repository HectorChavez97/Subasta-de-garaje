let registerB = document.getElementById("register-button")
let container = document.querySelector(".container")
//registerB.addEventListener("click", registerBListener)
let form = document.getElementById('form');
let botonRegistro = document.getElementById('register-button');
let firstPassword = document.getElementById('firstPassword').value;
let newPassword = document.getElementById('newPassword').value;
let invalidInput = form.querySelectorAll('input:invalid');


form.addEventListener('change',(e) => validandoDatos(e));

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
}

function registerBListener(event){
    if(validateCompleteData()){
        validateEmail()
    }

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

function validateEmail(){
    let correo = getEmail()
    let req = new XMLHttpRequest()
    req.open("GET","http://localhost:3000/usuarios?correo=" + correo, true)
    req.send(null)

    req.onload = () => {        
        if(req.status == 200){
            let res = JSON.parse(req.response)  

            if(res.length == 0) registerUser()
            else alert("Email already in use")
        }   
        else alert(req.status + ': ' + req.statusText)
    };
}

function registerUser(){
    let req = new XMLHttpRequest()

    req.open('POST', "http://localhost:3000/usuarios", true)
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
    this.sexo = getSex()
    this.ciudad = getCity()
    this.estado = getState()
    this.contrasena = getPassword()
    this.usuario = "usuario"
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
