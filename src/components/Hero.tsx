
import React, { useEffect, useRef, useState } from 'react';

const SERVICES = [
  'Web Design',
  'Logos-Icons',
  'Digital Arts',
  'UI/UX Design',
  'Front-End',
  'Motion Graphic',
];

const YOUTUBE_VIDEO_ID = 'zFEv5KLY-QY';
const DURATION_FALLBACK = 260;

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

type WaveformProps = {
  isPlaying: boolean;
};

declare global {
  interface Window {
    YT: any;
  }
}

const ensureYouTubeAPI = () =>
  new Promise<void>((resolve) => {
    if (typeof window === 'undefined') return;
    if (window.YT?.Player) {
      resolve();
      return;
    }

    const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (existingScript) {
      const waitForYT = setInterval(() => {
        if (window.YT?.Player) {
          clearInterval(waitForYT);
          resolve();
        }
      }, 50);
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.async = true;
    tag.onload = () => {
      const waitForYT = setInterval(() => {
        if (window.YT?.Player) {
          clearInterval(waitForYT);
          resolve();
        }
      }, 50);
    };
    document.body.appendChild(tag);
  });

const Waveform: React.FC<WaveformProps> = ({ isPlaying }) => {
  const bars = [4, 6, 8, 5, 7, 6, 9];

  return (
    <div className="flex items-end space-x-[3px] h-5 text-blue-600">
      {bars.map((height, idx) => (
        <span
          key={idx}
          className="w-[2px] bg-current rounded-full origin-bottom"
          style={{
            height: `${height * 2}px`,
            animation: isPlaying ? `wave ${0.8 + idx * 0.05}s ease-in-out infinite alternate` : 'none',
            opacity: 0.4 + idx * 0.07,
          }}
        ></span>
      ))}
    </div>
  );
};

const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(DURATION_FALLBACK);
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef<any | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    const setupPlayer = async () => {
      await ensureYouTubeAPI();
      if (!isMounted || !playerContainerRef.current || !window.YT?.Player) return;

      playerRef.current = new window.YT.Player(playerContainerRef.current, {
        videoId: YOUTUBE_VIDEO_ID,
        height: '0',
        width: '0',
        playerVars: {
          controls: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            const videoDuration = Math.round(event.target.getDuration() || DURATION_FALLBACK);
            setDuration(videoDuration || DURATION_FALLBACK);
            setPlayerReady(true);
          },
          onStateChange: (event: any) => {
            const state = event.data;
            if (state === window.YT.PlayerState.ENDED) {
              setElapsed(0);
              if (playerRef.current?.seekTo) {
                playerRef.current.seekTo(0, true);
                playerRef.current.playVideo();
                setIsPlaying(true);
              }
            }
            if (state === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }
            if (state === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            }
          },
        },
      });
    };

    setupPlayer();

    return () => {
      isMounted = false;
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (!playerReady || !player) return;

    if (isPlaying) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
  }, [isPlaying, playerReady]);

  useEffect(() => {
    if (!isPlaying || !playerRef.current) return;
    const player = playerRef.current;

    const tick = setInterval(() => {
      const current = player.getCurrentTime ? player.getCurrentTime() : 0;
      setElapsed(Math.round(current));
    }, 500);

    return () => clearInterval(tick);
  }, [isPlaying]);

  const currentTime = formatTime(elapsed);
  const progress = duration ? Math.min((elapsed / duration) * 100, 100) : 0;
  const progressWidth = isPlaying ? `${Math.max(progress, 10)}%` : '10%';

  const handlePlayToggle = () => {
    if (!playerReady || !playerRef.current) {
      return;
    }

    const willPlay = !isPlaying;
    if (willPlay) {
      setElapsed(0);
      playerRef.current.seekTo(0, true);
    }
    setIsPlaying(willPlay);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      <div className="lg:col-span-8 space-y-10">
        <div className="flex items-center space-x-4">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <span className="text-[10px] uppercase tracking-[0.5em] text-theme-subtle font-bold italic">Independent Creative Unit</span>
        </div>
        
        <h1 className="text-8xl md:text-[100pt] font-black leading-[0.8] tracking-[-0.04em] uppercase select-none">
          Full Package <br />
          <span className="font-serif italic text-theme-subtle opacity-100 lowercase block ml-12 md:ml-32 mt-4 translate-y-[-1vw]">Software Developer</span>
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <p className="text-lg md:text-xl text-theme-muted max-w-lg font-light leading-relaxed">
            Crafting digital narratives that defy the noise. We believe in the power of brutal simplicity and technical mastery.
          </p>
          
          <div className="group/player relative inline-flex flex-col text-theme-subtle">
            <div className="flex items-center space-x-4 mb-3">
              <div className="w-1 h-[1px] bg-blue-600"></div>
              <span className="text-[9px] font-black uppercase tracking-[0.6em] text-blue-600 animate-pulse">
                Play to feel my vibe
              </span>
            </div>
            
            <div className="flex items-center space-x-6 bg-current/[0.03] border border-current/10 p-6 rounded-[10px] backdrop-blur-sm group-hover/player:border-blue-600/30 transition-all duration-500">
              <div ref={playerContainerRef} className="absolute opacity-0 pointer-events-none"></div>
              {/* Play Button */}
              <button 
                onClick={handlePlayToggle}
                className="w-14 h-14 rounded-full border border-current/10 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-500 relative group/btn"
              >
                {isPlaying ? (
                  <div className="flex space-x-1">
                    <div className="w-1 h-4 bg-current"></div>
                    <div className="w-1 h-4 bg-current"></div>
                  </div>
                ) : (
                  <div className="ml-1 w-0 h-0 border-y-[8px] border-y-transparent border-l-[12px] border-l-current group-hover/btn:border-l-white transition-colors"></div>
                )}
                {/* Pulsing ring when playing */}
                {isPlaying && <div className="absolute inset-0 border border-blue-600 rounded-full animate-ping opacity-20"></div>}
              </button>

              {/* Track Info */}
              <div className="flex flex-col">
                <div className="flex items-center space-x-3 mb-1">
                  <span className="text-[10px] font-mono opacity-30 uppercase tracking-widest">Nathan's Vibe</span>
                  <Waveform isPlaying={isPlaying} />
                </div>
                <div className="overflow-hidden w-40">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap animate-marquee">
                    Trinix, The Macarons Project - Too Sweet
                  </h4>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] font-mono opacity-40">{currentTime}</span>
                  <div className="w-24 h-[1px] bg-current/10 relative mx-3">
                    <div 
                      className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-1000"
                      style={{ width: progressWidth }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-mono opacity-40">02:44</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Vertical Scroller with Rotated Text */}
      <div className="hidden lg:block lg:col-span-4 h-[60vh] relative border-l border-theme">
        <div className="absolute inset-0 flex items-center justify-center">
          
          <div className="overflow-hidden h-full flex flex-col justify-center w-full items-center">
            <div className="animate-vertical-scroll space-y-20 will-change-transform">
              {[...SERVICES, ...SERVICES].map((service, idx) => (
                <div key={service + idx} className="flex flex-col items-center">
                  {/* Rotated text element */}
                  <div className="rotate-[-90deg] whitespace-nowrap">
                    <span
                      className="text-[16px] font-bold uppercase text-theme-primary cursor-default"
                      style={{ letterSpacing: '0.1em', wordSpacing: '0.2em' }}
                    >
                      {service}
                    </span>
                  </div>
                  <div className="h-12 w-[0.9px] bg-blue-600/0 mt-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes vertical-scroll {
          0% { transform: translate3d(0, 50%, 0); }
          100% { transform: translate3d(0, -50%, 0); }
        }
        .animate-vertical-scroll {
          animation: vertical-scroll 40s ease-in-out infinite alternate;
        }
        .animate-vertical-scroll:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 14s linear infinite;
        }
        @keyframes wave {
          0% { transform: scaleY(0.4); }
          50% { transform: scaleY(1.1); }
          100% { transform: scaleY(0.6); }
        }
      `}</style>
    </div>
  );
};

export default Hero;
