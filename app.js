// Ganti URL ini dengan URL Web App Apps Script yang Anda salin di Langkah 1
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxqBeYhzDBycBodm8E8bc7IdtdLBtH877XcG2Zvxp8SppFPxq0hxxC2X83TnWuD94hV/exec';

document.getElementById('transaksiForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Mencegah reload halaman

    const btnSimpan = document.getElementById('btnSimpan');
    const statusMsg = document.getElementById('statusMsg');

    // Ambil nilai dari form UI[cite: 6]
    const payload = {
        kategori: document.getElementById('kategori').value,
        jumlah: document.getElementById('jumlah').value,
        tanggal: document.getElementById('tanggal').value,
        keterangan: document.getElementById('keterangan').value
    };

    // Ubah status tombol saat loading
    btnSimpan.innerText = 'Menyimpan...';
    btnSimpan.disabled = true;
    btnSimpan.classList.add('opacity-50');

    try {
        // Kirim data ke Google Sheets menggunakan fetch API
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(payload) // Data dikirim dalam format JSON
        });

        const result = await response.json();

        if(result.status === 'success') {
            statusMsg.innerText = '✅ ' + result.message;
            statusMsg.classList.remove('hidden', 'text-red-600');
            statusMsg.classList.add('text-green-600');
            this.reset(); // Kosongkan form setelah berhasil
        }
    } catch (error) {
        statusMsg.innerText = '❌ Gagal menyimpan data.';
        statusMsg.classList.remove('hidden', 'text-green-600');
        statusMsg.classList.add('text-red-600');
    } finally {
        // Kembalikan status tombol
        btnSimpan.innerText = 'Simpan Transaksi';
        btnSimpan.disabled = false;
        btnSimpan.classList.remove('opacity-50');
    }
});