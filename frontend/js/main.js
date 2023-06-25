window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch

  if (!localStorage.getItem("favs")) localStorage.setItem("favs", JSON.stringify([]))

  let favList = JSON.parse(localStorage.favs);

  let favLinkContainer = document.createElement("div");
  favLinkContainer.style.width = "100%";
  favLinkContainer.style.height = "20px";
  
  let favLink = document.createElement("a");
  favLink.href = "./favoritas.html";
  favLink.innerText = "Peliculas favoritas";
  favLink.style.display = "none";
  favLink.style.width = "100%";
  favLink.style.textAlign = "center";
  if (favList.length > 0) {
    favLink.style.display = "block";
  }
  favLinkContainer.appendChild(favLink);
  container.appendChild(favLinkContainer);

  fetch("http://localhost:3031/api/movies").then(res => res.json()).then(
    peliculas => {
      let data = peliculas.data;

      data.forEach((movie) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const h1 = document.createElement("h1");
        h1.textContent = movie.title;

        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;

        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;

        const favorite = document.createElement("i");
        favorite.classList.add("fa-star")
        favorite.style.color = "gold"
        favorite.style.cursor = "pointer"
        if (favList.includes(movie.id)) {
          favorite.classList.add("fa-solid")
        } else favorite.classList.add("fa-regular")

        favorite.addEventListener("click", () => {
          if (!favList.includes(movie.id)) {
            favorite.classList.remove("fa-regular");
            favorite.classList.add("fa-solid");
            favList.push(movie.id);
            let newList = favList.slice()
            localStorage.setItem("favs", JSON.stringify(newList))
            favLink.style.display = "block";
          } else {
            favorite.classList.remove("fa-solid");
            favorite.classList.add("fa-regular");
            favList = favList.filter(favId => favId !== movie.id)
            let newList = favList.slice()
            localStorage.setItem("favs", JSON.stringify(newList))
            if (favList.length == 0) {
              favLink.style.display = "none";
            }
          }
        })

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Genero: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(duracion);
        card.appendChild(favorite);
      });
    }
  )


};
