export interface Order {
    id: string;
    products: [];
    address: any;
    payments: any;
    created_at: string;
    updated_at?: string;
    public_id: string;
    total: number;
    status: string;
    buyer: string;
    shipped_to: string;
    totals: any; // TODO to be define
    tracking_url: string;
}

export interface ProductReview {
    order_product: string;
    rating: number;
    comments: string;
}

export interface SellerReview {
    seller: string;
    rating: number;
    order: string;
    products_match: number;
    comment: string;
}

const orderStatus = [
    'pending',
    'payment_pending',
    'processing',
    'accepted',
    'shipped',
    'delivered',
    'rejected',
    'expired',
    'cancelled',
    'completed'
];

export { orderStatus };
