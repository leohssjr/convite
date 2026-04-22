import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section id="home">
        <p className="hero-eyebrow">✦ Você está convidado(a) ✦</p>
        <h1 className="hero-title">Chá de <em>Casa Nova</em></h1>
        <p className="hero-name">da Laury</p>

        <div className="hero-divider">
          <div className="hero-divider-line rev"></div>
          <span> ❤ </span>
          <div className="hero-divider-line"></div>
        </div>

        <div className="hero-info">
          <div className="info-item">
            <p className="info-label">📅 Data</p>
            <p className="info-value">20 de Junho de 2026 às 15:00</p>
          </div>
          <div className="info-item">
            <p className="info-label">📍 Local</p>
            <p className="info-value">Cond. Parque Clube II, Valparaíso 2</p>
          </div>
        </div>

        <p className="hero-phrase">Venha celebrar esse novo começo comigo.</p>

        <div className="hero-buttons">
          <a href="https://forms.gle/qQZBpixQbcGekLoM7" target="_blank" rel="noopener noreferrer" className="btn btn-primary">✅ Confirmar Presença</a>
          <a href="https://maps.app.goo.gl/kMKJgxSZ28ZXpf8P7" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">📍 Localização</a>
          <Link to="/presentes" className="btn btn-secondary">🎁 Lista de Presentes</Link>
        </div>
      </section>
    </>
  );
}
