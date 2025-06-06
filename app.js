
document.addEventListener('DOMContentLoaded', () => {
  const lista = document.getElementById('lista-canciones');
  const buscar = document.getElementById('buscar');
  const btnNueva = document.getElementById('btn-nueva');
  const modal = document.getElementById('formulario-cancion');
  const guardar = document.getElementById('guardar-cancion');
  const cancelar = document.getElementById('cancelar');

  const cargarCanciones = () => {
    lista.innerHTML = '';
    const canciones = JSON.parse(localStorage.getItem('canciones') || '[]');
    const filtro = buscar.value.toLowerCase();
    canciones
      .filter(c => c.titulo.toLowerCase().includes(filtro) || c.autor.toLowerCase().includes(filtro) || c.letra.toLowerCase().includes(filtro))
      .forEach((c, i) => {
        const div = document.createElement('div');
        div.className = 'cancion';
        div.innerHTML = `<h3>${c.titulo}</h3><p><strong>Autor:</strong> ${c.autor}</p><pre>${c.letra}</pre>`;
        lista.appendChild(div);
      });
  };

  btnNueva.onclick = () => modal.classList.remove('oculto');
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
    canciones.push(nueva);
    localStorage.setItem('canciones', JSON.stringify(canciones));
    modal.classList.add('oculto');
    document.querySelectorAll('#formulario-cancion input, #formulario-cancion textarea').forEach(e => e.value = '');
    cargarCanciones();
  };
  buscar.oninput = cargarCanciones;
  cargarCanciones();
});
