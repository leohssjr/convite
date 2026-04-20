import { useEffect, useState } from 'react';

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="loader" className={hidden ? 'hidden' : ''}>
      <svg className="loader-flower" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="12" r="7" fill="#F8DDE3" />
        <circle cx="48" cy="21" r="7" fill="#EFC8D2" />
        <circle cx="48" cy="39" r="7" fill="#D8B26E" />
        <circle cx="30" cy="48" r="7" fill="#F8DDE3" />
        <circle cx="12" cy="39" r="7" fill="#EFC8D2" />
        <circle cx="12" cy="21" r="7" fill="#D8B26E" />
        <circle cx="30" cy="30" r="9" fill="#C9828F" />
      </svg>
      <p className="loader-text">Preparando algo especial…</p>
    </div>
  );
}
