// STARE APLICAȚIE
let cart = [];

// NAVIGARE ÎNTRE PAGINI
function showPage(pageId) {
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

// MANAGEMENT COȘ DE CUMPĂRĂTURI
function toggleCart(isOpen) {
    document.getElementById('cart-drawer').classList.toggle('open', isOpen);
    document.getElementById('cart-overlay').classList.toggle('active', isOpen);
    if (isOpen) renderCart();
}

function addToCart(name, price) {
    let item = cart.find(i => i.name === name);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartUI();
    toggleCart(true);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    renderCart();
}

function updateCartUI() {
    const count = cart.reduce((s, i) => s + i.quantity, 0);
    const total = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
    
    document.getElementById('cart-count').innerText = count;
    document.getElementById('cart-total').innerText = `${total} RON`;
}

function renderCart() {
    const container = document.getElementById('cart-items');
    if (cart.length === 0) {
        container.innerHTML = '<p class="text-xs uppercase opacity-40 text-center mt-20">Coșul este gol</p>';
        return;
    }
    
    container.innerHTML = cart.map((item, index) => `
        <div class="flex justify-between items-start border-b border-custom pb-4">
            <div class="uppercase">
                <h4 class="font-bold text-sm">${item.name}</h4>
                <p class="text-[10px] opacity-60">Cantitate: ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${index})" class="text-[10px] border-b border-black">Șterge</button>
        </div>
    `).join('');
}

// PROCESARE COMANDĂ ȘI MODALURI
function checkout() {
    if (cart.length === 0) return;
    const content = document.getElementById('modal-content');
    content.innerHTML = `
        <h3 class="text-xl font-bold mb-4">Comandă Trimisă!</h3>
        <p class="text-[10px] mb-8">Mulțumim că susții brutăriile artizanale.</p>
        <button onclick="clearAndClose()" class="btn-modern">Gata</button>
    `;
    document.getElementById('modal').style.display = 'flex';
}

function viewRecipe(id) {
    const content = document.getElementById('modal-content');
    let text = "";
    
    switch(id) {
        case 'Maia':
            text = "Maiaua necesită hrănire zilnică cu făină tip 00. Păstrează temperatura constantă la 26 grade.";
            break;
        case 'Cozonac Sirop':
            text = "Fierbe siropul cu vanilie și toarnă-l peste cozonacul fierbinte imediat după ce l-ai scos din cuptor.";
            break;
        case 'Glazura':
            text = "Amestecă migdalele măcinate cu albuș și amidon până obții o pastă densă.";
            break;
        default:
            text = "Detalii rețetă în curs de actualizare.";
    }
    
    content.innerHTML = `
        <h3 class="text-xl font-bold mb-4">${id}</h3>
        <p class="text-xs leading-loose mb-8">${text}</p>
        <button onclick="closeModal()" class="btn-modern">Închide</button>
    `;
    document.getElementById('modal').style.display = 'flex';
}

function clearAndClose() {
    cart = [];
    updateCartUI();
    closeModal();
    toggleCart(false);
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}
