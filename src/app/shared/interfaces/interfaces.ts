export interface Cart<T> {
    cart: {
        id?: string;
        products: T;
        created_at?: string;
        updated_at?: string;
        deleted_at?: string;
        last_modified?: string;
        buyer?: string;
    };
    total: number;
}
export interface InputSelectCategories {
    id: string;
    name: string;
}
export interface InputSelectSubcategories {
    id: string;
    name: string;
    category: any;
}
export interface InputSelectCountry {
    id: string;
    name: string;
}