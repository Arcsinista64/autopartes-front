export interface Group {
    id: number;
    name: string;
}

export interface User {
    seller: boolean;
    seller_onboarding: boolean;
    user_data: {
        username: string;
        email: string;
        groups: Group[];
        date_joined: string;
        first_name: string;
        id?: any,
        is_active: boolean;
        is_staff: boolean;
        is_superuser: boolean;
        last_login: string;
        last_name: string;
        user_permissions: any[];
    }
}
