import { Product, InsertProduct, CartItem, InsertCartItem, Contact, InsertContact } from "@shared/schema";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Cart
  getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
  
  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private contacts: Map<number, Contact>;
  private currentProductId: number;
  private currentCartItemId: number;
  private currentContactId: number;

  constructor() {
    this.products = new Map();
    this.cartItems = new Map();
    this.contacts = new Map();
    this.currentProductId = 1;
    this.currentCartItemId = 1;
    this.currentContactId = 1;
    
    // Initialize with sample products
    this.initializeProducts();
  }

  private initializeProducts() {
    const sampleProducts: InsertProduct[] = [
      {
        name: "Smart Fitness Pro",
        description: "Advanced fitness tracking with heart rate monitoring, GPS, and 7-day battery life.",
        price: "299.00",
        originalPrice: "399.00",
        category: "smartwatches",
        subcategory: "fitness",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"],
        rating: "4.8",
        reviewCount: 124,
        inStock: true,
        stockCount: 15,
        features: ["Heart Rate Monitoring", "GPS Tracking", "7-Day Battery", "Water Resistant"],
        specifications: {
          "Display": "1.4 inch AMOLED",
          "Battery": "7 days",
          "Water Rating": "5ATM",
          "Connectivity": "Bluetooth 5.0"
        },
        badge: null
      },
      {
        name: "Wireless Pro Max",
        description: "Premium noise-canceling headphones with spatial audio and 30-hour battery.",
        price: "249.00",
        originalPrice: "329.00",
        category: "headphones",
        subcategory: "over-ear",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"],
        rating: "4.9",
        reviewCount: 89,
        inStock: true,
        stockCount: 8,
        features: ["Active Noise Cancellation", "Spatial Audio", "30-Hour Battery", "Quick Charge"],
        specifications: {
          "Driver": "40mm Dynamic",
          "Battery": "30 hours",
          "Charging": "USB-C Fast Charge",
          "Weight": "250g"
        },
        badge: null
      },
      {
        name: "Tech Essentials Kit",
        description: "Complete bundle with wireless charger, cables, and premium phone stand.",
        price: "89.00",
        originalPrice: "129.00",
        category: "accessories",
        subcategory: "charging",
        image: "https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        images: ["https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"],
        rating: "4.7",
        reviewCount: 156,
        inStock: true,
        stockCount: 25,
        features: ["Wireless Charging", "Multiple Cables", "Phone Stand", "Cable Organizer"],
        specifications: {
          "Wireless Power": "15W",
          "Cable Types": "USB-C, Lightning, Micro-USB",
          "Stand Material": "Aluminum",
          "Compatibility": "Universal"
        },
        badge: "Limited"
      },
      {
        name: "Sport Elite X",
        description: "Rugged smartwatch with GPS, water resistance, and 14-day battery life.",
        price: "199.00",
        originalPrice: "259.00",
        category: "smartwatches",
        subcategory: "sport",
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        images: ["https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"],
        rating: "4.6",
        reviewCount: 78,
        inStock: true,
        stockCount: 12,
        features: ["GPS Tracking", "Water Resistant", "14-Day Battery", "Sport Modes"],
        specifications: {
          "Display": "1.3 inch LCD",
          "Battery": "14 days",
          "Water Rating": "10ATM",
          "GPS": "Multi-satellite"
        },
        badge: null
      },
      {
        name: "True Wireless Pro",
        description: "Crystal clear audio with active noise cancellation and quick charge case.",
        price: "149.00",
        originalPrice: "199.00",
        category: "headphones",
        subcategory: "earbuds",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"],
        rating: "4.8",
        reviewCount: 203,
        inStock: true,
        stockCount: 18,
        features: ["Active Noise Cancellation", "Touch Controls", "Quick Charge", "Transparency Mode"],
        specifications: {
          "Driver": "11mm Dynamic",
          "Battery": "6+24 hours",
          "Charging": "Wireless + USB-C",
          "Codec": "AAC, SBC"
        },
        badge: "Hot"
      },
      {
        name: "Premium Dock Pro",
        description: "All-in-one charging station for multiple devices with cable management.",
        price: "129.00",
        originalPrice: "169.00",
        category: "accessories",
        subcategory: "charging",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"],
        rating: "4.9",
        reviewCount: 67,
        inStock: true,
        stockCount: 6,
        features: ["Multi-Device Charging", "Cable Management", "LED Indicators", "Premium Materials"],
        specifications: {
          "Devices": "Up to 4 devices",
          "Power": "65W Total",
          "Material": "Aluminum + Silicone",
          "Size": "200 x 150 x 50mm"
        },
        badge: null
      }
    ];

    sampleProducts.forEach(product => {
      this.createProduct(product);
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => 
      product.category === category
    );
  }

  async searchProducts(query: string): Promise<Product[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.products.values()).filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]> {
    const items = Array.from(this.cartItems.values()).filter(item => 
      item.sessionId === sessionId
    );
    
    return items.map(item => {
      const product = this.products.get(item.productId);
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }
      return { ...item, product };
    });
  }

  async addToCart(cartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = Array.from(this.cartItems.values()).find(item =>
      item.sessionId === cartItem.sessionId && item.productId === cartItem.productId
    );

    if (existingItem) {
      // Update quantity instead of creating new item
      existingItem.quantity += cartItem.quantity;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    }

    const id = this.currentCartItemId++;
    const item: CartItem = { ...cartItem, id };
    this.cartItems.set(id, item);
    return item;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;

    if (quantity <= 0) {
      this.cartItems.delete(id);
      return undefined;
    }

    item.quantity = quantity;
    this.cartItems.set(id, item);
    return item;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const itemsToRemove = Array.from(this.cartItems.values()).filter(item =>
      item.sessionId === sessionId
    );
    
    itemsToRemove.forEach(item => {
      this.cartItems.delete(item.id);
    });
    
    return true;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
