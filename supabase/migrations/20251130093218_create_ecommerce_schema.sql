/*
  # E-commerce Database Schema

  ## Overview
  Creates a complete e-commerce database with products, categories, cart, and orders.

  ## New Tables
  
  ### 1. `categories`
  - `id` (uuid, primary key) - Unique category identifier
  - `name` (text) - Category name
  - `slug` (text, unique) - URL-friendly category identifier
  - `description` (text) - Category description
  - `image_url` (text) - Category image
  - `created_at` (timestamptz) - Creation timestamp

  ### 2. `products`
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text) - Product name
  - `slug` (text, unique) - URL-friendly product identifier
  - `description` (text) - Product description
  - `price` (decimal) - Product price
  - `image_url` (text) - Primary product image
  - `images` (jsonb) - Additional product images array
  - `category_id` (uuid) - Foreign key to categories
  - `stock` (integer) - Available stock quantity
  - `featured` (boolean) - Featured product flag
  - `rating` (decimal) - Average product rating
  - `created_at` (timestamptz) - Creation timestamp

  ### 3. `cart_items`
  - `id` (uuid, primary key) - Unique cart item identifier
  - `user_id` (uuid) - Foreign key to auth.users
  - `product_id` (uuid) - Foreign key to products
  - `quantity` (integer) - Item quantity
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 4. `orders`
  - `id` (uuid, primary key) - Unique order identifier
  - `user_id` (uuid) - Foreign key to auth.users
  - `total` (decimal) - Order total amount
  - `status` (text) - Order status (pending, processing, shipped, delivered)
  - `shipping_address` (jsonb) - Shipping address details
  - `created_at` (timestamptz) - Order creation timestamp

  ### 5. `order_items`
  - `id` (uuid, primary key) - Unique order item identifier
  - `order_id` (uuid) - Foreign key to orders
  - `product_id` (uuid) - Foreign key to products
  - `quantity` (integer) - Item quantity
  - `price` (decimal) - Price at time of order
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for products and categories
  - Authenticated users can manage their own cart and orders
  - Cart items and orders are private to each user

  ## Important Notes
  1. All tables use UUID primary keys for scalability
  2. Timestamps track creation and updates
  3. RLS policies ensure data privacy
  4. JSONB fields for flexible data storage
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  price decimal(10,2) NOT NULL,
  image_url text DEFAULT '',
  images jsonb DEFAULT '[]'::jsonb,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  stock integer DEFAULT 0,
  featured boolean DEFAULT false,
  rating decimal(3,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  quantity integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  total decimal(10,2) NOT NULL,
  status text DEFAULT 'pending',
  shipping_address jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  quantity integer NOT NULL,
  price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read)
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);

-- Products policies (public read)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (true);

-- Cart items policies (private to user)
CREATE POLICY "Users can view own cart items"
  ON cart_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart items"
  ON cart_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart items"
  ON cart_items FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart items"
  ON cart_items FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Orders policies (private to user)
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Order items policies (view through orders)
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_cart_items_user ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- Insert sample categories
INSERT INTO categories (name, slug, description, image_url) VALUES
  ('Electronics', 'electronics', 'Latest gadgets and tech devices', 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg'),
  ('Fashion', 'fashion', 'Trendy clothing and accessories', 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg'),
  ('Home & Living', 'home-living', 'Furniture and home decor', 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg'),
  ('Sports', 'sports', 'Sports equipment and gear', 'https://images.pexels.com/photos/3766111/pexels-photo-3766111.jpeg')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, slug, description, price, image_url, images, category_id, stock, featured, rating) VALUES
  ('Wireless Headphones Pro', 'wireless-headphones-pro', 'Premium noise-canceling headphones with 30-hour battery life', 299.99, 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg', '["https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg"]'::jsonb, (SELECT id FROM categories WHERE slug = 'electronics'), 50, true, 4.8),
  ('Smart Watch Ultra', 'smart-watch-ultra', 'Advanced fitness tracking with GPS and health monitoring', 449.99, 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg', '["https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg"]'::jsonb, (SELECT id FROM categories WHERE slug = 'electronics'), 35, true, 4.7),
  ('Designer Leather Jacket', 'designer-leather-jacket', 'Premium Italian leather with modern cut', 599.99, 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg', '["https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg"]'::jsonb, (SELECT id FROM categories WHERE slug = 'fashion'), 20, true, 4.9),
  ('Minimalist Sofa', 'minimalist-sofa', 'Scandinavian-inspired comfort with clean lines', 1299.99, 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg', '["https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg"]'::jsonb, (SELECT id FROM categories WHERE slug = 'home-living'), 15, true, 4.6),
  ('Professional Camera', 'professional-camera', 'Mirrorless camera with 4K video capability', 1899.99, 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg', '["https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg"]'::jsonb, (SELECT id FROM categories WHERE slug = 'electronics'), 25, false, 4.8),
  ('Running Shoes Elite', 'running-shoes-elite', 'Carbon-plated racing shoes for peak performance', 189.99, 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg', '["https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"]'::jsonb, (SELECT id FROM categories WHERE slug = 'sports'), 60, false, 4.7),
  ('Vintage Sunglasses', 'vintage-sunglasses', 'Classic aviator style with UV protection', 159.99, 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg', '["https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg"]'::jsonb, (SELECT id FROM categories WHERE slug = 'fashion'), 40, false, 4.5),
  ('Smart Home Hub', 'smart-home-hub', 'Control all your smart devices from one place', 129.99, 'https://images.pexels.com/photos/4219878/pexels-photo-4219878.jpeg', '["https://images.pexels.com/photos/4219878/pexels-photo-4219878.jpeg"]'::jsonb, (SELECT id FROM categories WHERE slug = 'electronics'), 45, false, 4.6)
ON CONFLICT (slug) DO NOTHING;