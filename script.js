// ==========================================
// 1. FUNGSI UNTUK PINDAH HALAMAN (Navigasi)
// ==========================================
let currentPage = 1;

function nextPage() {
    // Ambil halaman yang aktif sekarang
    const currentEl = document.getElementById(`page${currentPage}`);
    
    // Naikkan nomor halaman
    currentPage++;
    
    // Ambil halaman berikutnya
    const nextEl = document.getElementById(`page${currentPage}`);

    if (currentEl && nextEl) {
        // Hilangkan efek aktif di halaman lama
        currentEl.classList.remove('active');
        
        // Tambahkan efek aktif di halaman baru setelah sedikit delay agar smooth
        setTimeout(() => {
            nextEl.classList.add('active');
            window.scrollTo(0, 0); // Reset scroll layar kembali ke atas
        }, 300);
    }
}
// Fungsi untuk pindah dari Halaman 1 ke Halaman 2 sekaligus mematikan musiknya
function moveToPage2() {
    // 1. Ambil elemen musik halaman 1 dan matikan otomatis
    const firstMusic = document.getElementById('musicPage1');
    if (firstMusic) {
        firstMusic.pause();
        firstMusic.currentTime = 0; // Mengembalikan durasi lagu ke awal (0:00)
    }

    // 2. Logika perpindahan class active halaman (HTML)
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');

    if (page1 && page2) {
        page1.classList.remove('active'); // Sembunyikan halaman 1
        page2.classList.add('active');    // Tampilkan halaman 2
    }

    // 3. Opsional: Putar musik untuk halaman 2 jika ada
    const secondMusic = document.getElementById('musicPage2');
    if (secondMusic) {
        secondMusic.play().catch(err => console.log("Gagal memutar musik halaman 2:", err));
    }

    // Reset posisi scroll ke atas layar
    window.scrollTo(0, 0);
}

// ==========================================
// 2. TRIGGER MUSIK DI HALAMAN PERTAMA (Klik Layar)
// ==========================================
window.addEventListener('click', () => {
    const firstMusic = document.getElementById('musicPage1');
    const petunjuk = document.querySelector('.petunjuk-musik');
    
    // Hanya putar jika kita masih berada di halaman 1
    if (document.getElementById('page1').classList.contains('active') && firstMusic) {
        firstMusic.play()
            .then(() => {
                console.log("Musik halaman 1 berhasil diputar!");
                // Hilangkan teks petunjuk klik setelah musik jalan
                if (petunjuk) {
                    petunjuk.style.display = 'none';
                }
            })
            .catch(err => console.log("Gagal memutar musik:", err));
    }
}, { once: true }); // { once: true } memastikan fungsi klik ini hanya jalan 1 kali saja


// ==========================================
// 3. VALIDASI TANGGAL KUNCI DI HALAMAN KEDUA
// ==========================================
// Kode ini otomatis berjalan saat struktur web sudah siap di browser
document.addEventListener("DOMContentLoaded", () => {
    const inputTanggal = document.getElementById('tanggalKunci');
    const btnLanjut = document.getElementById('btnLanjutPage3');
    const pesanSalah = document.getElementById('pesanSalah');

    if (inputTanggal) {
        inputTanggal.addEventListener('change', () => {
            const tanggalDipilih = inputTanggal.value; // Format default HTML: YYYY-MM-DD
            
            // Cek apakah tanggal yang dimasukkan tepat 30 Juni 2006
            if (tanggalDipilih === '2005-06-30') {
                // Jika BENAR: Munculkan tombol lanjut, sembunyikan pesan error
                btnLanjut.style.display = 'inline-block';
                pesanSalah.style.display = 'none';
            } else {
                // Jika SALAH dan kolom tidak kosong: Sembunyikan tombol, munculkan pesan error
                if (tanggalDipilih !== '') {
                    btnLanjut.style.display = 'none';
                    pesanSalah.style.display = 'block';
                } else {
                    // Jika user mengosongkan kembali inputnya
                    btnLanjut.style.display = 'none';
                    pesanSalah.style.display = 'none';
                }
            }
        });
    }
});