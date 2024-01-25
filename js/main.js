// Harold Díaz - Comision: 49825 Js

/* Para la 3ra pre-entrega de este curso de JS.. se muestra este algoritmo con la misma base de la idea de la entrega anterior solo que se mejoró y modificó algunos datos para poder agregar nuevas funciones y modificaciones que se ajustaran con lo requerido. 

Se plantea un terminal web para la gestión de pautas de citas y para la atención de mascotas en un salon de grooming.

Cuenta con dos perfiles:
.- Dueño de mascota (mascota) --->> Puede buscar citas guardadas si desea verificar en cual pauta del día esta anotado.Puede buscar por nombre del usuario o el de la mascota. También puede agregar citas o crear nuevos usuarios con su mascota.


.- Groomer (peluquero canino) ---->> Puede verificar todas las citas pautadas para el dia (leer el contenido de la base de datos temporal, incluyendo las citas agregadas al localStorage) y también puede buscar citas por el nombre de la mascota si es que desea saber cual pauta le corresponde

La manera en que funciona es muy parecida a la version anterior... solo que ahora se interactúa con el usuario a traves del formulario y a traves de eventos como el add.listener. Se modifica el DOM en cada cita agregada. Se puede visualizar en el perfil del groomer (todas las citas agregadas) las que se guardan en un arreglo en conjunto con lo que se guarda en el localStorage, dando una especie de función como una base de datos temporal. Se edita el JSON de cada cita no modificada. Se agregan mas elementos y animaciones al HTML para agregar mas interactividad entre las paginas... Durante todo el proceso deje console.logs para que se pueda apreciar cada iteración y resultado, espero cumplir al menos con lo ideal... me despido. Un coderAbrazo


*/

const pautasGuardadas = localStorage.getItem("pautasDiarias");

// Si hay datos almacenados en localStorage, úsalos, de lo contrario, utiliza el array predeterminado
const pautasDiarias = pautasGuardadas
  ? JSON.parse(pautasGuardadas)
  : [
      { Id: "Pauta 1", Dueño: "Juan", Mascota: "Max", Confirma: true },
      { Id: "Pauta 2", Dueño: "Maria", Mascota: "Bella", Confirma: false },
      { Id: "Pauta 3", Dueño: "Luis", Mascota: "Rocky", Confirma: true },
      { Id: "Pauta 4", Dueño: "Ana", Mascota: "Coco", Confirma: true },
    ];

// Restaurar los datos en localStorage después de agregar una nueva cita
localStorage.setItem("pautasDiarias", JSON.stringify(pautasDiarias));

// Ahora, declaramos una función para el registro de usuarios nuevos
function agregarNuevoDueño() {
  console.log("Entrando a agregarNuevoDueño...");
  const nuevoDueño = document.getElementById("nuevoDueño").value;
  const nuevaMascota = document.getElementById("nuevaMascota").value;
  const confirma = confirm("¿Reserva una cita?");

  const nuevoId = "Pauta " + (pautasDiarias.length + 1);
  const nuevaCita = {
    Id: nuevoId,
    Dueño: nuevoDueño,
    Mascota: nuevaMascota,
    Confirma: confirma,
  };

  pautasDiarias.push(nuevaCita);

  // Agregar la nueva cita en localStorage
  localStorage.setItem("pautasDiarias", JSON.stringify(pautasDiarias));

  console.log("Nueva cita agregada:", nuevaCita);
  limpiarContenedor(); // Limpiar el contenedor
  mostrarCitaEnHTML(nuevaCita);

  // Mostrar mensaje de usuario registrado y contar 5 segundos
  mostrarMensaje("Usuario registrado. La página se recargará en 5 segundos.");

  let segundosRestantes = 5;
  const contador = setInterval(() => {
    segundosRestantes--;
    mostrarMensaje(`La página se recargará en ${segundosRestantes} segundos.`);

    // Detener el contador si el usuario hace clic en "Editar Confirmación"
    const editarBtn = document.createElement("button");
    editarBtn.textContent = "Editar Confirmación";
    editarBtn.classList.add("editar-btnEditar");
    editarBtn.addEventListener("click", () => {
      clearInterval(contador);
      mostrarMensaje(
        "Contador detenido. Puede editar la confirmación de la cita."
      );
    });

    // Agregar botón de editar confirmación al contenedor del mensaje
    mensajeContainer.appendChild(editarBtn);

    // Recargar la página después de 5 segundos
    if (segundosRestantes === 0) {
      clearInterval(contador);
      location.reload();
    }
  }, 5000);
}

