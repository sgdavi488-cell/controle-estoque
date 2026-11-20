function escaparCampoCsv(valor) {
  const original = String(valor ?? "");
  // Evita que planilhas interpretem texto iniciado por caracteres de fórmula.
  const protegido = /^[\\s]*[=+@\\-]/.test(original) ? "'" + original : original;
  const texto = protegido.replace(/"/g, '""');
  return `"${texto}"`;
}

function obterStatusTexto(item) {
  if (item.quantidade === 0) return "Zerado";
  if (item.quantidade <= item.minimo) return "Estoque baixo";
  return "Normal";
}

function exportarParaCsv(itens) {
  if (!itens.length) {
    alert("Não há itens para exportar.");
    return;
  }

  const cabecalho = [
    "Material",
    "Categoria",
    "Quantidade",
    "Unidade",
    "Estoque Minimo",
    "Status",
    "Observacao",
    "Atualizado Em"
  ];

  const linhas = itens.map((item) => [
    escaparCampoCsv(item.nome),
    escaparCampoCsv(item.categoria),
    item.quantidade,
    escaparCampoCsv(item.unidade),
    item.minimo,
    escaparCampoCsv(obterStatusTexto(item)),
    escaparCampoCsv(item.observacao),
    escaparCampoCsv(item.atualizadoEm)
  ].join(";"));

  // Prefixo UTF-8 BOM para manter acentos corretos ao abrir direto no Excel
  const conteudo = "﻿" + [cabecalho.join(";"), ...linhas].join("
");
  const blob = new Blob([conteudo], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const dataArquivo = new Date().toISOString().slice(0, 10);
  const link = document.createElement("a");
  link.href = url;
  link.download = `controle-estoque-${dataArquivo}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
