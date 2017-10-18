import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiMockData } from './../../api';
import { IStore } from './../store.model';
import { IList } from './lists.model'; /* tslint:disable-line */

@Injectable()
export class ListsProviderMock implements IStore {

    constructor() { }

    public async initialize() {
        // Stub
    }

    public getUserLists(): Observable<Array<IList>> {
        return Observable.of(ApiMockData.lists);
    }

}
