
document.addEventListener('DOMContentLoaded', () => {
  const lista = document.getElementById('lista-canciones');
  const buscar = document.getElementById('buscar');
  const btnNueva = document.getElementById('btn-nueva');
  const modal = document.getElementById('formulario-cancion');
  const guardar = document.getElementById('guardar-cancion');
  const cancelar = document.getElementById('cancelar');
  let editIndex = null;

  const cargarCanciones = () => {
    lista.innerHTML = '';
    const canciones = JSON.parse(localStorage.getItem('canciones') || '[]');
    const filtro = buscar.value.toLowerCase();
    canciones
      .filter(c => c.titulo.toLowerCase().includes(filtro) || c.autor.toLowerCase().includes(filtro))
      .forEach((c, i) => {
        const div = document.createElement('div');
        div.className = 'cancion';
        div.innerHTML = `
          <h3>${c.titulo}</h3>
          <p><strong>Autor:</strong> ${c.autor}</p>
          ${c.notas ? `<p><em>${c.notas}</em></p>` : ''}
          <div class="letra" style="display:none;"><pre>${c.letra}</pre></div>
          <button class="editar" data-index="${i}">Editar</button>
        `;
        div.querySelector('h3').addEventListener('click', () => {
          const letra = div.querySelector('.letra');
          letra.style.display = letra.style.display === 'none' ? 'block' : 'none';
        });
        div.querySelector('.editar').addEventListener('click', e => {
          e.stopPropagation();
          const c = canciones[i];
          document.getElementById('titulo').value = c.titulo;
          document.getElementById('autor').value = c.autor;
          document.getElementById('letra').value = c.letra;
          document.getElementById('genero').value = c.genero;
          document.getElementById('notas').value = c.notas;
          editIndex = i;
          modal.classList.remove('oculto');
        });
        lista.appendChild(div);
      });
  };

  btnNueva.onclick = () => {
    editIndex = null;
    document.querySelectorAll('#formulario-cancion input, #formulario-cancion textarea').forEach(e => e.value = '');
    modal.classList.remove('oculto');
  };

  cancelar.onclick = () => modal.classList.add('oculto');

  guardar.onclick = () => {
    const nueva = {
      titulo: document.getElementById('titulo').value,
      autor: document.getElementById('autor').value,
      letra: document.getElementById('letra').value,
      genero: document.getElementById('genero').value,
      notas: document.getElementById('notas').value
    };
    const canciones = JSON.parse(localStorage.getItem('canciones') || '[]');
    if (editIndex !== null) {
      canciones[editIndex] = nueva;
    } else {
      canciones.push(nueva);
    }
    localStorage.setItem('canciones', JSON.stringify(canciones));
    modal.classList.add('oculto');
    cargarCanciones();
  };

  buscar.oninput = cargarCanciones;
  cargarCanciones();
});
