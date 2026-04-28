import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, total } = useCart();
  const formatPrice = (p) => '$' + p.toLocaleString('es-CO');

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh', padding: '40px 68px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, color: '#1F1F21', marginBottom: 8 }}>Checkout</h1>
      <p style={{ color: '#6A7282', marginBottom: 32 }}>Completa tu pedido</p>

      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Form */}
        <div style={{ flex: 1, minWidth: 300 }}>
          <div style={{ background: 'white', borderRadius: 10, boxShadow: '0px 2px 10px rgba(0,0,0,0.06)', padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Información de envío</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { label: 'Nombre', placeholder: 'Tu nombre' },
                { label: 'Apellido', placeholder: 'Tu apellido' },
                { label: 'Correo electrónico', placeholder: 'correo@ejemplo.com', full: true },
                { label: 'Teléfono', placeholder: '+57 300 000 0000' },
                { label: 'Ciudad', placeholder: 'Bogotá' },
                { label: 'Dirección', placeholder: 'Cra 1 # 2-3', full: true },
                { label: 'Barrio', placeholder: 'Tu barrio' },
                { label: 'Código postal', placeholder: '110111' },
              ].map(field => (
                <div key={field.label} style={{ gridColumn: field.full ? '1 / -1' : 'auto' }}>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#1F1F21', marginBottom: 6 }}>
                    {field.label}
                  </label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #E5E7EB',
                      borderRadius: 8,
                      fontSize: 14,
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: 10, boxShadow: '0px 2px 10px rgba(0,0,0,0.06)', padding: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Método de pago</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['PSE', 'Wompi', 'Tarjeta de crédito / débito', 'Contra entrega'].map(method => (
                <label key={method} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '12px 16px', border: '1px solid #E5E7EB', borderRadius: 8 }}>
                  <input type="radio" name="payment" defaultChecked={method === 'PSE'} style={{ accentColor: '#1F1F21' }} />
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#1F1F21' }}>{method}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div style={{ width: 360, background: 'white', borderRadius: 10, boxShadow: '0px 2px 10px rgba(0,0,0,0.06)', padding: 24, flexShrink: 0, position: 'sticky', top: 100 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Resumen</h2>
          {cartItems.map(item => (
            <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
              <span style={{ color: '#6A7282' }}>{item.name} x{item.quantity}</span>
              <span style={{ fontWeight: 600 }}>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 16, marginTop: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#6A7282', marginBottom: 8 }}>
              <span>Envío</span>
              <span style={{ color: total >= 150000 ? '#22C55E' : '#0A0A0A' }}>
                {total >= 150000 ? 'GRATIS' : formatPrice(15000)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 900, marginTop: 8 }}>
              <span>Total</span>
              <span>{formatPrice(total >= 150000 ? total : total + 15000)}</span>
            </div>
          </div>
          <button
            style={{
              width: '100%',
              padding: '14px',
              marginTop: 20,
              background: '#1F1F21',
              color: 'white',
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Confirmar pedido
          </button>
          <p style={{ textAlign: 'center', color: '#99A1AF', fontSize: 12, marginTop: 12 }}>
            🔒 Pago 100% seguro • Productos originales garantizados
          </p>
        </div>
      </div>
    </div>
  );
}
