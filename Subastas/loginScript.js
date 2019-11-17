let loginButton = document.getElementById("loginButton")
loginButton.addEventListener("click", loginButtonListener)

function loginButtonListener(event){
    let div = document.getElementById("login-div").hidden = true

    //window.open("inicio.html","_self")
    event.preventDefault()
}