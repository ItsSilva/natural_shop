import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BrandCard({ brand }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/catalogo?marca=${brand.id}`)}
      style={{
        padding: 30,
        background: 'white',
        boxShadow: '0px 2px 10px rgba(0,0,0,0.06)',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 15,
        cursor: 'pointer',
        minWidth: 180,
        transition: 'transform 0.2s, box-shadow 0.2s'
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
        alignSelf: 'stretch',
        height: 134,
        paddingLeft: 31,
        paddingRight: 31,
        paddingTop: 14,
        paddingBottom: 14,
        background: 'radial-gradient(ellipse 50% 50% at 50% 50%, #7F7F87 0%, #282829 100%)',
        borderRadius: 67,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <span style={{ color: 'white', fontSize: 14, fontWeight: 700, textAlign: 'center', whiteSpace: 'pre-line' }}>
          {brand.name}
        </span>
      </div>
      <p style={{
        textAlign: 'center',
        color: '#1F1F21',
        fontSize: 18,
        fontWeight: 600,
        lineHeight: '18px',
        letterSpacing: 0.35,
        whiteSpace: 'pre-line'
      }}>
        {brand.name}
      </p>
    </div>
  );
}
