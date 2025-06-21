import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");
  const [showHearts, setShowHearts] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 flex flex-col items-center justify-center text-center font-sans relative overflow-hidden">
      {/* Heart Particle Animation */}
      {showHearts && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float text-pink-500 text-2xl"
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

      <header className="mb-10 mt-8">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 animate-pulse">
          For My Sweetheart 💕
        </h1>
        <p className="mt-3 text-xl text-rose-700 animate-fadeIn">
          A digital love letter crafted just for you
        </p>
      </header>

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-[90%] max-w-lg transform transition-all hover:scale-105">
        <img
          src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
          alt="For you"
          className="rounded-xl shadow-lg mb-6 w-full h-64 object-cover"
        />
        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
          This little corner of the internet was made with 💖 using React, Vite, and Tailwind CSS. Every pixel is a piece of my heart for you. 😊
        </p>
        <button
          onClick={() => setCount(count + 1)}
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-md"
        >
          Love Count: {count}
        </button>

        {/* Love Note Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-rose-600 mb-4">
            Write a Love Note 💌
          </h2>
          <div className="flex gap-2 mb-4">
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
          <div className="max-h-40 overflow-y-auto">
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
      </div>

      <footer className="mt-12 mb-8 text-sm text-rose-700 animate-fadeIn">
        © {new Date().getFullYear()} With all my love, from Yombia 💞
      </footer>
    </div>
  );
}

export default App;