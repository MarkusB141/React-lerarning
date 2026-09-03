import { useParams } from "react-router-dom";

export function ProductDetailPage() {

    // const params = useParams();
    const { id } = useParams();
    const productId = Number(id);
    // validierung
    if (Number.isNaN(productId)) {
        return <p>Ungültige Produkt-ID</p>;
    }

    return (
        <div>
        <h1>Produktdetails</h1>
        <p>Produkt-ID: {id}</p>
        </div>
    );
}