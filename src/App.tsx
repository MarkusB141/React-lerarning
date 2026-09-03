import './App.css'
import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import { ProductsPage } from "./pages/ProductsPage";
import { CustomersPage } from "./pages/CustomersPage";
import { HomePage } from "./pages/HomePage";
import { ProductDetailPage } from './pages/ProductDetailPage';

export default function App() {
  // Variablen
  const appName = 'Bettenverleih';
  // States
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/customers" element={<CustomersPage />} />
    </Routes>
  </div>
  )
}