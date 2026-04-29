import React from 'react';
import { useNavigate } from 'react-router-dom';
import aboutHeroImage from '../assets/images/banner-hero-quienes-somos.svg';
import originalesRightImage from '../assets/images/100-originales-right-img.svg';

export default function QuienesSomosPage() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh' }}>
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: 720, background: '#0C0C12' }}>
        <img
          src={aboutHeroImage}
          alt="Quiénes somos"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,12,18,0.28) 0%, rgba(12,12,18,0.88) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,12,18,0.14) 0%, rgba(12,12,18,0.88) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', left: -103, top: 0, width: 357, height: 357, opacity: 0.5, borderRadius: 9999, border: '0.68px solid #FEFCE8', zIndex: 2 }} />
        <div style={{ position: 'absolute', left: -390, top: -286, width: 897, height: 897, opacity: 0.2, borderRadius: 9999, border: '1px solid #FEFCE8', zIndex: 4 }} />
        <div style={{ position: 'absolute', left: -320, top: -232, width: 707, height: 707, opacity: 0.3, borderRadius: 9999, border: '0.98px solid #FEFCE8', zIndex: 4 }} />

        <div style={{ position: 'absolute', left: 127, top: 321, display: 'inline-flex', flexDirection: 'column', gap: 3, zIndex: 5, maxWidth: 803 }}>
          <div style={{ color: '#FEFCE8', fontSize: 68, fontWeight: 800, lineHeight: 1.05, wordWrap: 'break-word' }}>
            Suplementos Deportivos
          </div>
          <div style={{ color: '#FDC700', fontSize: 68, fontWeight: 800, lineHeight: 1.05, wordWrap: 'break-word' }}>
            100% Originales
          </div>
          <div style={{ width: 835, color: '#FAFAFA', fontSize: 28, fontWeight: 500, lineHeight: '36px', wordWrap: 'break-word', marginTop: 8 }}>
            Potencia tu rendimiento con productos certificados y envíos seguros a toda Colombia
          </div>
        </div>
      </section>

      <div style={{ padding: '80px 68px', display: 'flex', flexDirection: 'column', gap: 70, maxWidth: 1200, margin: '0 auto' }}>
        <section style={{ display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 40, alignItems: 'center', minHeight: 360 }}>
          <div>
            <h2 style={{ fontSize: 40, fontWeight: 800, color: '#1F1F21', marginBottom: 18 }}>
              100% Originales
            </h2>
            <p style={{ fontSize: 20, lineHeight: '32px', color: '#4B5563', marginBottom: 28 }}>
              Encontrarás una variedad de productos de las mejores marcas diseñados para ayudarte a alcanzar tus metas fitness. Desde suplementación para subir de peso, definir o potenciar tu rendimiento.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 18 }}>
              {[
                'Productos originales y certificados',
                'Entrega segura a todo Colombia',
                'Asesoría de expertos en suplementos',
                'Marcas internacionales reconocidas'
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <span style={{ color: '#FFEB3B', fontSize: 20, marginTop: 2 }}>•</span>
                  <p style={{ margin: 0, color: '#4B5563', fontSize: 16, lineHeight: '26px' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 500, borderRadius: 32, overflow: 'hidden', boxShadow: '0 30px 80px rgba(15,23,42,0.1)' }}>
              <img src={originalesRightImage} alt="Productos originales" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: 40, fontWeight: 800, color: '#1F1F21', marginBottom: 32 }}>
            ¿Por qué elegirnos?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {[
              { icon: '✅', title: 'Autenticidad', desc: 'Todos nuestros productos son 100% originales y certificados.' },
              { icon: '🚚', title: 'Envíos rápidos', desc: 'Despatch express a toda Colombia con seguimiento en tiempo real.' },
              { icon: '💪', title: 'Calidad premium', desc: 'Trabajamos con marcas líderes del mercado deportivo.' },
              { icon: '🤝', title: 'Confianza', desc: 'Más de 8 años construyendo relaciones sólidas con nuestros clientes.' }
            ].map(item => (
              <div key={item.title} style={{ background: 'white', borderRadius: 24, padding: 30, boxShadow: '0 18px 50px rgba(15,23,42,0.08)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: '#FFEB3B', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, fontSize: 22 }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#111827' }}>{item.title}</h3>
                <p style={{ margin: 0, color: '#4B5563', fontSize: 16, lineHeight: '26px' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#1F1F21', borderRadius: 28, padding: '50px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, textAlign: 'center' }}>
          <div style={{ maxWidth: 720 }}>
            <h2 style={{ color: 'white', fontSize: 42, fontWeight: 800, lineHeight: '1.05', margin: 0 }}>
              ¿Listo para alcanzar tus objetivos?
            </h2>
            <p style={{ color: '#A4A39F', fontSize: 18, lineHeight: '28px', marginTop: 18 }}>
              Únete a miles de atletas que confían en nosotros para sus suplementos deportivos.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/catalogo')}
              style={{ minWidth: 220, padding: '14px 32px', background: '#FFEB3B', color: '#1F1F21', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}
            >
              Ver productos
            </button>
            <button
              onClick={() => navigate('/catalogo')}
              style={{ minWidth: 220, padding: '14px 32px', background: 'transparent', border: '1px solid #FFEB3B', borderRadius: 14, color: '#FFEB3B', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}
            >
              Habla por WhatsApp
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
