
document.addEventListener("DOMContentLoaded", () => {
  const articulosContainer = document.querySelector("#articulos-container");

  if (articulosContainer) {
      // Llamar al archivo data.json utilizando fetch
      fetch('db/data.json')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Error al obtener los datos');
              }
              return response.json();
          })
          .then(data => {
              renderArticulos(data);
          })
          .catch(error => {
              console.error('Error:', error);
          });
  }
});

function renderArticulos(articuloArray) {
  const articulosContainer = document.querySelector("#articulos-container");

  if (articulosContainer) {
      articulosContainer.innerHTML = ''; 

      articuloArray.forEach(articulo => {
          const card = document.createElement("div");
          card.className = "col-12 col-md-4 mb-4";
          card.innerHTML = `
              <div class="card h-100">
                  <img src="${articulo.imagenUrl}" class="card-img-top" alt="${articulo.nombre}">
                  <div class="card-body">
                      <h5 class="card-title">${articulo.nombre}</h5>
                      <p class="card-text">${articulo.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
                      <button class="btn btn-success articuloAgregar" id="${articulo.id}">Agregar al carrito</button>
                  </div>
              </div>
          `;
          articulosContainer.appendChild(card);
      });

      addToCartButton(articuloArray); 
  }
}

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
