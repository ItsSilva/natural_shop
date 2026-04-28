import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuienesSomosPage() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1F1F21 0%, #343438 100%)',
        padding: '80px 68px',
        color: 'white'
      }}>
        <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16 }}>
          Quiénes Somos
        </h1>
        <p style={{ fontSize: 20, fontWeight: 400, color: '#B3B1A9', maxWidth: 600 }}>
          Tu tienda de confianza para suplementos deportivos 100% originales en Colombia.
        </p>
      </div>

      <div style={{ padding: '60px 68px', display: 'flex', flexDirection: 'column', gap: 60 }}>
        {/* Mission */}
        <div style={{ display: 'flex', gap: 60, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: '#1F1F21', marginBottom: 16 }}>
              Nuestra Misión
            </h2>
            <p style={{ fontSize: 16, color: '#6A7282', lineHeight: '24px', marginBottom: 16 }}>
              En Natural Shop Colombia, somos una empresa comprometida con el bienestar de cada atleta y persona activa del país. Nuestro objetivo es ofrecer suplementos deportivos 100% originales y certificados al mejor precio.
            </p>
            <p style={{ fontSize: 16, color: '#6A7282', lineHeight: '24px' }}>
              Trabajamos directamente con las marcas más reconocidas a nivel mundial para garantizar la autenticidad y calidad de cada producto que llega a tus manos.
            </p>
          </div>
          <div style={{
            flex: 1, minWidth: 280,
            background: '#FFEB3B',
            borderRadius: 16,
            padding: 40,
            display: 'flex', flexDirection: 'column', gap: 16
          }}>
            {[
              { num: '50.000+', label: 'Clientes satisfechos' },
              { num: '200+', label: 'Productos disponibles' },
              { num: '5', label: 'Tiendas en Colombia' },
              { num: '8', label: 'Años de experiencia' },
            ].map(stat => (
              <div key={stat.num}>
                <p style={{ fontSize: 36, fontWeight: 900, color: '#1F1F21' }}>{stat.num}</p>
                <p style={{ fontSize: 14, fontWeight: 500, color: '#544C2B' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: '#1F1F21', marginBottom: 24 }}>
            Nuestros Valores
          </h2>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { icon: '✅', title: 'Autenticidad', desc: 'Todos nuestros productos son 100% originales con garantía de autenticidad.' },
              { icon: '🚚', title: 'Rapidez', desc: 'Envíos express disponibles a toda Colombia con seguimiento en tiempo real.' },
              { icon: '💪', title: 'Calidad', desc: 'Solo trabajamos con las mejores marcas internacionales del mercado.' },
              { icon: '🤝', title: 'Confianza', desc: 'Más de 8 años construyendo relaciones sólidas con nuestros clientes.' },
            ].map(v => (
              <div key={v.title} style={{
                flex: '1 1 220px',
                background: 'white',
                borderRadius: 12,
                padding: 24,
                boxShadow: '0px 2px 10px rgba(0,0,0,0.06)'
              }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{v.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1F1F21', marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: 14, color: '#6A7282', lineHeight: '20px' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          background: '#1F1F21',
          borderRadius: 16,
          padding: 48,
          textAlign: 'center'
        }}>
          <h2 style={{ color: 'white', fontSize: 32, fontWeight: 700, marginBottom: 12 }}>
            ¿Listo para comenzar?
          </h2>
          <p style={{ color: '#A4A39F', fontSize: 18, marginBottom: 24 }}>
            Explora nuestro catálogo y encuentra el suplemento ideal para tus objetivos
          </p>
          <button
            onClick={() => navigate('/catalogo')}
            style={{
              padding: '14px 40px',
              background: '#FFEB3B',
              color: 'black',
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Ver todos los productos
          </button>
        </div>
      </div>
    </div>
  );
}
