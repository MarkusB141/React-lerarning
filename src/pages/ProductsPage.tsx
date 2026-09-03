import { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { ProductForm } from "../components/ProductForm";

import type { Product } from "../types/product";

export function ProductsPage() {
    const [showProductForm, setShowProductForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
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
        setEditingProduct(null);
        setShowProductForm(false);
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
      {showProductForm && <ProductForm onAdd={handleAddProduct} onUpdate={handleUpdateProduct} editingProduct={editingProduct}/>}
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
          onDelete={handleDeleteProduct}
          onEdit={handleEditProduct}
        />
      ))}
    </div>
  );
}