function mostrarMensaje(mensaje) {
  // Limpiar el contenedor del mensaje
  mensajeContainer.innerHTML = "";

  // Crear elemento de mensaje y mostrar en pantalla
  const mensajeElement = document.createElement("div");
  mensajeElement.textContent = mensaje;
  mensajeContainer.appendChild(mensajeElement);
}

// Esta función muestra la cita registrada en el HTML

function mostrarCitaEnHTML(cita) {
  const container = document.getElementById("citasContainer");

  if (!cita) {
    container.innerHTML = "Cita no encontrada";
    return;
  }

  // Crear contenedor div para cada resultado
  const resultadoContainer = document.createElement("div");

  // Crear elementos HTML
  const h3 = document.createElement("h3");
  const idParrafo = document.createElement("p");
  const dueñoParrafo = document.createElement("p");
  const mascotaParrafo = document.createElement("p");
  const confirmadaParrafo = document.createElement("p");

  // Agregar clases de estilo
  h3.classList.add("inline-block-element");
  idParrafo.classList.add("inline-block-element");
  dueñoParrafo.classList.add("inline-block-element");
  mascotaParrafo.classList.add("inline-block-element");
  confirmadaParrafo.classList.add("inline-block-element");

  // Agregar estilo con white-space a los elementos
  h3.style.whiteSpace = "pre-line";
  idParrafo.style.whiteSpace = "pre-line";
  dueñoParrafo.style.whiteSpace = "pre-line";
  mascotaParrafo.style.whiteSpace = "pre-line";
  confirmadaParrafo.style.whiteSpace = "pre-line";

  // Asignar contenido a los elementos
  h3.textContent = "Cita";
  idParrafo.textContent = `ID: ${cita.Id}`;
  dueñoParrafo.textContent = `Dueño: ${cita.Dueño}`;
  mascotaParrafo.textContent = `Mascota: ${cita.Mascota}`;
  confirmadaParrafo.textContent = "Confirma: ";

  const confirmacionSpan = document.createElement("span");
  confirmacionSpan.textContent = cita.Confirma ? "Sí" : "No";
  confirmacionSpan.classList.add(
    cita.Confirma ? "confirmada" : "no-confirmada"
  );
  confirmadaParrafo.appendChild(confirmacionSpan);

  // Aplicar la clase confirmada si la cita está confirmada
  if (cita.Confirma) {
    confirmadaParrafo.classList.add("confirmada");
  }

  // Añadir elementos al contenedor
  container.appendChild(h3);
  container.appendChild(idParrafo);
  container.appendChild(dueñoParrafo);
  container.appendChild(mascotaParrafo);
  container.appendChild(confirmadaParrafo);

  // Agregar clases de estilo al contenedor div
  resultadoContainer.classList.add("resultado-container");

  // Añadir contenedor div al contenedor principal
  container.appendChild(resultadoContainer);

  // Agregar botón de editar
  const editarBtn = document.createElement("button");
  editarBtn.textContent = "Modificar cita";
  editarBtn.classList.add("editar-btn");
  editarBtn.addEventListener("click", function () {
    editarCita(cita.Id);
  });

  // Añadir botón de editar al contenedor
  resultadoContainer.appendChild(editarBtn);
}

function editarCita(id) {
  // Buscar la cita por su ID en el array pautasDiarias
  const cita = pautasDiarias.find((c) => c.Id === id);

  if (cita) {
    // Mostrar un mensaje de confirmación
    const confirmacion = confirm("¿Desea cambiar el estado de confirmación?");

    // Cambiar el estado de confirmación
    cita.Confirma = !cita.Confirma;

    // Actualizar la visualización en el HTML
    limpiarContenedor();
    mostrarCitaEnHTML(cita);

    // Actualizar en sessionStorage
    sessionStorage.setItem(id, JSON.stringify(cita));

    // Mostrar cambios en el console.log después de 5 segundos
    setTimeout(() => {
      console.log(
        `Cita ${id} editada: Confirmación ahora es ${
          cita.Confirma ? "Sí" : "No"
        }`
      );
      console.log("Nuevo estado en pautasDiarias:", pautasDiarias);
      console.log(
        "Nuevo estado en sessionStorage:",
        JSON.parse(sessionStorage.getItem(id))
      );

      // Realizar un reload después de 5 segundos
      location.reload();
    }, 5000);
  } else {
    console.log(`Cita con ID ${id} no encontrada.`);
  }
}

