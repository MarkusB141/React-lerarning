import { useParams } from "react-router-dom";
import type { Product } from "../types/product";

type ProductDetailPageProps = {
    products: Product[];
}

export function ProductDetailPage({ products }: ProductDetailPageProps) {

    // const params = useParams();
    const { id } = useParams();
    const productId = Number(id);
    // validierung
    if (Number.isNaN(productId)) {
        return <p>Ungültige Produkt-ID</p>;
    }
    const product = products.find(
        product => product.id === productId
    );
    if(!product){
        return <p>Produkt nicht gefunden</p>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Status: {product.status}</p>
            <p>Produkt-ID: {product.id}</p>
        </div>
    );
}