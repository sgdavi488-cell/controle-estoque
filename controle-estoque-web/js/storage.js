const STORAGE_KEY = "controle_estoque_itens_v1";

function carregarItens() {
  try {
    const salvo = localStorage.getItem(STORAGE_KEY);
    return salvo ? JSON.parse(salvo) : [];
  } catch (erro) {
    console.error("Erro ao ler dados do LocalStorage:", erro);
    return [];
  }
}

function salvarItens(itens) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
}

function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function obterItensExemplo() {
  const hoje = new Date().toLocaleDateString("pt-BR");
  return [
    {
      id: gerarId() + "1",
      nome: "Papel Sulfite A4 (500 folhas)",
      categoria: "Papelaria",
      quantidade: 12,
      minimo: 5,
      unidade: "resma",
      observacao: "Armário do almoxarifado",
      atualizadoEm: hoje
    },
    {
      id: gerarId() + "2",
      nome: "Caneta Esferográfica Azul",
      categoria: "Papelaria",
      quantidade: 4,
      minimo: 10,
      unidade: "cx",
      observacao: "Repor antes do fechamento do mês",
      atualizadoEm: hoje
    },
    {
      id: gerarId() + "3",
      nome: "Toner Impressora Laser Preto",
      categoria: "Informática",
      quantidade: 1,
      minimo: 2,
      unidade: "un",
      observacao: "Modelo compatível com recepção",
      atualizadoEm: hoje
    },
    {
      id: gerarId() + "4",
      nome: "Café em Pó 500g",
      categoria: "Copa",
      quantidade: 0,
      minimo: 3,
      unidade: "pct",
      observacao: "Compra urgente",
      atualizadoEm: hoje
    },
    {
      id: gerarId() + "5",
      nome: "Álcool 70% Líquido 1L",
      categoria: "Limpeza",
      quantidade: 6,
      minimo: 3,
      unidade: "un",
      observacao: "Estoque regular",
      atualizadoEm: hoje
    }
  ];
}
