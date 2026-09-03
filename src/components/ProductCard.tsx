import type { Product } from "../types/product";

type ProductCardProps = {
    product: Product;
    onDelete: (id: number) => void;
    onEdit: (product: Product) => void;
}

export function ProductCard({ product, onDelete, onEdit }: ProductCardProps) {

    return (
        <div>
            <h2>{product.name}</h2>
            <p>Status: {product.status}</p>
            <p>ID: {product.id}</p>
            <button onClick={() => onDelete(product.id)}>Löschen</button>
            <button onClick={() => onEdit(product)}>Bearbeiten</button>
        </div>
    )
}