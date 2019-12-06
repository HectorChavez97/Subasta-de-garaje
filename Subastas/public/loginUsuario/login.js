let loginButton = document.getElementById("login-button")
let container = document.querySelector(".container")

let actualCookie = document.cookie.indexOf('refreshtoken');
let login = document.getElementById('login');
let registro = document.getElementById('registro');




cookieExists();
loginButton.addEventListener("click", loginBListener)

function loginBListener(event){
    
    logInUser()

    event.preventDefault()
}

function logInUser(){
    
    let req = new XMLHttpRequest()

    req.open("POST", "http://localhost:3000/api/login", true)
    req.setRequestHeader('Content-Type','application/json')
    req.send(JSON.stringify(new getForm()))

    req.onload = () => {      
        if(req.status == 200){
            window.location.href = "/"
        }   
        else alert(req.status + ': ' + req.response)
    };
}

function getForm(){
    this.correo     = getEmail()
    this.contrasena = getPassword()
}

function getEmail(){
    return container.getElementsByTagName("input")[0].value
}

function getPassword(){
    return container.getElementsByTagName("input")[1].value
}

function cookieExists() {
    if(actualCookie != -1) { //si es diferente de -1, existe la cookie
        login.classList.add('hidden');
        registro.classList.add('hidden');
    } else {
        menuUsuario.classList.add('hidden');
    }
}