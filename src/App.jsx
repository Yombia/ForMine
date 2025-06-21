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
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200 animate-gradient"></div>
        <div className="absolute inset-0 opacity-20 animate-twinkle">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <header className="min-h-screen flex flex-col items-center justify-center z-10 w-full px-4">
        <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 animate-pulse mb-6">
          To My Dearest 💖
        </h1>
        <p className="text-2xl text-rose-700 mb-8 animate-fadeIn max-w-lg">
          A digital love letter filled with my heart, just for you.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => scrollToSection(photosRef)}
            className="px-8 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all duration-300 shadow-lg"
          >
            Our Moments 📸
          </button>
          <button
            onClick={() => scrollToSection(aboutRef)}
            className="px-8 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-all duration-300 shadow-lg"
          >
            About You 💞
          </button>
          <button
            onClick={() => scrollToSection(appreciationRef)}
            className="px-8 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all duration-300 shadow-lg"
          >
            My Appreciation 🌹
          </button>
          <button
            onClick={() => scrollToSection(notesRef)}
            className="px-8 py-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-all duration-300 shadow-lg"
          >
            Love Notes 💌
          </button>
        </div>
      </header>

      {/* Photos Section */}
      <section ref={photosRef} className="py-16 w-full bg-white/80 backdrop-blur-sm z-10">
        <h2 className="text-5xl font-bold text-rose-600 mb-8 animate-fadeIn">
          Our Cherished Moments 📸
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {[
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
          ].map((src, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-xl shadow-lg group"
            >
              <img
                src={src}
                alt={`Moment ${i + 1}`}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-semibold">
                  Moment #{i + 1}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About You Section */}
      <section ref={aboutRef} className="py-16 w-full bg-rose-50/80 backdrop-blur-sm z-10">
        <h2 className="text-5xl font-bold text-rose-600 mb-8 animate-fadeIn">
          About You, My Love 💞
        </h2>
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-gray-700 text-lg leading-relaxed mb-4 animate-fadeIn">
            You light up my world in ways I never thought possible. Your smile is my sunrise, and your laughter is my favorite song.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4 animate-fadeIn">
            Every moment with you feels like a gift, and I’m endlessly grateful for your love, kindness, and the way you make everything better.
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
            "Thank you for being my safe haven and my greatest adventure.",
            "Your kindness inspires me to be a better person every day.",
            "With you, every ordinary moment becomes extraordinary.",
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
            Write down your thoughts, and let’s fill this space with love.
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

      <footer className="py-8 text-sm text-rose-700 animate-fadeIn z-10">
        © {new Date().getFullYear()} With all my love, from Yombia 💕
      </footer>
    </div>
  );
}

export default App;