import './App.css'
import { useState } from "react";
import { AppLayout } from "./layouts/AppLayout";
import { Routes, Route } from "react-router-dom";
import { ProductsPage } from "./pages/ProductsPage";
import { CustomersPage } from "./pages/CustomersPage";
import { HomePage } from "./pages/HomePage";
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CustomerDetailPage } from './pages/CustomerDetailPage';
import { RentalsPage } from './pages/RentalsPage';
import { RenalDetailPage } from './pages/RentalDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ApiTestPage } from './components/ApiTestPage';
import type { Product } from './types/product';
import type { Customer } from './types/customers';

export default function App() {
  // States
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
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: 'Max Mustermann'
    },
    {
      id: 2,
      name: 'Anna Berger'
    },
    {
      id: 3,
      name: 'Thomas Huber'
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
    
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path='api-test' element={<ApiTestPage />} ></Route>
        <Route path='products'>
          <Route 
            index
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
            path=":id" 
            element={
              <ProductDetailPage 
                products={products}
              />
            } 
          />
        </Route>
        <Route path='customers'>
          <Route 
            index
            element={<CustomersPage 
                customers={customers}
              />
            } 
          />
          <Route 
            path=":id" 
            element={
              <CustomerDetailPage
                customers={customers}
              />
            } 
          />
        </Route>
        <Route path='rentals'>
          <Route 
            index
            element={<RentalsPage/>} 
          />
          <Route 
            path=":id" 
            element={<RenalDetailPage />} 
          />
        </Route>
        <Route
          path='*'
          element={
            <NotFoundPage />
          }
        />
      </Route>
    </Routes>
  </div>
  )
}