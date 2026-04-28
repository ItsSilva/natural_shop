import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories, brands } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function CatalogPage() {
  const [searchParams] = useSearchParams();
  const searchQ = searchParams.get('search') || '';
  const catParam = searchParams.get('categoria') || '';
  const brandParam = searchParams.get('marca') || '';

  const [selectedCategory, setSelectedCategory] = useState(catParam);
  const [selectedBrand, setSelectedBrand] = useState(brandParam);
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [sortBy, setSortBy] = useState('popular');
  const [search, setSearch] = useState(searchQ);

  const filtered = useMemo(() => {
    let list = [...products];
    if (search) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedCategory) {
      list = list.filter(p => p.category.toLowerCase().replace(' ', '-') === selectedCategory || p.category === selectedCategory);
    }
    if (selectedBrand) {
      list = list.filter(p => p.brand.toLowerCase().includes(selectedBrand));
    }
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sortBy) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      default: list.sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [search, selectedCategory, selectedBrand, priceRange, sortBy]);

  const formatPrice = (p) => '$' + p.toLocaleString('es-CO');

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh' }}>
      {/* Breadcrumb + header */}
      <div style={{ padding: '32px 68px 0', background: '#FAFAFA' }}>
        <p style={{ color: '#6A7282', fontSize: 14, marginBottom: 8 }}>
          <a href="/" style={{ color: '#6A7282' }}>Inicio</a> / <span style={{ color: '#0A0A0A' }}>Catálogo</span>
        </p>
        <h1 style={{ color: '#1F1F21', fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
          Catálogo de Productos
        </h1>
        <p style={{ color: '#6A7282', fontSize: 16, marginBottom: 24 }}>
          {filtered.length} productos encontrados
        </p>
      </div>

      <div style={{ padding: '0 68px 60px', display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        {/* ===== SIDEBAR ===== */}
        <aside style={{
          width: 280,
          flexShrink: 0,
          background: 'white',
          borderRadius: 10,
          boxShadow: '0px 2px 10px rgba(0,0,0,0.06)',
          padding: 24,
          position: 'sticky',
          top: 100
        }}>
          {/* Search */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#1F1F21', marginBottom: 12 }}>Buscar</p>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar productos..."
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

          {/* Categories */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#1F1F21', marginBottom: 12 }}>Categorías</p>
            {[{ id: '', name: 'Todas' }, ...categories].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 12px',
                  marginBottom: 4,
                  background: selectedCategory === cat.id ? '#1F1F21' : 'transparent',
                  color: selectedCategory === cat.id ? 'white' : '#6A7282',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: selectedCategory === cat.id ? 600 : 400,
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.15s'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Brands */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#1F1F21', marginBottom: 12 }}>Marcas</p>
            {[{ id: '', name: 'Todas' }, ...brands].map(brand => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 12px',
                  marginBottom: 4,
                  background: selectedBrand === brand.id ? '#1F1F21' : 'transparent',
                  color: selectedBrand === brand.id ? 'white' : '#6A7282',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: selectedBrand === brand.id ? 600 : 400,
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.15s',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {brand.name.replace('\n', ' ')}
              </button>
            ))}
          </div>

          {/* Price range */}
          <div>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#1F1F21', marginBottom: 12 }}>
              Precio: {formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}
            </p>
            <input
              type="range"
              min={0}
              max={300000}
              step={5000}
              value={priceRange[1]}
              onChange={e => setPriceRange([0, +e.target.value])}
              style={{ width: '100%', accentColor: '#FDC700' }}
            />
          </div>
        </aside>

        {/* ===== PRODUCTS ===== */}
        <div style={{ flex: 1 }}>
          {/* Sort bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: 24,
            gap: 12
          }}>
            <span style={{ color: '#6A7282', fontSize: 14 }}>Ordenar por:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #E5E7EB',
                borderRadius: 8,
                fontSize: 14,
                color: '#1F1F21',
                background: 'white',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="popular">Más populares</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="rating">Mejor calificación</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#6A7282' }}>
              <p style={{ fontSize: 24, marginBottom: 8 }}>😔</p>
              <p style={{ fontSize: 18, fontWeight: 600 }}>No se encontraron productos</p>
              <p style={{ fontSize: 14, marginTop: 4 }}>Intenta con otros filtros</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 24
            }}>
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
