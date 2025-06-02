import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { ProductFilter } from "@/lib/types";

export function useProducts(filter?: ProductFilter) {
  const queryParams = new URLSearchParams();
  
  if (filter?.category) {
    queryParams.append('category', filter.category);
  }
  
  if (filter?.search) {
    queryParams.append('search', filter.search);
  }
  
  const queryString = queryParams.toString();
  const url = `/api/products${queryString ? '?' + queryString : ''}`;
  
  return useQuery<Product[]>({
    queryKey: ['/api/products', filter],
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    },
  });
}

export function useProduct(id: number) {
  return useQuery<Product>({
    queryKey: ['/api/products', id],
    queryFn: async () => {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      return response.json();
    },
    enabled: !!id,
  });
}
