import { useRef, useState, useCallback, useEffect } from 'react';

export default function FabButtons() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Auto-play music on first user interaction (browsers block autoplay without gesture)
  useEffect(() => {
    const startMusic = () => {
      const audio = audioRef.current;
      if (audio && !playing) {
        audio.play().then(() => {
          setPlaying(true);
        }).catch(() => {});
      }
      // Remove all listeners after first interaction
      ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt =>
        document.removeEventListener(evt, startMusic, { capture: true })
      );
    };

    ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt =>
      document.addEventListener(evt, startMusic, { capture: true, once: false })
    );

    return () => {
      ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt =>
        document.removeEventListener(evt, startMusic, { capture: true })
      );
    };
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying(prev => !prev);
  }, [playing]);

  return (
    <>
      <button className="music-btn" onClick={toggleMusic} title="Música">
        {playing ? '🔇' : '🎵'}
      </button>
      <audio ref={audioRef} loop>
        <source src="/barbie-dreamhouse.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}

