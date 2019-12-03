let loginButton = document.getElementById("login-button")
let container = document.querySelector(".container")

loginButton.addEventListener("click", loginBListener)

function loginBListener(event){
    if(validateCompleteData()){
        validateUser()
    }

    event.preventDefault()
}

function validateCompleteData(){
    let inputs = container.getElementsByTagName("input")
    let complete = true 

    for(i = 0; i < inputs.length; i++){
        if(inputs[i].type != "checkbox" && inputs[i].value == "") complete = false
    }

    return complete
}

function validateUser(){
    let correo = getEmail()
    let pass = getPassword()

    let req = new XMLHttpRequest()
    req.open("GET","http://localhost:3000/usuarios?correo=" + correo, true)
    req.send(null)

    req.onload = () => {      
        if(req.status == 200){
            let res = JSON.parse(req.response)  
 
            if(res.length == 0) alert("Data incorrect, please check")
            else {
                if(res[0].contrasena == pass) window.location.href = "inicio.html"
                else alert("Password incorrect, please check")
            }
        }   
        else alert(req.status + ': ' + req.statusText)
    };
}

function getEmail(){
    return container.getElementsByTagName("input")[0].value
}

function getPassword(){
    return container.getElementsByTagName("input")[1].value
}