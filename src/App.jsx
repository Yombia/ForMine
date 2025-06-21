import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");
  const [showHearts, setShowHearts] = useState(false);

  // Refs for smooth scrolling to sections
  const photosRef = useRef(null);
  const aboutRef = useRef(null);
  const appreciationRef = useRef(null);
  const notesRef = useRef(null);

  // Heart animation effect
  useEffect(() => {
    if (count > 0) {
      setShowHearts(true);
      const timer = setTimeout(() => setShowHearts(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  // Handle adding love notes
  const addNote = () => {
    if (noteInput.trim()) {
      setNotes([...notes, { id: Date.now(), text: noteInput }]);
      setNoteInput("");
    }
  };

  // Handle deleting love notes
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Smooth scroll to section
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center text-center font-sans relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-rose-300 to-purple-300 animate-gradient"></div>
        <div className="absolute inset-0 opacity-20 animate-twinkle">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-white/70 backdrop-blur-md z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
            My Love 💖
          </h1>
          <nav className="flex gap-4">
            <button
              onClick={() => scrollToSection(photosRef)}
              className="text-rose-600 hover:text-rose-800 transition"
            >
              Photos
            </button>
            <button
              onClick={() => scrollToSection(aboutRef)}
              className="text-rose-600 hover:text-rose-800 transition"
            >
              About You
            </button>
            <button
              onClick={() => scrollToSection(appreciationRef)}
              className="text-rose-600 hover:text-rose-800 transition"
            >
              Appreciation
            </button>
            <button
              onClick={() => scrollToSection(notesRef)}
              className="text-rose-600 hover:text-rose-800 transition"
            >
              Notes
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center z-10 w-full px-4 pt-20">
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-rose-700 animate-pulse mb-6">
          My Heart is Yours 💕
        </h1>
        <p className="text-3xl text-rose-800 mb-10 animate-fadeIn max-w-xl">
          A digital embrace crafted with love, just for you, my darling.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => scrollToSection(photosRef)}
            className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg text-lg"
          >
            Our Moments 📸
          </button>
          <button
            onClick={() => scrollToSection(aboutRef)}
            className="px-10 py-4 bg-gradient-to-r from-rose-500 to-purple-500 text-white rounded-full hover:from-rose-600 hover:to-purple-600 transition-all duration-300 shadow-lg text-lg"
          >
            About You 💞
          </button>
          <button
            onClick={() => scrollToSection(appreciationRef)}
            className="px-10 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg text-lg"
          >
            My Appreciation 🌹
          </button>
          <button
            onClick={() => scrollToSection(notesRef)}
            className="px-10 py-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-full hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 shadow-lg text-lg"
          >
            Love Notes 💌
          </button>
        </div>
      </section>

      {/* Photos Section */}
      <section ref={photosRef} className="py-16 w-full bg-white/80 backdrop-blur-sm z-10">
        <h2 className="text-5xl font-bold text-rose-600 mb-8 animate-fadeIn">
          Our Precious Moments 📸
        </h2>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
              "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
            ].map((src, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-xl shadow-lg group w-60 h-60"
              >
                <img
                  src={src}
                  alt={`Moment ${i + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-rose-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold">
                    Moment #{i + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About You Section */}
      <section ref={aboutRef} className="py-16 w-full bg-rose-50/80 backdrop-blur-sm z-10">
        <h2 className="text-5xl font-bold text-rose-600 mb-8 animate-fadeIn">
          About You, My Love 💞
        </h2>
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-gray-700 text-lg leading-relaxed mb-4 animate-fadeIn">
            Your presence turns every moment into magic. Your smile is my guiding star, and your love is my greatest treasure.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4 animate-fadeIn">
            I’m endlessly grateful for you—your warmth, your laughter, and the way you make my heart soar.
          </p>
          <button
            onClick={() => setCount(count + 1)}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-md mt-4"
          >
            Love Count: {count}
          </button>
        </div>
      </section>

      {/* Appreciation Section */}
      <section ref={appreciationRef} className="py-16 w-full bg-purple-50/80 backdrop-blur-sm z-10">
        <h2 className="text-5xl font-bold text-rose-600 mb-8 animate-fadeIn">
          Words of Appreciation 🌹
        </h2>
        <div className="max-w-4xl mx-auto px-4 grid gap-6">
          {[
            "You make every day brighter with your endless kindness.",
            "Thank you for being my rock and my joy in every moment.",
            "Your love transforms the ordinary into something extraordinary.",
          ].map((quote, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl shadow-lg animate-fadeIn"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <p className="text-gray-700 text-lg italic">"{quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Love Notes Section */}
      <section ref={notesRef} className="py-16 w-full bg-white/80 backdrop-blur-sm z-10">
        <h2 className="text-5xl font-bold text-rose-600 mb-8 animate-fadeIn">
          Love Notes 💌
        </h2>
        <div className="max-w-lg mx-auto px-4">
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            Pour your heart out here, my love.
          </p>
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Write something sweet..."
              className="flex-1 p-3 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
            <button
              onClick={addNote}
              className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition"
            >
              Add
            </button>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {notes.map((note) => (
              <div
                key={note.id}
                className="flex justify-between items-center p-3 bg-rose-50 rounded-lg mb-2 animate-fadeIn"
              >
                <p className="text-gray-700">{note.text}</p>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-rose-500 hover:text-rose-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heart Particle Animation */}
      {showHearts && (
        <div className="fixed inset-0 pointer-events-none z-20">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float text-rose-500 text-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            >
              💖
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 w-full bg-white/70 backdrop-blur-md z-10">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-rose-700 text-lg mb-4">
            Made with endless love for you, my forever.
          </p>
          <p className="text-rose-600 text-sm">
            © {new Date().getFullYear()} With all my heart, from Yombia 💕
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;