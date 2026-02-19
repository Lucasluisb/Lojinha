const produtos = [
    { nome: "Anel Prata", preco: 60, categoria: "joia", sub: "prata", img: "img/Anel_prata.jpeg" },
    { nome: "Anel Prata", preco: 60, categoria: "joia", sub: "prata", img: "img/anel_prata01.jpeg" },
    { nome: "Argolas", preco: 60, categoria: "joia", sub: "prata", img: "img/argolas.jpeg" },
    { nome: "Argolas", preco: 60, categoria: "joia", sub: "prata", img: "img/argola_01.jpeg" },
    { nome: "Brincos", preco: 60, categoria: "joia", sub: "prata", img: "img/brinco_prata01.jpeg" },
    { nome: "Brincos", preco: 60, categoria: "joia", sub: "prata", img: "img/brinco.jpeg" },
    { nome: "Colar", preco: 60, categoria: "joia", sub: "prata", img: "img/colar_prata.png" },
    { nome: "Colar", preco: 60, categoria: "joia", sub: "prata", img: "img/colar_prata02.jpeg" },
    { nome: "Colar", preco: 60, categoria: "joia", sub: "prata", img: "img/colar.jpeg" },
    { nome: "Colar", preco: 60, categoria: "joia", sub: "prata", img: "img/colar01.jpeg" },
    { nome: "Brincos Pares", preco: 60, categoria: "joia", sub: "prata", img: "img/pares_de_brincos.jpeg" },
    { nome: "Piercing Nariz", preco: 60, categoria: "joia", sub: "prata", img: "img/piercing_nariz.jpeg" },
    { nome: "Piercing", preco: 60, categoria: "joia", sub: "prata", img: "img/piercing_prata.jpeg" },
    { nome: "Piercing", preco: 60, categoria: "joia", sub: "prata", img: "img/piercing_prta01.jpeg" },
    { nome: "Piercing Tragus", preco: 60, categoria: "joia", sub: "prata", img: "img/piercing_tragus.jpeg" },
    { nome: "Pulseira", preco: 60, categoria: "joia", sub: "prata", img: "img/pulseira.jpeg" },





    { nome: "Colar Folheado", preco: 80, categoria: "joia", sub: "folheado", img: "https://via.placeholder.com/200" },
    
    { nome: "Perfume Natura", preco: 120, categoria: "cosmetico", sub: "natura", img: "https://via.placeholder.com/200" },
    { nome: "Creme O Boticário", preco: 40, categoria: "cosmetico", sub: "oboticario", img: "https://via.placeholder.com/200" },
    { nome: "Eudora Deo Colônia", preco: 80, categoria: "cosmetico", sub: "eudora", img: "https://via.placeholder.com/200" },
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
    const texto = document.getElementById("busca").value.toLowerCase();
    mostrarProdutos(produtos.filter(p => p.nome.toLowerCase().includes(texto)));

    scrollParaSearch();
}

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
