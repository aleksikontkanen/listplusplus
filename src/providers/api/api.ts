import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import { IUser, ITaskList, IListItem, ListItemState } from './../store'; /* tslint:disable-line */

import * as ApiConfig from './../../api.config.local';

@Injectable()
export class ApiProvider {

    private _authenticationToken: string;
    get authenticationToken() { return this._authenticationToken; }
    set authenticationToken(token: string) { this._authenticationToken = token; }

    constructor(
        private http: Http
    ) { }

    public authenticate(username: string, password: string): Observable<{ token: string }> {
        return this.getAuthenticationToken(username, password).do(authenticationInfo => {
            this._authenticationToken = authenticationInfo.token;
        });
    }

    public resetAuthentication(): void {
        this._authenticationToken = undefined;
    }

    public getUserInfo(): Observable<IUser> {
        return this.createHttpRequest(ApiConfig.endpoints.users + '1/') // Hardcoded for now
            .map(response => response.json());
    }

    public getUserLists(userId: number): Observable<Array<ITaskList>> {

        const queryParameters = new URLSearchParams();
        queryParameters.append('userId', userId.toString());

        const options: RequestOptionsArgs = {
            search: queryParameters
        };

        return this.createHttpRequest(ApiConfig.endpoints.taskLists, options)
            .map(response => response.json());
    }

    public getListItems(listId: number): Observable<Array<IListItem>> {

        const queryParameters = new URLSearchParams();
        queryParameters.append('list_id', listId.toString());

        const options: RequestOptionsArgs = {
            search: queryParameters
        };

        return this.createHttpRequest(ApiConfig.endpoints.listItems, options)
            .map(response => response.json());
    }

    public createList(listName: string): Observable<ITaskList> {

        const options: RequestOptionsArgs = {
            method: RequestMethod.Post,
            body: {
                "name": listName,
                "list_items": []
            }
        };

        return this.createHttpRequest(ApiConfig.endpoints.taskLists, options)
            .map(response => response.json());
    }

    public deleteList(list: ITaskList): Observable<Response> {

        const options: RequestOptionsArgs = {
            method: RequestMethod.Delete,
        };

        return this.createHttpRequest(ApiConfig.endpoints.taskLists + list.id + '/', options);
    }

    public shareList(listToShare: ITaskList, shareToUserEmail: string): Observable<Response> {

        const options: RequestOptionsArgs = {
            method: RequestMethod.Post,
            body: {
                "share_to_email": shareToUserEmail,
                "tasklist_id": listToShare.id
            }
        };

        return this.createHttpRequest(ApiConfig.endpoints.taskListsShare, options);
    }

    public createListItem(itemName: string, taskList: ITaskList): Observable<IListItem> {

        const options: RequestOptionsArgs = {
            method: RequestMethod.Post,
            body: {
                "name": itemName,
                "task_list_id": taskList.id
            }
        };

        return this.createHttpRequest(ApiConfig.endpoints.listItems, options)
            .map(response => response.json());
    }

    public deleteListItem(listItem: IListItem): Observable<Response> {

        const options: RequestOptionsArgs = {
            method: RequestMethod.Delete,
        };

        return this.createHttpRequest(ApiConfig.endpoints.listItems + listItem.id + '/', options);
    }

    public changeListItemState(listItem: IListItem, state: ListItemState): Observable<IListItem> {

        const options: RequestOptionsArgs = {
            method: RequestMethod.Patch,
            body: {
                "state": state
            }
        };

        return this.createHttpRequest(ApiConfig.endpoints.listItems + listItem.id + '/', options)
            .map(response => response.json());
    }



    /* Internal */

    private getAuthenticationToken(username: string, password: string): Observable<{ token: string }> {
        const options: RequestOptionsArgs = {
            method: RequestMethod.Post,
            body: {
                username,
                password
            }
        }

        return this.createHttpRequest(ApiConfig.endpoints.authentication, options)
            .map(response => response.json())

    }

    private createHttpRequest(url: string, options: RequestOptionsArgs = {}): Observable<Response> {

        const headers = new Headers({
            'Content-Type': 'application/json'
        })

        if (this.authenticationToken) {
            headers.append('Authorization', 'Token ' + this.authenticationToken);
        }

        const defaultOptions: RequestOptionsArgs = {
            headers
        };

        const aggregateOptions = Object.assign({}, defaultOptions, options);

        return this.http.request(url, aggregateOptions);
    }

}
