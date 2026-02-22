const produtos = [
    { nome: "Anel Ponto De Luz Cristal", preco: 45, categoria: "joia", sub: "prata", img: "img/Anel_prata.jpeg" , descricao:"Prata 925, pedra de zircónia, Número 20"},
    { nome: "Anel Ponto De Luz Rosa", preco: 55, categoria: "joia", sub: "prata", img: "img/anel_prata01.jpeg", descricao:"Prata 925, pedra de zircónia, Número 18" },
    { nome: "Argola Redonda", preco:59, categoria: "joia", sub: "prata", img: "img/argola_01.jpeg" , descricao:"Prata 925, 53mm"},
    { nome: "Argola Gota", preco: 49, categoria: "joia", sub: "prata", img: "img/brinco_prata01.jpeg", descricao:"Prata 925, 43mm" },
    { nome: "Colar Choker", preco: 99, categoria: "joia", sub: "prata", img: "img/colar_prata02.jpeg", descricao:"Prata 925, Aro fino" },
    { nome: "Colar Borboleta", preco: 109, categoria: "joia", sub: "prata", img: "img/colar01.jpeg", descricao:"Prata 925, 45cm" },
    { nome: "Trio de Zircónia", preco: 59, categoria: "joia", sub: "prata", img: "img/pares_de_brincos.jpeg", descricao:"Prata 925" },
    { nome: "Piercing Ponto de Luz", preco: 29, categoria: "joia", sub: "prata", img: "img/piercing_nariz.jpeg", descricao:"Prata 925" },
    { nome: "Piercing Argola Cravejada", preco: 45, categoria: "joia", sub: "prata", img: "img/piercing_prta01.jpeg", descricao:"Prata 925, pedra de zircónia" },
    { nome: "Piercing Ramo Zircónias", preco: 49, categoria: "joia", sub: "prata", img: "img/piercing_tragus.jpeg", descricao:"Prata 925" },
    { nome: "Pulseira Borboleta ", preco: 99, categoria: "joia", sub: "prata", img: "img/pulseira.jpeg", descricao:"Prata 925" },



  /*  { nome: "Colar Folheado", preco: 80, categoria: "joia", sub: "folheado", img: "https://via.placeholder.com/200", descricao:"Joia folheada a ouro" },
    
    { nome: "Perfume Natura", preco: 120, categoria: "cosmetico", sub: "natura", img: "https://via.placeholder.com/200", descricao:"Joia folheada a ouro" },
    { nome: "Creme O Boticário", preco: 40, categoria: "cosmetico", sub: "oboticario", img: "https://via.placeholder.com/200", descricao:"Joia folheada a ouro" },
    { nome: "Eudora Deo Colônia", preco: 80, categoria: "cosmetico", sub: "eudora", img: "https://via.placeholder.com/200", descricao:"Joia folheada a ouro" },*/
];

function scrollProdutos() {
    document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
}

const lista = document.getElementById("lista-produtos");

function mostrarProdutos(listaProdutos) {
    lista.innerHTML = "";
    listaProdutos.forEach(produto => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${produto.img}">
            <h3>${produto.nome}</h3>
            <p class="descricao">${produto.descricao}</p>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <button>Adicionar ao carrinho</button>
        `;

        const btn = card.querySelector("button");
        btn.addEventListener("click", () => adicionarCarrinho(produto.nome, produto.preco));

        lista.appendChild(card);
    });
}


const navbarLinks = document.querySelectorAll(".navbar a");

navbarLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault(); // previne jump instantâneo

        const targetId = this.getAttribute("href").replace("#", "");

        // Se for o link do WhatsApp (contato)
        if (targetId === "contato") {
            const numero = "5571981049000"; // seu número
            const mensagem = "Olá! Gostaria de falar sobre os produtos.";
            window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`);
        } 
        // Se for Início (hash vazio)
        else if (!targetId) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } 
        // Se for outra seção (ex: Produtos)
        else {
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        }

        // Remove destaque de todos os links
        navbarLinks.forEach(l => l.classList.remove("highlight-link"));

        // Destaca o link clicado
        this.classList.add("highlight-link");
        setTimeout(() => this.classList.remove("highlight-link"), 1000);
    });
});




