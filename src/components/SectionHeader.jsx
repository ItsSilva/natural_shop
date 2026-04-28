import React from 'react';
import { Link } from 'react-router-dom';

export default function SectionHeader({ title, linkTo, linkLabel = 'Ver más' }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 0
    }}>
      <h2 style={{
        color: '#1F1F21',
        fontSize: 32,
        fontWeight: 700,
        lineHeight: '48px',
        letterSpacing: 0.35
      }}>
        {title}
      </h2>
      {linkTo && (
        <Link to={linkTo} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          color: '#1F1F21',
          fontSize: 16,
          fontWeight: 500,
          lineHeight: '16px',
          letterSpacing: 0.35
        }}>
          {linkLabel}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="#1F1F21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}
    </div>
  );
}
