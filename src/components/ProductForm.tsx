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

export function ProductForm({ onAdd, onUpdate, editingProduct }: ProductFormProps){
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

    function validateProductName(): boolean{
        if(formData.name.trim() === ""){
            setNameError('Produktname darf nicht leer sein.');
            return false;
        }
        setNameError('');
        return true;
    }

    function handleSubmit(event: SubmitEvent<HTMLFormElement>){
        event.preventDefault();
        const isValidName = validateProductName();
        if(!isValidName){
            return;
        }
        const product: Product = {
            id: editingProduct ? editingProduct.id : Date.now(),
            ...formData
        }
        if(editingProduct){
            onUpdate(product);
        }else{
            onAdd(product);
        }
        setFormData({
            name: '',
            status: 'Verfügbar'
        });
    }

    function handleChange<K extends keyof ProductFormData>(field: K,value: ProductFormData[K]) { // Indexed Access Type 'Welchen Typ hat die Property K in ProductFormData?'
        setFormData(previousFormData => ({
            ...previousFormData,
            [field]: value // [field] nennt man 'computed property names'
        }));
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            value={formData.name}
            onChange={event =>{
                handleChange('name', event.target.value);
                setNameError('');
            }}
            />
            <select 
            value={formData.status}
            onChange={event => {
                handleChange('status', event.target.value as ProductStatus);
            }}
            >
                <option value="Verfügbar">Verfügbar</option>
                <option value="Verliehen">Verliehen</option>
                <option value="Beschädigt">Beschädigt</option>
            </select>
            <button type="submit">
                {editingProduct ? 'Speichern' : 'Hinzufügen'}
            </button>
            {nameError && <p>{nameError}</p>}
        </form>
    )
}