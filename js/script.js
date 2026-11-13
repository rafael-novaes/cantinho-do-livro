// ============================================================
// CAPAS ILUSTRADAS: cada capa é uma pequena arte desenhada em SVG
// pelo código, com cores e motivo de acordo com a categoria.
// ============================================================

const paletas = {
    Romance:    { fundo: "#8C3B4A", forma1: "#F0B8A0", forma2: "#F7DFC8" },
    Fantasia:   { fundo: "#2B3A55", forma1: "#F2D88A", forma2: "#7B8FBF" },
    "Técnicos": { fundo: "#4F6642", forma1: "#EFE6CC", forma2: "#A3B895" },
    Infantil:   { fundo: "#D9A03C", forma1: "#6FA9C4", forma2: "#D8694E" }
};

function escapar(texto) {
    return texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function quebrarTitulo(titulo, maximo = 15) {
    const linhas = [];
    let atual = "";

    titulo.split(" ").forEach(function(palavra) {
        if ((atual + " " + palavra).trim().length > maximo && atual) {
            linhas.push(atual);
            atual = palavra;
        } else {
            atual = (atual + " " + palavra).trim();
        }
    });

    linhas.push(atual);
    return linhas;
}

function desenharMotivo(categoria, p) {
    if (categoria === "Fantasia") {
        return `<circle cx="150" cy="105" r="46" fill="${p.forma1}"/>
                <circle cx="168" cy="92" r="42" fill="${p.fundo}"/>
                <path d="M0 255L70 150L130 230L200 130L300 255Z" fill="${p.forma2}" opacity=".7"/>
                <circle cx="60" cy="60" r="3" fill="${p.forma1}"/>
                <circle cx="240" cy="70" r="3" fill="${p.forma1}"/>
                <circle cx="255" cy="130" r="2.5" fill="${p.forma1}"/>`;
    }
    if (categoria === "Técnicos") {
        return `<path d="M95 80L50 130L95 180M205 80L250 130L205 180" fill="none" stroke="${p.forma1}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M165 70L135 190" stroke="${p.forma2}" stroke-width="12" stroke-linecap="round"/>`;
    }
    if (categoria === "Infantil") {
        return `<circle cx="215" cy="95" r="42" fill="${p.forma2}"/>
                <ellipse cx="90" cy="95" rx="42" ry="18" fill="#fff" opacity=".9"/>
                <ellipse cx="115" cy="82" rx="28" ry="16" fill="#fff" opacity=".9"/>
                <path d="M0 255Q80 170 160 230T300 210V255Z" fill="${p.forma1}"/>`;
    }
    return `<circle cx="125" cy="120" r="52" fill="${p.forma1}" opacity=".9"/>
            <circle cx="180" cy="120" r="52" fill="${p.forma2}" opacity=".8"/>
            <path d="M0 255Q150 170 300 255Z" fill="${p.forma1}" opacity=".6"/>`;
}

function capaArte(livro) {
    const p = paletas[livro.categoria] || paletas.Romance;

    const titulo = quebrarTitulo(livro.titulo).map(function(linha, i) {
        return `<text x="150" y="${290 + i * 26}" text-anchor="middle" font-family="Georgia,serif" font-size="21" font-weight="bold" fill="#FFF8EC">${escapar(linha)}</text>`;
    }).join("");

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 420">
        <rect width="300" height="420" fill="${p.fundo}"/>
        ${desenharMotivo(livro.categoria, p)}
        <rect y="255" width="300" height="165" fill="#000" opacity=".42"/>
        ${titulo}
        <text x="150" y="402" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="13" fill="#F3E6D2">${escapar(livro.autor)}</text>
        <rect x="10" y="10" width="280" height="400" rx="6" fill="none" stroke="${p.forma1}" stroke-opacity=".6" stroke-width="2"/>
    </svg>`;

    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

// A capa de cada livro passa a ser a arte gerada acima
livros.forEach(function(livro) {
    livro.capa = capaArte(livro);
});


// ============================================================
// ELEMENTOS DA PÁGINA
// ============================================================

const catalogo = document.getElementById("lista-livros");
const destaque = document.getElementById("livros-destaque");
const detalhesLivro = document.getElementById("detalhes-livro");
const dialogoDetalhes = document.getElementById("detalhes");
const bannerMes = document.getElementById("banner-mes");

const campoBusca = document.getElementById("busca");
const filtroCategoria = document.getElementById("filtro-categoria");

const idsDestaque = [1, 2, 4, 8];


// ============================================================
// CATÁLOGO, VITRINE E DETALHES
// ============================================================

function formatarPreco(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}

function criarCard(livro) {
    return `
        <article class="livro-card">

            <img src="${livro.capa}" alt="Capa do livro ${livro.titulo}, de ${livro.autor}">

            <h3>${livro.titulo}</h3>

            <p>Autor: ${livro.autor}</p>

            <p>Categoria: ${livro.categoria}</p>

            <p class="preco">${formatarPreco(livro.preco)}</p>

            <div class="acoes-card">
                <button type="button" data-id="${livro.id}">Adicionar ao carrinho</button>
                <button type="button" class="btn-sec" data-detalhe="${livro.id}">Ver detalhes</button>
            </div>

        </article>
    `;
}

function renderizarLivros(listaLivros = livros) {

    catalogo.innerHTML = "";

    if (listaLivros.length === 0) {
        catalogo.innerHTML = '<p class="vazio">Nenhum livro encontrado. Tente outro título, autor ou categoria.</p>';
        return;
    }

    listaLivros.forEach(function(livro) {
        catalogo.innerHTML += criarCard(livro);
    });

}

function renderizarDestaques() {

    livros.filter(function(livro) {
        return idsDestaque.includes(livro.id);
    }).forEach(function(livro) {
        destaque.innerHTML += criarCard(livro);
    });

}

function mostrarDetalhes(idLivro) {

    const livro = livros.find(function(item) {
        return item.id === idLivro;
    });

    detalhesLivro.innerHTML = `
        <img src="${livro.capa}" alt="Capa ampliada do livro ${livro.titulo}, de ${livro.autor}">

        <div class="detalhes-info">
            <h3>${livro.titulo}</h3>

            <p class="sinopse">${livro.sinopse}</p>

            <ul>
                <li><strong>Autor:</strong> ${livro.autor}</li>
                <li><strong>Editora:</strong> ${livro.editora}</li>
                <li><strong>Ano:</strong> ${livro.ano}</li>
                <li><strong>Páginas:</strong> ${livro.paginas}</li>
                <li><strong>Categoria:</strong> ${livro.categoria}</li>
            </ul>

            <p class="preco">${formatarPreco(livro.preco)}</p>

            <button type="button" data-id="${livro.id}">Adicionar ao carrinho</button>
        </div>
    `;

    if (!dialogoDetalhes.open) {
        dialogoDetalhes.showModal();
        document.body.classList.add("modal-aberto");
    }

    dialogoDetalhes.scrollTop = 0;

}


// ============================================================
// BUSCA E FILTRO (sem acento e sem diferenciar maiúsculas)
// ============================================================

function normalizar(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function filtrarLivros() {

    const textoBusca = normalizar(campoBusca.value);

    const categoriaSelecionada = filtroCategoria.value;

    const livrosFiltrados = livros.filter(function(livro) {

        const correspondeBusca =
            normalizar(livro.titulo).includes(textoBusca) ||
            normalizar(livro.autor).includes(textoBusca);

        const correspondeCategoria =
            categoriaSelecionada === "todas" ||
            livro.categoria === categoriaSelecionada;

        return correspondeBusca && correspondeCategoria;

    });

    renderizarLivros(livrosFiltrados);

}


// ============================================================
// CLIQUES NOS BOTÕES DOS LIVROS (catálogo, vitrine, detalhes, banner)
// ============================================================

function avisarAdicionado(botao) {

    const textoOriginal = botao.textContent;

    botao.textContent = "Adicionado ✓";
    botao.disabled = true;

    setTimeout(function() {
        botao.textContent = textoOriginal;
        botao.disabled = false;
    }, 1000);

}

function tratarCliqueLivro(event) {

    const botao = event.target.closest("button");

    if (!botao) {
        return;
    }

    if (botao.dataset.detalhe) {

        mostrarDetalhes(Number(botao.dataset.detalhe));

    } else if (botao.dataset.id) {

        adicionarAoCarrinho(Number(botao.dataset.id));
        avisarAdicionado(botao);

    }

}

[catalogo, destaque, detalhesLivro, bannerMes].forEach(function(area) {
    area.addEventListener("click", tratarCliqueLivro);
});

// POPUP DE DETALHES: fecha no botão, no fundo escuro, no link "Voltar" e com Esc
function fecharDetalhes() {
    dialogoDetalhes.close();
    document.body.classList.remove("modal-aberto");
}

document.getElementById("fechar-detalhes").addEventListener("click", fecharDetalhes);

document.getElementById("voltar-catalogo").addEventListener("click", fecharDetalhes);

dialogoDetalhes.addEventListener("click", function(event) {
    if (event.target === dialogoDetalhes) {
        fecharDetalhes();
    }
});

dialogoDetalhes.addEventListener("close", function() {
    document.body.classList.remove("modal-aberto");
});

campoBusca.addEventListener("input", filtrarLivros);

filtroCategoria.addEventListener("change", filtrarLivros);


// ============================================================
// MENU NO CELULAR E TEMA CLARO/ESCURO
// ============================================================

const menu = document.getElementById("site-nav");
const botaoMenu = document.getElementById("botao-menu");
const botaoTema = document.getElementById("botao-tema");

function fecharMenu() {
    menu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
}

botaoMenu.addEventListener("click", function() {
    const aberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", aberto);
});

menu.addEventListener("click", function(event) {
    if (event.target.closest("a")) {
        fecharMenu();
    }
});

function aplicarTema(tema) {
    document.documentElement.dataset.tema = tema;
    botaoTema.textContent = tema === "escuro" ? "☀️" : "🌙";
}

botaoTema.addEventListener("click", function() {
    const novoTema = document.documentElement.dataset.tema === "escuro" ? "claro" : "escuro";
    aplicarTema(novoTema);
    localStorage.setItem("tema", novoTema);
});

aplicarTema(localStorage.getItem("tema") || "claro");


// ============================================================
// CARRINHO LATERAL (aberto e fechado pelo ícone da navbar)
// ============================================================

const painelCarrinho = document.getElementById("carrinho");
const fundoCarrinho = document.getElementById("fundo-carrinho");
const botaoCarrinho = document.getElementById("botao-carrinho");
const botaoFecharCarrinho = document.getElementById("fechar-carrinho");

function alternarCarrinho(abrir) {

    painelCarrinho.classList.toggle("aberto", abrir);
    fundoCarrinho.classList.toggle("aberto", abrir);
    document.body.classList.toggle("carrinho-aberto", abrir);

    botaoCarrinho.setAttribute("aria-expanded", abrir);
    botaoCarrinho.setAttribute("aria-label", abrir ? "Fechar carrinho" : "Abrir carrinho");

    if (abrir) {
        fecharMenu();
        botaoFecharCarrinho.focus();
    } else {
        botaoCarrinho.focus();
    }

}

botaoCarrinho.addEventListener("click", function() {
    alternarCarrinho(!painelCarrinho.classList.contains("aberto"));
});

botaoFecharCarrinho.addEventListener("click", function() {
    alternarCarrinho(false);
});

fundoCarrinho.addEventListener("click", function() {
    alternarCarrinho(false);
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && painelCarrinho.classList.contains("aberto")) {
        alternarCarrinho(false);
    }
});


// ============================================================
// FORMULÁRIO DE CONTATO (validação sem alert)
// ============================================================

const formContato = document.getElementById("form-contato");
const mensagemFormulario = document.getElementById("mensagem-formulario");

function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// Mostra a mensagem em um toast (biblioteca Toastify).
// Se a biblioteca não carregar, a mensagem aparece abaixo do formulário.
function mostrarAviso(tipo, titulo, texto) {

    if (typeof Toastify !== "function") {
        mensagemFormulario.className = tipo;
        mensagemFormulario.textContent = titulo + " " + texto;
        return;
    }

    const conteudo = document.createElement("div");
    conteudo.className = "toast-conteudo";

    const icone = document.createElement("span");
    icone.className = "toast-icone";
    icone.setAttribute("aria-hidden", "true");
    icone.textContent = tipo === "sucesso" ? "✓" : "!";

    const textos = document.createElement("div");
    const tituloToast = document.createElement("strong");
    const textoToast = document.createElement("span");
    tituloToast.textContent = titulo;
    textoToast.textContent = texto;
    textos.append(tituloToast, textoToast);

    conteudo.append(icone, textos);

    Toastify({
        node: conteudo,
        duration: 5000,
        gravity: "top",
        position: "right",
        close: true,
        stopOnFocus: true,
        className: "toast toast-" + tipo,
        ariaLive: tipo === "erro" ? "assertive" : "polite"
    }).showToast();

}

formContato.addEventListener("submit", function(event) {

    event.preventDefault();

    const campos = Array.from(formContato.elements).filter(function(campo) {
        return campo.name;
    });

    let erro = "";

    campos.forEach(function(campo) {
        campo.removeAttribute("aria-invalid");
    });

    for (const campo of campos) {
        if (campo.value.trim() === "") {
            const nomeCampo = campo.labels[0].textContent.replace(":", "").toLowerCase();
            erro = "Preencha o campo " + nomeCampo + ".";
            campo.setAttribute("aria-invalid", "true");
            campo.focus();
            break;
        }
    }

    const campoEmail = document.getElementById("email");

    if (!erro && !emailValido(campoEmail.value.trim())) {
        erro = "Digite um e-mail válido, como nome@exemplo.com.";
        campoEmail.setAttribute("aria-invalid", "true");
        campoEmail.focus();
    }

    if (erro) {
        mostrarAviso("erro", "Confira o formulário", erro);
        return;
    }

    const nome = document.getElementById("nome").value.trim();
    const email = campoEmail.value.trim();

    mostrarAviso("sucesso", "Mensagem enviada!", "Obrigado, " + nome + ". Vamos responder em " + email + ".");
    formContato.reset();

});


// ============================================================
// EXECUTA AS FUNÇÕES INICIAIS
// ============================================================

renderizarLivros();
renderizarDestaques();