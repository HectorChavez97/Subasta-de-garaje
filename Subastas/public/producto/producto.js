let productId = window.location.href.split("producto/")[1].replace("/","")

let req = new XMLHttpRequest()
req.open("GET","http://localhost:3000/api/producto/:" + productId, true)
req.send(null)

req.onload = () => {      
   console.log(req.response)
};