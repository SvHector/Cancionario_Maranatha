
import { db, ref, remove } from "./firebase-config.js";

document.addEventListener("DOMContentLoaded", () => {
  const btnEliminar = document.getElementById("btn-eliminar");
  const inputId = document.getElementById("key");

  btnEliminar.onclick = () => {
    const key = inputId.value.trim();
    if (!key) {
      alert("Por favor escribe el ID de la canción a eliminar.");
      return;
    }
    if (confirm("¿Deseas eliminar la canción con ID: " + key + "?")) {
      remove(ref(db, "canciones/" + key))
        .then(() => alert("Eliminado exitosamente."))
        .catch(err => alert("Error: " + err.message));
    }
  };
});
