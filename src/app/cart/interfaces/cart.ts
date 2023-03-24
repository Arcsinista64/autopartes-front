export interface Product {
    map(arg0: (res: { product: any; }) => any): any;
    cart: number;
    created_at: string;
    deleted_at: null;
    id: number;
    product: any;
    quantity: number;
    stock: number;
    updated_at: string;
    buyer: string;
    shipment_agreement_options: any[];
}