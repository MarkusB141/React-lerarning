import { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { ProductForm } from "../components/ProductForm";
import { ProductTable } from "../components/ProductTable";
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
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border border-slate-200 rounded-lg p-4 shadow-md">
        <h1 className="text-3xl font-bold">Produkte</h1>
          <button
          className={`${buttonBaseClass} ${showProductForm ? 'bg-gray-600 hover:bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          onClick={handleProductFormToggle}
        >
          {showProductForm ? 'Abbrechen' : 'Neues Produkt'}
        </button>
      </div>
       <p className="text-sm text-gray-500">{products.length > 0 ? `${products.length} Produkte vorhanden` : 'Keine Produkte vorhanden'}</p>
      
      {showProductForm && <ProductForm onAdd={handleAdd} onUpdate={handleUpdate} editingProduct={editingProduct}/>}
      <hr />
      {editingProduct && (
        <p>
          Du bearbeitest gerade: {editingProduct.name}
        </p>
      )}
      {/* Ausgabe aller Produkte */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={onDelete}
            onEdit={handleEditProduct}
          />
        ))}
      </div>

      <ProductTable products={products}/>
    
    </div>
  );
}

const buttonBaseClass = "text-white px-3 py-2 rounded-md";