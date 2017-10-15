export interface IApi {
    users: string,
    lists: string,
    listItems: string
}

export const baseUrl: string = 'http://localhost:8000/api/v1/';

export const endpoints: IApi = {
    users: baseUrl + 'users/',
    lists: baseUrl + 'lists/',
    listItems: baseUrl + 'listItems/'
};
