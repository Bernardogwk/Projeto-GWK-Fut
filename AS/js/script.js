
const formTarefa = document.getElementById("formTarefa");
const inputTarefa = document.getElementById("inputTarefa");
const selectPrioridade = document.getElementById("selectPrioridade");
const alertaErro = document.getElementById("alertaErro");

const listaPendentes = document.getElementById("listaPendentes");
const listaConcluidas = document.getElementById("listaConcluidas");

const vazioPendentes = document.getElementById("vazioPendentes");
const vazioConcluidas = document.getElementById("vazioConcluidas");

const contadorPendentes = document.getElementById("contadorPendentes");
const contadorConcluidas = document.getElementById("contadorConcluidas");

const prioridades = {
  alta: { texto: "Alta", classe: "tarefa-alta", bolinha: "bolinha-alta" },
  media: { texto: "Média", classe: "tarefa-media", bolinha: "bolinha-media" },
  baixa: { texto: "Baixa", classe: "tarefa-baixa", bolinha: "bolinha-baixa" },
};

atualizarEstadoVazio();
atualizarContadores();

formTarefa.addEventListener("submit", function (event) {
  event.preventDefault(); 

  const nome = inputTarefa.value.trim();
  const prioridade = selectPrioridade.value;

  
  if (nome === "") {
    alertaErro.classList.remove("hidden");
    inputTarefa.focus();
    return;
  }

  alertaErro.classList.add("hidden");
  criarTarefa(nome, prioridade);

 
  inputTarefa.value = "";
  inputTarefa.focus();
});

function criarTarefa(nome, prioridade) {
  const dadosPrioridade = prioridades[prioridade];

  
  const item = document.createElement("li");
  item.className = `flex items-center justify-between gap-3 border rounded-lg px-3 py-2 ${dadosPrioridade.classe}`;

  item.dataset.nome = nome;
  item.dataset.prioridade = prioridade;

  item.innerHTML = `
    <div class="flex items-center gap-2 min-w-0">
      <span class="w-2.5 h-2.5 rounded-full ${dadosPrioridade.bolinha} shrink-0"></span>
      <div class="min-w-0">
        <p class="nome-tarefa font-medium truncate">${nome}</p>
        <p class="text-xs opacity-80">Prioridade: ${dadosPrioridade.texto}</p>
      </div>
    </div>
    <div class="flex gap-2 shrink-0">
      <button class="btnConcluir btn-concluir text-xs px-2 py-1 rounded-md">Concluir</button>
      <button class="btnExcluir btn-excluir text-xs px-2 py-1 rounded-md">Excluir</button>
    </div>
  `;

  const btnConcluir = item.querySelector(".btnConcluir");
  const btnExcluir = item.querySelector(".btnExcluir");

  btnConcluir.addEventListener("click", function () {
    concluirTarefa(item);
  });

  btnExcluir.addEventListener("click", function () {
    item.remove(); 
    atualizarEstadoVazio();
    atualizarContadores();
  });

  listaPendentes.appendChild(item);
  atualizarEstadoVazio();
  atualizarContadores();
}

function concluirTarefa(item) {
  const nome = item.dataset.nome;
  const prioridade = item.dataset.prioridade;
  const dadosPrioridade = prioridades[prioridade];

  const agora = new Date();
  const data = agora.toLocaleDateString("pt-BR");
  const hora = agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  item.remove();

  const itemConcluido = document.createElement("li");
  itemConcluido.className = `flex items-center justify-between gap-3 border rounded-lg px-3 py-2 tarefa-concluida`;

  itemConcluido.innerHTML = `
    <div class="flex items-center gap-2 min-w-0">
      <span class="w-2.5 h-2.5 rounded-full ${dadosPrioridade.bolinha} shrink-0"></span>
      <div class="min-w-0">
        <p class="nome-tarefa font-medium truncate">${nome}</p>
        <p class="text-xs text-slate-400">Prioridade: ${dadosPrioridade.texto} • Concluída em ${data} às ${hora}</p>
      </div>
    </div>
  `;

  listaConcluidas.appendChild(itemConcluido);

  atualizarEstadoVazio();
  atualizarContadores();
}

function atualizarEstadoVazio() {
  vazioPendentes.style.display = listaPendentes.children.length === 0 ? "block" : "none";
  vazioConcluidas.style.display = listaConcluidas.children.length === 0 ? "block" : "none";
}

function atualizarContadores() {
  contadorPendentes.textContent = listaPendentes.children.length;
  contadorConcluidas.textContent = listaConcluidas.children.length;
}
