import type { Product } from "../types/product"

type ProductTableProps = {
    products: Product[];
}

export function ProductTable({ products }: ProductTableProps) {

    return(
        <div  className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full min-w-max border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left px-4 py-3">Name</th>
                        <th className="text-left px-4 py-3">Status</th>
                        <th className="text-left px-4 py-3">ID</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3">{product.name}</td>
                            <td className="px-4 py-3">{product.status}</td>
                            <td className="px-4 py-3">{product.id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    );
}