export interface Product {
    id: number;
    code: string;
    name: string;
    description?: string;
    tags?: string;
    currency: number;
    store: number;
}