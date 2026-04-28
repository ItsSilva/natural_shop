import { supabase } from '../utils/supabase.js'

// Product-related database operations
export const productService = {
  // Get all active products
  async getAllProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Get product by ID
  async getProductById(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .eq('active', true)
      .single()

    if (error) throw error
    return data
  },

  // Get product by slug
  async getProductBySlug(slug) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .single()

    if (error) throw error
    return data
  },

  // Get products by category
  async getProductsByCategory(categoryId) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', categoryId)
      .eq('active', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Get products by brand
  async getProductsByBrand(brandId) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('brand_id', brandId)
      .eq('active', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Search products
  async searchProducts(query) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Get all categories
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) throw error
    return data
  },

  // Get all brands
  async getBrands() {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('name')

    if (error) throw error
    return data
  },

  // Get all stores
  async getStores() {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .eq('active', true)
      .order('city')

    if (error) throw error
    return data
  }
}