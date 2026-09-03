import { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { ProductForm } from "../components/ProductForm";
import type { Product } from "../types/product";

type ProductsPageProps = {
  products: Product[];
  onDelete: (id: number) => void;
  onAdd: (product: Product) => void;
  onUpdate: (product: Product) => void;
}

export function ProductsPage({ products, onDelete, onAdd, onUpdate }: ProductsPageProps) {
    const [showProductForm, setShowProductForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    
    function handleAdd(product: Product){
      onAdd(product);
      setEditingProduct(null);
      setShowProductForm(false);
    }
    function handleUpdate(product: Product){
      onUpdate(product);
      setEditingProduct(null);
      setShowProductForm(false);
    }
    function handleEditProduct(product: Product) {
        setShowProductForm(true);
        setEditingProduct(product);
    }
    function handleProductFormToggle() {
        if (showProductForm) {
        setShowProductForm(false);
        setEditingProduct(null);
        return;
        }
        setEditingProduct(null);
        setShowProductForm(true);
    }

  return (
    <div>
      <h1>Produkte</h1>
      <p>{products.length > 0 ? `${products.length} Produkte vorhanden` : 'Keine Produkte vorhanden'}</p>

      {/* Neues Objekt hinzufügen */}
      <button
        onClick={handleProductFormToggle}
      >
        {showProductForm ? 'Abbrechen' : 'Neues Produkt'}
      </button>
      {showProductForm && <ProductForm onAdd={handleAdd} onUpdate={handleUpdate} editingProduct={editingProduct}/>}
      <hr />
      {editingProduct && (
        <p>
          Du bearbeitest gerade: {editingProduct.name}
        </p>
      )}
      {/* Ausgabe aller Produkte */}
      {products.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
          onDelete={onDelete}
          onEdit={handleEditProduct}
        />
      ))}
    </div>
  );
}