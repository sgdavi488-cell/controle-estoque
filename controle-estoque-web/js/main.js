let itens = carregarItens();

const form = document.getElementById("form-item");
const tituloForm = document.getElementById("titulo-form");
const inputId = document.getElementById("item-id");
const inputNome = document.getElementById("nome");
const inputCategoria = document.getElementById("categoria");
const inputQuantidade = document.getElementById("quantidade");
const inputMinimo = document.getElementById("minimo");
const inputUnidade = document.getElementById("unidade");
const inputObs = document.getElementById("observacao");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");
const btnExportar = document.getElementById("btn-exportar");
const btnExemplo = document.getElementById("btn-exemplo");

const inputBusca = document.getElementById("busca");
const filtroCategoria = document.getElementById("filtro-categoria");
const filtroBaixo = document.getElementById("filtro-baixo");

const tabelaCorpo = document.getElementById("tabela-corpo");
const estadoVazio = document.getElementById("estado-vazio");
const statItens = document.getElementById("stat-itens");
const statUnidades = document.getElementById("stat-unidades");
const statBaixo = document.getElementById("stat-baixo");

function obterItensFiltrados() {
  const termo = inputBusca.value.trim().toLowerCase();
  const categoria = filtroCategoria.value;
  const apenasBaixo = filtroBaixo.checked;

  return itens.filter((item) => {
    const bateBusca =
      !termo ||
      item.nome.toLowerCase().includes(termo) ||
      (item.observacao && item.observacao.toLowerCase().includes(termo));

    const bateCategoria = categoria === "todas" || item.categoria === categoria;
    const bateBaixo = !apenasBaixo || item.quantidade <= item.minimo;

    return bateBusca && bateCategoria && bateBaixo;
  });
}

function atualizarIndicadores() {
  const totalUnidades = itens.reduce((soma, item) => soma + Number(item.quantidade), 0);
  const totalBaixo = itens.filter((item) => item.quantidade <= item.minimo).length;

  statItens.textContent = itens.length;
  statUnidades.textContent = totalUnidades;
  statBaixo.textContent = totalBaixo;
}

function criarBadgeStatus(item) {
  if (item.quantidade === 0) {
    return '<span class="badge badge-zerado">Zerado</span>';
  }
  if (item.quantidade <= item.minimo) {
    return '<span class="badge badge-baixo">Estoque baixo</span>';
  }
  return '<span class="badge badge-ok">Normal</span>';
}

function escaparHtml(texto) {
  const div = document.createElement("div");
  div.textContent = texto ?? "";
  return div.innerHTML;
}

function renderizarTabela() {
  atualizarIndicadores();
  const filtrados = obterItensFiltrados();

  tabelaCorpo.innerHTML = "";

  if (!filtrados.length) {
    estadoVazio.classList.remove("oculto");
    return;
  }

  estadoVazio.classList.add("oculto");

  filtrados.forEach((item) => {
    const tr = document.createElement("tr");
    const obsHtml = item.observacao
      ? `<span class="item-obs">${escaparHtml(item.observacao)}</span>`
      : "";

    tr.innerHTML = `
      <td>
        <strong>${escaparHtml(item.nome)}</strong>
        ${obsHtml}
      </td>
      <td>${escaparHtml(item.categoria)}</td>
      <td>
        <div class="controle-qtd">
          <button type="button" class="btn-mini" data-acao="diminuir" data-id="${item.id}" aria-label="Diminuir quantidade">-</button>
          <span>${item.quantidade} ${escaparHtml(item.unidade)}</span>
          <button type="button" class="btn-mini" data-acao="aumentar" data-id="${item.id}" aria-label="Aumentar quantidade">+</button>
        </div>
      </td>
      <td>${item.minimo} ${escaparHtml(item.unidade)}</td>
      <td>${criarBadgeStatus(item)}</td>
      <td>${escaparHtml(item.atualizadoEm)}</td>
      <td>
        <div class="acoes-linha">
          <button type="button" class="btn-mini" data-acao="editar" data-id="${item.id}">Editar</button>
          <button type="button" class="btn-mini excluir" data-acao="excluir" data-id="${item.id}">Excluir</button>
        </div>
      </td>
    `;

    tabelaCorpo.appendChild(tr);
  });
}

function limparFormulario() {
  form.reset();
  inputId.value = "";
  inputQuantidade.value = 0;
  inputMinimo.value = 5;
  inputUnidade.value = "un";
  tituloForm.textContent = "Cadastrar item";
  btnSalvar.textContent = "Salvar item";
  btnCancelar.classList.add("oculto");
}

function preencherEdicao(id) {
  const item = itens.find((entry) => entry.id === id);
  if (!item) return;

  inputId.value = item.id;
  inputNome.value = item.nome;
  inputCategoria.value = item.categoria;
  inputQuantidade.value = item.quantidade;
  inputMinimo.value = item.minimo;
  inputUnidade.value = item.unidade;
  inputObs.value = item.observacao || "";

  tituloForm.textContent = "Editar item";
  btnSalvar.textContent = "Atualizar item";
  btnCancelar.classList.remove("oculto");
  inputNome.focus();
}

function alterarQuantidade(id, delta) {
  const item = itens.find((entry) => entry.id === id);
  if (!item) return;

  const novaQtd = Math.max(0, Number(item.quantidade) + delta);
  item.quantidade = novaQtd;
  item.atualizadoEm = new Date().toLocaleDateString("pt-BR");

  salvarItens(itens);
  renderizarTabela();
}

function excluirItem(id) {
  const item = itens.find((entry) => entry.id === id);
  if (!item) return;

  if (!confirm(`Remover "${item.nome}" do estoque?`)) return;

  itens = itens.filter((entry) => entry.id !== id);
  salvarItens(itens);

  if (inputId.value === id) {
    limparFormulario();
  }

  renderizarTabela();
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const dados = {
    nome: inputNome.value.trim(),
    categoria: inputCategoria.value,
    quantidade: Math.max(0, parseInt(inputQuantidade.value, 10) || 0),
    minimo: Math.max(0, parseInt(inputMinimo.value, 10) || 0),
    unidade: inputUnidade.value.trim() || "un",
    observacao: inputObs.value.trim(),
    atualizadoEm: new Date().toLocaleDateString("pt-BR")
  };

  if (!dados.nome) return;

  const idEdicao = inputId.value;
  if (idEdicao) {
    itens = itens.map((item) => (item.id === idEdicao ? { ...item, ...dados } : item));
  } else {
    itens.unshift({ id: gerarId(), ...dados });
  }

  salvarItens(itens);
  limparFormulario();
  renderizarTabela();
});

btnCancelar.addEventListener("click", limparFormulario);

btnExportar.addEventListener("click", () => {
  exportarParaCsv(obterItensFiltrados());
});

btnExemplo.addEventListener("click", () => {
  if (itens.length && !confirm("Substituir os itens atuais pelos dados de exemplo?")) {
    return;
  }
  itens = obterItensExemplo();
  salvarItens(itens);
  renderizarTabela();
});

tabelaCorpo.addEventListener("click", (evento) => {
  const botao = evento.target.closest("button[data-acao]");
  if (!botao) return;

  const { acao, id } = botao.dataset;
  if (acao === "aumentar") alterarQuantidade(id, 1);
  if (acao === "diminuir") alterarQuantidade(id, -1);
  if (acao === "editar") preencherEdicao(id);
  if (acao === "excluir") excluirItem(id);
});

inputBusca.addEventListener("input", renderizarTabela);
filtroCategoria.addEventListener("change", renderizarTabela);
filtroBaixo.addEventListener("change", renderizarTabela);

renderizarTabela();
