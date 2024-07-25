let cartArticulos = JSON.parse(localStorage.getItem("cartArticulos")) || [];

document.addEventListener("DOMContentLoaded", () => {
  const cartList = document.querySelector("#cart-list");
  const totalPrecio = document.querySelector("#total-precio");
  const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
  const finalizarCompraBtn = document.querySelector("#finalizar-compra");

  if (cartList && totalPrecio) {
    updateCart();
  }

  if (vaciarCarritoBtn) {
    vaciarCarritoBtn.onclick = vaciarCarrito;
  }

  if (finalizarCompraBtn) {
    finalizarCompraBtn.onclick = mostrarFormularioCompra;
  }

  const formCompra = document.getElementById('form-compra');
  if (formCompra) {
    formCompra.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const direccion = document.getElementById('direccion').value;
      const telefono = document.getElementById('telefono').value;

      //  alerta de SweetAlert
      Swal.fire({
        title: 'Compra Confirmada',
        text: `Gracias por tu compra, ${nombre}. Enviaremos los productos a ${direccion}. Nos pondremos en contacto al ${telefono}.`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        vaciarCarrito();
        const compraModal = bootstrap.Modal.getInstance(document.getElementById('compraModal'));
        if (compraModal) {
          compraModal.hide();
        }
      });
    });
  }

  // Llamar al archivo data.json utilizando fetch
  fetch('db/data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      return response.json();
    })
    .then(data => {
      addToCartButton(data); // Pasar los datos a la función addToCartButton
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

function addToCartButton(articuloArray) {
  const addButton = document.querySelectorAll(".articuloAgregar");
  
  addButton.forEach(button => {
    button.onclick = (e) => {
      const articuloId = e.currentTarget.id;
      const selectedArticulo = articuloArray.find(articulo => articulo.id == articuloId);
      const cartItem = cartArticulos.find(item => item.id == articuloId);
      
      if (cartItem) {
        cartItem.cantidad++;
      } else {
        cartArticulos.push({ ...selectedArticulo, cantidad: 1 });
      }
      
      updateCart();
    };
  });
}

function updateCart() {
  const cartList = document.querySelector("#cart-list");
  const totalPrecio = document.querySelector("#total-precio");

  if (cartList) {
    cartList.innerHTML = ''; // Limpiar la lista del carrito
  }
  
  if (cartArticulos.length === 0) {
    cartList.innerHTML = '<li class="list-group-item">Carrito vacío</li>';
  }

  let total = 0;

  cartArticulos.forEach((articulo, index) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";
    listItem.innerHTML = `
      ${articulo.nombre} - ${articulo.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} x ${articulo.cantidad}
      <button class="btn btn-danger eliminarArticulo ms-2" data-index="${index}">Eliminar</button>
      <button class="btn btn-secondary restarCantidad ms-2" data-index="${index}">-</button>
      <button class="btn btn-primary sumarCantidad ms-2" data-index="${index}">+</button>
    `;
    cartList.appendChild(listItem);

    total += articulo.precio * articulo.cantidad;
  });

  if (totalPrecio) {
    totalPrecio.textContent = total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
  }
  
  localStorage.setItem("cartArticulos", JSON.stringify(cartArticulos));
  addRemoveFromCartButton();
  addQuantityButtons();
}

function addRemoveFromCartButton() {
  const removeButton = document.querySelectorAll(".eliminarArticulo");

  removeButton.forEach(button => {
    button.onclick = (e) => {
      const index = e.currentTarget.dataset.index;
      cartArticulos.splice(index, 1);
      updateCart();
    };
  });
}

function addQuantityButtons() {
  const restarButton = document.querySelectorAll(".restarCantidad");

  restarButton.forEach(button => {
    button.onclick = (e) => {
      const index = e.currentTarget.dataset.index;

      if (cartArticulos[index].cantidad > 1) {
        cartArticulos[index].cantidad--;
      } else {
        cartArticulos.splice(index, 1);
      }

      updateCart();
    };
  });

  const sumarButton = document.querySelectorAll(".sumarCantidad");

  sumarButton.forEach(button => {
    button.onclick = (e) => {
      const index = e.currentTarget.dataset.index;
      cartArticulos[index].cantidad++;
      updateCart();
    };
  });
}

function vaciarCarrito() {
  cartArticulos = [];
  updateCart();
}

function mostrarFormularioCompra() {
  const compraModal = new bootstrap.Modal(document.getElementById('compraModal'));
  compraModal.show();
}
