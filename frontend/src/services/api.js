const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Token management methods
  setToken(token) {
    localStorage.setItem('token', token);
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  // Auth API calls
  async login(email, password) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  }

  async register(userData) {
    const response = await fetch(`${this.baseURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    return response.json();
  }

  // Products API calls
  async getProducts(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${this.baseURL}/products?${params}`, {
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  async getMyProducts() {
    const response = await fetch(`${this.baseURL}/products/my-products`, {
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  async createProduct(productData) {
    const response = await fetch(`${this.baseURL}/products`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(productData)
    });
    return response.json();
  }

  async updateProduct(productId, productData) {
    const response = await fetch(`${this.baseURL}/products/${productId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(productData)
    });
    return response.json();
  }

  async deleteProduct(productId) {
    const response = await fetch(`${this.baseURL}/products/${productId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  async getProduct(productId) {
    const response = await fetch(`${this.baseURL}/products/${productId}`, {
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  // Orders API calls
  async getMyOrders() {
    const response = await fetch(`${this.baseURL}/orders/my-orders`, {
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  async getSupplierOrders() {
    const response = await fetch(`${this.baseURL}/orders/supplier-orders`, {
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  async createOrder(orderData) {
    const response = await fetch(`${this.baseURL}/orders`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(orderData)
    });
    return response.json();
  }

  async updateOrderStatus(orderId, status) {
    const response = await fetch(`${this.baseURL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    return response.json();
  }

  async addOrderReview(orderId, rating, review) {
    const response = await fetch(`${this.baseURL}/orders/${orderId}/review`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ rating, review })
    });
    return response.json();
  }

  async getOrder(orderId) {
    const response = await fetch(`${this.baseURL}/orders/${orderId}`, {
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  // Analytics API calls
  async getVendorAnalytics() {
    const response = await fetch(`${this.baseURL}/analytics/vendor`, {
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  async getSupplierAnalytics() {
    const response = await fetch(`${this.baseURL}/analytics/supplier`, {
      headers: this.getAuthHeaders()
    });
    return response.json();
  }
}

export default new ApiService(); 