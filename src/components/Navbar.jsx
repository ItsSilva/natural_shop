import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { itemCount } = useCart();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/catalogo?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Top announcement bar */}
      <div style={{
        background: '#FFEB3B',
        padding: '10px',
        textAlign: 'center',
        color: 'black',
        fontSize: 16,
        fontWeight: 500,
        lineHeight: '24px'
      }}>
        Envíos a toda Colombia | Pago 100% seguro | Productos originales garantizados
      </div>

      {/* Main nav */}
      <nav style={{
        background: '#1F1F21',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: 'white', fontSize: 24, fontWeight: 900, letterSpacing: 0.07 }}>NATURAL</span>
          <span style={{ color: '#FDC700', fontSize: 24, fontWeight: 900, letterSpacing: 0.07 }}>SHOP</span>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <NavLink to="/catalogo">Categorias</NavLink>
          <NavLink to="/marcas" isYellow>Marcas</NavLink>
          <NavLink to="/combos">Combos</NavLink>
          <NavLink to="/quienes-somos">Quienes Somos</NavLink>
        </div>

        {/* Right side: search + icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <form onSubmit={handleSearch}>
            <div style={{ position: 'relative', width: 320 }}>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar productos..."
                style={{
                  width: '100%',
                  height: 48,
                  paddingTop: 12,
                  paddingBottom: 12,
                  paddingLeft: 44,
                  paddingRight: 16,
                  background: 'linear-gradient(0deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.05) 100%), #1F1F21',
                  border: '1px solid #4F4F4F',
                  borderRadius: 10,
                  color: 'rgba(255,255,255,0.50)',
                  fontSize: 16,
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="7.5" cy="7.5" r="6" stroke="#99A1AF" strokeWidth="1.5" />
                <line x1="12" y1="12" x2="16.5" y2="16.5" stroke="#99A1AF" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </form>

          {/* Cart icon */}
          <Link to="/carrito" style={{ position: 'relative', color: 'white' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FAFAFA" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {itemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: -6,
                right: -6,
                background: '#FDC700',
                color: '#000',
                borderRadius: '50%',
                width: 18,
                height: 18,
                fontSize: 11,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {itemCount}
              </span>
            )}
          </Link>

          {/* User icon */}
          <button style={{ background: 'none', color: 'white' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#FAFAFA" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 10a4 4 0 100-8 4 4 0 000 8z" />
              <path d="M2.5 18.33a9.17 9.17 0 0115 0" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}

function NavLink({ to, children, isYellow }) {
  return (
    <Link
      to={to}
      style={{
        padding: 10,
        color: isYellow ? '#FFEB3B' : '#FAFAFA',
        fontSize: 18,
        fontWeight: isYellow ? 700 : 500,
        transition: 'opacity 0.2s'
      }}
    >
      {children}
    </Link>
  );
}
