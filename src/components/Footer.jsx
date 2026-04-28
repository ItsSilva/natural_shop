import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: 'black', color: 'white', fontFamily: 'Inter' }}>
      <div style={{ padding: '48px 132px', display: 'flex', gap: 32, justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {/* Brand col */}
        <div style={{ width: 288, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <span style={{ color: 'white', fontSize: 24, fontWeight: 900, letterSpacing: 0.07 }}>NATURAL</span>
            <span style={{ color: '#FDC700', fontSize: 24, fontWeight: 900, letterSpacing: 0.07 }}>SHOP</span>
          </div>
          <p style={{ color: '#99A1AF', fontSize: 16, lineHeight: '24px' }}>
            Tu tienda de confianza para suplementos deportivos 100% originales en Colombia.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <FooterContact icon="📍" text="Calle 123 #45-67, Bogotá D.C., Colombia" />
            <FooterContact icon="📞" text="+57 300 123 4567" />
            <FooterContact icon="✉️" text="info@naturalshopcol.com" />
          </div>
        </div>

        {/* Categorías col */}
        <FooterCol title="Categorías" links={[
          'Proteínas', 'Creatina', 'Pre-Entrenos', 'Vitaminas', 'Quemadores', 'Ofertas'
        ]} />

        {/* Servicio col */}
        <FooterCol title="Servicio al Cliente" links={[
          'Quiénes Somos', 'Contacto', 'Envíos', 'Cambios y Devoluciones', 'Política de Privacidad', 'Términos y Condiciones'
        ]} />

        {/* Horarios col */}
        <div style={{ width: 288 }}>
          <p style={{ color: '#FDC700', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Horarios de Atención</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <HorarioItem day="Lunes a Viernes" hours="9:00 AM - 8:00 PM" />
            <HorarioItem day="Sábado" hours="9:00 AM - 4:00 PM" />
            <HorarioItem day="Domingo" hours="10:00 AM - 5:00 PM" />
          </div>
        </div>
      </div>

      {/* Payment methods */}
      <div style={{ borderTop: '1px solid #1E2939', padding: '32px 132px' }}>
        <p style={{ textAlign: 'center', color: 'white', fontSize: 16, fontWeight: 500, marginBottom: 16 }}>
          Métodos de Pago Seguros
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          {['PSE', 'Wompi', 'VISA', 'Mastercard', 'American Express', '🔒 Pago Seguro'].map(pm => (
            <span key={pm} style={{
              background: '#101828',
              borderRadius: 10,
              padding: '8px 16px',
              color: 'white',
              fontSize: 14,
              fontWeight: 500
            }}>
              {pm}
            </span>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div style={{ padding: '24px 132px', borderTop: '1px solid #1E2939', textAlign: 'center' }}>
        <p style={{ color: '#99A1AF', fontSize: 14 }}>
          © 2026 Natural Shop Colombia. Todos los derechos reservados.
        </p>
        <p style={{ color: '#99A1AF', fontSize: 14, marginTop: 4 }}>
          Somos una empresa colombiana comprometida con tu bienestar. Todos nuestros productos son 100% originales y cuentan con garantía.
        </p>
      </div>
    </footer>
  );
}

function FooterContact({ icon, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ color: '#FDC700', fontSize: 14 }}>{icon}</span>
      <span style={{ color: '#99A1AF', fontSize: 14 }}>{text}</span>
    </div>
  );
}

function FooterCol({ title, links }) {
  return (
    <div style={{ width: 288 }}>
      <p style={{ color: '#FDC700', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {links.map(link => (
          <a key={link} href="#" style={{ color: '#99A1AF', fontSize: 14 }}>{link}</a>
        ))}
      </div>
    </div>
  );
}

function HorarioItem({ day, hours }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
      <span style={{ color: '#FDC700', fontSize: 14, marginTop: 2 }}>🕐</span>
      <div>
        <p style={{ color: 'white', fontSize: 14, fontWeight: 500 }}>{day}</p>
        <p style={{ color: '#99A1AF', fontSize: 14 }}>{hours}</p>
      </div>
    </div>
  );
}
