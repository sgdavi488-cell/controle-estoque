# Controle de Estoque Web

Aplicação web simples para registrar materiais de escritório, acompanhar alertas de estoque mínimo e exportar a lista para planilha `.csv` pronta para o Excel.

**Testar online:** [Adicione aqui o link do seu GitHub Pages após publicar](https://seu-usuario.github.io/controle-estoque-web)

<!-- Depois de publicar, tire um print da tela, salve como assets/preview.png e remova este comentário:
![Tela principal do sistema](./assets/preview.png)
-->

## Por que fiz este projeto
Muitos escritórios e pequenos negócios ainda controlam insumos em anotações soltas ou planilhas desatualizadas. Criei este sistema para praticar lógica em JavaScript e resolver uma rotina administrativa real sem depender de servidor ou instalação.

## Funcionalidades
- Cadastro, edição e exclusão de itens salvos no navegador (`localStorage`)
- Ajuste rápido de entrada (`+`) e saída (`-`) direto na tabela
- Indicadores automáticos de total de itens, unidades e itens abaixo do mínimo
- Busca por nome ou observação, filtro por categoria e filtro de estoque baixo
- Botão para carregar dados de exemplo para facilitar testes
- Exportação da visualização atual para arquivo `.csv` compatível com Excel

## Tecnologias
- HTML5
- CSS3
- JavaScript (puro)
- LocalStorage API

## Estrutura de pastas
```text
controle-estoque-web/
├── assets/
├── css/
│   └── style.css
├── js/
│   ├── storage.js
│   ├── exportCsv.js
│   └── main.js
├── index.html
├── LICENSE
└── README.md
```

## O que aprendi na prática
- **Compatibilidade com Excel:** usar ponto e vírgula (`;`) como separador e adicionar o prefixo UTF-8 BOM (`\uFEFF`) evita que acentos fiquem quebrados ao abrir o `.csv` no Excel em português.
- **Separação de responsabilidades:** dividir armazenamento, exportação e controle da tela em arquivos separados facilita a manutenção do código.

## Como rodar localmente
1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` diretamente no navegador.
