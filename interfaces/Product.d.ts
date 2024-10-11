export interface Product {
    id: number;
    name: string;
    description?: string;
    tags?: string;
    currency: number;
    store: number;
}