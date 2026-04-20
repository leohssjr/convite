import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import GiftCard from '../components/GiftCard';
import { gifts, categories, STORAGE_KEY, TOTAL_GIFTS } from '../data/gifts';

function getSelected() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveSelected(obj) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

export default function Presentes() {
  const [selected, setSelected] = useState(getSelected);

  const selectedCount = Object.keys(selected).length;
  const fillPercent = (selectedCount / TOTAL_GIFTS) * 100;

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleToggle = useCallback((id) => {
    setSelected(prev => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = true;
      }
      saveSelected(next);
      return next;
    });
  }, []);

  return (
    <section id="presentes">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Link to="/" className="back-link">← Voltar ao Início</Link>
      </div>

      <div className="section-header reveal">
        <p className="section-eyebrow">✦ Com carinho ✦</p>
        <h2 className="section-title">Lista de Presentes</h2>
        <p className="section-subtitle">Clique em "Vou Presentear" para reservar um item 💝</p>
      </div>

      <div className="counter-bar reveal">
        <p className="counter-text">
          <span>{selectedCount}</span> de <span>{TOTAL_GIFTS}</span> presentes escolhidos
        </p>
        <div className="counter-track">
          <div className="counter-fill" style={{ width: `${fillPercent}%` }}></div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {categories.map(cat => (
          <div className="category-group reveal" key={cat.key}>
            <h3 className="category-title">{cat.label}</h3>
            <div className="gifts-grid">
              {gifts[cat.key].map(item => (
                <GiftCard
                  key={item.id}
                  item={item}
                  isSelected={!!selected[item.id]}
                  onToggle={handleToggle}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
