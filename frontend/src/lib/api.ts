const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Global Event target for the API Inspector panel to listen to.
export const apiInspectorEventTarget = new EventTarget();

function logApiCall(method: string, url: string, status: number, body?: unknown) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[API ${method}] ${url} - Status: ${status}`, body ? body : '');
    
    apiInspectorEventTarget.dispatchEvent(new CustomEvent('api-log', {
      detail: { method, url, status, body, timestamp: Date.now() }
    }));
  }
}

// ==========================================
// ADAPTER ASSUMPTIONS & NORMALIZATION
// ==========================================
// The backend returns varying field names. We map them to standard fields here:
// `id` maps to backend's `product_id` (or `id` if changed).
// `name` maps to `product_name` (or `name`).
// `price` maps to `price` (or `unit_price`).
// `stock` maps to `available_quantity` (or `qty`).
// cart_item_id is used for Cart operations (PUT/DELETE).

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  stock: number;
  description?: string;
}

export interface CartItem {
  cart_item_id: number; // The key used by PUT/DELETE
  product: Product;
  quantity: number;
}

// Normalizer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeProduct(raw: any): Product {
  return {
    id: raw.product_id ?? raw.id ?? 0,
    name: raw.product_name ?? raw.name ?? 'Unknown Product',
    brand: raw.brand ?? '',
    price: raw.price ?? raw.unit_price ?? 0,
    stock: raw.available_quantity ?? raw.qty ?? 0,
    description: raw.description ?? raw.desc ?? "",
  };
}

export async function getProducts(search?: string): Promise<Product[]> {
  try {
    const url = new URL(`${API_URL}/products`);
    if (search) {
      url.searchParams.append('search', search);
    }
    const res = await fetch(url.toString(), {
        headers: { 'Accept': 'application/json' }
    });
    
    // Attempt parsing
    let data;
    try { data = await res.json(); } catch(e) { /* ignore JSON parse error */ }
    
    logApiCall('GET', url.toString(), res.status, data);
    
    if (!res.ok) throw new Error('Failed to fetch products');
    
    // Handle data format from backend: { success: true, data: [...] }
    const rawProducts = data?.data || [];
    return rawProducts.map(normalizeProduct);
  } catch (error) {
    console.error('getProducts error:', error);
    throw error;
  }
}

export async function addToCart(payload: { product_id: number, quantity: number }): Promise<number | null> {
  const url = `${API_URL}/cart/add`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    let data;
    try { data = await res.json(); } catch(e) {}
    
    logApiCall('POST', url, res.status, data);
    
    if (!res.ok) throw new Error('Failed to add to cart');
    
    // Fallback: If cart_item_id is not returned, we issue a warning and might need to mock one.
    if (!data?.cart_item_id) {
      console.warn("DEV WARNING: POST /cart/add did not return 'cart_item_id'. The UI might fail on subsequent PUT/DELETE.");
    }
    
    return data?.cart_item_id || null;
  } catch (error) {
    console.error('addToCart error:', error);
    throw error;
  }
}

export async function updateCartItem(cart_item_id: number, quantity: number): Promise<void> {
  const url = `${API_URL}/cart/update/${cart_item_id}`;
  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity })
    });
    let data;
    try { data = await res.json(); } catch(e) {}
    
    logApiCall('PUT', url, res.status, data);
    
    if (!res.ok) throw new Error('Failed to update cart item');
  } catch (error) {
    console.error('updateCartItem error:', error);
    throw error;
  }
}

export async function removeCartItem(cart_item_id: number): Promise<void> {
  const url = `${API_URL}/cart/remove/${cart_item_id}`;
  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    let data;
    try { data = await res.json(); } catch(e) {}
    
    logApiCall('DELETE', url, res.status, data);
    
    if (!res.ok) throw new Error('Failed to remove cart item');
  } catch (error) {
    console.error('removeCartItem error:', error);
    throw error;
  }
}

export async function checkout(): Promise<{ order_id: number, total_amount: number }> {
  const url = `${API_URL}/checkout`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}) // Empty body uses default customer 25BYB0186
    });
    
    let data;
    try { data = await res.json(); } catch(e) {}
    logApiCall('POST', url, res.status, data);
    
    if (!res.ok) throw new Error(data?.error || 'Failed to checkout');
    
    return { order_id: data.order_id, total_amount: data.total_amount };
  } catch (error) {
    console.error('checkout error:', error);
    throw error;
  }
}

export async function getOrders(): Promise<any[]> {
  const url = `${API_URL}/orders`;
  try {
    const res = await fetch(url);
    let data;
    try { data = await res.json(); } catch(e) {}
    logApiCall('GET', url, res.status, data);
    
    if (!res.ok) throw new Error(data?.error || 'Failed to fetch orders');
    
    return data.data || [];
  } catch (error) {
    console.error('getOrders error:', error);
    throw error;
  }
}

export async function getOrder(orderId: number): Promise<any> {
  const url = `${API_URL}/orders/${orderId}`;
  try {
    const res = await fetch(url);
    let data;
    try { data = await res.json(); } catch(e) {}
    logApiCall('GET', url, res.status, data);
    
    if (!res.ok) throw new Error(data?.error || 'Failed to fetch order');
    
    return data.data;
  } catch (error) {
    console.error('getOrder error:', error);
    throw error;
  }
}
