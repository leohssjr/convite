import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <Link to="/" className="nav-logo">Chá de Casa Nova 🌸</Link>
      <div className="nav-links">
        <Link to="/">Início</Link>
        <Link to="/presentes">Presentes</Link>
        <a href="/#presenca">Presença</a>
      </div>
    </nav>
  );
}
