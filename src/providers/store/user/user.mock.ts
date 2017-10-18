import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiMockData } from './../../api';
import { IStore } from './../store.model';
import { IUser } from './user.model'; /* tslint:disable-line */

@Injectable()
export class UserProviderMock implements IStore {

    constructor() { }

    public async initialize() {
        // Stub
    }

    public getUserInfo(): Observable<IUser> {
        return Observable.of(ApiMockData.user);
    }

}
