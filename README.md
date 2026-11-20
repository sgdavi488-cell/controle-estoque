# Controle de Estoque

Um sistema web para cadastrar produtos e acompanhar o que existe no estoque, o que está acabando e o que precisa de reposição. A ideia do projeto é organizar itens de supermercado e outros tipos de produtos em um só lugar, sem depender de anotações espalhadas.

**[Acessar o projeto online](https://sgdavi488-cell.github.io/controle-estoque/)**

## Funcionalidades atuais

- Cadastrar, editar e excluir itens.
- Informar nome, categoria, quantidade, unidade, estoque mínimo e observações.
- Registrar entradas e saídas ajustando a quantidade diretamente na tabela.
- Visualizar indicadores de itens cadastrados, unidades e produtos abaixo do mínimo.
- Pesquisar por nome ou observação.
- Filtrar por categoria ou mostrar somente os itens com estoque baixo.
- Carregar dados de exemplo para testar a aplicação.
- Exportar os itens exibidos para um arquivo CSV compatível com planilhas.

## Como funciona o armazenamento

Os dados são guardados no LocalStorage do navegador. Isso permite usar o sistema sem criar uma conta ou configurar um servidor, mas também significa que as informações ficam naquele navegador e dispositivo. Elas não são sincronizadas automaticamente entre computadores ou celulares.

O projeto não possui banco de dados online nem acesso compartilhado entre usuários.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- LocalStorage API
- CSV para exportação dos dados

## Organização dos arquivos

A aplicação fica dentro da pasta `controle-estoque-web/`.

```text
controle-estoque/
├── README.md
└── controle-estoque-web/
    ├── index.html
    ├── css/
    │   └── style.css
    └── js/
        ├── main.js
        ├── storage.js
        └── exportCsv.js
```

- `main.js`: controla a interface, os formulários, a tabela, os filtros e os indicadores.
- `storage.js`: lê e salva os itens no LocalStorage e fornece dados de exemplo.
- `exportCsv.js`: monta e baixa o arquivo CSV.

## Executar localmente

1. Baixe ou clone este repositório.
2. Abra a pasta `controle-estoque-web`.
3. Abra o arquivo `index.html` no navegador.

O projeto não usa módulos JavaScript ou chamadas a arquivos JSON externos, então pode ser testado abrindo o HTML diretamente.

## Limitações atuais

- Os dados ficam somente no armazenamento local do navegador.
- Não há login, banco de dados remoto ou sincronização entre dispositivos.
- A interface e os exemplos atuais usam categorias como papelaria, informática, limpeza e copa. A estrutura pode ser adaptada para outros tipos de produtos.
- A exportação gera um arquivo CSV; ela não sincroniza os dados com uma planilha online.

## Ideias para evoluir

- Criar categorias personalizadas.
- Adicionar importação de planilhas.
- Implementar backup e restauração dos dados.
- Permitir acesso compartilhado com banco de dados e autenticação.

---

Projeto de estudo desenvolvido por Davi para praticar JavaScript e criar uma ferramenta simples de organização de estoque.
