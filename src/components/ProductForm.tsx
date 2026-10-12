import { useState, useEffect } from "react";
import type { Product, ProductStatus } from "../types/product";
import type { SubmitEvent } from "react";

type ProductFormProps = {
    onAdd: (product: Product) => void;
    onUpdate: (product: Product) => void;
    editingProduct: Product | null;
}

type ProductFormData = {
    name: string;
    status: ProductStatus;
}

export function ProductForm({ onAdd, onUpdate, editingProduct }: ProductFormProps) {
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        status: 'Verfügbar'
    })
    const [nameError, setNameError] = useState('');

    useEffect(() => {
        if (editingProduct) {
            setFormData({
                name: editingProduct.name,
                status: editingProduct.status
            });
        } else {
            setFormData({
                name: '',
                status: 'Verfügbar'
            });
        }
    }, [editingProduct]);

    function validateProductName(): boolean {
        if (formData.name.trim() === "") {
            setNameError('Produktname darf nicht leer sein.');
            return false;
        }
        setNameError('');
        return true;
    }

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const isValidName = validateProductName();
        if (!isValidName) {
            return;
        }
        const product: Product = {
            id: editingProduct ? editingProduct.id : Date.now(),
            ...formData
        }
        if (editingProduct) {
            onUpdate(product);
        } else {
            onAdd(product);
        }
        setFormData({
            name: '',
            status: 'Verfügbar'
        });
    }

    function handleChange<K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) { // Indexed Access Type 'Welchen Typ hat die Property K in ProductFormData?'
        setFormData(previousFormData => ({
            ...previousFormData,
            [field]: value // [field] nennt man 'computed property names'
        }));
    }

    return (
        <form 
            onSubmit={handleSubmit} 
            className="space-y-4 bg-white border border-slate-200 rounded-lg shadow-md p-6 max-w-xl mx-auto"
        >
            <div>
                <label htmlFor="porductName" className="block mb-2 font-medium">
                    Produktname
                </label>
                <input
                    id="porductName"
                    className={`${inputBaseClass} ${nameError ? 'border-red-500' : 'border-slate-300'}`}
                    type="text"
                    value={formData.name}
                    onChange={event => {
                        handleChange('name', event.target.value);
                        setNameError('');
                    }}
                />
                {nameError && <p className="text-red-600 text-sm">{nameError}</p>}
            </div>
            <div>
                <label htmlFor="productStatus" className="block mb-2 font-medium">
                    Status
                </label>
                <select
                    id="productStatus"
                    className={`${inputBaseClass}  border-slate-300`}
                    value={formData.status}
                    onChange={event => {
                        handleChange('status', event.target.value as ProductStatus);
                    }}
                >
                    <option value="Verfügbar">Verfügbar</option>
                    <option value="Verliehen">Verliehen</option>
                    <option value="Beschädigt">Beschädigt</option>
                </select>
            </div>
            
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                {editingProduct ? 'Speichern' : 'Hinzufügen'}
            </button>
        </form>
    )
}

const inputBaseClass = "w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500";