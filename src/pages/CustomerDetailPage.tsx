import { useParams } from "react-router-dom";
import type { Customer } from "../types/customers";

type CustomerDetailPageProps = {
    customers: Customer[];
}

export function CustomerDetailPage({ customers }: CustomerDetailPageProps) {

    const { id } = useParams();
    const customerId = Number(id);
    // validierung
    if (Number.isNaN(customerId)) {
        return <p>Ungültige Kunden-ID</p>;
    }
    const customer = customers.find(
        customers => customers.id === customerId
    );
    if(!customer){
        return <p>Kunde nicht gefunden</p>;
    }

    return (
        <div>
            <h1>{customer.name}</h1>
            <p>Kunden-ID: {customer.id}</p>
        </div>
    )
}