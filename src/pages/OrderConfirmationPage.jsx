import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { orderService } from '../services/orderService';

export default function OrderConfirmationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId) {
        setError('ID de orden no proporcionado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const orderData = await orderService.getOrderById(orderId);
        setOrder(orderData);
      } catch (err) {
        console.error('Error loading order:', err);
        setError('Error al cargar la orden');
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  const formatPrice = (p) => '$' + p.toLocaleString('es-CO');

  if (loading) {
    return (
      <div style={{ background: '#FAFAFA', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
          <p style={{ fontSize: 18, color: '#6A7282' }}>Cargando confirmación de orden...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div style={{ background: '#FAFAFA', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <p style={{ fontSize: 18, color: '#6A7282', marginBottom: 16 }}>{error || 'Orden no encontrada'}</p>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '10px 20px',
              background: '#1F1F21',
              color: 'white',
              border: 'none',
              borderRadius: 10,
              cursor: 'pointer'
            }}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh', padding: '40px 68px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Success header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#1F1F21', marginBottom: 8 }}>
            ¡Orden confirmada!
          </h1>
          <p style={{ fontSize: 18, color: '#6A7282' }}>
            Tu orden #{order.id} ha sido procesada exitosamente
          </p>
        </div>

        {/* Order details */}
        <div style={{ background: 'white', borderRadius: 10, padding: 32, marginBottom: 24, boxShadow: '0px 2px 10px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1F1F21', marginBottom: 24 }}>
            Detalles de la orden
          </h2>

          {/* Order info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1F1F21', marginBottom: 12 }}>
                Información de envío
              </h3>
              <p style={{ color: '#6A7282', marginBottom: 4 }}>{order.shipping_name}</p>
              {order.shipping_phone && <p style={{ color: '#6A7282', marginBottom: 4 }}>{order.shipping_phone}</p>}
              {order.shipping_email && <p style={{ color: '#6A7282', marginBottom: 4 }}>{order.shipping_email}</p>}
              <p style={{ color: '#6A7282', marginBottom: 4 }}>{order.shipping_address}</p>
              {order.shipping_neighborhood && <p style={{ color: '#6A7282', marginBottom: 4 }}>{order.shipping_neighborhood}</p>}
              <p style={{ color: '#6A7282' }}>{order.shipping_city}</p>
            </div>

            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1F1F21', marginBottom: 12 }}>
                Información de pago
              </h3>
              <p style={{ color: '#6A7282', marginBottom: 4 }}>
                Método: {order.payment_method || 'Por definir'}
              </p>
              <p style={{ color: '#6A7282', marginBottom: 4 }}>
                Estado: <span style={{
                  color: order.status === 'paid' ? '#22C55E' : order.status === 'pending' ? '#F59E0B' : '#6A7282',
                  fontWeight: 600
                }}>
                  {order.status === 'pending' ? 'Pendiente' :
                   order.status === 'paid' ? 'Pagado' :
                   order.status === 'processing' ? 'Procesando' :
                   order.status === 'shipped' ? 'Enviado' :
                   order.status === 'delivered' ? 'Entregado' : 'Cancelado'}
                </span>
              </p>
              <p style={{ color: '#6A7282' }}>
                Fecha: {new Date(order.created_at).toLocaleDateString('es-CO')}
              </p>
            </div>
          </div>

          {/* Order items */}
          <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1F1F21', marginBottom: 16 }}>
              Productos
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {order.order_items.map((item) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 60, height: 60,
                    background: '#F3F4F6',
                    borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24
                  }}>
                    🏋️
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, color: '#1F1F21', marginBottom: 4 }}>
                      {item.product_name}
                    </p>
                    <p style={{ color: '#6A7282', fontSize: 14 }}>
                      {item.product_brand} • {item.flavor} • Cantidad: {item.quantity}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: 600, color: '#1F1F21' }}>
                      {formatPrice(item.subtotal)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order totals */}
          <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: 24, marginTop: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6A7282' }}>Subtotal:</span>
              <span style={{ color: '#1F1F21', fontWeight: 600 }}>{formatPrice(order.subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
              <span style={{ color: '#6A7282' }}>Envío:</span>
              <span style={{ color: '#1F1F21', fontWeight: 600 }}>{formatPrice(order.shipping_cost)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTop: '1px solid #E5E7EB' }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#1F1F21' }}>Total:</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#1F1F21' }}>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '12px 24px',
              background: '#1F1F21',
              color: 'white',
              border: 'none',
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Continuar comprando
          </button>
          <button
            onClick={() => navigate('/catalogo')}
            style={{
              padding: '12px 24px',
              background: 'transparent',
              color: '#1F1F21',
              border: '1px solid #1F1F21',
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Ver más productos
          </button>
        </div>

        {/* Notes */}
        <div style={{ textAlign: 'center', marginTop: 32, padding: 24, background: '#FFF9C4', borderRadius: 10 }}>
          <p style={{ color: '#F57F17', fontSize: 16 }}>
            📧 Recibirás un email de confirmación con los detalles de tu orden.
            Si tienes alguna pregunta, contáctanos por WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}