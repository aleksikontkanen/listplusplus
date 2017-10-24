import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiMockData } from './../../api';
import { IStore } from './../store.model';
import { ITaskList, IListItem, ListItemState } from './lists.model'; /* tslint:disable-line */

@Injectable()
export class ListsProviderMock implements IStore {

    constructor() { }

    public async initialize() {
        // Stub
    }

    public getUserLists(): Observable<Array<ITaskList>> {
        return Observable.of(ApiMockData.lists);
    }

    public addUserList(): Promise<void> {
        return Promise.resolve();
    }

    public addListItem(): Promise<void> {
        return Promise.resolve();
    }

    public async deleteListItem(listItem: IListItem): Promise<void> {
        return Promise.resolve();
    }

    public async changeListItemState(listItem: IListItem, state: ListItemState): Promise<void> {
        return Promise.resolve();
    }


}
