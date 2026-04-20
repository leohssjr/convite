export default function FloralBackground() {
  return (
    <div className="floral-bg">
      <svg viewBox="0 0 300 300" style={{ width: 340, top: -80, left: -80, opacity: 0.18 }} fill="none">
        <circle cx="150" cy="60" r="40" fill="#F8DDE3" />
        <circle cx="240" cy="110" r="30" fill="#EFC8D2" />
        <circle cx="200" cy="200" r="50" fill="#F8DDE3" />
        <circle cx="80" cy="180" r="35" fill="#EFC8D2" />
        <circle cx="60" cy="90" r="28" fill="#D8B26E" />
        <circle cx="150" cy="150" r="25" fill="#C9828F" />
      </svg>
      <svg viewBox="0 0 200 200" style={{ width: 260, bottom: 60, right: -50, opacity: 0.13 }} fill="none">
        <circle cx="100" cy="40" r="30" fill="#EFC8D2" />
        <circle cx="160" cy="80" r="22" fill="#F8DDE3" />
        <circle cx="140" cy="150" r="35" fill="#D8B26E" />
        <circle cx="50" cy="130" r="25" fill="#EFC8D2" />
        <circle cx="40" cy="65" r="20" fill="#F8DDE3" />
        <circle cx="100" cy="105" r="20" fill="#C9828F" />
      </svg>
      <svg viewBox="0 0 200 200" style={{ width: 180, top: '40%', left: 'calc(50% - 90px)', opacity: 0.08 }} fill="none">
        <circle cx="100" cy="40" r="26" fill="#D8B26E" />
        <circle cx="155" cy="75" r="20" fill="#F8DDE3" />
        <circle cx="135" cy="140" r="28" fill="#EFC8D2" />
        <circle cx="65" cy="140" r="22" fill="#D8B26E" />
        <circle cx="45" cy="75" r="20" fill="#F8DDE3" />
        <circle cx="100" cy="100" r="18" fill="#C9828F" />
      </svg>
    </div>
  );
}
