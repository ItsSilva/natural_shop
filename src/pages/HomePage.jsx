import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import BrandCard from '../components/BrandCard';
import SectionHeader from '../components/SectionHeader';

export default function HomePage() {
  const navigate = useNavigate();
  const [popularProducts, setPopularProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openStore, setOpenStore] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData, brandsData, storesData] = await Promise.all([
          productService.getAllProducts(),
          productService.getCategories(),
          productService.getBrands(),
          productService.getStores()
        ]);

        setPopularProducts(productsData.slice(0, 4));
        setCategories(categoriesData);
        setBrands(brandsData);
        setStores(storesData);
      } catch (err) {
        console.error('Error loading home data:', err);
        setError('Error al cargar los datos. Por favor, recarga la página.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div style={{ background: '#FAFAFA', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏋️</div>
          <p style={{ fontSize: 18, color: '#6A7282' }}>Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ background: '#FAFAFA', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <p style={{ fontSize: 18, color: '#6A7282', marginBottom: 16 }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              background: '#1F1F21',
              color: 'white',
              border: 'none',
              borderRadius: 10,
              cursor: 'pointer'
            }}
          >
            Recargar página
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#FAFAFA' }}>
      {/* ========== HERO ========== */}
      <section style={{ position: 'relative', height: 624, overflow: 'hidden' }}>
        {/* Hero BG */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 40%, #1f1f21 100%)',
        }} />
        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.20)',
          backdropFilter: 'blur(3.5px)'
        }} />
        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 88,
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, black 100%)'
        }} />
        {/* Top fade */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 88,
          background: 'linear-gradient(180deg, black 0%, rgba(0,0,0,0) 100%)'
        }} />

        {/* Envío gratis banner */}
        <div style={{
          position: 'absolute',
          top: 112,
          left: 0,
          background: '#FFEB3B',
          padding: '10px 68px 10px 68px',
          display: 'inline-flex',
          alignItems: 'center'
        }}>
          <span style={{ color: 'black', fontSize: 16, fontWeight: 700, lineHeight: '24px' }}>
            ENVÍO GRATIS en compras superiores a $150.000
          </span>
        </div>

        {/* Hero text */}
        <div style={{
          position: 'absolute',
          left: 66,
          top: 197,
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}>
          <h1 style={{ color: '#FEFCE8', fontSize: 68, fontWeight: 800, lineHeight: 1.1 }}>
            Suplementos Deportivos
          </h1>
          <h1 style={{ color: '#FDC700', fontSize: 68, fontWeight: 800, lineHeight: 1.1 }}>
            100% Originales
          </h1>
          <p style={{ color: '#FAFAFA', fontSize: 28, fontWeight: 500, maxWidth: 835, marginTop: 8 }}>
            Potencia tu rendimiento con productos certificados y envíos seguros a toda Colombia
          </p>
        </div>

        {/* CTA Buttons */}
        <div style={{
          position: 'absolute',
          left: 66,
          bottom: 64,
          display: 'flex',
          gap: 29
        }}>
          <button
            onClick={() => navigate('/catalogo')}
            style={{
              width: 274,
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
            Ver productos
          </button>
          <button
            onClick={() => navigate('/catalogo')}
            style={{
              width: 274,
              padding: 10,
              background: 'rgba(254,252,232,0.20)',
              borderRadius: 10,
              border: '1px solid #FFEB3B',
              color: '#FFEB3B',
              fontSize: 16,
              fontWeight: 700,
              lineHeight: '24px'
            }}
          >
            Ver productos
          </button>
        </div>
      </section>

      {/* ========== MAIN CONTENT ========== */}
      <div style={{ padding: '75px 68px', display: 'flex', flexDirection: 'column', gap: 75 }}>

        {/* Productos populares */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 25 }}>
          <SectionHeader title="Productos populares" linkTo="/catalogo" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 24 }}>
            {popularProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Categorias */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 25 }}>
          <SectionHeader title="Categorias" linkTo="/catalogo" />
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            {categories.map(cat => <CategoryCard key={cat.id} category={cat} />)}
          </div>
        </section>

        {/* Marcas */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 25 }}>
          <SectionHeader title="Marcas" linkTo="/marcas" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {brands.map(brand => <BrandCard key={brand.id} brand={brand} />)}
          </div>
        </section>

        {/* News Section */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 25 }}>
          <SectionHeader title="News" />
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {/* Card amarilla */}
            <div style={{
              flex: 1, minWidth: 300, height: 241,
              background: '#FFEB3B', borderRadius: 10,
              padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
              position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: 32, fontWeight: 700, color: '#1F1F21', lineHeight: '48px', letterSpacing: 0.35 }}>
                  Limonada de Proteína!
                </h3>
                <p style={{ fontSize: 22, fontWeight: 500, color: '#544C2B', lineHeight: '22px', letterSpacing: 0.35 }}>
                  Prueba la nueva IsoPure Tropical Punch con 20g de proteína!
                </p>
              </div>
            </div>
            {/* Card oscura */}
            <div style={{
              flex: 1, minWidth: 300, height: 241,
              background: 'linear-gradient(0deg, #1F1F21 63%, #343438 100%)',
              borderRadius: 10, padding: '30px',
              display: 'flex', flexDirection: 'column', justifyContent: 'center'
            }}>
              <h3 style={{ fontSize: 32, fontWeight: 700, color: 'white', lineHeight: '48px', letterSpacing: 0.35 }}>
                Productos populares
              </h3>
              <p style={{ fontSize: 22, fontWeight: 500, color: '#B3B1A9', lineHeight: '22px', letterSpacing: 0.35 }}>
                Warfury Elite Pre-Workout con descuento especial
              </p>
            </div>
          </div>
        </section>

        {/* Encuentra tu tienda */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 25 }}>
          <h2 style={{ color: 'black', fontSize: 32, fontWeight: 600 }}>
            Encuentra tu tienda más cercana
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 40, flexWrap: 'wrap' }}>
            {/* Map placeholder */}
            <div style={{
              flex: '1 1 400px', height: 419,
              background: '#e5e7eb',
              borderRadius: 20,
              boxShadow: '0px 2px 8px rgba(147,147,147,0.10)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{ textAlign: 'center', color: '#6A7282' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>📍</div>
                <p style={{ fontSize: 16, fontWeight: 500 }}>Mapa interactivo próximamente</p>
              </div>
            </div>

            {/* Stores list */}
            <div style={{
              width: 500, boxShadow: '0px 2px 10px rgba(0,0,0,0.06)',
              borderRadius: 10, overflow: 'hidden', flexShrink: 0
            }}>
              {stores.map((store, i) => (
                <StoreAccordion
                  key={i}
                  store={store}
                  isOpen={openStore === i}
                  isFirst={i === 0}
                  isLast={i === stores.length - 1}
                  onToggle={() => setOpenStore(openStore === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '100%', maxWidth: 1133,
            padding: 40,
            background: '#1F1F21',
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 22
          }}>
            <div>
              <h2 style={{ fontSize: 32, fontWeight: 700, lineHeight: '48px', letterSpacing: 0.35 }}>
                <span style={{ color: 'white' }}>¿Listo para alcanzar </span>
                <span style={{ color: '#FFEB3B' }}>tus objetivos?</span>
              </h2>
              <p style={{ color: '#A4A39F', fontSize: 22, fontWeight: 400, lineHeight: '22px', letterSpacing: 0.35, maxWidth: 554 }}>
                Únete a miles de atletas que confían en nosotros para sus suplementos deportivos
              </p>
            </div>
            <div style={{ display: 'flex', gap: 25 }}>
              <button
                onClick={() => navigate('/catalogo')}
                style={{
                  width: 216, padding: 10,
                  background: '#1F1F21',
                  borderRadius: 10,
                  border: '1px solid white',
                  color: 'white',
                  fontSize: 16, fontWeight: 700, lineHeight: '24px'
                }}
              >
                Ver productos
              </button>
              <a
                href="https://wa.me/573001234567"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 216, padding: 10,
                  background: 'rgba(254,252,232,0.20)',
                  borderRadius: 10,
                  border: '1px solid #FFEB3B',
                  color: '#FFEB3B',
                  fontSize: 16, fontWeight: 700, lineHeight: '24px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none'
                }}
              >
                Habla por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ========== TRUST BAR ========== */}
      <div style={{
        background: '#FFEB3B',
        padding: '30px 115px',
        display: 'flex',
        justifyContent: 'center',
        gap: 60,
        flexWrap: 'wrap'
      }}>
        {[
          { icon: '✔️', label: 'Productos Certificados' },
          { icon: '🔒', label: 'Compra 100% Segura' },
          { icon: '🚚', label: 'Entrega Express Disponible' }
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 31, height: 31,
              background: '#FFEB3B',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18
            }}>
              {item.icon}
            </div>
            <span style={{ color: 'black', fontSize: 20, fontWeight: 700, lineHeight: '31px' }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Social / WhatsApp floating */}
      <a
        href="https://wa.me/573001234567"
        target="_blank"
        rel="noreferrer"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 56, height: 56,
          background: '#25D366',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 4px 12px rgba(0,0,0,0.25)',
          zIndex: 999,
          fontSize: 28
        }}
        title="WhatsApp"
      >
        💬
      </a>
    </div>
  );
}

