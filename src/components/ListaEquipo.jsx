// ListaEquipo.jsx - Componente hijo
// Muestra la lista de jugadores convocados. Cada uno tiene su boton "Borrar".
// Recibe por PROPS el array equipo y la funcion onBorrar (definida en App).
function ListaEquipo(props) {
  //si el equipo esta vacio mostramos un aviso.
  if (props.equipo.length === 0) {
    return (
      <div className="lista">
        <h2>Convocados</h2>
        <p>No hay jugadores convocados todavia.</p>
      </div>
    );
  }

  return (
    <div className="lista">
      <h2>Convocados ({props.equipo.length})</h2>
      <ul>
        {/* map recorre el array y devuelve un <li> por cada jugador.
              Usamos el indice "i" como key (es unico dentro del array).
              Cada <li> tiene su propio boton borrar que llama a onBorrar con su indice. */}
        {props.equipo.map(function (j, i) {
          return (
            <li key={i}>
              <span className="nombre">{j.nombre}</span>
              <span className="pos"> ({j.posicion})</span>
              <button
                type="button"
                onClick={function () {
                  props.onBorrar(i);
                }}
              >
                Borrar
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListaEquipo;
