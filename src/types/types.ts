export interface Category {
  id: number;
  category_name: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface ProductLine {
  id: number;
  category_id: number;
  name: string;
  image: string;
  created_at: string;
  updated_at: string;
  category: Category;
}

export interface SubCategory {
  id: number;
  product_line_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  product_line: ProductLine;
}
export interface ProductImage {
  id: number;
  product_id: number;
  image_path: string;
  order_position?: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  sub_category_id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  key_features: string | null;
  serial_number: string | null;
  dimensions: string | null;
  product_images: ProductImage[];
}

export interface ProductQuery {
  categoryId: number | string | null;
}

export interface FooterImage {
  id: number;
  image_path: string;
  alt_text: string;
  created_at: string;
  updated_at: string;
}

export interface ImageOrderItem {
  id: number;
  order_position: number;
}

export interface ReorderImagesRequest {
  product_id: number;
  image_orders: ImageOrderItem[];
}

export interface ReorderImagesResponse {
  message: string;
  images: ProductImage[];
}
