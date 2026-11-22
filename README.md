# Adinda in Pink

Galeri web serba pink untuk tiga edit video Adinda.

## Isi folder

- `index.html`: halaman utama (pembuka amplop, galeri foto, catatan, dan tiga video)
- `videos/`: tiga file video (.mp4), masing-masing di bawah 25 MB
- `img/`: foto dan gambar sampul video

## Cara deploy ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `adinda-pink`.
2. Unggah **isi** folder ini (bukan foldernya) ke repository: `index.html`, `README.md`, folder `img`, dan folder `videos`.
3. Buka **Settings → Pages**, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu **Save**.
4. Tunggu 1–2 menit. Alamat webnya akan muncul di halaman yang sama, misalnya `https://namakamu.github.io/adinda-pink/`.

## Catatan

- Tombol **Suka** tersimpan di browser masing-masing pengunjung. Jumlah suka tidak dibagikan antar pengunjung, karena GitHub Pages tidak punya server untuk menyimpannya.
- Tombol **Unduh** langsung menyimpan file video dari folder `videos/`.
- Untuk menambah video, taruh file .mp4 di `videos/` dan sampulnya di `img/`, lalu tambahkan satu entri di daftar `films` pada bagian script di `index.html`.
