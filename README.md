# Cantinho do Livro

Livraria fictícia feita como Atividade Final de Web.

**Integrantes:** [Nome 1] e [Nome 2]

## Tecnologias e por quê

- **HTML5 semântico** (header, nav, main, section, article, aside, footer): estrutura clara e acessível.
- **CSS puro** com variáveis, Flexbox e Grid: paleta e tipografia definidas em um só lugar, o que também permitiu o tema escuro.
- **JavaScript puro**, em arquivos separados (`livros.js`, `carrinho.js`, `script.js`): fácil de explicar.
- **Google Books API** (`fetch`): fonte real dos livros do catálogo, com a lista local (`livros.js`) como reserva se a API falhar.
- **Toastify JS** (via CDN): biblioteca leve usada nos toasts de sucesso e erro do formulário de contato, para um aviso mais claro que um texto solto na página.

## Funcionalidades

- Home com banner (livro do mês), vitrine de 4 destaques e ilustração em SVG
- Catálogo com livros em 4 categorias, gerados por JavaScript a partir da Google Books API (com lista local de 12 livros como reserva); a cada recarga a página de resultados é sorteada, então os livros mudam
- Capas ilustradas desenhadas em SVG pelo código, de acordo com a categoria
- Busca por título ou autor enquanto digita (ignora acentos) e filtro por categoria
- Detalhes do livro em popup (janela modal): capa ampliada, sinopse, autor, editora, ano, páginas, preço e categoria
- Carrinho em painel lateral (aside), aberto e fechado pelo ícone na navbar: adicionar, remover, alterar quantidade, total automático e contador no ícone
- Carrinho salvo no `localStorage`
- Formulário de contato com validação e mensagens de sucesso e erro em toast (sem `alert`)
- Menu hambúrguer no celular e layout responsivo (576 px, 768 px e 1200 px)
- **Extra:** modo claro/escuro com a preferência salva no `localStorage`

## Como rodar

1. Baixe o repositório e abra a pasta no VS Code.
2. Abra o `index.html` com a extensão **Live Server** (abrir o arquivo com duplo clique não funciona com a chave de API restrita).
3. Opcional: cole a sua chave da Google Books API em `CHAVE_API`, no arquivo `js/api.js`. Sem chave a busca também funciona, com cota menor.

Os toasts usam a biblioteca Toastify via CDN, então é preciso estar conectado à internet; sem ela, a mensagem aparece abaixo do formulário.

## Prints

![Desktop](prints/desktop.png)
![Celular](prints/celular.png)
