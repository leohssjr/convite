import { useCallback } from 'react';

export default function GiftCard({ item, isSelected, onToggle }) {
  const spawnHearts = useCallback((cardEl) => {
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    ['💕', '✨', '🌸'].forEach((emoji, i) => {
      const el = document.createElement('div');
      el.textContent = emoji;
      el.style.cssText = `
        position:fixed;
        left:${rect.left + rect.width / 2 + (i - 1) * 20}px;
        top:${rect.top + rect.height / 2}px;
        font-size:1.2rem; pointer-events:none; z-index:300;
        animation:fadeUp .9s ease forwards;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1000);
    });
  }, []);

  const handleToggle = useCallback((e) => {
    onToggle(item.id);
    if (!isSelected) {
      spawnHearts(e.currentTarget.closest('.gift-card'));
    }
  }, [item.id, isSelected, onToggle, spawnHearts]);

  return (
    <div className={`gift-card${isSelected ? ' selected' : ''}`} id={`card-${item.id}`}>
      <p className="gift-number">Nº {String(item.id).padStart(2, '0')}</p>
      <p className="gift-name">{item.name}</p>
      <p className="selected-badge">✔ Já escolhido</p>
      <div className="gift-actions">
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-link">
          Ver Produto
        </a>
        <button className="btn btn-sm btn-select" onClick={handleToggle}>
          {isSelected ? '✔ Selecionado' : 'Vou Presentear'}
        </button>
      </div>
    </div>
  );
}
