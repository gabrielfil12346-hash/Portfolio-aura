const botaoTema = document.getElementById("botao-tema");
const iconeTema = document.getElementById("icone-tema");
const botaoTopo = document.getElementById("botao-topo");
const campoTelefone = document.getElementById("campo-telefone");

function aplicarTema(tema) {
  document.documentElement.setAttribute("data-tema", tema);
  iconeTema.textContent = tema === "escuro" ? "🌙" : "☀️";
}

aplicarTema(localStorage.getItem("tema") || "escuro");

botaoTema.onclick = function () {
  const atual = document.documentElement.getAttribute("data-tema");
  const novo = atual === "escuro" ? "claro" : "escuro";
  iconeTema.classList.add("girando");
  setTimeout(function () {
    aplicarTema(novo);
    iconeTema.classList.remove("girando");
  }, 180);
  localStorage.setItem("tema", novo);
};

window.onscroll = function () {
  botaoTopo.classList.toggle("visivel", window.scrollY > 400);
};

botaoTopo.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

campoTelefone.oninput = function () {
  let numeros = campoTelefone.value.replace(/\D/g, "").slice(0, 11);
  numeros = numeros.replace(/^(\d{2})(\d)/, "($1) $2");
  numeros = numeros.replace(/(\d{2})(\d{5})(\d)/, "$1 $2 $3");
  campoTelefone.value = numeros;
};

const textoDigitado = document.getElementById("texto-digitado");
const frases = ["Técnico em Informática em formação", "Aprendendo C# e MySQL", "Desenhando telas no Figma"];
let numeroFrase = 0;
let numeroLetra = 0;
let apagando = false;

function digitar() {
  const frase = frases[numeroFrase];
  numeroLetra += apagando ? -1 : 1;
  textoDigitado.textContent = frase.slice(0, numeroLetra);
  let espera = apagando ? 40 : 90;
  if (!apagando && numeroLetra === frase.length) {
    apagando = true;
    espera = 1500;
  } else if (apagando && numeroLetra === 0) {
    apagando = false;
    numeroFrase = (numeroFrase + 1) % frases.length;
  }
  setTimeout(digitar, espera);
}

digitar();
