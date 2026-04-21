import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../firebase';
import GiftCard from '../components/GiftCard';
import { gifts, categories, TOTAL_GIFTS } from '../data/gifts';

export default function Presentes() {
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);

  const selectedCount = Object.keys(selected).length;
  const fillPercent = (selectedCount / TOTAL_GIFTS) * 100;

  // Listen to Firebase Realtime Database for changes
  useEffect(() => {
    const selectedRef = ref(db, 'selectedGifts');

    // Timeout fallback in case Firebase can't connect
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn('Firebase timeout — carregando sem dados remotos');
        setLoading(false);
      }
    }, 5000);

    const unsubscribe = onValue(
      selectedRef,
      (snapshot) => {
        clearTimeout(timeout);
        const data = snapshot.val() || {};
        setSelected(data);
        setLoading(false);
      },
      (error) => {
        clearTimeout(timeout);
        console.error('Erro ao conectar ao Firebase:', error);
        setLoading(false);
      }
    );

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  // Scroll reveal observer
  useEffect(() => {
    if (loading) return;
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
    // Small delay to ensure DOM is rendered
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 100);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [loading]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleToggle = useCallback((id) => {
    // If already selected, do nothing — only admin can unlock
    if (selected[id]) return;

    const giftRef = ref(db, `selectedGifts/${id}`);
    set(giftRef, true).catch((err) => {
      console.error('Erro Firebase:', err);
      alert('Erro ao marcar presente: ' + err.message);
    });
  }, [selected]);

  if (loading) {
    return (
      <section id="presentes" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="loader-text">Carregando presentes…</p>
      </section>
    );
  }

  return (
    <section id="presentes">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Link to="/" className="back-link">← Voltar ao Início</Link>
      </div>

      <div className="section-header reveal">
        <p className="section-eyebrow">✦ Com carinho ✦</p>
        <h2 className="section-title">Lista de Presentes</h2>
        <p className="section-subtitle" style={{ maxWidth: 520, margin: '16px auto 0', lineHeight: 1.8 }}>
          Oi, pessoal!<br />
          Montei essa lista de presentes com carinho, pensando no que vai me ajudar nessa nova fase. Também deixei alguns links pra facilitar, mas fiquem totalmente à vontade pra escolher onde comprar.<br />
          E claro, se quiserem surpreender com algo fora da lista, vai ser incrível também!
        </p>
        <p className="section-subtitle" style={{ marginTop: 20 }}>Clique em "Vou Presentear" para reservar um item 💝</p>
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
