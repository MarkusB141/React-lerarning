import { Link } from "react-router-dom";
import type { Customer } from "../types/customers";

type CustomerCardProps = {
    customer: Customer;
}

export function CustomerCard({ customer }: CustomerCardProps) {

    return (
        <div>
            <h2>{customer.name}</h2>
            <p>ID: {customer.id}</p>
            <Link to={`/customers/${customer.id}`}>Details</Link>
            <button>Löschen</button>
            <button>Bearbeiten</button>
        </div>
    )
}