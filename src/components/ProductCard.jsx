import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, product.flavors[0]);
  };

  const formatPrice = (price) =>
    '$' + price.toLocaleString('es-CO');

  return (
    <div
      onClick={() => navigate(`/producto/${product.id}`)}
      style={{
        width: '100%',
        boxShadow: '0px 24px 80px rgba(15, 23, 42, 0.06)',
        borderRadius: 24,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        flexShrink: 0,
        overflow: 'hidden',
        background: 'white'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0px 8px 24px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0px 2px 10px rgba(0,0,0,0.06)';
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 225, background: '#F3F4F6' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            background: '#F3F4F6'
          }}
        />
        {product.badge && (
          <div style={{
            position: 'absolute',
            top: 15,
            left: 15,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 5,
            paddingBottom: 5,
            background: product.badgeColor,
            borderRadius: 20
          }}>
            <span style={{ color: 'white', fontSize: 12, fontWeight: 700, lineHeight: '16px' }}>
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{
        padding: '25px 20px',
        background: 'white',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        flex: 1
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <p style={{ color: '#6A7282', fontSize: 12, fontWeight: 400, lineHeight: '16px' }}>
              {product.brand}
            </p>
            <p style={{ color: '#0A0A0A', fontSize: 18, fontWeight: 700, lineHeight: '27px' }}>
              {product.name}
            </p>
          </div>

          {/* Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <StarIcon />
              <span style={{ color: '#0A0A0A', fontSize: 14, fontWeight: 700, lineHeight: '20px' }}>
                {product.rating}
              </span>
            </div>
            <span style={{ color: '#6A7282', fontSize: 12, lineHeight: '16px' }}>
              ({product.reviews} reseñas)
            </span>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: '#0A0A0A', fontSize: 24, fontWeight: 900, lineHeight: '32px', letterSpacing: 0.07 }}>
              {formatPrice(product.price)}
            </span>
            <span style={{ color: '#99A1AF', fontSize: 14, textDecoration: 'line-through', lineHeight: '20px' }}>
              {formatPrice(product.originalPrice)}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleAddToCart}
          style={{
            width: '100%',
            padding: 10,
            background: '#1F1F21',
            borderRadius: 10,
            color: 'white',
            fontSize: 16,
            fontWeight: 700,
            lineHeight: '24px',
            transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#333'}
          onMouseLeave={e => e.currentTarget.style.background = '#1F1F21'}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="13" viewBox="0 0 14 13" fill="#FDC700">
      <polygon points="7,0 8.7,4.7 14,5.1 10.2,8.4 11.5,13 7,10.3 2.5,13 3.8,8.4 0,5.1 5.3,4.7" />
    </svg>
  );
}
