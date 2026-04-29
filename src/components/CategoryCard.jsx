import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CategoryCard({ category }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/catalogo?categoria=${category.id}`)}
      style={{
        background: 'white',
        borderRadius: 28,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 18,
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0px 20px 60px rgba(15, 23, 42, 0.08)',
        width: '100%'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0px 8px 20px rgba(0,0,0,0.10)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0px 2px 10px rgba(0,0,0,0.06)';
      }}
    >
      <div style={{
        width: 144,
        height: 144,
        borderRadius: '50%',
        background: '#111827',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: 48 }}>{category.icon}</span>
      </div>
      <p style={{
        textAlign: 'center',
        color: '#111827',
        fontSize: 18,
        fontWeight: 700,
        lineHeight: '24px',
        letterSpacing: 0.35,
        margin: 0
      }}>
        {category.name}
      </p>
    </div>
  );
}
