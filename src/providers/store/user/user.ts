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
        // Nothing to initialize
    }

    public getUserInfo(): Observable<IUser> {
        return this.userInfo.asObservable();
    }

    public login(username: string, password: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.authenticate(username, password).subscribe(() => {
                this.api.getUserInfo().subscribe(userInfo => {
                    this.userInfo.next(userInfo);
                    resolve();
                }, error => {
                    this.userInfo.error(error);
                    resolve();
                });
            }, error => {
                reject();
            });
        });
    }

    public logout(): void {
        this.api.resetAuthentication();
        this.userInfo.next(undefined);
    }

}
