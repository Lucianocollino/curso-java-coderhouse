const articulos = [
    { id: 1, nombre: "Bullpadel Vertex 04", precio: 600000 },
    { id: 2, nombre: "Siux Electra st3 pro", precio: 550000 },
    { id: 3, nombre: "Adidas Metalbone 3.3", precio: 700000 },
    { id: 4, nombre: "Wilson Bela v2", precio: 650000 },
    { id: 5, nombre: "Siux Diablo Revolution 3", precio: 500000 },
    { id: 6, nombre: "Bullpadel hack 03 2024", precio: 550000 },
    { id: 7, nombre: "Siux Fenix 4 pro", precio: 530000 },
    { id: 8, nombre: "Siux trilogy pro 4", precio: 600000 },
    { id: 9, nombre: "Varlion bourne MY", precio: 390000 }
  ];
  
  let cartArticulos = JSON.parse(localStorage.getItem("cartArticulos")) || [];
  
  document.addEventListener("DOMContentLoaded", () => {
    const articulosContainer = document.querySelector("#articulos-container");
    const cartList = document.querySelector("#cart-list");
    const totalPrecio = document.querySelector("#total-precio");
  
    if (articulosContainer) {
      renderArticulos(articulos);
    }
  
    if (cartList && totalPrecio) {
      updateCart();
    }
  
    function renderArticulos(articuloArray) {
      if (articulosContainer) {
        articulosContainer.innerHTML = ''; // Limpiar contenedor
      }
      articuloArray.forEach(articulo => {
        const card = document.createElement("div");
        card.className = "articulo-card";
        card.innerHTML = `
          <h3>${articulo.nombre}</h3>
          <p>${articulo.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
          <button class="articuloAgregar" id="${articulo.id}">Agregar</button>
        `;
        if (articulosContainer) {
          articulosContainer.appendChild(card);
        }
      });
      addToCartButton();
    }
  
    function addToCartButton() {
      const addButton = document.querySelectorAll(".articuloAgregar");
      addButton.forEach(button => {
        button.onclick = (e) => {
          const articuloId = e.currentTarget.id;
          const selectedArticulo = articulos.find(articulo => articulo.id == articuloId);
          const cartItem = cartArticulos.find(item => item.id == articuloId);
          if (cartItem) {
            cartItem.cantidad++;
          } else {
            cartArticulos.push({...selectedArticulo, cantidad: 1 });
          }
          updateCart();
        };
      });
    }
  
    function updateCart() {
      if (cartList) {
        cartList.innerHTML = ''; // Limpiar lista del carrito
      }
      let total = 0;
      for (let i = 0; i < cartArticulos.length; i++) {
        const articulo = cartArticulos[i];
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          ${articulo.nombre} - ${articulo.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} x ${articulo.cantidad}
          <button class="eliminarArticulo" data-index="${i}">Eliminar</button>
        `;
        if (cartList) {
          cartList.appendChild(listItem);
        }
        total += articulo.precio * articulo.cantidad;
      }
      if (totalPrecio) {
        totalPrecio.textContent = total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
      }
      localStorage.setItem("cartArticulos", JSON.stringify(cartArticulos));
      addRemoveFromCartButton();
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
  });