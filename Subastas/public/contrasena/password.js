let actualCookie = document.cookie.indexOf('refreshtoken');
let login = document.getElementById('login');
let registro = document.getElementById('registro');

cookieExists()


function cookieExists() {
    if(actualCookie != -1) { //si es diferente de -1, existe la cookie
        login.classList.add('hidden');
        registro.classList.add('hidden');
    } else {
        menuUsuario.classList.add('hidden');
    }
}