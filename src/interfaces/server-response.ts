export interface ServerResponse<T> {
    total?: number;
    data: T;
    success: boolean;
    error?: string[];
    message: string;
}

export interface SubServerResponse<T> {
    total?: number;
    page_data: T;
    next_page?: number;
    previous_page?: number;

    max_price_value: number; // Only for product catalog
}