// Luego, declaramos las funciones de búsqueda según recomendaciones de buenas prácticas (ChatGpt). Agregamos el método .toLowerCase() para que no hayan problemas en las entradas de datos del usuario

function buscarCitaPorMascota(mascota) {
  limpiarContenedor(); // Limpiar el contenedor
  const citaEncontrada = pautasDiarias.find(
    (item) => item.Mascota.toLowerCase() === mascota.toLowerCase()
  );
  mostrarCitaEnHTML(citaEncontrada);
}

function buscarCitaPorDueño(dueño) {
  limpiarContenedor(); // Limpiar el contenedor
  const citaEncontrada = pautasDiarias.find(
    (item) => item.Dueño.toLowerCase() === dueño.toLowerCase()
  );
  mostrarCitaEnHTML(citaEncontrada);
}

function buscarCitaPorPauta(pauta) {
  limpiarContenedor(); // Limpiar el contenedor
  mostrarCitaEnHTML(citaEncontrada);
  const citaEncontrada = pautasDiarias.find((item) => item.Id === pauta);
  mostrarResultadoBusqueda(citaEncontrada);
}

function limpiarContenedor() {
  const container = document.getElementById("citasContainer");
  container.innerHTML = ""; // Establecer el contenido en una cadena vacía
}

// Código principal

function mostrarTodasLasCitas() {
  limpiarContenedor(); // Limpiar el contenedor antes de mostrar las citas

  // Itera sobre todas las citas y muestra cada una
  pautasDiarias.forEach((pautasDiarias) => {
    mostrarCitaEnHTML(pautasDiarias);
  });
}

function procesarFormulario() {
  console.log("Procesando formulario...");

  const tipoUsuario = document.getElementById("tipoUsuario").value;
  console.log("Tipo de usuario:", tipoUsuario);

  if (tipoUsuario === "dueño") {
    limpiarContenedor();
    const accionDueño = document.getElementById("accionDueño").value;
    console.log("Acción dueño:", accionDueño);

    if (accionDueño === "buscarMascota") {
      const mascotaABuscar = document.getElementById("nuevaMascota").value;
      console.log("Mascota a buscar:", mascotaABuscar);
      buscarCitaPorMascota(mascotaABuscar);
    } else if (accionDueño === "buscarDueño") {
      const dueñoABuscar = document.getElementById("nuevoDueño").value;
      console.log("Dueño a buscar:", dueñoABuscar);
      buscarCitaPorDueño(dueñoABuscar);
    } else if (accionDueño === "agregarUsuario") {
      agregarNuevoDueño();
    }
  } else if (tipoUsuario === "groomer") {
    limpiarContenedor();
    const accionGroomer = document.getElementById("accionGroomer").value;
    console.log("Acción groomer:", accionGroomer);

    if (accionGroomer === "mostrarTodas") {
      limpiarContenedor();
      mostrarTodasLasCitas();
    } else if (accionGroomer === "buscarMascotaGroomer") {
      const mascotaABuscarGroomer = document.getElementById(
        "mascotaABuscarGroomer"
      ).value;
      console.log("Mascota a buscar (Groomer):", mascotaABuscarGroomer);
      buscarCitaPorMascota(mascotaABuscarGroomer);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const tipoDeUsuario = document.getElementById("tipoUsuario");
  const opcionesDueño = document.getElementById("opcionesDueño");
  const opcionesGroomer = document.getElementById("opcionesGroomer");

  tipoDeUsuario.addEventListener("change", function () {
    // Limpiar el contenedor cuando cambia el tipo de usuario
    limpiarContenedor();

    if (tipoDeUsuario.value === "dueño") {
      opcionesDueño.style.display = "block";
      opcionesGroomer.style.display = "none";
    } else if (tipoDeUsuario.value === "groomer") {
      opcionesDueño.style.display = "none";
      opcionesGroomer.style.display = "block";
    }
  });

  const enviarBtn = document.getElementById("enviarBtn");
  enviarBtn.addEventListener("click", function () {
    procesarFormulario();
  });
});
