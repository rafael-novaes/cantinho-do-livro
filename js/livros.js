
// LISTA LOCAL DE LIVROS (reserva usada se a Google Books API falhar)

let livros = [
    {
        id: 1,
        titulo: "O Pequeno Príncipe",
        autor: "Antoine de Saint-Exupéry",
        editora: "Agir",
        ano: 2015,
        paginas: 96,
        preco: 39.90,
        categoria: "Infantil",
        capa: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
        sinopse: "Um pequeno príncipe viaja por diferentes planetas e conhece personagens que ensinam importantes lições sobre amizade, amor e vida."
    },

    {
        id: 2,
        titulo: "Harry Potter e a Pedra Filosofal",
        autor: "J. K. Rowling",
        editora: "Rocco",
        ano: 2000,
        paginas: 208,
        preco: 49.90,
        categoria: "Fantasia",
        capa: "https://covers.openlibrary.org/b/id/10521270-L.jpg",
        sinopse: "Harry descobre que é um bruxo e começa uma aventura cheia de magia na Escola de Magia e Bruxaria de Hogwarts."
    },

    {
        id: 3,
        titulo: "Orgulho e Preconceito",
        autor: "Jane Austen",
        editora: "Martin Claret",
        ano: 2018,
        paginas: 424,
        preco: 44.90,
        categoria: "Romance",
        capa: "https://covers.openlibrary.org/b/id/10521258-L.jpg",
        sinopse: "Elizabeth Bennet e Mr. Darcy enfrentam diferenças sociais, julgamentos e sentimentos inesperados."
    },

    {
        id: 4,
        titulo: "O Senhor dos Anéis",
        autor: "J. R. R. Tolkien",
        editora: "HarperCollins",
        ano: 2019,
        paginas: 576,
        preco: 69.90,
        categoria: "Fantasia",
        capa: "https://covers.openlibrary.org/b/id/14625707-L.jpg",
        sinopse: "Uma jornada épica pela Terra-média para destruir um poderoso anel e impedir que o mal domine o mundo."
    },

    {
        id: 5,
        titulo: "Dom Casmurro",
        autor: "Machado de Assis",
        editora: "Principis",
        ano: 2019,
        paginas: 208,
        preco: 29.90,
        categoria: "Romance",
        capa: "https://covers.openlibrary.org/b/id/10521260-L.jpg",
        sinopse: "Bentinho relembra sua história com Capitu, marcada por amor, ciúmes e dúvidas."
    },

    {
        id: 6,
        titulo: "A Culpa é das Estrelas",
        autor: "John Green",
        editora: "Intrínseca",
        ano: 2012,
        paginas: 288,
        preco: 42.90,
        categoria: "Romance",
        capa: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
        sinopse: "Hazel e Augustus se conhecem em um grupo de apoio e desenvolvem uma relação que transforma suas vidas."
    },

    {
        id: 7,
        titulo: "O Hobbit",
        autor: "J. R. R. Tolkien",
        editora: "HarperCollins",
        ano: 2019,
        paginas: 336,
        preco: 54.90,
        categoria: "Fantasia",
        capa: "https://covers.openlibrary.org/b/id/14625707-L.jpg",
        sinopse: "Bilbo Bolseiro embarca em uma aventura inesperada ao lado de um grupo de anões para recuperar um tesouro."
    },

    {
        id: 8,
        titulo: "Clean Code",
        autor: "Robert C. Martin",
        editora: "Alta Books",
        ano: 2009,
        paginas: 425,
        preco: 89.90,
        categoria: "Técnicos",
        capa: "https://covers.openlibrary.org/b/id/12645132-L.jpg",
        sinopse: "Um guia sobre boas práticas de programação, organização de código e desenvolvimento de software de qualidade."
    },

    {
        id: 9,
        titulo: "JavaScript: O Guia Definitivo",
        autor: "David Flanagan",
        editora: "Bookman",
        ano: 2021,
        paginas: 704,
        preco: 119.90,
        categoria: "Técnicos",
        capa: "https://covers.openlibrary.org/b/id/12645132-L.jpg",
        sinopse: "Uma referência abrangente sobre a linguagem JavaScript, seus recursos e aplicações."
    },

    {
        id: 10,
        titulo: "O Código Da Vinci",
        autor: "Dan Brown",
        editora: "Arqueiro",
        ano: 2004,
        paginas: 432,
        preco: 46.90,
        categoria: "Romance",
        capa: "https://covers.openlibrary.org/b/id/10521258-L.jpg",
        sinopse: "Um professor de simbologia investiga uma série de mistérios envolvendo símbolos e segredos históricos."
    },

    {
        id: 11,
        titulo: "Percy Jackson e o Ladrão de Raios",
        autor: "Rick Riordan",
        editora: "Intrínseca",
        ano: 2009,
        paginas: 400,
        preco: 49.90,
        categoria: "Fantasia",
        capa: "https://covers.openlibrary.org/b/id/10521270-L.jpg",
        sinopse: "Percy descobre sua origem como semideus e precisa enfrentar desafios da mitologia grega."
    },

    {
        id: 12,
        titulo: "O Menino Maluquinho",
        autor: "Ziraldo",
        editora: "Melhoramentos",
        ano: 2005,
        paginas: 112,
        preco: 34.90,
        categoria: "Infantil",
        capa: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
        sinopse: "As aventuras e descobertas de um menino alegre, criativo e cheio de imaginação."
    }
];
