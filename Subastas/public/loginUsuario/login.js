let loginButton = document.getElementById("login-button")
let container = document.querySelector(".container")

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