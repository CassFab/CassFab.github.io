const stockProductos = [
  {
    id: 1,
    nombre: "Camiseta Argentina",
    cantidad: 1,
    desc: "Camiseta oficial de la selección Argentina",
    precio: 10000,
    img: "img/argentina.jpeg",
  },
  {
    id: 2,
    nombre: "Camiseta Croacia",
    cantidad: 1,
    desc: "Camiseta oficial de la selección de Croacia",
    precio: 9000,
    img: "img/croacia.jpeg",
  },
  {
    id: 3,
    nombre: "Camiseta España",
    cantidad: 1,
    desc: "Camiseta oficial de la selección española",
    precio: 10500,
    img: "img/españa.jpeg",
  },
  {
    id: 4,
    nombre: "Camiseta Países bajos",
    cantidad: 1,
    desc: "Camiseta oficial de la seleccíon de Países Bajos",
    precio: 9500,
    img: "img/holanda.jpeg",
  },
  {
    id: 5,
    nombre: "Camiseta Portugal",
    cantidad: 1,
    desc: "Camiseta oficial de la selección portuguesa",
    precio: 10200,
    img: "img/portugal.jpeg",
  },
  {
    id: 6,
    nombre: "Camiseta Inglaterra",
    cantidad: 1,
    desc: "Camiseta oficial de la selección inglesa",
    precio: 9800,
    img: "img/inglaterra.jpeg",
  },
  {
    id: 7,
    nombre: "Camiseta Francia",
    cantidad: 1,
    desc: "Camiseta oficial de la selección gala",
    precio: 10000,
    img: "img/francia.jpeg",
  },
  {
    id: 8,
    nombre: "Camiseta Marruecos",
    cantidad: 1,
    desc: "Camiseta oficial de la selección marroquí",
    precio: 8200,
    img: "img/marruecos.jpg",
  },
  {
    id: 9,
    nombre: "Camiseta Brasil",
    cantidad: 1,
    desc: "Camiseta oficial de la selección brasileña",
    precio: 10200,
    img: "img/brasil.jpg",
  },
  {
    id: 10,
    nombre: "Camiseta Italia",
    cantidad: 1,
    desc: "Camiseta oficial de la selección italiana",
    precio: 9500,
    img: "img/italia.jpg",
  },
  
];
let carrito = [];

const contenedor = document.querySelector('#contenedor')
const carritoContenedor = document.querySelector('#carritoContenedor')
const vaciarCarrito = document.querySelector('#vaciarCarrito')
const precioTotal = document.querySelector('#precioTotal')
const comprar = document.querySelector('#comprar')
const nombreForm = document.querySelector("#nombre")
const correoForm = document.querySelector("#correo")
const formulario = document.querySelector("#formulario");
const info = document.querySelector(".info");
const mostrarInfo = formulario.addEventListener("submit", function(e){
  e.preventDefault();
  info.innerHTML= `<h5>Gracias por tu compra ${nombreForm.value}, nos comunicaremos a ${correoForm.value} para coordinar el pago </h5>`
})




document.addEventListener('DOMContentLoaded', () => {
    carrito = JSON.parse(localStorage.getItem('carrito')) || []
    mostrarCarrito()
})


stockProductos.forEach((prod) => {
  const {id, nombre, precio, desc, img, cantidad } = prod

  contenedor.innerHTML += `
  <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button onclick="agregarProducto(${id})" class="btn btn-primary"> Añadir producto</button>
    </div>
  </div>
    `
});

comprar.addEventListener('click', () => {
  if(carrito.length === 0){
    Swal.fire('No hay nada que comprar, su carrito está vacío')
  } else {
    Swal.fire('Rellene el formulario para confirmar su compra')

  }

})


vaciarCarrito.addEventListener('click', () => {
  carrito.length = []
  mostrarCarrito()
})


function agregarProducto(id){

    const está = carrito.some(prod => prod.id === id)

    if(está){
      const prod = carrito.map(prod => {
        if(prod.id === id){
          prod.cantidad ++
        }
      })
    } else {
      const añadir = stockProductos.find((prod) => prod.id === id)
      carrito.push(añadir)
    }

       mostrarCarrito()
}

const mostrarCarrito = () => {
  const modalBody = document.querySelector('.modal .modal-body')

    modalBody.innerHTML = '';
    carrito.forEach((prod) => {
    const {id, nombre, img, desc, cantidad, precio} = prod
    modalBody.innerHTML += `
    <div class="modal-contenedor">
    </div>
    <img class="img-fluid" src="${img}"/> 
    </div>

    <div>
    <p>Producto: ${nombre}
    <p>Precio: ${precio}
    <p>Cantidad: ${cantidad}

    <button onclick="eliminarProducto(${id})" class="btn btn-danger"> Eliminar producto</button>

    </div>
    `
  })

  if(carrito.length === 0){
    modalBody.innerHTML = `
    <p> Tu carrito esta vacío </p>`
  }

  carritoContenedor.textContent = carrito.length

  precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)

 agregarStorage()
  
}

function eliminarProducto(id){
  const casacaId = id
  carrito = carrito.filter((casaca) => casaca.id !== casacaId)
  mostrarCarrito()
}


function agregarStorage(){
  localStorage.setItem("carrito", JSON.stringify(carrito))
}

nombreForm.addEventListener("input", function(){
  if (nombreForm.value === ""){
    Swal.fire('Ingrese un dato válido');
  }
})

correoForm.addEventListener("input", function(){
  if (correoForm.value === ""){
    Swal.fire('Ingrese un correo válido');
  }
})

const printFooter = document.querySelector("footer");

const pedirInfo = async ()=>{
    const res = await fetch("./info.json");
    const datainfo = await res.json()

     datainfo.forEach((aa)=> {
        

        footer.innerHTML += `
        
        <div class="card mt-3" style="width: 18rem;">
        <img class="card-img-top mt-2" src="${aa.img}" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title"> ${aa.nombre}</h5>
        <p class="card-text">Ocupación: ${aa.ocupacion}</p>
        <p class="card-text">Años de experiencia: ${aa.añosDeExperiencia}</p>
        </div>
        </div>
        `
    });
};

pedirInfo();  