function filtrar(categoria) {
    let listaFiltrada = categoria === "todos" ? produtos : produtos.filter(p => p.categoria === categoria);
    mostrarProdutos(listaFiltrada);

    scrollParaSearch();

    setTimeout(() => {
        const cards = document.querySelectorAll("#lista-produtos .card");
        cards.forEach(card => {
            card.classList.add("highlight");
            setTimeout(() => card.classList.remove("highlight"), 1000);
        });
    }, 500);
}

function buscarProduto() {
    const texto = document
        .getElementById("busca")
        .value
        .toLowerCase();

    const filtrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(texto) ||
        produto.categoria.toLowerCase().includes(texto) ||
        produto.sub.toLowerCase().includes(texto) ||
        produto.descricao.toLowerCase().includes(texto)
    );

    mostrarProdutos(filtrados);
}

document.getElementById("busca")
.addEventListener("keydown", function(e){
    if (e.key === "Enter") {
        buscarProduto();
    }
});

const subFiltrosContainer = document.getElementById("sub-filtros");

function mostrarSubFiltros(categoria) {
    subFiltrosContainer.innerHTML = ""; // limpa

    let subFiltros = [];
    if (categoria === "joia") subFiltros = ["prata", "folheado"];
    if (categoria === "cosmetico") subFiltros = ["natura", "oboticario", "eudora"];

    subFiltros.forEach(sub => {
        const btn = document.createElement("button");
        btn.textContent = sub.charAt(0).toUpperCase() + sub.slice(1);
        btn.addEventListener("click", () => filtrarSubcategoria(categoria, sub));
        subFiltrosContainer.appendChild(btn);
    });
}

function filtrarSubcategoria(categoria, sub) {
    const filtrados = produtos.filter(p => p.categoria === categoria && p.sub === sub);
    mostrarProdutos(filtrados);

    // scroll pra seção de produtos
    document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });

    // destaque nos cards
    setTimeout(() => {
        const cards = document.querySelectorAll("#lista-produtos .card");
        cards.forEach(card => {
            card.classList.add("highlight");
            setTimeout(() => card.classList.remove("highlight"), 1000);
        });
    }, 500);
}

// Atualizar filtro principal pra mostrar sub-filtros
function filtrar(categoria) {
    mostrarSubFiltros(categoria); // mostra sub-filtros
    if (categoria === "todos") mostrarProdutos(produtos);
    else mostrarProdutos(produtos.filter(p => p.categoria === categoria));

    document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
}






function toggleCart() {
    const cartPanel = document.getElementById('cart-panel');
    cartPanel.classList.toggle('active');
}

let carrinho = [];

function adicionarCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
}

document.addEventListener("click", function(e) {
    const cartPanel = document.getElementById("cart-panel");
    const cartIcon = document.querySelector(".cart-icon");

    // se o clique não for no painel nem no ícone, fecha
    if (!cartPanel.contains(e.target) && !cartIcon.contains(e.target)) {
        cartPanel.classList.remove("active");
    }
});
function atualizarCarrinho() {
    const container = document.getElementById("cart-items");
    const contador = document.getElementById("cart-count");

    container.innerHTML = "";
    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        itemDiv.innerHTML = `
            <span>${item.nome}</span>
            <span>R$ ${item.preco.toFixed(2)}</span>
            <button class="remove-btn">✖</button>
        `;

        container.appendChild(itemDiv);

        const removeBtn = itemDiv.querySelector(".remove-btn");
        removeBtn.addEventListener("click", (e) => {
            e.stopPropagation();   // impede clique fora
            carrinho.splice(index, 1);
            atualizarCarrinho();
        });
    });

    contador.textContent = carrinho.length;

    // exibir total
    const totalDiv = document.createElement("div");
    totalDiv.id = "cart-total";
    totalDiv.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
    totalDiv.style.marginTop = "15px";
    totalDiv.style.textAlign = "right";
    container.appendChild(totalDiv);
}


function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Carrinho vazio!");
        return;
    }

    let mensagem = "Olá! Gostaria de comprar:%0A%0A";
    let total = 0;

    carrinho.forEach(item => {
        mensagem += `• ${item.nome} - R$ ${item.preco.toFixed(2)}%0A`;
        total += item.preco;
    });

    mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;
    const numero = "5571981049000"; 
    window.open(`https://wa.me/${numero}?text=${mensagem}`);
}

// IMPORTANTE: isso carrega os produtos ao abrir o site
mostrarProdutos(produtos);
