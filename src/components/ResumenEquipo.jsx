// ResumenEquipo.jsx - Componente hijo
// Muestra las estadisticas del equipo, el cumplimiento de las reglas y el estado.
// Recibe por PROPS el equipo, las posiciones, la funcion para contar, y los flags.
function ResumenEquipo(props) {
  //  Creamos un array con el conteo de jugadores por cada posicion usando map.
  // asi luego podemos pintarlos facilmente con otro map en el JSX.
  const conteoPorPosicion = props.posiciones.map(function (p) {
    return { posicion: p, cantidad: props.contarPorPosicion(p) };
  });

  // comprobamos si se cumple la regla minima: maximo 2 jugadores por posicion.
  // every devuelve true solo si TODAS las posiciones cumplen la condicion.
  const sinExceso = props.posiciones.every(function (p) {
    return props.contarPorPosicion(p) <= 2;
  });

  // Calculamos un texto descriptivo para el estado del equipo.
  // Es solo logica de presentacion, ayuda a leer el resumen.
  let estadoTexto;
  if (props.confirmado) {
    estadoTexto = "Quinteto CONFIRMADO";
  } else if (props.equipoValido) {
    estadoTexto = "Quinteto valido (listo para confirmar)";
  } else if (props.equipo.length === 0) {
    estadoTexto = "Equipo vacio";
  } else {
    estadoTexto = "Equipo incompleto / no valido";
  }

  return (
    <div className="resumen">
      <h2>Resumen del equipo</h2>

      {/* Total de jugadores convocados */}
      <p>
        Total de jugadores: <strong>{props.equipo.length}</strong> / 5
      </p>

      {/* Jugadores por posicion (lista generada con map) */}
      <p>
        <strong>Jugadores por posicion:</strong>
      </p>
      <ul className="conteo">
        {conteoPorPosicion.map(function (c) {
          return (
            <li key={c.posicion}>
              {c.posicion}: <strong>{c.cantidad}</strong>
            </li>
          );
        })}
      </ul>

      {/* Cumplimiento de las reglas minimas */}
      <p>
        Maximo 2 por posicion:{" "}
        <strong>{sinExceso ? "OK" : "Incumplida"}</strong>
      </p>
      <p>
        1 jugador por cada posicion:{" "}
        <strong>{props.equipoValido ? "OK" : "Pendiente"}</strong>
      </p>

      {/* Estado del equipo */}
      <p>
        Estado: <strong>{estadoTexto}</strong>
      </p>
    </div>
  );
}

export default ResumenEquipo;
