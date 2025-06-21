import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [showLoveLetter, setShowLoveLetter] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [expandedMessageIndex, setExpandedMessageIndex] = useState(null);
  const audioRef = useRef(null);

  // Refs for smooth scrolling to sections
  const aboutRef = useRef(null);
  const galleryRef = useRef(null);
  const memoriesRef = useRef(null);
  const messagesRef = useRef(null);

  // Music playlist
  const songs = [
    {
      title: "Romantic Piano",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      title: "Love Melody",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      title: "Sweet Violin",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
  ];

  // Photo gallery with romantic captions
  const photos = [
    {
      url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
      caption: "The day my heart found its home",
      message: "This was the moment I knew you were the one for me. Your smile in this photo makes my heart skip a beat every time I see it."
    },
    {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      caption: "Our laughter echoes in my soul",
      message: "I remember this day like it was yesterday - the pure happiness we shared. Your laughter is my favorite sound in the world."
    },
    {
      url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
      caption: "Forever isn't long enough with you",
      message: "This trip changed everything between us. Looking at this photo reminds me why I fell in love with you."
    }
  ];

  // Love quotes for the typing effect
  const loveQuotes = [
    "Every moment with you is a treasure I hold dear...",
    "Your love is the melody that plays in my heart...",
    "In your eyes, I found my home, my peace, my everything...",
    "You are my today and all of my tomorrows...",
    "Loving you is the best thing that ever happened to me..."
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

  // Handle music play/pause
  const toggleMusic = () => {
    if (isPlayingMusic) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => console.log("Audio play failed:", error));
    }
    setIsPlayingMusic(!isPlayingMusic);
  };

  // Handle next song
  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    if (isPlayingMusic) {
      audioRef.current.play().catch((error) => console.log("Audio play failed:", error));
    }
  };

  // Handle previous song
  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    if (isPlayingMusic) {
      audioRef.current.play().catch((error) => console.log("Audio play failed:", error));
    }
  };

  // Handle next photo
  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  // Handle previous photo
  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Smooth scroll to section
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  // Update audio source when song changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlayingMusic) {
        audioRef.current.play().catch((error) => console.log("Audio play failed:", error));
      }
    }
  }, [currentSongIndex]);

  // Love messages data
  const loveMessages = [
    { 
      emoji: "💌", 
      title: "Love Letter", 
      message: "If I wrote you a love letter every day, it still wouldn't be enough to express what you mean to me. Your presence fills my heart with joy, and every word I write is a testament to the endless love I feel for you, a love that grows deeper with each sunrise."
    },
    { 
      emoji: "🌹", 
      title: "For You", 
      message: "I'd give you every rose in the world if it could show you even a fraction of my love. Each petal would whisper my devotion, a garden of affection that blooms endlessly for you, my eternal muse, in every season of our lives."
    },
    { 
      emoji: "💕", 
      title: "My Love", 
      message: "What we have is rare and beautiful - a love that grows stronger with each passing day. It's a bond forged in trust and nurtured by countless shared moments, a treasure I'll hold close forever, through every challenge and triumph."
    },
    { 
      emoji: "✨", 
      title: "You Shine", 
      message: "Your spirit shines brighter than any star I've ever seen. Your laughter lights up my darkest nights, and your kindness illuminates my world, a beacon of hope and love that guides me through every storm."
    },
    { 
      emoji: "🥰", 
      title: "Adore You", 
      message: "I adore every little thing about you - your quirks, your laugh, your beautiful soul. From the way you smile to the gentle way you care, every detail of you is a masterpiece I cherish with all my heart."
    },
    { 
      emoji: "💘", 
      title: "Be Mine", 
      message: "In every lifetime, in every universe, I would find you and choose you again and again. Your love is my destiny, a promise written in the stars, a commitment that transcends time and space, binding us eternally."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex flex-col items-center text-center font-serif relative overflow-x-hidden">
      {/* Hidden audio element */}
      <audio ref={audioRef} loop>
        <source src={songs[currentSongIndex].url} type="audio/mpeg" />
      </audio>

      {/* Floating petals background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-200 opacity-70 animate-float"
            style={{
              fontSize: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          >
            ❀
          </div>
        ))}
      </div>

      {/* Fixed floating title */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 animate-glow-pulse shadow-xl px-8 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-rose-200">
          Untuk Rahel 💖
        </h1>
      </div>

      {/* Navigation */}
      <nav className="fixed top-6 right-6 z-50 flex items-center gap-4">
        <button
          onClick={() => scrollToSection(aboutRef)}
          className="text-rose-600 hover:text-rose-800 transition hover:scale-110 text-lg"
        >
          About Us
        </button>
        <button
          onClick={() => scrollToSection(galleryRef)}
          className="text-rose-600 hover:text-rose-800 transition hover:scale-110 text-lg"
        >
          Gallery
        </button>
        <button
          onClick={() => scrollToSection(memoriesRef)}
          className="text-rose-600 hover:text-rose-800 transition hover:scale-110 text-lg"
        >
          Memories
        </button>
        <button
          onClick={() => scrollToSection(messagesRef)}
          className="text-rose-600 hover:text-rose-800 transition hover:scale-110 text-lg"
        >
          Messages
        </button>
        <div className="flex items-center gap-2 ml-4 bg-white/80 px-3 py-1 rounded-full shadow-sm border border-rose-200">
          <button
            onClick={prevSong}
            className="text-rose-600 hover:text-rose-800 transition hover:scale-110"
            title="Previous song"
          >
            ⏮
          </button>
          <button
            onClick={toggleMusic}
            className={`text-lg ${isPlayingMusic ? 'text-rose-700' : 'text-pink-700'} transition hover:scale-110`}
            title={isPlayingMusic ? 'Pause music' : 'Play music'}
          >
            {isPlayingMusic ? '⏸' : '▶️'}
          </button>
          <button
            onClick={nextSong}
            className="text-rose-600 hover:text-rose-800 transition hover:scale-110"
            title="Next song"
          >
            ⏭
          </button>
          <span className="text-sm text-rose-600 ml-2">
            {songs[currentSongIndex].title}
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center z-10 w-full px-4 pt-32 pb-20">
        <div className="relative mb-12">
          <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-rose-700 animate-pulse mb-8">
            My Heart Belongs to You 💕
          </h1>
          <div className="absolute -bottom-3 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent"></div>
        </div>
        
        <div className="h-20 mb-12 flex items-center justify-center">
          <p className="text-3xl text-rose-800 max-w-2xl px-4">
            {typedText}
            <span className="animate-blink">|</span>
          </p>
        </div>
        
        <div className="flex gap-6 justify-center">
          <button
            onClick={() => setShowLoveLetter(!showLoveLetter)}
            className="px-12 py-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-xl hover:shadow-2xl text-xl transform hover:scale-105"
          >
            {showLoveLetter ? 'Hide Love Letter' : 'Read My Heart 💌'}
          </button>
        </div>
        
        {/* Animated love letter */}
        {showLoveLetter && (
          <div className="mt-16 w-full max-w-2xl bg-rose-50 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 animate-fadeIn border-2 border-rose-200">
            <div className="p-8 bg-gradient-to-b from-rose-100 to-pink-100 border-b-2 border-rose-200">
              <h3 className="text-3xl font-serif text-rose-800">My Dearest Rahel,</h3>
            </div>
            <div className="p-8">
              <p className="text-xl text-rose-900 font-serif leading-relaxed mb-6">
                From the moment our souls touched, I knew my life would never be the same. 
                Your love has transformed my world into a place of beauty and meaning beyond anything I could have imagined.
              </p>
              <p className="text-xl text-rose-900 font-serif leading-relaxed mb-6">
                Each day with you is a gift I cherish. Your smile lights up my darkest moments, 
                and your embrace feels like coming home. I fall in love with you more with every sunrise, 
                every shared laugh, every quiet moment together.
              </p>
              <p className="text-xl text-rose-900 font-serif leading-relaxed">
                Forever yours,<br />
                <span className="text-2xl font-bold text-rose-700">Yombia</span>
              </p>
            </div>
            <div className="p-4 bg-rose-50 border-t-2 border-rose-200 text-right">
              <button 
                onClick={() => setShowLoveLetter(false)}
                className="text-lg text-rose-600 hover:text-rose-800 px-4 py-1 rounded hover:bg-rose-100 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Photo Gallery Section */}
      <section ref={galleryRef} className="py-20 w-full bg-white/90 backdrop-blur-sm z-10 relative px-4 border-t-2 border-b-2 border-rose-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-bold text-rose-600 mb-16 text-center">
            Our Precious Moments
          </h2>
          
          <div className="relative group">
            {/* Main photo display */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl h-[32rem]">
              <img
                src={photos[currentPhotoIndex].url}
                alt={`Moment ${currentPhotoIndex + 1}`}
                className="w-full h-full object-cover transform transition-all duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-3xl font-medium mb-2">
                  {photos[currentPhotoIndex].caption}
                </h3>
                <p className="text-rose-100 text-xl">
                  {photos[currentPhotoIndex].message}
                </p>
              </div>
              
              {/* Enhanced navigation arrows */}
              <button
                onClick={prevPhoto}
                className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-rose-600 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-125 hover:shadow-xl"
              >
                <span className="text-2xl">❮</span>
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-rose-600 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-125 hover:shadow-xl"
              >
                <span className="text-2xl">❯</span>
              </button>
            </div>
            
            {/* Photo counter and navigation */}
            <div className="flex justify-between items-center mt-6">
              <div className="bg-white/90 text-rose-600 px-6 py-2 rounded-full text-lg shadow-md border border-rose-200">
                Memory {currentPhotoIndex + 1} of {photos.length}
              </div>
              <div className="flex gap-3">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPhotoIndex(index)}
                    className={`w-4 h-4 rounded-full transition-all ${currentPhotoIndex === index ? 'bg-rose-600 scale-150' : 'bg-rose-300 hover:bg-rose-400'}`}
                    aria-label={`Go to photo ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutRef} className="py-20 w-full bg-rose-50/95 backdrop-blur-sm z-10 relative px-4 border-b-2 border-rose-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-bold text-rose-600 mb-16 text-center">
            The Essence of You
          </h2>
          
          <div className="grid grid-cols-2 gap-16 items-center">
            <div className="text-left space-y-8">
              <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-rose-400">
                <h3 className="text-2xl font-bold text-rose-700 mb-4">Your Beautiful Soul</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Your eyes hold galaxies I could spend lifetimes exploring, and your smile is the sunrise that brightens my every day. There's a kindness in your spirit that makes the world feel softer.
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-rose-400">
                <h3 className="text-2xl font-bold text-rose-700 mb-4">The Way You Love</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The way you laugh, the way you care, the way you love - every detail of you is etched into my heart forever. Your love feels like coming home after the longest journey.
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-rose-400">
                <h3 className="text-2xl font-bold text-rose-700 mb-4">My Perfect Match</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  In a world of billions, you're my one in infinity, the missing piece that makes my soul complete. You understand me in ways no one else ever has.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="relative w-80 h-80 bg-white rounded-full shadow-2xl flex items-center justify-center mb-10 border-8 border-rose-100">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-200 to-rose-200 opacity-30 animate-pulse"></div>
                <div className="text-7xl text-rose-600 animate-beat">❤️</div>
                <div className="absolute bottom-0 bg-white px-8 py-3 rounded-full shadow-lg border-2 border-rose-100">
                  <span className="text-xl font-bold text-rose-700">I Love You</span>
                </div>
              </div>
              
              <button
                onClick={() => setCount(count + 1)}
                className="px-10 py-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-xl hover:shadow-2xl text-xl transform hover:scale-105 relative overflow-hidden group"
              >
                <span className="relative z-10">Click to Love Me More: {count}</span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Memories Timeline Section */}
      <section ref={memoriesRef} className="py-20 w-full bg-white/90 backdrop-blur-sm z-10 relative px-4 border-b-2 border-rose-100">
        <h2 className="text-5xl font-bold text-rose-600 mb-16 text-center">
          Our Journey Together
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 h-full w-1 bg-gradient-to-b from-pink-300 to-rose-300 transform -translate-x-1/2"></div>
            
            {/* Timeline items */}
            {[
              { 
                date: "The First Glance", 
                description: "When our eyes met and time stood still", 
                icon: "👀",
                details: "I'll never forget how the world seemed to pause when I first saw you. There was an instant connection that I couldn't explain but couldn't deny."
              },
              { 
                date: "First Date", 
                description: "Nervous laughter and stolen glances", 
                icon: "🍽️",
                details: "We were both so nervous but couldn't stop smiling. That little café will always be special to me - where our story truly began."
              },
              { 
                date: "First Kiss", 
                description: "The moment fireworks became real", 
                icon: "💋",
                details: "Under the stars, time stopped. That perfect moment when I knew without a doubt that you were someone extraordinary in my life."
              },
              { 
                date: "Our First Trip", 
                description: "Adventures that bonded us forever", 
                icon: "✈️",
                details: "Getting lost together, laughing at our mistakes, discovering new places - those days showed me how well we fit together in this world."
              },
              { 
                date: "Today", 
                description: "Every day with you is a new blessing", 
                icon: "❤️",
                details: "What we have now is more beautiful than I could have imagined. Each ordinary day with you feels extraordinary because it's with you."
              }
            ].map((item, i) => (
              <div key={i} className={`mb-16 w-full ${i % 2 === 0 ? 'pr-16 pl-0 text-right' : 'pl-16 pr-0 text-left'}`}>
                <div className={`p-8 bg-white rounded-2xl shadow-xl border-2 border-rose-100 relative ${i % 2 === 0 ? 'mr-auto' : 'ml-auto'}`} style={{ maxWidth: '90%' }}>
                  <div className={`absolute top-8 w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-3xl ${i % 2 === 0 ? '-left-8' : '-right-8'}`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-rose-700 mb-3">{item.date}</h3>
                  <p className="text-xl text-gray-600 mb-4 italic">"{item.description}"</p>
                  <p className="text-lg text-gray-700">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Expanded Message Modal - Fixed Version */}
{expandedMessageIndex !== null && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    {/* Backdrop with blur effect */}
    <div 
      className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300"
      onClick={() => setExpandedMessageIndex(null)}
    />
    
    {/* Modal Container - Centered properly */}
    <div 
      className="relative bg-white rounded-3xl shadow-2xl border-4 border-dynamic-heart-expanded max-w-2xl w-full mx-4 overflow-hidden transform transition-all duration-300 animate-scale-in max-h-[90vh] overflow-y-auto"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal Content */}
      <div className="p-8 sm:p-10 flex flex-col items-center text-center">
        <div className="text-7xl mb-6 animate-pulse-slow text-rose-500">
          {loveMessages[expandedMessageIndex].emoji}
        </div>
        <h3 className="text-3xl font-bold text-rose-700 mb-6">
          {loveMessages[expandedMessageIndex].title}
        </h3>
        <div className="w-20 h-1 bg-gradient-to-r from-pink-300 to-rose-400 mb-6 rounded-full"></div>
        <p className="text-lg text-gray-700 leading-relaxed mb-8 whitespace-pre-line">
          {loveMessages[expandedMessageIndex].message}
        </p>
        <button
          onClick={() => setExpandedMessageIndex(null)}
          className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-rose-300/50 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          Close
        </button>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 text-rose-200/60 text-8xl -mt-4 -mr-4">❦</div>
      <div className="absolute bottom-0 left-0 text-pink-200/60 text-8xl -mb-4 -ml-4">❧</div>
      <div className="absolute -bottom-3 right-3 text-rose-300 animate-bounce-slow text-4xl">💕</div>
    </div>
  </div>
)}

      {/* Heart Particle Animation */}
      {showHearts && (
        <div className="fixed inset-0 pointer-events-none z-20">
          {[...Array(50)].map((_, i) => {
            const size = Math.random() * 30 + 20;
            return (
              <div
                key={i}
                className="absolute animate-float text-rose-400"
                style={{
                  fontSize: `${size}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 8 + 5}s`,
                  animationDelay: `${Math.random() * 3}s`,
                  opacity: Math.random() * 0.7 + 0.3,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  filter: `blur(${Math.random() * 3}px)`
                }}
              >
                {['💖', '💕', '❤️', '💗', '💓'][Math.floor(Math.random() * 5)]}
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <footer className="py-16 w-full bg-white/80 backdrop-blur-md z-10 border-t-2 border-rose-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mb-6 shadow-inner border-2 border-rose-200">
              <span className="text-4xl text-rose-600">💝</span>
            </div>
            <p className="text-2xl text-rose-700 mb-4 font-medium text-center">
              Aku mencintaimu dan akan selalu begitu, Love you kel
            </p>
            <p className="text-lg text-rose-600 mb-8 text-center">
              With all my heart, from Yos
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-3 bg-rose-100 text-rose-600 rounded-full hover:bg-rose-200 transition flex items-center text-lg shadow-md border border-rose-200"
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