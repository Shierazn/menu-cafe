// AMBIL ELEMEN DARI HTML
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

// ==========================================
// 1. FITUR PENCARIAN MENU (SEARCH BAR)
// ==========================================
searchInput.addEventListener('input', function (e) {
    const keyword = e.target.value.toLowerCase();

    menuCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        
        if (title.includes(keyword)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

// ==========================================
// 2. FITUR FILTER KATEGORI (MAKANAN / MINUMAN)
// ==========================================
filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        // Hapus kelas 'active' dari semua tombol
        filterBtns.forEach(b => b.classList.remove('active'));
        // Tambahkan kelas 'active' ke tombol yang sedang diklik
        this.classList.add('active');

        const selectedCategory = this.getAttribute('data-category');

        menuCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });

        // Reset kotak pencarian saat kategori diklik
        searchInput.value = '';
    });
});

// ==========================================
// 3. FITUR KERANJANG DAN TOTAL PESANAN OTOMATIS
// ==========================================
let cart = [];

const cartItemsList = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('totalPrice');
const orderBtns = document.querySelectorAll('.order-btn');

orderBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        // Ambil elemen kartu menu terdekat
        const card = this.closest('.menu-card');
        const name = card.querySelector('h3').textContent;
        const priceText = card.querySelector('.price').textContent;
        
        // Ubah teks harga (misal: "Rp 35.000") menjadi angka (35000)
        const price = parseInt(priceText.replace('Rp ', '').replace('.', ''));

        // Masukkan item ke dalam array keranjang
        cart.push({ name, price });

        // Perbarui tampilan daftar pesanan dan total harga
        updateCartDisplay();
    });
});

function updateCartDisplay() {
    // Kosongkan daftar keranjang di HTML
    cartItemsList.innerHTML = '';

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li class="empty-cart">Belum ada pesanan</li>';
        totalPriceElement.textContent = 'Rp 0';
        return;
    }

    let total = 0;

    // Loop data di dalam keranjang
    cart.forEach((item) => {
        total += item.price;

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name}</span>
            <span>Rp ${item.price.toLocaleString('id-ID')}</span>
        `;
        cartItemsList.appendChild(li);
    });

    // Tampilkan total harga dengan format Rupiah
    totalPriceElement.textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

// ==========================================
// 4. KIRIM PESANAN KE WHATSAPP
// ==========================================
const checkoutBtn = document.getElementById('checkoutBtn');

checkoutBtn.addEventListener('click', function () {
    if (cart.length === 0) {
        alert('Keranjang masih kosong, silakan pilih menu terlebih dahulu!');
        return;
    }

    // Susun format teks pesan untuk WhatsApp
    let message = 'Halo Kak, saya ingin memesan menu berikut:\n\n';
    let total = 0;

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - Rp ${item.price.toLocaleString('id-ID')}\n`;
        total += item.price;
    });

    message += `\n*Total Keseluruhan: Rp ${total.toLocaleString('id-ID')}*`;
    message += `\n\nTerima kasih!`;

    // Ubah teks menjadi format URL WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '6281234567890'; // Ganti dengan nomor WhatsApp kasir kafe kamu
    
    // Buka aplikasi WhatsApp secara otomatis
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
});
