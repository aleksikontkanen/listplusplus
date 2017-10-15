import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { IUser } from './../store'; /* tslint:disable-line */

import * as ApiConfig from './../../api.config.local';

@Injectable()
export class ApiProvider {

    constructor(
        public http: Http
    ) { }

    public getUserInfo(): Observable<IUser> {
        return this.http.get(ApiConfig.endpoints.users + '1/') // Hardcoded for now
            .map(response => response.json());
    }

}
