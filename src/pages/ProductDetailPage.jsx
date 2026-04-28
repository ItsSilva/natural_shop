import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === Number(id));
  const [selectedFlavor, setSelectedFlavor] = useState(product?.flavors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div style={{ padding: '80px 68px', textAlign: 'center' }}>
        <h2>Producto no encontrado</h2>
        <button onClick={() => navigate('/catalogo')} style={{ marginTop: 16, padding: '10px 24px', background: '#1F1F21', color: 'white', borderRadius: 10, fontSize: 16, cursor: 'pointer' }}>
          Volver al catálogo
        </button>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const formatPrice = (p) => '$' + p.toLocaleString('es-CO');

  const handleAddToCart = () => {
    addToCart(product, selectedFlavor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ padding: '24px 68px 0' }}>
        <p style={{ color: '#6A7282', fontSize: 14 }}>
          <a href="/" style={{ color: '#6A7282' }}>Inicio</a>
          {' / '}
          <a href="/catalogo" style={{ color: '#6A7282' }}>Catálogo</a>
          {' / '}
          <span style={{ color: '#0A0A0A' }}>{product.name}</span>
        </p>
      </div>

      {/* Main detail */}
      <div style={{ padding: '32px 68px', display: 'flex', gap: 60, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Product image */}
        <div style={{
          flex: '0 0 480px',
          background: '#F3F4F6',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0px 2px 10px rgba(0,0,0,0.06)'
        }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: 400, objectFit: 'cover' }}
          />
        </div>

        {/* Product info */}
        <div style={{ flex: 1, minWidth: 300 }}>
          {product.badge && (
            <span style={{
              display: 'inline-block',
              paddingLeft: 12, paddingRight: 12, paddingTop: 5, paddingBottom: 5,
              background: product.badgeColor,
              borderRadius: 20,
              color: 'white', fontSize: 12, fontWeight: 700,
              marginBottom: 12
            }}>
              {product.badge}
            </span>
          )}

          <p style={{ color: '#6A7282', fontSize: 14, marginBottom: 4 }}>{product.brand}</p>
          <h1 style={{ color: '#0A0A0A', fontSize: 28, fontWeight: 700, lineHeight: '36px', marginBottom: 12 }}>
            {product.name}
          </h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="16" height="15" viewBox="0 0 14 13" fill={i <= Math.round(product.rating) ? '#FDC700' : '#E5E7EB'}>
                  <polygon points="7,0 8.7,4.7 14,5.1 10.2,8.4 11.5,13 7,10.3 2.5,13 3.8,8.4 0,5.1 5.3,4.7" />
                </svg>
              ))}
              <span style={{ color: '#0A0A0A', fontSize: 14, fontWeight: 700, marginLeft: 4 }}>{product.rating}</span>
            </div>
            <span style={{ color: '#6A7282', fontSize: 14 }}>({product.reviews} reseñas)</span>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ fontSize: 36, fontWeight: 900, color: '#0A0A0A', letterSpacing: 0.07 }}>
              {formatPrice(product.price)}
            </span>
            <span style={{ fontSize: 18, color: '#99A1AF', textDecoration: 'line-through' }}>
              {formatPrice(product.originalPrice)}
            </span>
            <span style={{
              background: '#FDC700', color: 'black',
              borderRadius: 20, padding: '4px 10px',
              fontSize: 12, fontWeight: 700
            }}>
              -{discount}%
            </span>
          </div>

          {/* Description */}
          <p style={{ color: '#6A7282', fontSize: 16, lineHeight: '24px', marginBottom: 24 }}>
            {product.description}
          </p>

          {/* Flavor selector */}
          {product.flavors.length > 1 && (
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#1F1F21', marginBottom: 10 }}>
                Sabor: <span style={{ fontWeight: 400, color: '#6A7282' }}>{selectedFlavor}</span>
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {product.flavors.map(flavor => (
                  <button
                    key={flavor}
                    onClick={() => setSelectedFlavor(flavor)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      border: selectedFlavor === flavor ? '2px solid #1F1F21' : '1px solid #E5E7EB',
                      background: selectedFlavor === flavor ? '#1F1F21' : 'white',
                      color: selectedFlavor === flavor ? 'white' : '#6A7282',
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Add to cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 0,
              border: '1px solid #E5E7EB', borderRadius: 10, overflow: 'hidden'
            }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: 40, height: 44,
                  background: 'white', border: 'none',
                  fontSize: 18, fontWeight: 700, cursor: 'pointer',
                  color: '#1F1F21'
                }}
              >-</button>
              <span style={{ padding: '0 16px', fontSize: 16, fontWeight: 600, color: '#0A0A0A' }}>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: 40, height: 44,
                  background: 'white', border: 'none',
                  fontSize: 18, fontWeight: 700, cursor: 'pointer',
                  color: '#1F1F21'
                }}
              >+</button>
            </div>
            <button
              onClick={handleAddToCart}
              style={{
                flex: 1,
                padding: '10px 24px',
                background: added ? '#22C55E' : '#1F1F21',
                borderRadius: 10,
                color: 'white',
                fontSize: 16,
                fontWeight: 700,
                lineHeight: '24px',
                transition: 'background 0.2s',
                cursor: 'pointer'
              }}
            >
              {added ? '✓ Añadido al carrito' : 'Agregar al Carrito'}
            </button>
          </div>

          {/* Stock */}
          <p style={{ fontSize: 13, color: product.stock > 10 ? '#22C55E' : '#EF4444' }}>
            {product.stock > 10 ? `✓ ${product.stock} unidades disponibles` : `⚠ Últimas ${product.stock} unidades`}
          </p>

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: 16, marginTop: 24, flexWrap: 'wrap' }}>
            {['🚚 Envío gratis desde $150k', '🔒 Pago seguro', '✅ Producto original'].map(b => (
              <span key={b} style={{
                padding: '6px 12px',
                background: '#F3F4F6',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 500,
                color: '#374151'
              }}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div style={{ padding: '40px 68px 60px' }}>
          <h2 style={{ color: '#1F1F21', fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
            Productos relacionados
          </h2>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
