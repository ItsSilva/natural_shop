import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, total, itemCount } = useCart();
  const navigate = useNavigate();

  const formatPrice = (p) => '$' + p.toLocaleString('es-CO');

  if (cartItems.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <span style={{ fontSize: 64 }}>🛒</span>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1F1F21' }}>Tu carrito está vacío</h2>
        <p style={{ color: '#6A7282', fontSize: 16 }}>Agrega productos para continuar</p>
        <button
          onClick={() => navigate('/catalogo')}
          style={{
            marginTop: 8,
            padding: '12px 32px',
            background: '#1F1F21',
            color: 'white',
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Ver productos
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh', padding: '40px 68px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, color: '#1F1F21', marginBottom: 8 }}>
        Tu Carrito
      </h1>
      <p style={{ color: '#6A7282', fontSize: 16, marginBottom: 32 }}>
        {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
      </p>

      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Items */}
        <div style={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {cartItems.map(item => (
            <div key={item.key} style={{
              background: 'white',
              borderRadius: 10,
              boxShadow: '0px 2px 10px rgba(0,0,0,0.06)',
              padding: 20,
              display: 'flex',
              gap: 20,
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 8, background: '#DCDCDC', flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 160 }}>
                <p style={{ color: '#6A7282', fontSize: 12, marginBottom: 2 }}>{item.brand}</p>
                <p style={{ color: '#0A0A0A', fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{item.name}</p>
                {item.flavor && (
                  <p style={{ color: '#6A7282', fontSize: 13 }}>Sabor: {item.flavor}</p>
                )}
                <p style={{ color: '#0A0A0A', fontSize: 20, fontWeight: 900, marginTop: 8 }}>
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
              {/* Quantity */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid #E5E7EB', borderRadius: 8, overflow: 'hidden' }}>
                <button
                  onClick={() => updateQuantity(item.key, item.quantity - 1)}
                  style={{ width: 36, height: 36, background: 'white', border: 'none', fontSize: 16, cursor: 'pointer' }}
                >-</button>
                <span style={{ padding: '0 12px', fontSize: 14, fontWeight: 600 }}>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.key, item.quantity + 1)}
                  style={{ width: 36, height: 36, background: 'white', border: 'none', fontSize: 16, cursor: 'pointer' }}
                >+</button>
              </div>
              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.key)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#99A1AF',
                  fontSize: 20,
                  cursor: 'pointer',
                  padding: 8,
                  flexShrink: 0
                }}
              >✕</button>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div style={{
          width: 360,
          background: 'white',
          borderRadius: 10,
          boxShadow: '0px 2px 10px rgba(0,0,0,0.06)',
          padding: 24,
          position: 'sticky',
          top: 100,
          flexShrink: 0
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1F1F21', marginBottom: 20 }}>
            Resumen del pedido
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            {cartItems.map(item => (
              <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#6A7282' }}>
                <span>{item.name} x{item.quantity}</span>
                <span style={{ fontWeight: 600, color: '#0A0A0A' }}>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 16, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#6A7282', marginBottom: 8 }}>
              <span>Subtotal</span>
              <span style={{ color: '#0A0A0A', fontWeight: 600 }}>{formatPrice(total)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#6A7282', marginBottom: 8 }}>
              <span>Envío</span>
              <span style={{ color: total >= 150000 ? '#22C55E' : '#0A0A0A', fontWeight: 600 }}>
                {total >= 150000 ? 'GRATIS' : formatPrice(15000)}
              </span>
            </div>
            {total < 150000 && (
              <p style={{ fontSize: 12, color: '#6A7282', marginBottom: 8 }}>
                Agrega {formatPrice(150000 - total)} más para envío gratis 🚚
              </p>
            )}
          </div>

          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: 20, fontWeight: 900, color: '#0A0A0A',
            marginBottom: 24
          }}>
            <span>Total</span>
            <span>{formatPrice(total >= 150000 ? total : total + 15000)}</span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            style={{
              width: '100%',
              padding: '14px',
              background: '#1F1F21',
              color: 'white',
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              marginBottom: 12,
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#333'}
            onMouseLeave={e => e.currentTarget.style.background = '#1F1F21'}
          >
            Proceder al pago
          </button>
          <button
            onClick={() => navigate('/catalogo')}
            style={{
              width: '100%',
              padding: '12px',
              background: 'transparent',
              color: '#1F1F21',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              border: '1px solid #E5E7EB'
            }}
          >
            Continuar comprando
          </button>

          {/* Trust */}
          <div style={{ marginTop: 16, textAlign: 'center', color: '#99A1AF', fontSize: 12 }}>
            🔒 Pago 100% seguro | Productos originales garantizados
          </div>
        </div>
      </div>
    </div>
  );
}
