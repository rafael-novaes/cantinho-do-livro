// ============================================================
// GOOGLE BOOKS API: busca os livros e converte para o formato
// usado no site (o mesmo do livros.js, que fica como reserva)
// ============================================================

// Cole aqui a sua chave de API (Google Cloud > APIs e serviços > Credenciais).
// Se ficar com este texto, a busca funciona sem chave (com cota menor).
const CHAVE_API = "AIzaSyAClt3rLtoP8WvCDiUS-7C2_iLCnDEyYts";

// true: a cada recarga a página de resultados é sorteada e os livros mudam
// false: sempre os mesmos livros
const SORTEAR_LIVROS = true;

const CATEGORIAS_API = {
    Romance:    "subject:romance",
    Fantasia:   "subject:fantasy",
    "Técnicos": "subject:computers",
    Infantil:   "subject:juvenile fiction"
};

function limpar(texto) {
    return texto.replace(/<[^>]*>/g, "").replace(/[<>"]/g, "");
}

// A API nem sempre informa o preço, então usamos um valor simulado
function gerarPreco(paginas) {
    return Math.round(24.9 + (paginas || 200) * 0.09) - 0.1;
}

function converterVolume(item, categoria) {
    const info = item.volumeInfo;
    const capa = info.imageLinks && (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail);
    const venda = item.saleInfo && item.saleInfo.listPrice;

    return {
        id: item.id,
        titulo: limpar(info.title),
        autor: info.authors ? limpar(info.authors.join(", ")) : "Autor desconhecido",
        editora: limpar(info.publisher || "Editora não informada"),
        ano: info.publishedDate ? info.publishedDate.slice(0, 4) : "s/d",
        paginas: info.pageCount || "-",
        preco: venda ? venda.amount : gerarPreco(info.pageCount),
        categoria: categoria,
        capa: capa ? capa.replace("http://", "https://").replace("&edge=curl", "") : "",
        sinopse: info.description ? limpar(info.description).slice(0, 350) + "..." : "Sinopse não disponível."
    };
}

async function buscarCategoria(categoria, consulta) {

    const usaChave = CHAVE_API && CHAVE_API !== "COLE_SUA_CHAVE_AQUI";

    const inicio = SORTEAR_LIVROS ? Math.floor(Math.random() * 6) * 6 : 0;

    const url = "https://www.googleapis.com/books/v1/volumes?q=" + encodeURIComponent(consulta) +
                "&langRestrict=pt&printType=books&maxResults=6&startIndex=" + inicio +
                (usaChave ? "&key=" + CHAVE_API : "");

    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error("Erro " + resposta.status);
    }

    const dados = await resposta.json();

    return (dados.items || [])
        .filter(function(item) {
            return item.volumeInfo && item.volumeInfo.title;
        })
        .map(function(item) {
            return converterVolume(item, categoria);
        });

}

async function buscarLivrosGoogle() {

    try {

        const grupos = await Promise.all(
            Object.entries(CATEGORIAS_API).map(function(par) {
                return buscarCategoria(par[0], par[1]);
            })
        );

        const vistos = new Set();

        return grupos.flat().filter(function(livro) {
            if (vistos.has(livro.id)) {
                return false;
            }
            vistos.add(livro.id);
            return true;
        });

    } catch (erro) {
        console.warn("Google Books indisponível, usando a lista local.", erro);
        return [];
    }

}
