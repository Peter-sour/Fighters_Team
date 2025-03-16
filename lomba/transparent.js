// Fungsi untuk mengubah tampilan background header berdasarkan scroll
function updateHeaderBackground() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        // Jika scroll lebih dari 50px, gunakan latar belakang normal
        header.classList.remove('transparent');
        header.classList.add('normal');
    } else {
        // Jika scroll kurang dari 50px, gunakan latar belakang transparan
        header.classList.remove('normal');
        header.classList.add('transparent');
    }
}

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    updateHeaderBackground(); // Set kondisi awal header
    
    // Panggil fungsi saat scroll
    window.addEventListener('scroll', updateHeaderBackground);
});