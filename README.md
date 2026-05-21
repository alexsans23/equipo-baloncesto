# equipo-baloncesto
# Equipo de Baloncesto

Proyecto de Recuperación RA3:

Aplicación en React que permite construir un quinteto inicial de baloncesto eligiendo jugadores por posición, con validaciones, mensajes de error/éxito y resumen del equipo.

# Instrucciones de ejecución

### En local

npm install
npm start

La app se abre en http://localhost:3000.

### En CodeSandbox
Abrir el enlace al CodeSandbox del pdf.

## Estructura del proyecto


equipo-baloncesto-react/
  public/
    index.html
  src/
    components/
      SelectorJugador.jsx   -> Selector de posición + jugador + botón Añadir
      ListaEquipo.jsx       -> Lista de convocados con botón Borrar por jugador
      ResumenEquipo.jsx     -> Estadísticas, validaciones y estado del equipo
    data/
      posic_jugadores.js    -> Datos: jugadores agrupados por posición
    App.jsx                 -> Componente principal (estado + lógica)
    index.js                -> Punto de entrada de React
    styles.css              -> Estilos básicos de la app
  package.json
  README.md


## Reglas de la aplicación

- Equipo de **exactamente 5 jugadores**.
- **1 jugador por cada posición**: Base, Escolta, Alero, AlaPívot, Pívot.
- **Máximo 2 jugadores por posición** (límite a la hora de añadir).
- **No se pueden repetir** jugadores.

## Botones

- **Añadir**: agrega el jugador seleccionado al equipo (valida repetidos y posición completa).
- **Ordenar**: ordena alfabéticamente los convocados.
- **Reset**: reinicia todo (equipo, mensajes y selección).
- **Confirmar**: solo se habilita si el quinteto es válido. Al pulsarlo muestra "Quinteto confirmado".

## Tecnologías usadas

- React 18
- useState para el estado
- props para la comunicación de padre a hijo
- Métodos de array: map, filter, some, every, sort con localeCompare
- Spread operator [...array] para arrays inmutables
- Eventos onClick y onChange

