import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs';
import { IUser, IList, IListItem } from './../store'; /* tslint:disable-line */

import * as ApiConfig from './../../api.config.local';

@Injectable()
export class ApiProvider {

    constructor(
        private http: Http
    ) { }

    public getUserInfo(): Observable<IUser> {
        return this.http.get(ApiConfig.endpoints.users + '1/') // Hardcoded for now
            .map(response => response.json());
    }

    public getUserLists(userId: number): Observable<Array<IList>> {

        const queryParameters = new URLSearchParams();
        queryParameters.append('userId', userId.toString());

        const options: RequestOptionsArgs = {
            search: queryParameters
        };

        return this.http.get(ApiConfig.endpoints.lists, options)
            .map(response => response.json());
    }

    public getListItems(listId: number): Observable<Array<IListItem>> {

        const queryParameters = new URLSearchParams();
        queryParameters.append('list_id', listId.toString());

        const options: RequestOptionsArgs = {
            search: queryParameters
        };

        return this.http.get(ApiConfig.endpoints.listItems, options)
            .map(response => response.json());
    }

}
