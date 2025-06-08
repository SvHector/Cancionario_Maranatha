
import { db, ref, push, set, onValue, update } from "./firebase-config.js";

document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("lista-canciones");
  const buscar = document.getElementById("buscar");
  const btnFavoritas = document.getElementById("filtroFavoritasBtn");
  const btnNueva = document.getElementById("btn-nueva");
  const modal = document.getElementById("formulario-cancion");
  const guardar = document.getElementById("guardar-cancion");
  const cancelar = document.getElementById("cancelar");

  let editKey = null;
  let mostrarFavoritas = false;
  const cancionesRef = ref(db, "canciones");

  const cargarCanciones = () => {
    onValue(cancionesRef, snapshot => {
      lista.innerHTML = "";
      const data = snapshot.val() || {};
      const filtro = buscar.value.toLowerCase();

      Object.entries(data).forEach(([key, c]) => {
        if (
          (filtro && !c.titulo.toLowerCase().includes(filtro) && !c.autor.toLowerCase().includes(filtro)) ||
          (mostrarFavoritas && !c.favorita)
        ) return;

        const div = document.createElement("div");
        div.className = "cancion";
        div.innerHTML = `
          <span class="estrella" data-key="${key}" style="color:${c.favorita ? 'gold' : '#555'};">★</span>
          <h3>${c.titulo}</h3>
          <p><strong>Autor:</strong> ${c.autor}</p>
          ${c.notas ? `<p><em>${c.notas}</em></p>` : ""}
          <div class="letra" style="display:none;"><pre>${c.letra}</pre></div>
          <button class="editar" data-key="${key}">Editar</button> <button class="eliminar" data-key="${key}">🗑️</button>
        `;
        div.querySelector("h3").onclick = () => {
          const letra = div.querySelector(".letra");
          letra.style.display = letra.style.display === "none" ? "block" : "none";
        };
        div.querySelector(".estrella").onclick = (e) => {
          e.stopPropagation();
          const key = e.target.dataset.key;
          const nuevaValor = !data[key].favorita;
          update(ref(db, `canciones/${key}`), { favorita: nuevaValor });
        };
        
        div.querySelector(".eliminar").onclick = (e) => {
          e.stopPropagation();
          const key = e.target.dataset.key;
          if (confirm("¿Estás seguro de que deseas eliminar esta canción?")) {
            update(ref(db, `canciones/${key}`), null);
          }
        };
        div.querySelector(".editar").onclick = (e) => {
          e.stopPropagation();
          const c = data[key];
          document.getElementById("titulo").value = c.titulo;
          document.getElementById("autor").value = c.autor;
          document.getElementById("letra").value = c.letra;
          document.getElementById("genero").value = c.genero;
          document.getElementById("notas").value = c.notas;
          editKey = key;
          modal.classList.remove("oculto");
        };
        lista.appendChild(div);
      });
    });
  };

  btnNueva.onclick = () => {
    editKey = null;
    document.querySelectorAll("#formulario-cancion input, #formulario-cancion textarea").forEach(e => e.value = "");
    modal.classList.remove("oculto");
  };

  cancelar.onclick = () => modal.classList.add("oculto");

  guardar.onclick = () => {
    const nueva = {
      titulo: document.getElementById("titulo").value,
      autor: document.getElementById("autor").value,
      letra: document.getElementById("letra").value,
      genero: document.getElementById("genero").value,
      notas: document.getElementById("notas").value,
      fechaRegistro: new Date().toISOString()
    };
    if (editKey) {
      update(ref(db, `canciones/${editKey}`), nueva);
    } else {
      const nuevaRef = push(cancionesRef);
      set(nuevaRef, nueva);
    }
    modal.classList.add("oculto");
  };

  buscar.oninput = cargarCanciones;
  btnFavoritas.onclick = () => {
    mostrarFavoritas = !mostrarFavoritas;
    btnFavoritas.textContent = mostrarFavoritas ? "⭐ Ver todas" : "⭐ Favoritas";
    cargarCanciones();
  };
  cargarCanciones();
});
