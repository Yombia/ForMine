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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      caption: "The day my heart found its home",
      date: "June 2024",
      location: "Our favorite park",
      memory: "We walked hand in hand, laughing under the summer sky."
    },
    {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      caption: "Our laughter echoes in my soul",
      date: "August 2024",
      location: "The beach at sunset",
      memory: "The waves sang our love song as we danced barefoot."
    },
    {
      url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
      caption: "Forever isn't long enough with you",
      date: "October 2024",
      location: "Cozy café date",
      memory: "Sipping coffee, your smile warmed me more than the cup."
    },
    {
      url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2",
      caption: "Your hand in mine feels like destiny",
      date: "December 2024",
      location: "Winter market stroll",
      memory: "Lights twinkled, but your eyes shone brighter."
    },
    {
      url: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00",
      caption: "Every sunset is more beautiful with you",
      date: "February 2025",
      location: "Mountain getaway",
      memory: "We watched the sky blush, wrapped in each other's warmth."
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
    setIsMenuOpen(false);
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

  // Close menu when clicking outside
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center text-center font-sans relative overflow-hidden">
      {/* Hidden audio element for romantic music */}
      <audio ref={audioRef} loop>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating petals background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {[...Array(window.innerWidth < 768 ? 15 : 30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 opacity-70"
            style={{
              fontSize: `${Math.random() * (window.innerWidth < 768 ? 12 : 20) + 8}px`,
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
        {[...Array(window.innerWidth < 768 ? 25 : 50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
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

      {/* Header */}
      <header className="fixed top-0 w-full bg-white/70 backdrop-blur-md z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 animate-glow">
            My Eternal Love 💖
          </h1>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-rose-100 text-rose-600"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-4">
            <button
              onClick={() => scrollToSection(photosRef)}
              className="text-rose-600 hover:text-rose-800 transition hover:scale-105 text-sm md:text-base"
            >
              Our Gallery
            </button>
            <button
              onClick={() => scrollToSection(aboutRef)}
              className="text-rose-600 hover:text-rose-800 transition hover:scale-105 text-sm md:text-base"
            >
              My Beloved
            </button>
            <button
              onClick={() => scrollToSection(memoriesRef)}
              className="text-rose-600 hover:text-rose-800 transition hover:scale-105 text-sm md:text-base"
            >
              Memories
            </button>
            <button
              onClick={() => scrollToSection(appreciationRef)}
              className="text-rose-600 hover:text-rose-800 transition hover:scale-105 text-sm md:text-base"
            >
              My Heart
            </button>
            <button
              onClick={() => scrollToSection(notesRef)}
              className="text-rose-600 hover:text-rose-800 transition hover:scale-105 text-sm md:text-base"
            >
              Love Letters
            </button>
            <button
              onClick={toggleMusic}
              className={`p-2 rounded-full ${isPlayingMusic ? 'bg-rose-100 text-rose-700' : 'bg-pink-100 text-pink-700'} text-sm md:text-base`}
            >
              {isPlayingMusic ? '♫' : '♫'}
            </button>
          </nav>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div ref={menuRef} className="md:hidden bg-white/90 backdrop-blur-md py-4 px-6 shadow-lg">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => scrollToSection(photosRef)}
                className="text-left py-2 text-rose-600 hover:text-rose-800 transition"
              >
                Our Gallery
              </button>
              <button
                onClick={() => scrollToSection(aboutRef)}
                className="text-left py-2 text-rose-600 hover:text-rose-800 transition"
              >
                My Beloved
              </button>
              <button
                onClick={() => scrollToSection(memoriesRef)}
                className="text-left py-2 text-rose-600 hover:text-rose-800 transition"
              >
                Memories
              </button>
              <button
                onClick={() => scrollToSection(appreciationRef)}
                className="text-left py-2 text-rose-600 hover:text-rose-800 transition"
              >
                My Heart
              </button>
              <button
                onClick={() => scrollToSection(notesRef)}
                className="text-left py-2 text-rose-600 hover:text-rose-800 transition"
              >
                Love Letters
              </button>
              <button
                onClick={toggleMusic}
                className={`text-left py-2 ${isPlayingMusic ? 'text-rose-700' : 'text-pink-700'} transition`}
              >
                {isPlayingMusic ? '♫ Pause Music' : '♫ Play Music'}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center z-10 w-full px-4 pt-20 pb-10">
        <div className="relative">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-rose-700 animate-pulse mb-6">
            My Heart Belongs to You 💕
          </h1>
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent"></div>
        </div>
        
        <div className="h-16 mb-8 sm:mb-10 flex items-center justify-center">
          <p className="text-xl sm:text-2xl md:text-3xl text-rose-800 max-w-xl px-2">
            {typedText}
            <span className="animate-blink">|</span>
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-md sm:max-w-2xl mx-auto">
          <button
            onClick={() => scrollToSection(photosRef)}
            className="px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl text-right text-lg transform hover:scale-105"
          >
            Our Love Story 📖
          </button>
          <button
            onClick={() => setShowLoveLetter(!showLoveLetter)}
            className="px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 bg-gradient-to-r from-rose-500 to-purple-500 text-white rounded-full hover:from-rose-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg transform hover:scale-right"
          >
            {showLoveLetter ? 'Hide Letter' : 'Read My Heart 💌'}
          </button>
        </div>
        
        {/* Animated love letter */}
        {showLoveLetter && (
          <div className="mt-8 sm:mt-12 w-full max-w-xs sm:max-w-sm md:max-w-2xl bg-rose-50 rounded-lg shadow-xl overflow-hidden transform transition-all duration-500 animate-fadeIn">
            <div className="p-4 sm:p-6 bg-gradient-to-b from-rose-100 to-pink-100 border-b border-rose-200">
              <h3 className="text-xl sm:text-2xl font-serif text-rose-800">My Dearest Love,</h3>
            </div>
            <div className="p-4 sm:p-6">
              <p className="text-sm sm:text-base md:text-lg text-rose-900 font-serif leading-relaxed mb-3 sm:mb-4">
                From the moment our souls touched, I knew my life would never be the same. 
                Your love has transformed my world into a place of beauty and meaning.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-rose-900 font-serif leading-relaxed mb-3 sm:mb-4">
                Each day with you is a gift I cherish. Your smile lights up my darkest moments, 
                and your embrace feels like coming home. I fall in love with you more with every sunrise.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-rose-900 font-serif leading-relaxed">
                Forever yours,<br />
                <span className="text-lg sm:text-xl font-bold text-rose-700">Yombia</span>
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-rose-50 border-t border-rose-200 text-right">
              <button 
                onClick={() => setShowLoveLetter(false)}
                className="text-sm sm:text-base text-rose-600 hover:text-rose-800"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Photos Section */}
      <section ref={photosRef} className="py-12 sm:py-16 md:py-20 w-full bg-white/90 backdrop-blur-sm z-10 relative">
        <div className="absolute inset-0 bg-pink-50 opacity-20 pointer-events-none"></div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-600 mb-8 sm:mb-10 md:mb-12 animate-fadeIn relative px-4">
          <span className="relative inline-block">
            Our Eternal Moments
            <span className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent"></span>
          </span>
        </h2>
        
        <div className="max-w-3xl mx-auto px-4 relative">
          {/* Main featured photo */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg h-32 sm:h-48 md:h-64 aspect-[4/3] mb-6 sm:mb-8 group">
            <img
              src={photos[currentPhotoIndex].url}
              alt={`Moment ${currentPhotoIndex + 1}`}
              className="w-full h-full object-cover transform transition-all duration-1000 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
          
          {/* Enhanced caption container */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 shadow-md border border-rose-200 mb-6 sm:mb-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="flex-1 text-left">
                <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-rose-700 mb-2 sm:mb-3">
                  {photos[currentPhotoIndex].caption}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 italic mb-2 sm:mb-3">
                  "{photos[currentPhotoIndex].memory}"
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                  <span className="flex items-center">
                    📅 {photos[currentPhotoIndex].date}
                  </span>
                  <span className="flex items-center">
                    📍 {photos[currentPhotoIndex].location}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <button
                  className="px-4 py-2 sm:px-5 sm:py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full hover:from-rose-600 hover:to-pink-600 transition-all shadow-md text-sm sm:text-base"
                  onClick={() => setShowHearts(true) && setTimeout(() => setShowHearts(false), 2000)}
                >
                  💖 Love
                </button>
                <button
                  className="px-4 py-2 sm:px-5 sm:py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full hover:from-purple-600 hover:to-indigo-600 transition-all shadow-md text-sm sm:text-base"
                  onClick={() => setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)}
                >
                  Next →
                </button>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-rose-100 flex justify-center gap-2 sm:gap-3">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xl sm:text-2xl ${i < 3 ? 'text-rose-500' : 'text-gray-300'}`}
                >
                  ♥
                </span>
              ))}
            </div>
          </div>
          
          {/* Thumbnail navigation */}
          <div className="flex overflow-x-auto pb-2 sm:pb-0 sm:justify-center gap-2 sm:gap-3 px-2 sm:px-0">
            {photos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setCurrentPhotoIndex(i)}
                className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg overflow-hidden shadow-md transition-all duration-300 ${currentPhotoIndex === i ? 'ring-2 sm:ring-3 ring-rose-400 transform scale-110' : 'opacity-70 hover:opacity-100'}`}
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

      {/* About You Section */}
      <section ref={aboutRef} className="py-12 sm:py-16 md:py-20 w-full bg-rose-50/90 backdrop-blur-sm z-10 relative px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-600 mb-8 sm:mb-10 md:mb-12 animate-fadeIn relative">
            <span className="relative inline-block">
              The Essence of You
              <span className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent"></span>
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div className="text-left">
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 animate-fadeIn">
                Your eyes hold galaxies I could spend lifetimes exploring, and your smile is the sunrise that brightens my every day.
              </p>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 animate-fadeIn">
                The way you laugh, the way you care, the way you love - every detail of you is etched into my heart forever.
              </p>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 animate-fadeIn">
                In a world of billions, you're my one in infinity, the missing piece that makes my soul complete.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-white rounded-full shadow-xl flex items-center justify-center mb-6 sm:mb-8 border-6 sm:border-8 border-rose-100">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-200 to-rose-200 opacity-30 animate-pulse"></div>
                <div className="text-4xl sm:text-5xl md:text-6xl text-rose-600 animate-beat">❤️</div>
                <div className="absolute bottom-0 bg-white px-4 py-1 sm:px-6 sm:py-2 rounded-full shadow-md border border-rose-100">
                  <span className="text-sm sm:text-base md:text-lg text-rose-700 font-bold">I Love You</span>
                </div>
              </div>
              
              <button
                onClick={() => setCount(count + 1)}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden text-sm sm:text-base"
              >
                <span className="relative z-10">Click to Love Me More: {count}</span>
                <span className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Memories Timeline Section */}
      <section ref={memoriesRef} className="py-12 sm:py-16 md:py-20 w-full bg-white/90 backdrop-blur-sm z-10 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-600 mb-8 sm:mb-10 md:mb-12 animate-fadeIn relative">
          <span className="relative inline-block">
            Our Journey Together
            <span className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent"></span>
          </span>
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 h-full w-1 bg-gradient-to-b from-pink-300 to-rose-300 transform -translate-x-1/2"></div>
            <div className="md:hidden absolute left-6 h-full w-1 bg-gradient-to-b from-pink-300 to-rose-300"></div>
            
            {[
              { date: "The First Glance", description: "When our eyes met and time stood still", icon: "👀" },
              { date: "First Date", description: "Nervous laughter and stolen glances", icon: "🍽️" },
              { date: "First Kiss", description: "The moment fireworks became real", icon: "💋" },
              { date: "Our First Trip", description: "Adventures that bonded us forever", icon: "✈️" },
              { date: "Today", description: "Every day with you is a new blessing", icon: "❤️" }
            ].map((item, i) => (
              <div key={i} className="mb-8 sm:mb-10 md:mb-12 w-full">
                <div className={`p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-rose-100 relative ${i % 2 === 0 ? 'md:mr-auto md:pr-12 md:pl-0 md:text-right' : 'md:ml-auto md:pl-12 md:pr-0 md:text-left'} ml-12 md:ml-0`} style={{ maxWidth: '90%' }}>
                  <div className={`absolute top-4 sm:top-6 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-rose-100 flex items-center justify-center text-xl sm:text-2xl -left-4 sm:-left-6 md:${i % 2 === 0 ? '-left-6' : '-right-6'}`}>
                    {item.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-xl font-bold text-rose-700 mb-1 sm:mb-2">{item.date}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appreciation Section */}
      <section ref={appreciationRef} className="py-12 sm:py-16 md:py-20 w-full bg-rose-50/90 backdrop-blur-sm z-10 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-600 mb-8 sm:mb-10 md:mb-12 animate-fadeIn relative">
          <span className="relative inline-block">
            The Language of My Heart
            <span className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent"></span>
          </span>
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
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
                className="p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-md border border-rose-100 hover:shadow-lg transition-shadow duration-300 transform hover:scale-[1.02]"
              >
                <div className="text-rose-500 text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">
                  {i % 3 === 0 ? "💖" : i % 3 === 1 ? "🌹" : "✨"}
                </div>
                <p className="text-sm sm:text-base text-gray-700 italic">"{quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Love Notes Section */}
      <section ref={notesRef} className="py-12 sm:py-16 md:py-20 w-full bg-white/90 backdrop-blur-sm z-10 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-600 mb-6 sm:mb-8 animate-fadeIn relative">
          <span className="relative inline-block">
            Our Secret Letters
            <span className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent"></span>
          </span>
        </h2>
        
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
            Whisper your heart's desires, my love. Every word you write becomes a treasure I'll cherish forever.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-6 sm:mb-8">
            <input
              type="text"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Write your love letter here..."
              className="flex-1 p-3 sm:p-4 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent text-sm sm:text-base"
              onKeyPress={(e) => e.key === 'Enter' && addNote()}
            />
            <button
              onClick={addNote}
              className="px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all shadow-md flex items-center justify-center text-sm sm:text-base"
            >
              <span className="mr-1 sm:mr-2">Send</span> ✉️
            </button>
          </div>
          
          <div className="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto pr-2">
            {notes.length === 0 ? (
              <div className="p-6 sm:p-8 text-center bg-rose-50 rounded-lg border border-dashed border-rose-200">
                <p className="text-rose-500 text-sm sm:text-base">No love letters yet... Write your first one!</p>
              </div>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="flex justify-between items-start p-3 sm:p-4 md:p-5 bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-rose-400 group"
                >
                  <div>
                    <p className="text-sm sm:text-base text-gray-700">{note.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{note.date}</p>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-rose-400 hover:text-rose-600 opacity-70 group-hover:opacity-100 transition-opacity text-sm sm:text-base"
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
          {[...Array(window.innerWidth < 768 ? 15 : 25)].map((_, i) => {
            const size = Math.random() * (window.innerWidth < 768 ? 20 : 30) + 15;
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

      {/* Footer */}
      <footer className="py-10 sm:py-12 md:py-16 w-full bg-white/80 backdrop-blur-md z-10 border-t border-rose-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <span className="text-2xl sm:text-3xl text-rose-600">💝</span>
            </div>
            <p className="text-rose-700 text-lg sm:text-xl mb-3 sm:mb-4 font-medium text-center">
              Made with endless love for you, my forever
            </p>
            <p className="text-rose-600 text-xs sm:text-sm mb-6 sm:mb-8 text-center">
              © {new Date().getFullYear()} With all my heart, from Yombia
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-4 py-1 sm:px-6 sm:py-2 bg-rose-100 text-rose-600 rounded-full hover:bg-rose-200 transition flex items-center text-sm sm:text-base"
            >
              <span className="mr-1 sm:mr-2">Back to Top</span> ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;