import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';

const ADMIN_PASSWORD = 'admin123'; // Simple password for demo

export default function AdminPanelPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand_name: '',
    price: '',
    original_price: '',
    stock: '',
    active: true
  });

  useEffect(() => {
    // Check if already authenticated
    const authStatus = localStorage.getItem('admin-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadProducts();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin-auth', 'true');
      loadProducts();
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      // Get all products including inactive ones
      const { data, error } = await productService.supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      brand_name: product.brand_name,
      price: product.price,
      original_price: product.original_price,
      stock: product.stock,
      active: product.active
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const { error } = await productService.supabase
        .from('products')
        .update({
          name: formData.name,
          brand_name: formData.brand_name,
          price: parseInt(formData.price),
          original_price: parseInt(formData.original_price),
          stock: parseInt(formData.stock),
          active: formData.active,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingProduct.id);

      if (error) throw error;

      setEditingProduct(null);
      loadProducts();
      alert('Producto actualizado exitosamente');
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Error al actualizar producto');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (product) => {
    try {
      const { error } = await productService.supabase
        .from('products')
        .update({
          active: !product.active,
          updated_at: new Date().toISOString()
        })
        .eq('id', product.id);

      if (error) throw error;
      loadProducts();
    } catch (err) {
      console.error('Error toggling product status:', err);
      alert('Error al cambiar estado del producto');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin-auth');
    setProducts([]);
  };

  const formatPrice = (p) => '$' + p.toLocaleString('es-CO');

  if (!isAuthenticated) {
    return (
      <div style={{ background: '#FAFAFA', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'white', padding: 40, borderRadius: 10, boxShadow: '0px 2px 10px rgba(0,0,0,0.06)', width: 400 }}>
          <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#1F1F21' }}>Panel de Administración</h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 8, color: '#6A7282' }}>
                Contraseña de administrador
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #E5E7EB',
                  borderRadius: 8,
                  fontSize: 16
                }}
                placeholder="Ingresa la contraseña"
                required
              />
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                background: '#1F1F21',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Acceder
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh', padding: '40px 68px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#1F1F21' }}>Panel de Administración</h1>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              background: '#DC2626',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer'
            }}
          >
            Cerrar sesión
          </button>
        </div>

        {/* Products table */}
        <div style={{ background: 'white', borderRadius: 10, overflow: 'hidden', boxShadow: '0px 2px 10px rgba(0,0,0,0.06)' }}>
          <div style={{ padding: 24, borderBottom: '1px solid #E5E7EB' }}>
            <h2 style={{ fontSize: 24, fontWeight: 600, color: '#1F1F21' }}>Gestión de Productos</h2>
          </div>

          {loading && (
            <div style={{ padding: 40, textAlign: 'center', color: '#6A7282' }}>
              Cargando productos...
            </div>
          )}

          {error && (
            <div style={{ padding: 40, textAlign: 'center', color: '#DC2626' }}>
              {error}
            </div>
          )}

          {!loading && !error && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F9FAFB' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#1F1F21' }}>Producto</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#1F1F21' }}>Marca</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#1F1F21' }}>Precio</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#1F1F21' }}>Stock</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#1F1F21' }}>Estado</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#1F1F21' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                      <td style={{ padding: '12px 16px' }}>
                        {editingProduct?.id === product.id ? (
                          <input
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            style={{ width: '100%', padding: '4px 8px', border: '1px solid #E5E7EB', borderRadius: 4 }}
                          />
                        ) : (
                          <span style={{ fontWeight: 500, color: '#1F1F21' }}>{product.name}</span>
                        )}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#6A7282' }}>
                        {editingProduct?.id === product.id ? (
                          <input
                            value={formData.brand_name}
                            onChange={(e) => setFormData({...formData, brand_name: e.target.value})}
                            style={{ width: '100%', padding: '4px 8px', border: '1px solid #E5E7EB', borderRadius: 4 }}
                          />
                        ) : (
                          product.brand_name
                        )}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        {editingProduct?.id === product.id ? (
                          <div style={{ display: 'flex', gap: 8 }}>
                            <input
                              type="number"
                              value={formData.price}
                              onChange={(e) => setFormData({...formData, price: e.target.value})}
                              style={{ width: 80, padding: '4px 8px', border: '1px solid #E5E7EB', borderRadius: 4 }}
                              placeholder="Precio"
                            />
                            <input
                              type="number"
                              value={formData.original_price}
                              onChange={(e) => setFormData({...formData, original_price: e.target.value})}
                              style={{ width: 80, padding: '4px 8px', border: '1px solid #E5E7EB', borderRadius: 4 }}
                              placeholder="Original"
                            />
                          </div>
                        ) : (
                          <div>
                            <div style={{ fontWeight: 600, color: '#1F1F21' }}>{formatPrice(product.price)}</div>
                            {product.original_price > product.price && (
                              <div style={{ fontSize: 12, color: '#6A7282', textDecoration: 'line-through' }}>
                                {formatPrice(product.original_price)}
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        {editingProduct?.id === product.id ? (
                          <input
                            type="number"
                            value={formData.stock}
                            onChange={(e) => setFormData({...formData, stock: e.target.value})}
                            style={{ width: 60, padding: '4px 8px', border: '1px solid #E5E7EB', borderRadius: 4 }}
                          />
                        ) : (
                          <span style={{ color: product.stock > 0 ? '#22C55E' : '#DC2626' }}>
                            {product.stock}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        {editingProduct?.id === product.id ? (
                          <select
                            value={formData.active}
                            onChange={(e) => setFormData({...formData, active: e.target.value === 'true'})}
                            style={{ padding: '4px 8px', border: '1px solid #E5E7EB', borderRadius: 4 }}
                          >
                            <option value={true}>Activo</option>
                            <option value={false}>Inactivo</option>
                          </select>
                        ) : (
                          <span style={{
                            color: product.active ? '#22C55E' : '#DC2626',
                            fontWeight: 600
                          }}>
                            {product.active ? 'Activo' : 'Inactivo'}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        {editingProduct?.id === product.id ? (
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button
                              onClick={handleSave}
                              disabled={loading}
                              style={{
                                padding: '4px 8px',
                                background: '#22C55E',
                                color: 'white',
                                border: 'none',
                                borderRadius: 4,
                                cursor: 'pointer'
                              }}
                            >
                              💾
                            </button>
                            <button
                              onClick={() => setEditingProduct(null)}
                              style={{
                                padding: '4px 8px',
                                background: '#6A7282',
                                color: 'white',
                                border: 'none',
                                borderRadius: 4,
                                cursor: 'pointer'
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button
                              onClick={() => handleEdit(product)}
                              style={{
                                padding: '4px 8px',
                                background: '#3B82F6',
                                color: 'white',
                                border: 'none',
                                borderRadius: 4,
                                cursor: 'pointer'
                              }}
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleToggleActive(product)}
                              style={{
                                padding: '4px 8px',
                                background: product.active ? '#DC2626' : '#22C55E',
                                color: 'white',
                                border: 'none',
                                borderRadius: 4,
                                cursor: 'pointer'
                              }}
                            >
                              {product.active ? '🚫' : '✅'}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}