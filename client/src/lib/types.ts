export interface ProductFilter {
  category?: string;
  search?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface CartItemWithProduct {
  id: number;
  sessionId: string;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: string;
    originalPrice?: string;
    image: string;
    inStock: boolean;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
