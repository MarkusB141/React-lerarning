import './App.css'
import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import { ProductsPage } from "./pages/ProductsPage";
import { CustomersPage } from "./pages/CustomersPage";
import { HomePage } from "./pages/HomePage";
import { ProductDetailPage } from './pages/ProductDetailPage';
import type { Product } from './types/product';

export default function App() {
  // Variablen
  const appName = 'Bettenverleih';
  // States
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Pflegebett',
      status: 'Verfügbar'
    },
    {
      id: 2,
      name: 'Nachtkästchen',
      status: 'Verliehen'
    },
    {
      id: 3,
      name: 'Elektrisches Pflegebett',
      status: 'Beschädigt'
    },
    {
      id: 4,
      name: 'Standard Pflegebett',
      status: 'Verfügbar'
    }
  ]);

  function handleDeleteProduct(id: number){
      setProducts(previousProducts => 
          previousProducts.filter(product => product.id !== id)
      );
  }
  function handleAddProduct(product: Product) {
      setProducts(previousProducts => [...previousProducts, product]);
  }
  function handleUpdateProduct(updatedProduct: Product){
      setProducts(previousProducts => 
      previousProducts.map(product => {
        if(product.id === updatedProduct.id){
          return updatedProduct;
        }
        return product;
      })
      )
  }

  return (
  <div>
    {/* Kopfteil */}
    <h1>{appName}</h1>
    {/* LogIn Button */}
    <button onClick={() => setIsLoggedIn(previousIsLoggedIn => !previousIsLoggedIn)}>
      {isLoggedIn ? 'Abmelden' : 'Anmelden'}
    </button>
    {/* Navigation */}
    <Navigation title="Bereiche" showTitle={true}/>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route 
        path="/products" 
        element={
          <ProductsPage 
            products={products} 
            onDelete={handleDeleteProduct}
            onAdd={handleAddProduct}
            onUpdate={handleUpdateProduct}
          />
        } 
      />
      <Route 
        path="/products/:id" 
        element={
          <ProductDetailPage 
            products={products}
          />
        } 
      />
      <Route path="/customers" element={<CustomersPage />} />
    </Routes>
  </div>
  )
}