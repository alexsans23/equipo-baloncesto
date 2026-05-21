// App.jsx - Componente principal de la aplicacion
// Aqui vive el ESTADO principal, la LOGICA y las VALIDACIONES.
// Despues pasamos los datos y funciones a los componentes hijos como PROPS.
import { useState } from "react";
import SelectorJugador from "./components/SelectorJugador";
import ListaEquipo from "./components/ListaEquipo";
import ResumenEquipo from "./components/ResumenEquipo";
import { jugadoresPorPosicion } from "./data/posic_jugadores";

export default function App() {
  //ESTADOS de la aplicacion (useState)
  //equipo: array con los jugadores convocados. Cada uno es {nombre, posicion}
  const [equipo, setEquipo] = useState([]);

  //posicionSeleccionada: posicion elegida en el selector (Base por defecto)
  const [posicionSeleccionada, setPosicionSeleccionada] = useState("Base");

  //jugadorSeleccionado: nombre del jugador elegido en el selector
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState("");

  //mensaje: objeto {texto, tipo} para mostrar errores (rojo) o exitos (verde)
  const [mensaje, setMensaje] = useState(null);

  //confirmado: indica si el quinteto ya fue confirmado por el usuario
  const [confirmado, setConfirmado] = useState(false);

  //Array con las 5 posiciones (las claves del objeto importado)
  //Object.keys devuelve ["Base", "Escolta", "Alero", "AlaPivot", "Pivot"]
  const posiciones = Object.keys(jugadoresPorPosicion);

  //VALIDACIONES (se recalculan en cada render)
  // Funcion que cuenta cuantos jugadores hay de una posicion concreta.
  // filter crea un array nuevo solo con los que cumplen la condicion.
  function contarPorPosicion(pos) {
    return equipo.filter(function (j) {
      return j.posicion === pos;
    }).length;
  }

  //Equipo valido: exactamente 5 jugadores Y 1 por cada posicion.
  //every devuelve true solo si TODAS las posiciones cumplen la condicion.
  const equipoValido =
    equipo.length === 5 &&
    posiciones.every(function (p) {
      return contarPorPosicion(p) === 1;
    });

  // FUNCION: AÑADIR JUGADOR
  function anadirJugador() {
    // Al iniciar la accion limpiamos cualquier mensaje anterior
    setMensaje(null);

    // Si no hay jugador seleccionado, salimos sin hacer nada
    if (jugadorSeleccionado === "") return;

    // Validacion 1: jugador repetido.
    // some() devuelve true si AL MENOS un elemento cumple la condición.
    const repetido = equipo.some(function (j) {
      return j.nombre === jugadorSeleccionado;
    });
    if (repetido) {
      setMensaje({ texto: "Jugador repetido", tipo: "error" });
      return;
    }

    // Validacion 2: posición completa (maximo 2 jugadores por posición)
    if (contarPorPosicion(posicionSeleccionada) >= 2) {
      setMensaje({ texto: "Posición completa", tipo: "error" });
      return;
    }

    // Creamos un array NUEVO con el spread operator [...equipo, ...]
    // En React NO modificamos el estado original, creamos una copia (inmutabilidad).
    const nuevoEquipo = [
      ...equipo,
      { nombre: jugadorSeleccionado, posicion: posicionSeleccionada },
    ];
    setEquipo(nuevoEquipo);

    // Limpiamos la seleccion del jugador para poder seguir anadiendo
    setJugadorSeleccionado("");

    // Si el equipo estaba confirmado, deja de estarlo porque ha cambiado
    setConfirmado(false);

    // Comprobamos si con este nuevo jugador el equipo se ha vuelto valido.
    // Lo hacemos con el array nuevo (setEquipo es asincrono, no podemos fiarnos
    // del valor de "equipo" todavia).
    const ahoraValido =
      nuevoEquipo.length === 5 &&
      posiciones.every(function (p) {
        return (
          nuevoEquipo.filter(function (j) {
            return j.posicion === p;
          }).length === 1
        );
      });
    if (ahoraValido) {
      setMensaje({ texto: "Quinteto válido", tipo: "exito" });
    }
  }

  // FUNCION: BORRAR JUGADOR
  // Recibe el indice del jugador en el array y crea una copia sin él.
  function borrarJugador(indice) {
    // filter crea un array nuevo con todos los elementos EXCEPTO el del índice.
    const nuevoEquipo = equipo.filter(function (j, i) {
      return i !== indice;
    });
    setEquipo(nuevoEquipo);

    // Al borrar, el equipo deja de estar confirmado y limpiamos mensajes
    setConfirmado(false);
    setMensaje(null);
  }

  // ===== FUNCION: ORDENAR EQUIPO =====
  // Ordena alfabeticamente los jugadores convocados por nombre.
  function ordenarEquipo() {
    // sort() modifica el array original, asi que primero hacemos una copia con spread.
    const copia = [...equipo];
    // localeCompare devuelve un numero negativo, 0 o positivo segun el orden alfabetico.
    copia.sort(function (a, b) {
      return a.nombre.localeCompare(b.nombre);
    });
    setEquipo(copia);
    setMensaje(null);
  }

  //FUNCION: RESET
  //Reinicia completamente el equipo, validaciones, mensajes y seleccion actual.
  function resetEquipo() {
    setEquipo([]);
    setPosicionSeleccionada("Base");
    setJugadorSeleccionado("");
    setMensaje(null);
    setConfirmado(false);
  }

  //FUNCION: CONFIRMAR QUINTETO
  // Solo se ejecuta si el equipo es valido (el boton esta deshabilitado si no).
  //Por seguridad volvemos a comprobar dentro de la funcion.
  function confirmarQuinteto() {
    if (!equipoValido) {
      setMensaje({ texto: "Equipo no válido", tipo: "error" });
      return;
    }
    setConfirmado(true);
    setMensaje({
      texto: "Quinteto confirmado - Alineación confirmada",
      tipo: "exito",
    });
  }

  //RENDER (JSX)
  // Aqui describimos COMO se ve la interfaz en funcion del estado.
  // React se encarga de redibujarla cuando cualquier estado cambie.
  return (
    <div className="app">
      <h1>Equipo de Baloncesto - Quinteto Inicial</h1>

      {/* Componente hijo: selector de posicion, selector dinamico de jugador
          y boton anadir. Le pasamos por PROPS los datos y las funciones. */}
      <SelectorJugador
        posiciones={posiciones}
        jugadoresPorPosicion={jugadoresPorPosicion}
        posicionSeleccionada={posicionSeleccionada}
        jugadorSeleccionado={jugadorSeleccionado}
        onCambiarPosicion={function (nuevaPos) {
          // Al cambiar de posicion limpiamos el jugador (para que el selector
          // dinamico se actualice) y los mensajes previos.
          setPosicionSeleccionada(nuevaPos);
          setJugadorSeleccionado("");
          setMensaje(null);
        }}
        onCambiarJugador={function (nuevoJug) {
          setJugadorSeleccionado(nuevoJug);
          setMensaje(null);
        }}
        onAnadir={anadirJugador}
      />

      {/* Mensajes de error (rojo) o exito (verde) por accion del usuario.
          Solo se muestran si "mensaje" tiene contenido (renderizado condicional). */}
      {mensaje && (
        <p
          className={
            mensaje.tipo === "error" ? "mensaje-error" : "mensaje-exito"
          }
        >
          {mensaje.texto}
        </p>
      )}

      {/* Componente hijo: lista de convocados con su propio boton borrar.
          Recibe el array equipo y la funcion borrarJugador. */}
      <ListaEquipo equipo={equipo} onBorrar={borrarJugador} />

      {/* Botonera general: Ordenar, Reset y Confirmar */}
      <div className="botones">
        {/* Ordenar: solo tiene sentido con 2 o mas jugadores */}
        <button
          type="button"
          onClick={ordenarEquipo}
          disabled={equipo.length < 2}
        >
          Ordenar
        </button>

        {/* Reset: siempre activo */}
        <button type="button" onClick={resetEquipo}>
          Reset
        </button>

        {/* Confirmar: SOLO se habilita si el equipo es valido */}
        <button
          type="button"
          onClick={confirmarQuinteto}
          disabled={!equipoValido}
        >
          Confirmar
        </button>
      </div>

      {/* Componente hijo: resumen con estadísticas y estado del equipo */}
      <ResumenEquipo
        equipo={equipo}
        posiciones={posiciones}
        contarPorPosicion={contarPorPosicion}
        equipoValido={equipoValido}
        confirmado={confirmado}
      />
    </div>
  );
}
