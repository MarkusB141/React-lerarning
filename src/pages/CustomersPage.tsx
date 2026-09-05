import { CustomerCard } from "../components/CustomerCard";
import type { Customer } from "../types/customers";

type CustomersPageProps = {
  customers: Customer[];
}

export function CustomersPage({ customers }: CustomersPageProps) {
  return (
    <div>
      <h1>Kunden</h1>
      <p>Hier kommt später die Kunden hin.</p>
      {customers.map(customer => (
        <CustomerCard 
          key={customer.id}
          customer={customer}
        />
      ))

      }
    </div>
  );
}