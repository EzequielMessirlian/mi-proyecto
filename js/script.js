let carrito = [];

// Seleccionar elementos del DOM
const carritoContenedor = document.getElementById('carrito-contenedor');
const totalElement = document.getElementById('total');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const comprarBtn = document.getElementById('comprar');

function actualizarCarrito() {
    carritoContenedor.innerHTML = '';  
    let total = 0;

    carrito.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <span>${producto.nombre}</span>
            <span>$${producto.precio}</span>
            <button class="eliminar" data-id="${producto.id}">Eliminar</button>
        `;
        carritoContenedor.appendChild(productoDiv);
        total += parseFloat(producto.precio);
    });

    totalElement.textContent = total.toFixed(2);
    document.querySelectorAll('.eliminar').forEach(button => {
        button.addEventListener('click', (e) => {
            eliminarProducto(e.target.dataset.id);
        });
    });
}

function agregarProducto(id, nombre, precio, boton) {
    // Buscar si el producto ya está
    const productoExistente = carrito.find(producto => producto.id === id);

    if (productoExistente) {
        // Si existe aumentamos la cantidad del producto
        productoExistente.cantidad += 1;
    } else {
        // Si no existe lo agregamos con cantidad 1
        const producto = { id, nombre, precio, cantidad: 1 };
        carrito.push(producto);
    }

    actualizarCarrito();  

    boton.textContent = '✓ Agregado';
    boton.disabled = true; 

    setTimeout(() => {
        boton.textContent = 'Agregar al carrito';
        boton.disabled = false;  
    }, 2000);
}

function actualizarCarrito() {
    carritoContenedor.innerHTML = '';  
    let total = 0;

    carrito.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <span>${producto.nombre} (x${producto.cantidad})</span> <!-- Muestra la cantidad -->
            <span>$${(producto.precio * producto.cantidad).toFixed(2)}</span> <!-- Precio total por ese producto -->
            <button class="eliminar" data-id="${producto.id}">Eliminar</button>
        `;
        carritoContenedor.appendChild(productoDiv);
        total += producto.precio * producto.cantidad;
    });

    totalElement.textContent = total.toFixed(2); 

    document.querySelectorAll('.eliminar').forEach(button => {
        button.addEventListener('click', (e) => {
            eliminarProducto(e.target.dataset.id);
        });
    });
}

function eliminarProducto(id) {
    const productoIndex = carrito.findIndex(producto => producto.id === id);
    if (productoIndex !== -1) {
        const producto = carrito[productoIndex];
        if (producto.cantidad > 1) {
           
            producto.cantidad -= 1;
        } else {
            
            carrito.splice(productoIndex, 1);
        }
        actualizarCarrito();  
    }
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

function comprar() {
    if (carrito.length > 0) {
        alert("¡Gracias por tu compra!");
        carrito = []; 
        actualizarCarrito();
    } else {
        alert("Tu carrito está vacío.");
    }
}

document.querySelectorAll('.agregar-carrito').forEach(button => {
    button.addEventListener('click', (e) => {
        const productoElemento = e.target.closest('.producto-item');
        const id = productoElemento.dataset.id;
        const nombre = productoElemento.dataset.nombre;
        const precio = productoElemento.dataset.precio;

        agregarProducto(id, nombre, precio, e.target);
    });
});

vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
comprarBtn.addEventListener('click', comprar);