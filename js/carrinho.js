let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

carrinho.forEach(function(item) {
    item.id = String(item.id);
});

const listaCarrinho = document.getElementById("lista-carrinho");
const valorTotal = document.getElementById("valor-total");
const contadorCarrinho = document.getElementById("contador-carrinho");

function renderizarCarrinho() {

    listaCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio. Escolha uma história no catálogo e ela aparece aqui.</p>';
        return;
    }

    carrinho.forEach(function(item) {

        const subtotal = item.preco * item.quantidade;

        listaCarrinho.innerHTML += `
            <article class="item-carrinho">

                <h3>${item.titulo}</h3>

                <p>Preço unitário: R$ ${item.preco.toFixed(2).replace(".", ",")}</p>

                <div class="quantidade">
                    <button type="button" data-acao="diminuir" data-id="${item.id}" aria-label="Diminuir quantidade de ${item.titulo}">-</button>

                    <span>${item.quantidade}</span>

                    <button type="button" data-acao="aumentar" data-id="${item.id}" aria-label="Aumentar quantidade de ${item.titulo}">+</button>
                </div>

                <p>Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}</p>

                <button type="button" class="btn-sec" data-acao="remover" data-id="${item.id}">
                    Remover
                </button>

            </article>
        `;

    });

}

function atualizarTotal() {

    let total = 0;

    carrinho.forEach(function(item) {

        total += item.preco * item.quantidade;

    });

    valorTotal.textContent = total.toFixed(2).replace(".", ",");

}

function atualizarContador() {

    let quantidadeTotal = 0;

    carrinho.forEach(function(item) {

        quantidadeTotal += item.quantidade;

    });

    contadorCarrinho.textContent = quantidadeTotal;
    contadorCarrinho.hidden = quantidadeTotal === 0;

}

function adicionarAoCarrinho(idLivro) {

    const livroSelecionado = livros.find(function(livro) {
        return livro.id === idLivro;
    });

    const itemExistente = carrinho.find(function(item) {
        return item.id === idLivro;
    });

    if (itemExistente) {  
        itemExistente.quantidade++;

    } else {

        carrinho.push({
            id: livroSelecionado.id,
            titulo: livroSelecionado.titulo,
            preco: livroSelecionado.preco,
            quantidade: 1
        });

    }
    atualizarCarrinho();
}

function alterarQuantidade(idLivro, acao) {

    const item = carrinho.find(function(item) {
        return item.id === idLivro;
    });

    if (acao === "aumentar") {

        item.quantidade++;

    } else if (acao === "diminuir") {

        item.quantidade--;

        if (item.quantidade === 0) {
            removerDoCarrinho(idLivro);
            return;
        }

    }
    atualizarCarrinho();
}

function removerDoCarrinho(idLivro) {

    carrinho = carrinho.filter(function(item) {
        return item.id !== idLivro;
    });

    atualizarCarrinho();

}

listaCarrinho.addEventListener("click", function(event) {
    const botao = event.target.closest("button[data-acao]");

    if (!botao) {
        return;
    }

    const idLivro = botao.dataset.id;
    const acao = botao.dataset.acao;

    if (acao === "remover") {

        removerDoCarrinho(idLivro);

    } else {

        alterarQuantidade(idLivro, acao);

    }

});

function atualizarCarrinho() {
  renderizarCarrinho();
  atualizarTotal();
  atualizarContador();
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

atualizarCarrinho();