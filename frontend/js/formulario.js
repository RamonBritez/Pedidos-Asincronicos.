function qs(string) {
    return document.querySelector(string)
}


window.onload = () => {
    let id = qs("#id")
    let title = qs("#title")
    let rating = qs("#rating")
    let awards = qs("#awards")
    let releaseDate = qs("#release_date")
    let length = qs("#length")
    let error = qs("#error")
    let botonModificar = qs(".botonModificar")
    let botonAgregar = qs(".botonAgregar")
    let botonBorrar = qs(".botonBorrar")

    let genre_id; //Para reenviar el id del genero
    let idPrueba = prompt("Ingresa un id");

    function loader() {
        fetch(`http://localhost:3031/api/movies/${id.value}`).then(res => res.json()).then(({ data: pelicula }) => {
            title.value = pelicula.title
            rating.value = pelicula.rating
            awards.value = pelicula.awards
            releaseDate.value = pelicula.release_date
            length.value = pelicula.length
            genre_id = pelicula.genre_id
        }).catch(() => {
            error.innerHTML = "Hubo un error al traer la pelicula"
        })
    }

    if (idPrueba) {
        id.value = idPrueba;
    } else {
        id.value = 1;
    }

    loader()

    botonModificar.addEventListener("click", () => {
        let data = {
            title: title.value,
            rating: rating.value,
            awards: awards.value,
            release_date: releaseDate.value,
            length: length.value,
            genre_id
        }

        fetch(`http://localhost:3031/api/movies/update/${id.value}`, {
            method: "PUT", body: JSON.stringify(data), headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                console.log(data)
                alert("Pelicula modificada con exito")
            })
            .catch(err => {
                alert("Hubo un error al modificar la pelicula, por favor leer la consola")
                console.log(err)
            })
    })

    botonAgregar.addEventListener("click", () => {
        let data = {
            title: title.value,
            rating: rating.value,
            awards: awards.value,
            release_date: releaseDate.value,
            length: length.value,
            genre_id
        }

        fetch(`http://localhost:3031/api/movies/create`, {
            method: "POST", body: JSON.stringify(data), headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => alert("Pelicula creada con exito"))
            .catch(err => {
                alert("Hubo un error al crear la pelicula, por favor leer la consola")
                console.log(err)
            })
    })

    botonBorrar.addEventListener("click", () => {

        fetch(`http://localhost:3031/api/movies/delete/${id.value}`, { method: "DELETE" })
            .then(() => {
                alert("Pelicula borrada con exito");
                id.value = prompt("Ingresa un id");
                loader();
            })
            .catch(err => {
                alert("Hubo un error al borrar la pelicula, por favor leer la consola");
                console.log(err);
            })
    })
}