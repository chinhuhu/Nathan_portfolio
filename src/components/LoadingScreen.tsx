import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onFinished: () => void;
}

const WORDS = [
  'READY?',
  'SET',
  'WILD',
  'BOLD',
  'CRAZY',
  'VIVID',
  'LOUD',
  'FAST',
  'STIFF.',
  'GO!',
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [shakeIntensity, setShakeIntensity] = useState(0);

  useEffect(() => {
    const duration = 6500;
    const intervalTime = 16; // ~60fps
    const totalSteps = duration / intervalTime;
    let step = 0;

    const mainTimer = setInterval(() => {
      step++;
      const p = (step / totalSteps) * 100;
      setProgress(Math.min(p, 100));
      setShakeIntensity(p > 70 ? (p - 70) / 10 : 0);

      if (p >= 100) {
        clearInterval(mainTimer);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onFinished, 800);
        }, 400);
      }
    }, intervalTime);

    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 120);

    return () => {
      clearInterval(mainTimer);
      clearInterval(wordTimer);
    };
  }, [onFinished]);

  return (
    <div
      className={`fixed inset-0 z-[2000] flex items-center justify-center overflow-hidden transition-all duration-700 ${
        isExiting ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
      }`}
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text-primary)',
        transform: `translate(${Math.random() * shakeIntensity}px, ${Math.random() * shakeIntensity}px)`,
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full opacity-[0.03] transition-colors duration-100"
          style={{ backgroundColor: progress % 10 > 5 ? 'var(--color-accent)' : 'transparent' }}
        />
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-600/20"
            style={{
              width: Math.random() * 300 + 'px',
              height: '1px',
              top: Math.random() * 100 + '%',
              left: '-50%',
              transform: `translateX(${progress * 2}%) rotate(${Math.random() * 20 - 10}deg)`,
              transition: 'transform 0.1s linear',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="h-40 flex items-center justify-center mb-4">
          <span
            className={`text-8xl md:text-[14vw] font-black italic tracking-tighter uppercase transition-all duration-75 ${
              progress > 95 ? 'scale-110 text-blue-600' : 'scale-100'
            }`}
            style={{
              filter: `blur(${shakeIntensity}px)`,
              transform: `skewX(${Math.random() * shakeIntensity * 2 - shakeIntensity}deg)`,
            }}
          >
            {WORDS[wordIndex]}
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <div className="text-2xl font-mono font-black italic opacity-20">000</div>
          <div className="relative">
            <div className="text-6xl md:text-9xl font-black italic tabular-nums">
              {Math.floor(progress).toString().padStart(2, '0')}
            </div>
            <div className="absolute inset-0 opacity-20 text-blue-600 blur-sm translate-x-1 translate-y-1 select-none pointer-events-none">
              {Math.floor(progress).toString().padStart(2, '0')}
            </div>
          </div>
          <div className="text-2xl font-mono font-black italic text-blue-600">100</div>
        </div>

        <div className="mt-12 w-64 md:w-96 h-4 bg-current/5 rounded-full overflow-hidden p-1 border border-current/10">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-75 ease-out shadow-[0_0_20px_rgba(37,99,235,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-8 flex flex-col items-center">
          <span className="text-[10px] font-bold uppercase tracking-[1em] animate-bounce opacity-40">Buckle Up</span>
          <div className="mt-4 flex space-x-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  progress > (i + 1) * 30 ? 'bg-blue-600 scale-125' : 'bg-current/10'
                } transition-all duration-300`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-12 left-12 flex flex-col space-y-2 opacity-30">
        <div className="w-12 h-12 border-t-4 border-l-4 border-current"></div>
        <span className="text-[10px] font-black uppercase tracking-widest italic">Est_99</span>
      </div>
      <div className="absolute bottom-12 right-12 flex flex-col items-end space-y-2 opacity-30">
        <span className="text-[10px] font-black uppercase tracking-widest italic">Hyper_Drive</span>
        <div className="w-12 h-12 border-b-4 border-r-4 border-blue-600"></div>
      </div>

      <style>{`
        @keyframes strobe {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .strobe {
          animation: strobe 0.1s infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
