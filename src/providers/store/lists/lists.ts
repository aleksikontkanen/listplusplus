import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

import { ApiProvider } from './../../api';
import { UserProvider } from './../user';
import { IStore } from './../store.model';
import { IList } from './lists.model'; /* tslint:disable-line */

@Injectable()
export class ListsProvider implements IStore {

    private lists: ReplaySubject<Array<IList>> = new ReplaySubject(1);

    constructor(
        private api: ApiProvider,
        private user: UserProvider
    ) { }

    public async initialize(): Promise<void> {
        await this.user.getUserInfo()
            .first()
            .flatMap(userInfo => this.api.getUserLists(userInfo.id))
            .subscribe(
            lists => this.lists.next(lists),
            error => this.lists.error(error));
    }

    public getUserLists(): Observable<Array<IList>> {
        return this.lists.asObservable();
    }

}
