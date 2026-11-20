# Controle de Estoque — o que entra, o que sai, o que precisa repor.

Um controle de materiais pensado para a rotina de escritórios e pequenos negócios. A proposta é simples: deixar os itens organizados, mostrar o que está chegando ao mínimo e facilitar a atualização do estoque sem depender de uma planilha perdida em alguma pasta.

## O que dá para fazer

- Cadastrar, editar e remover produtos.
- Registrar entradas e saídas direto na tabela.
- Acompanhar quantidade total e alertas de estoque mínimo.
- Procurar itens por nome ou observação.
- Filtrar por categoria e por estoque baixo.
- Carregar dados de exemplo para testar.
- Exportar a lista em CSV e abrir no Excel.

## Por dentro

O projeto foi feito com HTML, CSS e JavaScript puro. Os dados ficam no LocalStorage do navegador, então não é necessário instalar um servidor ou criar uma conta. Em compensação, as informações ficam naquele navegador e não sincronizam automaticamente com outros dispositivos.

## Estrutura

A aplicação está dentro da pasta `controle-estoque-web/`. O código foi separado em arquivos para facilitar a leitura e a manutenção.

## Testar

Abra a pasta `controle-estoque-web` e execute o arquivo `index.html` no navegador. Para publicar uma demonstração, configure o GitHub Pages apontando para a pasta correta ou use um workflow de deploy.

---

Projeto de estudo e portfólio. Feito por Davi, praticando JavaScript com um problema que existe fora da tela também.
