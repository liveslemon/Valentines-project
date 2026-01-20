import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Lock, Sparkles, MapPin, Calendar, Star, ChevronDown, HeartCrack, Home, PartyPopper, Camera, ArrowRight, MessageCircle, Moon, Feather } from 'lucide-react';
import { AppStage } from './types';
import FloatingHearts from './components/FloatingHearts';
import Button from './components/Button';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.IDENTITY);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [currentReasonIndex, setCurrentReasonIndex] = useState(0);
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  // Animation Configuration
  const pageVariants: Variants = {
    initial: { opacity: 0, y: 20, scale: 0.98, filter: "blur(10px)" },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } // Custom soft easing
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.98, 
      filter: "blur(10px)",
      transition: { duration: 0.4, ease: "easeIn" }
    }
  };

  // Reusable Glass Card Class
  const glassCardClass = "bg-white/40 backdrop-blur-xl shadow-xl shadow-purple-900/5 rounded-[2.5rem] p-8 flex flex-col items-center gap-6 w-full max-w-sm mx-auto z-10 relative overflow-hidden";

  // Personalized Reasons Data
  const reasons = [
    "Your true smile.",
    "The way you support me, always.",
    "Your prayers that cover us.",
    "Your deep understanding.",
    "How deeply you love us.",
    "When you hold me tight.",
    "How incredibly thoughtful you are.",
    "Your work ethic inspiring me.",
    "Your ability to remember the little things.",
    "How you listen when I rant.",
    "How your reassurances calm me."
  ];

  // Personalized Journey Data
  const journeyPoints = [
    { 
      title: "The Beginning", 
      text: "It started when you photobombed me — and I just wanted an excuse to ask for your Instagram.", 
      icon: <Camera className="w-5 h-5" /> 
    },
    { 
      title: "Getting Closer", 
      text: "Calls that lasted for hours. Waiting for your replies. Smiling every time your name popped up on my phone.", 
      icon: <MessageCircle className="w-5 h-5" /> 
    },
    { 
      title: "Long Distance", 
      text: "Four to five months apart — but never disconnected. Kept together by communication, prayers, determination, and love.", 
      icon: <MapPin className="w-5 h-5" /> 
    },
    { 
      title: "One Year Together", 
      text: "By Valentine’s Day, it’ll be a full year of us.", 
      icon: <Calendar className="w-5 h-5" /> 
    },
    { 
      title: "What I’m Most Proud Of", 
      text: "It’s not fireworks or grand moments. It’s the consistency. On a random Tuesday, tired and doing nothing, I still prefer your company over anyone else.", 
      icon: <Moon className="w-5 h-5" /> 
    }
  ];

  const handleIdentityYes = () => setStage(AppStage.WELCOME);
  const handleIdentityNo = () => setStage(AppStage.DENIED);
  const handleWelcomeContinue = () => setStage(AppStage.REASONS);
  
  const handleReasonTap = () => {
    if (currentReasonIndex < reasons.length - 1) {
      setCurrentReasonIndex(prev => prev + 1);
    } else {
      setStage(AppStage.JOURNEY);
    }
  };

  const handleJourneyContinue = () => setStage(AppStage.LETTER);
  const handleLetterContinue = () => setStage(AppStage.QUESTION);

  const handleQuestionYes = () => {
    setStage(AppStage.SUCCESS);
    triggerConfetti();
  };

  const moveNoButton = () => {
    const x = Math.random() * 150 - 75;
    const y = Math.random() * 150 - 75;
    setNoButtonPosition({ x, y });
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#f9a8d4', '#d8b4fe', '#fca5a5'] });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#f9a8d4', '#d8b4fe', '#fca5a5'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  useEffect(() => {
    document.body.style.overscrollBehavior = 'none';
  }, []);

  // Determine background gradient based on stage (Soft pink -> Lavender -> Muted Purple)
  const getGradient = () => {
    switch(stage) {
      case AppStage.IDENTITY: return "from-pink-50 via-pink-100 to-rose-100";
      case AppStage.WELCOME: return "from-pink-100 via-purple-100 to-violet-100";
      case AppStage.REASONS: return "from-violet-50 via-fuchsia-50 to-pink-50";
      case AppStage.JOURNEY: return "from-rose-50 via-purple-50 to-slate-50";
      case AppStage.LETTER: return "from-stone-100 via-stone-200 to-stone-100"; 
      case AppStage.QUESTION: return "from-pink-100 via-fuchsia-100 to-purple-200";
      case AppStage.SUCCESS: return "from-rose-100 via-pink-200 to-red-100";
      default: return "from-pink-100 via-rose-100 to-pink-200";
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getGradient()} transition-colors duration-[1500ms] text-slate-800 relative overflow-hidden flex flex-col items-center justify-center font-sans`}>
      <FloatingHearts />

      {/* Main Container */}
      <main className="w-full h-full absolute inset-0 flex flex-col items-center justify-center z-10 p-6 overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* STAGE 1: IDENTITY */}
          {stage === AppStage.IDENTITY && (
            <motion.div
              key="identity"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={glassCardClass}
            >
              <div className="p-4 bg-pink-50/50 rounded-full mb-2">
                <Lock className="w-8 h-8 text-rose-400" />
              </div>
              
              <div className="flex flex-col gap-2 text-center">
                <h1 className="text-5xl text-rose-500 font-cursive">Are you Ini?</h1>
                <p className="text-gray-600 font-sans font-medium opacity-80">Please verify your identity.</p>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <Button onClick={handleIdentityYes} variant="secondary">
                  YES <Heart className="w-4 h-4 fill-current" />
                </Button>
                <Button onClick={handleIdentityNo} variant="outline" className="text-rose-400 border-rose-200 hover:bg-rose-50/50">NO</Button>
              </div>
            </motion.div>
          )}

          {/* STAGE 1B: DENIED */}
          {stage === AppStage.DENIED && (
            <motion.div
              key="denied"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={glassCardClass}
            >
              <div className="p-4 bg-gray-100 rounded-full">
                <HeartCrack className="w-16 h-16 text-gray-400" />
              </div>
              <div className="flex flex-col gap-2 text-center">
                <h2 className="text-3xl text-gray-800 font-bold font-sans">Sorry 💔</h2>
                <p className="text-lg text-gray-600 font-sans">This page is only for Ini.</p>
              </div>
            </motion.div>
          )}

          {/* STAGE 2: WELCOME */}
          {stage === AppStage.WELCOME && (
            <motion.div
              key="welcome"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={glassCardClass}
            >
              <motion.div 
                animate={{ scale: [1, 1.05, 1], rotate: [0, 3, -3, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="drop-shadow-sm p-4 bg-white/40 rounded-full"
              >
                <Home className="w-16 h-16 text-violet-500" />
              </motion.div>
              
              <div className="flex flex-col gap-3 text-center">
                <h1 className="text-5xl text-violet-600 font-cursive">Hi Ini 💕</h1>
                <p className="text-lg text-slate-700 font-sans font-medium">I made this little space just for you.</p>
                <p className="text-md text-slate-500 italic leading-relaxed px-2 font-sans">
                  "I wanted something calm, thoughtful, and full of love — because that’s how you make me feel."
                </p>
              </div>

              <Button onClick={handleWelcomeContinue} variant="lavender" className="mt-2">
                Come in <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          )}

          {/* STAGE 3: REASONS (Interactive Cards) */}
          {stage === AppStage.REASONS && (
            <motion.div
              key="reasons"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-md h-[600px] relative flex flex-col items-center justify-center"
            >
              <h2 className="text-4xl text-violet-700 font-cursive mb-12 drop-shadow-sm text-center px-4">Things I Love About You</h2>
              
              <div className="relative w-full h-80 flex items-center justify-center perspective-1000">
                <AnimatePresence mode="popLayout">
                  {reasons.map((reason, index) => (
                    index === currentReasonIndex && (
                      <motion.div
                        key={index}
                        initial={{ scale: 0.9, opacity: 0, y: 50, rotateX: -10 }}
                        animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
                        exit={{ scale: 1.1, opacity: 0, rotate: 5, x: 200 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        onClick={handleReasonTap}
                        className="absolute w-[85%] bg-white/60 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-xl cursor-pointer flex flex-col items-center justify-center gap-6 min-h-[320px] z-20 hover:scale-[1.02] transition-transform"
                      >
                        <p className="text-2xl text-center text-violet-900 font-semibold leading-relaxed font-sans">
                          {reason}
                        </p>
                        <div className="text-violet-400 text-sm animate-bounce font-medium bg-violet-50/50 px-4 py-1 rounded-full flex items-center gap-2 font-sans">
                          {index < reasons.length - 1 ? "Tap to reveal" : "Tap to continue"} <Sparkles className="w-3 h-3" />
                        </div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
                
                {/* Visual Stack Background */}
                <div className="absolute w-[80%] h-[320px] bg-white/20 rounded-[2.5rem] transform rotate-3 scale-95 z-10" />
                <div className="absolute w-[75%] h-[320px] bg-white/10 rounded-[2.5rem] transform -rotate-3 scale-90 z-0" />
              </div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-12 text-center text-violet-800/60 text-sm font-medium italic font-sans"
              >
                I wish you could see yourself the way I see you.
              </motion.p>
            </motion.div>
          )}

          {/* STAGE 4: JOURNEY (Scrollable) */}
          {stage === AppStage.JOURNEY && (
            <motion.div
              key="journey"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-md flex flex-col h-[85vh] relative"
            >
              <h2 className="text-5xl text-center text-rose-500 font-cursive mb-8 shrink-0 drop-shadow-sm pt-4">Our Journey</h2>
              
              {/* Scrollable Container */}
              <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-24 space-y-8 mask-gradient-vertical">
                {journeyPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                    className="flex flex-col items-center text-center gap-3 bg-white/40 backdrop-blur-md p-6 rounded-3xl shadow-sm"
                  >
                    <div className="p-3 bg-gradient-to-br from-white to-pink-50 rounded-2xl text-violet-500 shadow-sm">
                      {point.icon}
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-bold text-slate-800 font-sans">{point.title}</h3>
                      <p className="text-slate-700 leading-relaxed font-medium opacity-90 font-sans">{point.text}</p>
                    </div>
                    {index < journeyPoints.length - 1 && (
                      <div className="h-6 w-0.5 bg-gradient-to-b from-violet-200 to-transparent mt-2 opacity-50" />
                    )}
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="p-6 text-center"
                >
                   <p className="text-violet-600 font-handwriting text-2xl">I’m proud of how loved I feel with you.</p>
                </motion.div>
                
                <div className="flex justify-center pt-4 pb-8">
                  <Button onClick={handleJourneyContinue} variant="secondary">
                    Next Chapter <ChevronDown className="w-5 h-5 ml-1" />
                  </Button>
                </div>
              </div>
              
              {/* Fade Overlay for Scroll */}
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-indigo-100/40 to-transparent pointer-events-none rounded-b-3xl" />
            </motion.div>
          )}

          {/* STAGE 5: LETTER (Interactive Envelope) */}
          {stage === AppStage.LETTER && (
            <motion.div
              key="letter"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-md perspective-1000 flex flex-col items-center justify-center h-[80vh]"
            >
              <AnimatePresence mode="wait">
                {!isLetterOpen ? (
                  <motion.button
                    key="envelope"
                    onClick={() => setIsLetterOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.5, rotateX: -90 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-80 h-52 bg-[#e3d1ac] shadow-2xl rounded-lg overflow-hidden cursor-pointer z-20"
                  >
                    {/* Envelope Body */}
                    <div className="absolute inset-0 bg-[#d4c5a9]" />
                    
                    {/* Bottom Flap */}
                    <div className="absolute bottom-0 w-0 h-0 border-l-[160px] border-r-[160px] border-b-[100px] border-l-transparent border-r-transparent border-b-[#cbad8d]" />
                    
                    {/* Side Flaps */}
                    <div className="absolute top-0 left-0 w-0 h-0 border-t-[110px] border-l-[80px] border-b-[100px] border-t-transparent border-l-[#e3d1ac] border-b-transparent opacity-90" />
                    <div className="absolute top-0 right-0 w-0 h-0 border-t-[110px] border-r-[80px] border-b-[100px] border-t-transparent border-r-[#e3d1ac] border-b-transparent opacity-90" />

                    {/* Top Flap (Closed) */}
                    <div className="absolute top-0 w-0 h-0 border-l-[160px] border-r-[160px] border-t-[110px] border-l-transparent border-r-transparent border-t-[#bfa07a] shadow-md origin-top z-10" />

                    {/* Wax Seal */}
                    <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 drop-shadow-xl">
                      <div className="w-16 h-16 bg-[#8b0000] rounded-full flex items-center justify-center border-4 border-[#600000] shadow-inner">
                        <Heart className="w-8 h-8 text-[#500000] fill-[#500000] opacity-80" />
                      </div>
                    </div>

                    <div className="absolute bottom-6 w-full text-center text-[#5c3a21] font-cursive text-2xl opacity-80 z-20 tracking-wider">
                      For You Mama
                    </div>
                  </motion.button>
                ) : (
                  <motion.div
                    key="opened-letter"
                    initial={{ opacity: 0, scale: 0.8, y: 100 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, type: "spring", bounce: 0.3 }}
                    className="relative w-full"
                  >
                    {/* Ancient Paper Texture */}
                    <div className="bg-[#f4e4bc] p-6 md:p-10 rounded-sm shadow-2xl transform rotate-1 border border-[#e6d2a0] relative max-h-[75vh] flex flex-col items-center w-full overflow-y-auto no-scrollbar">
                      {/* Grain Texture Overlay */}
                      <div className="absolute inset-0 opacity-[0.5] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none mix-blend-multiply"></div>
                      <div className="absolute inset-0 opacity-[0.2] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-100 to-amber-900 pointer-events-none"></div>
                      
                      <h2 className="text-4xl text-[#5c3a21] mb-6 text-center z-10 font-bold" style={{ fontFamily: 'Great Vibes, cursive' }}>Hey Mama,</h2>
                      
                      <div className="space-y-3 text-[#4a3728] text-lg md:text-xl leading-relaxed text-center font-handwriting font-semibold opacity-90 z-10">
                        <p>Being with you has brought a kind of peace I didn't know I needed.</p>
                        <p>I can't believe it was a year ago I was not sure if you'd say yes or not.</p>
                        <p>Thank you for your constant reassurances, for making me feel so safe, and for understanding me even without words.</p>
                        <p>We are so in sync, and I am endlessly grateful that in this big world, I found my person in you.</p>
                        <div className="pt-4 font-cursive text-2xl text-[#8b4513]">
                           <p>my achalugo i love you no take backs</p>
                           <p className="mt-2 text-right text-xl">~your princess</p>
                        </div>
                      </div>

                      {/* Quill Pen Decoration */}
                      <div className="absolute bottom-10 right-4 z-0 opacity-80 pointer-events-none transform rotate-[15deg] drop-shadow-md">
                        <Feather className="w-24 h-24 text-ink stroke-1" fill="rgba(74, 55, 40, 0.2)" />
                      </div>

                      <div className="mt-8 pb-4 flex justify-center w-full z-10">
                        <Button onClick={handleLetterContinue} variant="lavender" className="px-8 text-sm shadow-none bg-[#8b5e3c] hover:bg-[#6d4a2f] text-amber-50">
                          One last thing... <Sparkles className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* STAGE 6: THE QUESTION */}
          {stage === AppStage.QUESTION && (
            <motion.div
              key="question"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-md text-center flex flex-col items-center justify-center gap-6"
            >
              <div className="bg-white/30 backdrop-blur-2xl p-10 rounded-[3rem] shadow-xl w-full border border-white/20">
                <h1 className="text-6xl text-violet-600 mb-2 leading-tight py-2 font-cursive drop-shadow-sm">Ini...</h1>
                <h2 className="text-4xl text-slate-800 mb-10 font-cursive leading-snug">
                  Will you be my Valentine? 💗💜
                </h2>
                
                <div className="flex flex-col gap-4 relative min-h-[160px] justify-center items-center w-full">
                  <Button 
                    onClick={handleQuestionYes} 
                    variant="lavender"
                    className="z-20 text-xl py-6 w-64 shadow-violet-300/50 shadow-xl"
                  >
                    YES 💕
                  </Button>
                  
                  <motion.div
                    animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    style={{ position: 'relative', zIndex: 10 }}
                  >
                    <Button 
                      onClick={moveNoButton} 
                      onHoverStart={moveNoButton}
                      variant="outline"
                      className="text-slate-500 border-slate-400/30 text-sm py-2 px-8 hover:bg-white/20"
                    >
                      no
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STAGE 7: SUCCESS */}
          {stage === AppStage.SUCCESS && (
            <motion.div
              key="success"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={glassCardClass}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="drop-shadow-md"
              >
                <PartyPopper className="w-24 h-24 text-rose-500" />
              </motion.div>
              
              <div className="flex flex-col gap-4 text-center">
                <h1 className="text-6xl text-rose-500 font-cursive">VAMOS!!!</h1>
              </div>

              <div className="flex justify-center gap-6 py-4">
                <Heart className="text-rose-500 w-10 h-10 fill-current animate-[pulse_1s_ease-in-out_infinite]" />
                <Heart className="text-violet-500 w-10 h-10 fill-current animate-[pulse_1s_ease-in-out_infinite] delay-150" />
              </div>
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider opacity-70 flex items-center gap-2 justify-center font-sans">
                Screenshot this! <Camera className="w-4 h-4" />
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
      
      <footer className="absolute bottom-4 w-full text-center text-white/60 text-[10px] font-medium z-0 tracking-[0.2em] uppercase mix-blend-overlay">
        For Ini • Forever
      </footer>
    </div>
  );
};

export default App;