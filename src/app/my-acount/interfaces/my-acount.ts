export interface Address {
    id: string;
    municipality: [];
    state: [];
    country: [];
    street: string;
    number: string;
    postal_code: string;
    neighborhood: string;
    fiscal_address: boolean;
    delivery_address: boolean;
    delivery_default: boolean;
    buyer: string
}
