Saya membuat ini agar nantinya, ketika saya membutuhkan sistem otentikasi dengan teknologi yang sama, saya tidak perlu membuatnya dari awal.
 
Mengapa menggunakan EmailJS? 
Saya merasa bingung dan pusing tentang cara membuat template email custom dan mengirimkan kode verifikasi saat pengguna baru mendaftar. Untuk mengatasi hal ini, saya menemukan EmailJS sebagai solusi potensial. Namun, saya ingin memastikan apakah ini metode yang tepat dan efisien. Anda bisa berbagi informasi tentang cara mengirim kode verifikasi ke email pengguna yang baru mendaftar dengan metode lain yang lebih baik. Silakan hubungi saya kapanpun!


# How to use
1. Clone repositori ke mesin lokal Anda:
`git clone https://github.com/gettingdev/Auth-signup-signin-sytem-with-react-firebase-emailjs`

2. Pasang dependensi yang diperlukan (Saya juga menggunakan tailwind)
- Periksa `package-lock.json` atau `package.json`
   
4. Siapkan Firebase
- Buat proyek Firebase di [Firebase Console](https://console.firebase.google.com/)
- Dapatkan pengaturan konfigurasi Firebase untuk proyek Anda
- Ganti konfigurasi Firebase di `.env` dengan pengaturan Anda sendiri
- Aktifkan otentikasi Email/Kata Sandi di Firebase Console

4. Siapkan EmailJS
- Daftar di MailJS dan dapatkan kunci API Anda
- Ganti kunci API MailJS dan detail pengirim email di `.env` dengan milik Anda sendiri
- Selengkapnya tentang EmailJS 👉 https://www.emailjs.com/docs/

5. Mulai server pengembangan
- Saya mengguanakan vite, jadi saya dapat menjalankannya dengan `npm run dev`

Catatan: Jika Anda tidak menggunakan Vite, Anda mungkin perlu menyesuaikan cara mengakses file .env. Mohon periksa bagaimana cara mengaksesnya dalam lingkungan frontend Anda!

