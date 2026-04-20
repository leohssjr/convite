import { useRef, useState, useCallback } from 'react';

export default function FabButtons() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

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