function StoreAccordion({ store, isOpen, isFirst, isLast, onToggle }) {
  return (
    <div>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          height: 64,
          padding: 20,
          background: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: 'none',
          borderTop: isFirst ? 'none' : '1px solid #f3f4f6',
          cursor: 'pointer',
          borderTopLeftRadius: isFirst ? 10 : 0,
          borderTopRightRadius: isFirst ? 10 : 0,
          borderBottomLeftRadius: isLast && !isOpen ? 10 : 0,
          borderBottomRightRadius: isLast && !isOpen ? 10 : 0,
        }}
      >
        <span style={{ color: '#6A7282', fontSize: 18, fontWeight: 500 }}>
          {store.city}
        </span>
        <svg
          width="12" height="8"
          viewBox="0 0 12 8"
          style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          fill="none"
        >
          <path d="M1 1l5 5 5-5" stroke="#6A7282" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {isOpen && (
        <div style={{
          background: 'white',
          padding: 20,
          borderTop: '1px solid #f3f4f6',
          borderBottomLeftRadius: isLast ? 10 : 0,
          borderBottomRightRadius: isLast ? 10 : 0
        }}>
          <p style={{ color: '#1F1F21', fontSize: 20, fontWeight: 600, marginBottom: 4 }}>Dirección:</p>
          <p style={{ color: '#6A7282', fontSize: 16, marginBottom: 12 }}>{store.address}</p>
          <p style={{ color: '#1F1F21', fontSize: 20, fontWeight: 600, marginBottom: 4 }}>Horario:</p>
          <p style={{ color: '#6A7282', fontSize: 16 }}>{store.hours}</p>
        </div>
      )}
    </div>
  );
}
