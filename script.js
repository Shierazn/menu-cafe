// AMBIL ELEMEN DARI HTML
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

// ==========================================
// 1. FITUR PENCARIAN MENU (SEARCH BAR)
// ==========================================
searchInput.addEventListener('input', function (e) {
    // Ambil teks yang diketik pengguna dan ubah menjadi huruf kecil (agar tidak case-sensitive)
    const keyword = e.target.value.toLowerCase();

    menuCards.forEach(card => {
        // Ambil nama menu dari elemen h3 di dalam kartu
        const title = card.querySelector('h3').textContent.toLowerCase();
        
        // Cek apakah nama menu mengandung kata yang diketik pengguna
        if (title.includes(keyword)) {
            card.style.display = 'flex'; // Tampilkan kartu jika cocok
        } else {
            card.style.display = 'none'; // Sembunyikan jika tidak cocok
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

        // Ambil kategori dari atribut data-category tombol
        const selectedCategory = this.getAttribute('data-category');

        menuCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            // Jika tombol 'Semua' diklik atau kategori kartu cocok dengan tombol
            if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                card.style.display = 'flex'; // Tampilkan kartu
            } else {
                card.style.display = 'none'; // Sembunyikan kartu
            }
        });

        // Reset kotak pencarian saat tombol kategori diklik (opsional, agar lebih bersih)
        searchInput.value = '';
    });
});

// ==========================================
// 3. INTERAKSI TOMBOL PESAN (ORDER)
// ==========================================
const orderBtns = document.querySelectorAll('.order-btn');

orderBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        // Ambil nama menu dari kartu terdekat
        const menuName = this.parentElement.querySelector('h3').textContent;
        
        // Tampilkan pesan konfirmasi sederhana
        alert(`Kamu memilih: ${menuName}. Silakan panggil pelayan atau lanjutkan pesanan ke kasir!`);
    });
});
