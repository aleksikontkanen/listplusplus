export interface IApi {
    authentication: string,
    users: string,
    taskLists: string,
    listItems: string
}

export interface ICredentials {
    username: string,
    password: string
}

export const baseUrl: string = 'http://localhost:8000/api/v1/';

export const credentials: ICredentials = {
    username: 'api_test',
    password: 'MwWRum8iBx9dq45cu3XGd00w'
}

export const endpoints: IApi = {
    authentication: baseUrl + 'authenticate/',
    users: baseUrl + 'users/',
    taskLists: baseUrl + 'tasklists/',
    listItems: baseUrl + 'listitems/'
};
