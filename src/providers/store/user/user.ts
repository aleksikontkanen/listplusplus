import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

import { ApiProvider } from './../../api';
import { IStore } from './../store.model';
import { IUser } from './user.model'; /* tslint:disable-line */

@Injectable()
export class UserProvider implements IStore {

    private userInfo: ReplaySubject<IUser> = new ReplaySubject(1);

    constructor(
        private api: ApiProvider
    ) { }

    public async initialize(): Promise<void> {
        await this.api.getUserInfo().subscribe(userInfo => {
            this.userInfo.next(userInfo);

        }, error => this.userInfo.error(error));
    }

    public getUserInfo(): Observable<IUser> {
        return this.userInfo.asObservable();
    }

}
