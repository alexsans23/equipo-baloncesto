// SelectorJugador.jsx - Componente hijo
// Muestra el selector de posicion, el selector dinamico de jugador y el boton añadir.
// NO tiene estado propio: todos los datos y funciones vienen del padre (App) por PROPS.
function SelectorJugador(props) {
  // Calculamos los jugadores disponibles para la posicion seleccionada.
  // Accedemos al objeto importado usando la posicion como clave.
  // Si por algun motivo la clave no existiera, devolvemos [] para evitar errores.
  const jugadoresDisponibles =
    props.jugadoresPorPosicion[props.posicionSeleccionada] || [];

  return (
    <div className="selector">
      <h2>Selector de jugador</h2>

      {/* Selector de POSICION
            - value: lo que esta seleccionado (controlado por el estado del padre)
            - onChange: cuando cambia, llamamos a la funcion del padre con el nuevo valor */}
      <div className="campo">
        <label>Posicion: </label>
        <select
          value={props.posicionSeleccionada}
          onChange={function (e) {
            props.onCambiarPosicion(e.target.value);
          }}
        >
          {/* map recorre el array de posiciones y crea una <option> por cada una.
                key es obligatorio para que React identifique cada elemento. */}
          {props.posiciones.map(function (p) {
            return (
              <option key={p} value={p}>
                {p}
              </option>
            );
          })}
        </select>
      </div>

      {/* Selector DINAMICO de JUGADOR
            La lista cambia automaticamente porque depende de "posicionSeleccionada".
            Al cambiar de posicion, React vuelve a renderizar este selector. */}
      <div className="campo">
        <label>Jugador: </label>
        <select
          value={props.jugadorSeleccionado}
          onChange={function (e) {
            props.onCambiarJugador(e.target.value);
          }}
        >
          {/* Opcion inicial vacia (placeholder) */}
          <option value="">-- Elige jugador --</option>
          {jugadoresDisponibles.map(function (nombre) {
            return (
              <option key={nombre} value={nombre}>
                {nombre}
              </option>
            );
          })}
        </select>
      </div>

      {/* Boton AÑADIR
            - onClick llama a la funcion del padre
            - disabled: deshabilitado si no se ha elegido jugador */}
      <button
        type="button"
        onClick={props.onAnadir}
        disabled={props.jugadorSeleccionado === ""}
      >
        Añadir
      </button>
    </div>
  );
}

export default SelectorJugador;
