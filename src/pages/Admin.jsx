import { useState, useEffect } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { db } from '../firebase';
import { gifts, categories, TOTAL_GIFTS } from '../data/gifts';

const ADMIN_USER = 'laury';
const ADMIN_PASS = 'amomeunamorado';

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);

  const selectedCount = Object.keys(selected).length;

  // Listen to Firebase
  useEffect(() => {
    if (!authenticated) return;

    const selectedRef = ref(db, 'selectedGifts');
    const unsubscribe = onValue(
      selectedRef,
      (snapshot) => {
        setSelected(snapshot.val() || {});
        setLoading(false);
      },
      (error) => {
        console.error('Erro Firebase:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [authenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Usuário ou senha incorretos');
    }
  };

  const handleUnlock = (id) => {
    if (!window.confirm(`Desmarcar o presente Nº ${String(id).padStart(2, '0')}?`)) return;
    const giftRef = ref(db, `selectedGifts/${id}`);
    remove(giftRef).catch((err) => {
      console.error('Erro Firebase:', err);
      alert('Erro ao desmarcar: ' + err.message);
    });
  };

  // Build flat list of all gifts
  const allGifts = categories.flatMap(cat =>
    gifts[cat.key].map(item => ({ ...item, category: cat.label }))
  );

  if (!authenticated) {
    return (
      <div className="admin-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-icon">🔐</div>
          <h2 className="admin-login-title">Painel Administrativo</h2>
          <p className="admin-login-subtitle">Acesso restrito</p>
          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-field">
              <label htmlFor="admin-user">Usuário</label>
              <input
                id="admin-user"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                placeholder="Digite seu usuário"
              />
            </div>
            <div className="admin-field">
              <label htmlFor="admin-pass">Senha</label>
              <input
                id="admin-pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
              />
            </div>
            {loginError && <p className="admin-error">{loginError}</p>}
            <button type="submit" className="btn btn-primary admin-login-btn">
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-wrapper">
        <p className="loader-text">Carregando dados…</p>
      </div>
    );
  }

  return (
    <div className="admin-wrapper">
      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">🛠 Painel de Presentes</h1>
          <p className="admin-stats">
            <span className="admin-stat-number">{selectedCount}</span> de{' '}
            <span className="admin-stat-number">{TOTAL_GIFTS}</span> presentes escolhidos
          </p>
          <button
            className="btn btn-sm btn-link admin-logout"
            onClick={() => setAuthenticated(false)}
          >
            Sair
          </button>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nº</th>
                <th>Presente</th>
                <th>Categoria</th>
                <th>Status</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {allGifts.map(item => (
                <tr key={item.id} className={selected[item.id] ? 'row-selected' : ''}>
                  <td className="admin-td-number">{String(item.id).padStart(2, '0')}</td>
                  <td className="admin-td-name">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.name}
                    </a>
                  </td>
                  <td className="admin-td-category">{item.category}</td>
                  <td className="admin-td-status">
                    {selected[item.id] ? (
                      <span className="status-badge status-selected">Escolhido</span>
                    ) : (
                      <span className="status-badge status-available">Disponível</span>
                    )}
                  </td>
                  <td className="admin-td-action">
                    {selected[item.id] && (
                      <button
                        className="btn btn-sm admin-unlock-btn"
                        onClick={() => handleUnlock(item.id)}
                      >
                        🔓 Desmarcar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
