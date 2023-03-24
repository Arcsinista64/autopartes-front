export const AUTOPARTES_AUTH_TOKEN = 'autopartes-auth-token';
export const AUTOPARTES_AUTH_REFRESH_TOKEN = 'autopartes-auth-refresh-token';

export const DEFAULT_ROUTE_SUCCESS = 'product/search/'; // TODO: ask where to take de register user
export const DEFAUTL_ROUTE_WRONG = '/auth';
export const DEFAULT_ROUTE_WRONG_ACCESS = '/';


export interface TokenResponse {
    token: string;
    access: string;
    refresh?: string;
}
