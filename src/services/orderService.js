import { supabase } from '../utils/supabase.js'

// Order-related database operations
export const orderService = {
  // Create a new order
  async createOrder(orderData) {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Create order items
  async createOrderItems(orderId, items) {
    const orderItems = items.map(item => ({
      order_id: orderId,
      product_id: item.product_id,
      product_name: item.product_name,
      product_brand: item.product_brand,
      flavor: item.flavor,
      unit_price: item.unit_price,
      quantity: item.quantity
    }))

    const { data, error } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select()

    if (error) throw error
    return data
  },

  // Get order by ID
  async getOrderById(orderId) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('id', orderId)
      .single()

    if (error) throw error
    return data
  }
}