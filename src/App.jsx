import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");
  const [showHearts, setShowHearts] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showLoveLetter, setShowLoveLetter] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef(null);

  // Refs for smooth scrolling to sections
  const photosRef = useRef(null);
  const aboutRef = useRef(null);
  const appreciationRef = useRef(null);
  const notesRef = useRef(null);
  const memoriesRef = useRef(null);

  // Love quotes for the typing effect
  const loveQuotes = [
    "Every moment with you is a treasure I hold dear...",
    "Your love is the melody that plays in my heart...",
    "In your eyes, I found my home, my peace, my everything...",
    "You are my today and all of my tomorrows...",
    "Loving you is the best thing that ever happened to me..."
  ];

  // Photo gallery with romantic captions
  const photos = [
    {
      url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
      caption: "The day my heart found its home"
    },
    {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      caption: "Our laughter echoes in my soul"
    },
    {
      url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
      caption: "Forever isn't long enough with you"
    },
    {
      url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2",
      caption: "Your hand in mine feels like destiny"
    },
    {
      url: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00",
      caption: "Every sunset is more beautiful with you"
    }
  ];

  // Heart animation effect
  useEffect(() => {
    if (count > 0) {
      setShowHearts(true);
      const timer = setTimeout(() => setShowHearts(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  // Typing effect for romantic text
  useEffect(() => {
    if (!showLoveLetter) return;

    const currentQuote = loveQuotes[typingIndex % loveQuotes.length];
    
    if (typedText.length < currentQuote.length) {
      const timeout = setTimeout(() => {
        setTypedText(currentQuote.substring(0, typedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTypedText("");
        setTypingIndex(typingIndex + 1);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [typedText, showLoveLetter, typingIndex]);

  // Auto-rotate photos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle adding love notes
  const addNote = () => {
    if (noteInput.trim()) {
      setNotes([{ id: Date.now(), text: noteInput, date: new Date().toLocaleString() }, ...notes]);
      setNoteInput("");
      // Show hearts when adding a note
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 2000);
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

  // Toggle romantic music
  const toggleMusic = () => {
    if (isPlayingMusic) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlayingMusic(!isPlayingMusic);
  };

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center text-center font-sans relative overflow-hidden">
      {/* Hidden audio element for romantic music */}
      <audio ref={audioRef} loop>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating petals background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 opacity-70"
            style={{
              fontSize: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          >
            ❀
          </div>
        ))}
      </div>

      {/* Twinkling stars */}
      <div className="fixed inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              opacity: Math.random() * 0.8 + 0.2
            }}
          ></div>
        ))}
      </div>

      {/* Header with romantic glow */}
      <header className="fixed top-0 w-full bg-white/70 backdrop-blur-md z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 animate-glow">
            My Eternal Love 💖
          </h1>
          <nav className="flex gap-4">
            <button
              onClick={() => scrollToSection(photosRef)}
              className="text-rose-600 hover:text-rose-800 transition hover:scale-105"
            >
              Our Gallery
            </button>
            <button
              onClick={() => scrollToSection(aboutRef)}
              className="text-rose-600 hover:text-rose-800 transition hover:scale-105"
            >
              My Beloved
            </button>
            <button
              onClick={() => scrollToSection(memoriesRef)}
              className="text-rose-600 hover:text-rose-800 transition hover:scale-105"
            >
              Memories
            </button>
            <button
              onClick={() => scrollToSection(appreciationRef)}
              className="text-rose-600 hover:text-rose-800 transition hover:scale-105"
            >
              My Heart
            </button>
            <button
              onClick={() => scrollToSection(notesRef)}
              className="text-rose-600 hover:text-rose-800 transition hover:scale-105"
            >
              Love Letters
            </button>
            <button
              onClick={toggleMusic}
              className={`p-2 rounded-full ${isPlayingMusic ? 'bg-rose-100 text-rose-700' : 'bg-pink-100 text-pink-700'}`}
            >
              {isPlayingMusic ? '♫ Pause' : '♫ Play'}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section with romantic typing effect */}
      <section className="min-h-screen flex flex-col items-center justify-center z-10 w-full px-4 pt-20">
        <div className="relative">
          <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-rose-700 animate-pulse mb-6">
            My Heart Belongs to You 💕
          </h1>
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent"></div>
        </div>
        
        <div className="h-16 mb-10 flex items-center justify-center">
          <p className="text-3xl text-rose-800 max-w-xl">
            {typedText}
            <span className="animate-blink">|</span>
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => scrollToSection(photosRef)}
            className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg transform hover:scale-105"
          >
            Our Love Story 📖
          </button>
          <button
            onClick={() => setShowLoveLetter(!showLoveLetter)}
            className="px-10 py-4 bg-gradient-to-r from-rose-500 to-purple-500 text-white rounded-full hover:from-rose-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg transform hover:scale-105"
          >
            {showLoveLetter ? 'Hide Love Letter' : 'Read My Heart 💌'}
          </button>
          <button
            onClick={() => scrollToSection(notesRef)}
            className="px-10 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg transform hover:scale-105"
          >
            Write to Me ✍️
          </button>
        </div>
        
        {/* Animated love letter that folds out */}
        {showLoveLetter && (
          <div className="mt-12 w-full max-w-2xl bg-rose-50 rounded-lg shadow-xl overflow-hidden transform transition-all duration-500 animate-fadeIn">
            <div className="p-6 bg-gradient-to-b from-rose-100 to-pink-100 border-b border-rose-200">
              <h3 className="text-2xl font-serif text-rose-800">My Dearest Love,</h3>
            </div>
            <div className="p-6">
              <p className="text-lg text-rose-900 font-serif leading-relaxed mb-4">
                From the moment our souls touched, I knew my life would never be the same. 
                Your love has transformed my world into a place of beauty and meaning.
              </p>
              <p className="text-lg text-rose-900 font-serif leading-relaxed mb-4">
                Each day with you is a gift I cherish. Your smile lights up my darkest moments, 
                and your embrace feels like coming home. I fall in love with you more with every sunrise.
              </p>
              <p className="text-lg text-rose-900 font-serif leading-relaxed">
                Forever yours,<br />
                <span className="text-xl font-bold text-rose-700">Yombia</span>
              </p>
            </div>
            <div className="p-4 bg-rose-50 border-t border-rose-200 text-right">
              <button 
                onClick={() => setShowLoveLetter(false)}
                className="text-rose-600 hover:text-rose-800"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Photos Section with romantic carousel */}
      <section ref={photosRef} className="py-20 w-full bg-white/90 backdrop-blur-sm z-10 relative">
        <div className="absolute inset-0 bg-pink-50 opacity-20 pointer-events-none"></div>
        <h2 className="text-5xl font-bold text-rose-600 mb-12 animate-fadeIn relative">
          <span className="relative inline-block">
            Our Eternal Moments
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent"></span>
          </span>
        </h2>
        
        <div className="max-w-5xl mx-auto px-4 relative">
          {/* Main featured photo */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl h-96 mb-8 group">
            <img
              src={photos[currentPhotoIndex].url}
              alt={`Moment ${currentPhotoIndex + 1}`}
              className="w-full h-full object-cover transform transition-all duration-1000 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <p className="text-white text-2xl font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {photos[currentPhotoIndex].caption}
              </p>
            </div>
          </div>
          
          {/* Thumbnail navigation */}
          <div className="flex justify-center gap-4">
            {photos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setCurrentPhotoIndex(i)}
                className={`w-16 h-16 rounded-lg overflow-hidden shadow-md transition-all duration-300 ${currentPhotoIndex === i ? 'ring-4 ring-rose-400 transform scale-110' : 'opacity-70 hover:opacity-100'}`}
              >
                <img
                  src={photo.url}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* About You Section with interactive love counter */}
      <section ref={aboutRef} className="py-20 w-full bg-rose-50/90 backdrop-blur-sm z-10 relative">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-rose-600 mb-12 animate-fadeIn relative">
            <span className="relative inline-block">
              The Essence of You
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent"></span>
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <p className="text-gray-700 text-lg leading-relaxed mb-6 animate-fadeIn">
                Your eyes hold galaxies I could spend lifetimes exploring, and your smile is the sunrise that brightens my every day.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6 animate-fadeIn">
                The way you laugh, the way you care, the way you love - every detail of you is etched into my heart forever.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6 animate-fadeIn">
                In a world of billions, you're my one in infinity, the missing piece that makes my soul complete.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="relative w-64 h-64 bg-white rounded-full shadow-xl flex items-center justify-center mb-8 border-8 border-rose-100">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-200 to-rose-200 opacity-30 animate-pulse"></div>
                <div className="text-6xl text-rose-600 animate-beat">❤️</div>
                <div className="absolute bottom-0 bg-white px-6 py-2 rounded-full shadow-md border border-rose-100">
                  <span className="text-rose-700 font-bold">I Love You</span>
                </div>
              </div>
              
              <button
                onClick={() => setCount(count + 1)}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10">Click to Love Me More: {count}</span>
                <span className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Memories Timeline Section */}
      <section ref={memoriesRef} className="py-20 w-full bg-white/90 backdrop-blur-sm z-10">
        <h2 className="text-5xl font-bold text-rose-600 mb-12 animate-fadeIn relative">
          <span className="relative inline-block">
            Our Journey Together
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent"></span>
          </span>
        </h2>
        
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 h-full w-1 bg-gradient-to-b from-pink-300 to-rose-300 transform -translate-x-1/2"></div>
            
            {/* Timeline items */}
            {[
              { date: "The First Glance", description: "When our eyes met and time stood still", icon: "👀" },
              { date: "First Date", description: "Nervous laughter and stolen glances", icon: "🍽️" },
              { date: "First Kiss", description: "The moment fireworks became real", icon: "💋" },
              { date: "Our First Trip", description: "Adventures that bonded us forever", icon: "✈️" },
              { date: "Today", description: "Every day with you is a new blessing", icon: "❤️" }
            ].map((item, i) => (
              <div key={i} className={`mb-12 w-full ${i % 2 === 0 ? 'pr-12 pl-0 text-right' : 'pl-12 pr-0 text-left'}`}>
                <div className={`p-6 bg-white rounded-xl shadow-lg border border-rose-100 relative ${i % 2 === 0 ? 'mr-auto' : 'ml-auto'}`} style={{ maxWidth: '80%' }}>
                  <div className={`absolute top-6 w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-2xl ${i % 2 === 0 ? '-left-6' : '-right-6'}`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-rose-700 mb-2">{item.date}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appreciation Section with romantic quotes */}
      <section ref={appreciationRef} className="py-20 w-full bg-rose-50/90 backdrop-blur-sm z-10">
        <h2 className="text-5xl font-bold text-rose-600 mb-12 animate-fadeIn relative">
          <span className="relative inline-block">
            The Language of My Heart
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent"></span>
          </span>
        </h2>
        
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Your love is the poetry my heart has always wanted to write.",
              "In your arms, I've found my safe haven from all storms.",
              "You're the dream I never want to wake up from.",
              "My love for you grows with every heartbeat, boundless and eternal.",
              "Your voice is my favorite melody, your name my sweetest prayer.",
              "With you, ordinary moments become extraordinary memories."
            ].map((quote, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-xl shadow-md border border-rose-100 hover:shadow-lg transition-shadow duration-300 transform hover:scale-[1.02]"
              >
                <div className="text-rose-500 text-4xl mb-4">
                  {i % 3 === 0 ? "💖" : i % 3 === 1 ? "🌹" : "✨"}
                </div>
                <p className="text-gray-700 italic">"{quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Love Notes Section with enhanced features */}
      <section ref={notesRef} className="py-20 w-full bg-white/90 backdrop-blur-sm z-10">
        <h2 className="text-5xl font-bold text-rose-600 mb-8 animate-fadeIn relative">
          <span className="relative inline-block">
            Our Secret Letters
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent"></span>
          </span>
        </h2>
        
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Whisper your heart's desires, my love. Every word you write becomes a treasure I'll cherish forever.
          </p>
          
          <div className="flex gap-2 mb-8">
            <input
              type="text"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Write your love letter here..."
              className="flex-1 p-4 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && addNote()}
            />
            <button
              onClick={addNote}
              className="px-6 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all shadow-md flex items-center justify-center"
            >
              <span className="mr-2">Send</span> ✉️
            </button>
          </div>
          
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {notes.length === 0 ? (
              <div className="p-8 text-center bg-rose-50 rounded-lg border border-dashed border-rose-200">
                <p className="text-rose-500">No love letters yet... Write your first one!</p>
              </div>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="flex justify-between items-start p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-rose-400 group"
                >
                  <div>
                    <p className="text-gray-700">{note.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{note.date}</p>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-rose-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Delete note"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Heart Particle Animation */}
      {showHearts && (
        <div className="fixed inset-0 pointer-events-none z-20">
          {[...Array(25)].map((_, i) => {
            const size = Math.random() * 30 + 20;
            return (
              <div
                key={i}
                className="absolute animate-float text-rose-500"
                style={{
                  fontSize: `${size}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 5 + 5}s`,
                  animationDelay: `${Math.random() * 2}s`,
                  opacity: Math.random() * 0.6 + 0.4,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              >
                {Math.random() > 0.5 ? '💖' : '💕'}
              </div>
            );
          })}
        </div>
      )}

      {/* Footer with romantic touch */}
      <footer className="py-16 w-full bg-white/80 backdrop-blur-md z-10 border-t border-rose-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl text-rose-600">💝</span>
            </div>
            <p className="text-rose-700 text-xl mb-4 font-medium">
              Made with endless love for you, my forever
            </p>
            <p className="text-rose-600 text-sm mb-8">
              © {new Date().getFullYear()} With all my heart, from Yombia
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-6 py-2 bg-rose-100 text-rose-600 rounded-full hover:bg-rose-200 transition flex items-center"
            >
              <span className="mr-2">Back to Top</span> ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;