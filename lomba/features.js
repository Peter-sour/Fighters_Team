// Fungsi untuk memeriksa apakah elemen dalam viewport/area pandang
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
        rect.bottom >= 0
    );
}

// Fungsi untuk mengatur efek reveal
function checkElements() {
    const elements = document.querySelectorAll('.reveal-from-top');
    
    elements.forEach(element => {
        if (isInViewport(element)) {
            // Tambahkan class active jika elemen terlihat
            element.classList.add('active');
        } else {
            // Hapus class active jika elemen tidak terlihat
            element.classList.remove('active');
        }
    });
}

// Event listener untuk scroll
window.addEventListener('scroll', checkElements);

// Jalankan sekali saat halaman dimuat untuk elemen yang sudah terlihat
document.addEventListener('DOMContentLoaded', checkElements);