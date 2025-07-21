const mensajes = [
  { mensaje: "🌱 Hoy comienza tu camino." },
  { mensaje: "🌿 Cada palabra tuya es semilla." },
  { mensaje: "🔥 La luz está dentro de ti." }
  // 🔁 Agrega hasta el mensaje 165
];

function verificarClave() {
  const claveIngresada = document.getElementById("clave").value.trim();
  const claveUsuario = "Hinmer0721";
  const claveModerador = "Josue";

  if (claveIngresada === claveUsuario || claveIngresada === claveModerador) {
    document.getElementById("login").style.display = "none";
    document.getElementById("mensaje").style.display = "block";
    localStorage.setItem("eco_mod", claveIngresada === claveModerador ? "1" : "0");
    mostrarMensaje();
  } else {
    document.getElementById("error").textContent = "❌ Clave incorrecta.";
  }
}

function mostrarMensaje() {
  const hoy = new Date().toISOString().split("T")[0];
  const ultimoDia = localStorage.getItem("eco_fecha");
  let indice = parseInt(localStorage.getItem("eco_indice") || "0");

  if (hoy !== ultimoDia) {
    indice++;
    if (indice >= mensajes.length) indice = mensajes.length - 1;
    localStorage.setItem("eco_fecha", hoy);
    localStorage.setItem("eco_indice", indice);
  }

  const mensajeActual = mensajes[indice] || { mensaje: "🎁 Has recibido todos los mensajes." };
  document.getElementById("texto").textContent = mensajeActual.mensaje;
  document.getElementById("numerodia").textContent = `Mensaje ${indice + 1} de ${mensajes.length}`;
  mostrarComentarioGuardado(indice);

  if (localStorage.getItem("eco_mod") === "1") {
    document.getElementById("botonBorrar").style.display = "inline-block";
  }
}

function hablar() {
  const mensaje = document.getElementById("texto").textContent;
  const voz = new SpeechSynthesisUtterance(mensaje);
  voz.lang = "es-VE";

  const esperar = setInterval(() => {
    const voces = speechSynthesis.getVoices();
    if (voces.length > 0) {
      clearInterval(esperar);
      const preferida = voces.find(v => v.lang.startsWith("es"));
      if (preferida) voz.voice = preferida;
      speechSynthesis.speak(voz);
    }
  }, 100);
}

function guardarComentario() {
  const indice = localStorage.getItem("eco_indice");
  const comentario = document.getElementById("comentario").value.trim();
  if (!comentario || !indice) return;

  localStorage.setItem("eco_comentario_" + indice, comentario);
  document.getElementById("comentarioGuardado").textContent = "✅ Comentario guardado.";
  document.getElementById("botonBorrar").style.display = "inline-block";
}

function mostrarComentarioGuardado(indice) {
  const guardado = localStorage.getItem("eco_comentario_" + indice);
  if (guardado) {
    document.getElementById("comentario").value = guardado;
    document.getElementById("comentarioGuardado").textContent = "📝 Comentario recuperado.";
    document.getElementById("botonBorrar").style.display = "inline-block";
  } else {
    document.getElementById("comentarioGuardado").textContent = "";
    document.getElementById("botonBorrar").style.display = "none";
  }
}

function borrarComentarioPrivado() {
  const indice = localStorage.getItem("eco_indice");
  if (!indice) return;

  localStorage.removeItem("eco_comentario_" + indice);
  document.getElementById("comentario").value = "";
  document.getElementById("comentarioGuardado").textContent = "🧽 Comentario borrado.";
  document.getElementById("botonBorrar").style.display = "none";
}
