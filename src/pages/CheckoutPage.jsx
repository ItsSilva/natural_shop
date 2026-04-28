import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/orderService';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    neighborhood: '',
    postalCode: '',
    paymentMethod: 'PSE',
    notes: ''
  });

  const formatPrice = (p) => '$' + p.toLocaleString('es-CO');
  const shippingCost = total >= 150000 ? 0 : 15000;
  const finalTotal = total + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone ||
        !formData.city || !formData.address) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    if (cartItems.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    try {
      setLoading(true);

      // Prepare order data
      const orderData = {
        shipping_name: `${formData.firstName} ${formData.lastName}`,
        shipping_phone: formData.phone,
        shipping_email: formData.email,
        shipping_city: formData.city,
        shipping_address: formData.address,
        shipping_neighborhood: formData.neighborhood,
        shipping_postal: formData.postalCode,
        subtotal: total,
        shipping_cost: shippingCost,
        total: finalTotal,
        payment_method: formData.paymentMethod,
        notes: formData.notes,
        status: 'pending'
      };

      // Create order
      const order = await orderService.createOrder(orderData);

      // Create order items
      const orderItems = cartItems.map(item => ({
        product_id: item.id,
        product_name: item.name,
        product_brand: item.brand_name || item.brand,
        flavor: item.flavor || '',
        unit_price: item.price,
        quantity: item.quantity
      }));

      await orderService.createOrderItems(order.id, orderItems);

      // Clear cart and redirect to confirmation
      clearCart();
      navigate(`/orden-confirmada?orderId=${order.id}`);

    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error al procesar el pedido. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ background: '#FAFAFA', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
          <p style={{ fontSize: 18, color: '#6A7282', marginBottom: 16 }}>Tu carrito está vacío</p>
          <button
            onClick={() => navigate('/catalogo')}
            style={{
              padding: '12px 24px',
              background: '#1F1F21',
              color: 'white',
              border: 'none',
              borderRadius: 10,
              cursor: 'pointer'
            }}
          >
            Ir al catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh', padding: '40px 68px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, color: '#1F1F21', marginBottom: 8 }}>Checkout</h1>
      <p style={{ color: '#6A7282', marginBottom: 32 }}>Completa tu pedido</p>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* Form */}
          <div style={{ flex: 1, minWidth: 300 }}>
            <div style={{ background: 'white', borderRadius: 10, boxShadow: '0px 2px 10px rgba(0,0,0,0.06)', padding: 32, marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Información de envío</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { name: 'firstName', label: 'Nombre', placeholder: 'Tu nombre' },
                  { name: 'lastName', label: 'Apellido', placeholder: 'Tu apellido' },
                  { name: 'email', label: 'Correo electrónico', placeholder: 'correo@ejemplo.com', full: true },
                  { name: 'phone', label: 'Teléfono', placeholder: '+57 300 000 0000' },
                  { name: 'city', label: 'Ciudad', placeholder: 'Bogotá' },
                  { name: 'address', label: 'Dirección', placeholder: 'Cra 1 # 2-3', full: true },
                  { name: 'neighborhood', label: 'Barrio', placeholder: 'Tu barrio' },
                  { name: 'postalCode', label: 'Código postal', placeholder: '110111' },
                ].map(field => (
                  <div key={field.name} style={{ gridColumn: field.full ? '1 / -1' : 'auto' }}>
                    <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#1F1F21', marginBottom: 6 }}>
                      {field.label}
                    </label>
                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      placeholder={field.placeholder}
                      required={!field.name.includes('neighborhood') && !field.name.includes('postalCode')}
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

            <div style={{ background: 'white', borderRadius: 10, boxShadow: '0px 2px 10px rgba(0,0,0,0.06)', padding: 32, marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Método de pago</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { value: 'PSE', label: 'PSE' },
                  { value: 'Wompi', label: 'Wompi' },
                  { value: 'Tarjeta de crédito / débito', label: 'Tarjeta de crédito / débito' },
                  { value: 'Contra entrega', label: 'Contra entrega' }
                ].map(method => (
                  <label key={method.value} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '12px 16px', border: '1px solid #E5E7EB', borderRadius: 8 }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={formData.paymentMethod === method.value}
                      onChange={handleInputChange}
                      style={{ accentColor: '#1F1F21' }}
                    />
                    <span style={{ fontSize: 14, fontWeight: 500, color: '#1F1F21' }}>{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: 10, boxShadow: '0px 2px 10px rgba(0,0,0,0.06)', padding: 32 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Notas adicionales (opcional)</h2>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Instrucciones especiales de entrega, etc."
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #E5E7EB',
                  borderRadius: 8,
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>

        {/* Summary */}
        <div style={{ width: 360, background: 'white', borderRadius: 10, boxShadow: '0px 2px 10px rgba(0,0,0,0.06)', padding: 24, flexShrink: 0, position: 'sticky', top: 100 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Resumen del pedido</h2>
          <div style={{ marginBottom: 16 }}>
            {cartItems.map(item => (
              <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
                <span style={{ color: '#6A7282' }}>
                  {item.name} {item.flavor && `(${item.flavor})`} x{item.quantity}
                </span>
                <span style={{ fontWeight: 600 }}>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#6A7282', marginBottom: 8 }}>
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#6A7282', marginBottom: 8 }}>
              <span>Envío</span>
              <span style={{ color: shippingCost === 0 ? '#22C55E' : '#0A0A0A' }}>
                {shippingCost === 0 ? 'GRATIS' : formatPrice(shippingCost)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 900, marginTop: 8, paddingTop: 8, borderTop: '1px solid #E5E7EB' }}>
              <span>Total</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              marginTop: 20,
              background: loading ? '#6A7282' : '#1F1F21',
              color: 'white',
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              border: 'none'
            }}
          >
            {loading ? 'Procesando...' : 'Confirmar pedido'}
          </button>
          <p style={{ textAlign: 'center', color: '#99A1AF', fontSize: 12, marginTop: 12 }}>
            🔒 Pago 100% seguro • Productos originales garantizados
          </p>
        </div>
      </div>
    </form>
  </div>
);
}
