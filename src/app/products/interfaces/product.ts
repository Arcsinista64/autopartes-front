import { Multimedia } from 'src/app/shared/interfaces/multimedia';

//TODO: may changee
export interface ProductDetail {
    product: Product;
    recommended_products?: any;
    wishlist: boolean;
    seller_reviews?: [];
}

export interface Product {
    id: string;
    multimedia: Multimedia[];
    subcategory: Subcategory;
    condition: Condition;
    shipment_type: Shipment_type;
    publication_type: Publication_type;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    public_id: number;
    name: string;
    price: string;
    quantity: number;
    brand: string;
    origin: Origin;
    part_number: string;
    stock: number;
    description: string;
    warranty: string;
    seller: any;
    product_reviews: any;
    seller_reviews: any;
    questions: any;
    discount: boolean;
    featured: boolean;
    wishlist: boolean;
    shipment_agreement_options: any;
}

export interface Origin {
    id: string;
    name: string;
    short_code: string;
}

export interface Subcategory {
    id: string;
    name: string;
    category: { 
        id: string;
        name: string;
    }
}

export interface Condition {
    id: string;
    name: string;
}

export interface Shipment_type {
    id: string;
    text: string;
}
export interface Publication_type {
    id: string;
    name: string;
    comission: string;
}

export interface SmallProduct {
    id: string;
    name: string;
    price: string;
    multimedia?: Multimedia[];
    publication_type: string;
    length: number;
    discount: boolean;
    featured: boolean;
}