export interface IUser {
    id: number,
    name: string,
    email: string,
    readonly date_created: string,
    readonly date_modified: string
}

export const USER_STORAGE_KEY: string = 'listpluplus_user_storage';
export const USER_TOKEN_KEY: string = 'listpluplus_user_token';
