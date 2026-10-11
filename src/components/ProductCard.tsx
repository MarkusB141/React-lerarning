import { Link } from "react-router-dom";
import type { Product, ProductStatus } from "../types/product";

type ProductCardProps = {
    product: Product;
    onDelete: (id: number) => void;
    onEdit: (product: Product) => void;
}

export function ProductCard({ product, onDelete, onEdit }: ProductCardProps) {

    const buttonBaseClass = 'inline-flex items-center justify-center px-4 py-2 rounded-md text-white';

    return (
        <div className="border border-slate-200 rounded-lg p-4 shadow-md bg-white">
            <h2>{product.name}</h2>
            <p className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(product.status)}`} >Status: {product.status}</p>
            <p>ID: {product.id}</p>
            <Link className={`${buttonBaseClass} bg-gray-600 hover:bg-gray-700`} to={`/products/${product.id}`}>Details</Link>
            <button className={`${buttonBaseClass} bg-red-600 hover:bg-red-700`} onClick={() => onDelete(product.id)}>Löschen</button>
            <button className={`${buttonBaseClass} bg-blue-600 hover:bg-blue-700`} onClick={() => onEdit(product)}>Bearbeiten</button>
        </div>
    )
}

function getStatusClass(status: ProductStatus): string {
    if(status === 'Verfügbar'){
        return 'bg-green-100 text-green-800';
    }
    if(status === 'Verliehen'){
        return 'bg-yellow-100 text-yellow-800';
    }
    return 'bg-red-100 text-red-800';
}