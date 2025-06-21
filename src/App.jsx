import React from 'react';
import './index.css';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-300 text-gray-800">
      {/* Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-pink-600">Untukmu ❤️</h1>
          <ul className="flex gap-6 font-medium">
            <li><a href="#home" className="hover:text-pink-500 transition">Beranda</a></li>
            <li><a href="#story" className="hover:text-pink-500 transition">Cerita Kita</a></li>
            <li><a href="#gallery" className="hover:text-pink-500 transition">Galeri</a></li>
            <li><a href="#message" className="hover:text-pink-500 transition">Pesan</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="text-center py-20 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-pink-700 mb-4">Hai Sayang 💕</h2>
        <p className="text-lg md:text-xl max-w-xl mx-auto">Website ini aku buat khusus untuk kamu. Tempat kecil untuk menampung rasa sayangku yang besar.</p>
        <div className="mt-8">
          <img src="https://source.unsplash.com/500x300/?romantic,couple" alt="romantic" className="rounded-2xl shadow-md mx-auto" />
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-semibold text-pink-600 mb-6">Cerita Kita</h3>
          <p className="text-lg leading-relaxed">
            Kita bertemu di waktu yang tidak terduga, tapi sejak saat itu semua berubah. Hari-hariku jadi lebih berwarna karena kehadiranmu. Aku ingin terus menulis cerita denganmu, hari demi hari.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-semibold text-center text-pink-600 mb-10">Galeri Kenangan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['love', 'couple', 'valentine'].map((tag, index) => (
              <img
                key={index}
                src={`https://source.unsplash.com/400x300/?${tag}`}
                alt={tag}
                className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section id="message" className="bg-pink-200 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-semibold text-pink-700 mb-6">Pesan Cinta 💌</h3>
          <p className="text-lg">
            Terima kasih sudah selalu hadir, mendengarkan, dan menjadi tempat ternyaman. Aku harap website ini bisa jadi pengingat kecil bahwa kamu sangat berarti buatku.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pink-300 py-6 text-center text-white">
        <p>Dengan penuh cinta, dibuat oleh Yosia 💗</p>
      </footer>
    </div>
  );
}
