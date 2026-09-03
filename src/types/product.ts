export type ProductStatus =
  | 'Verfügbar'
  | 'Verliehen'
  | 'Beschädigt';
  
export type Product = {
    id: number;
    name: string;
    status: ProductStatus;
}