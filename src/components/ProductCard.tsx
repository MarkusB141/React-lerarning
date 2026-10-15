import { Link } from "react-router-dom";
import { Button } from "./Button";
import { buttonBaseClass } from "../styles/buttonStyles";
import type { Product, ProductStatus } from "../types/product";

type ProductCardProps = {
    product: Product;
    onDelete: (id: number) => void;
    onEdit: (product: Product) => void;
}

export function ProductCard({ product, onDelete, onEdit }: ProductCardProps) {

    return (
        <div className="h-full flex flex-col border border-slate-200 rounded-lg p-4 shadow-md bg-white">
            <div className="flex-1">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(product.status)}`} >Status: {product.status}</p>
                <p>ID: {product.id}</p>
            </div>
            <div className="flex flex-wrap gap-2 pt-4">
                <Link className={`${buttonBaseClass} bg-gray-600 hover:bg-gray-700`} to={`/products/${product.id}`}>Details</Link>
                <Button variant="danger" onClick={() => onDelete(product.id)}>Löschen</Button>
                <Button variant="primary" onClick={() => onEdit(product)}>Bearbeiten</Button>
            </div>
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