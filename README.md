# Jadual Guru Bertugas — SK Bandar Seri Alam

Antaramuka GitHub Pages untuk ketua kumpulan dan ADMIN. Rekod guru, jadual waktu, sejarah dan PDF kekal dalam Google Sheets / Drive milik pemilik Apps Script. Repository ini tidak mengandungi kod log masuk atau data jadual guru.

## Pengaktifan oleh pemilik

1. Pasang `Code.gs` versi GitHub dan tambah fail HTML bernama `Bridge` dalam projek Apps Script yang sama.
2. Kekalkan fail `Index.html` Apps Script sedia ada. Jangan padam Script Properties atau Google Sheets.
3. Simpan dan pilih **Deploy → Manage deployments → Edit → New version → Deploy**. Gunakan deployment yang sama.
4. Dalam repository ini, buka **Settings → Pages → Deploy from a branch → main → /(root) → Save**.
5. Buka laman GitHub Pages. Jika sambungan Google belum tersedia, tekan **Sambung Google**, lengkapkan log masuk Google dalam tetingkap yang dibuka dan kembali ke laman jadual. Biarkan tetingkap sambungan terbuka.

Fail backend dibekalkan secara berasingan kepada pemilik; jangan muat naik fail backend yang mengandungi senarai guru ke repository awam.

## Batas akses Google

Penerbitan melalui GitHub tidak mengubah kebenaran Apps Script. Deployment domain MOE masih memerlukan akaun yang dibenarkan. Pelayar yang menyekat iframe, popup atau sesi Google mungkin memerlukan sambungan melalui tetingkap berasingan atau pautan **Buka terus aplikasi Google**.

Sambungan menggunakan saluran `postMessage` dengan semakan asal, sumber tetingkap dan ID sesi rawak. Tiada kata laluan dihantar dalam URL atau disimpan dalam kod. Sesi log masuk aplikasi disimpan dalam memori tab.

## Fail utama

- `index.html`, `app.js`: antaramuka dan peraturan jadual.
- `transport.js`: sambungan ke Apps Script.
- `school-logo.png`: logo sekolah.
- `pdf.min.js`, `pdf.worker.min.js`: PDF.js 3.11.174.
- `jspdf.umd.min.js`: jsPDF 2.5.1.

Notis lesen pustaka dikekalkan dalam fail asal. Tetapan penerbitan laman tidak menyegerakkan kod backend Apps Script; kemas kini backend perlu dibuat dalam editor Apps Script.
