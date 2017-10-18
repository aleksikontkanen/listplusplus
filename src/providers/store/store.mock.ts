import { Injectable } from '@angular/core';
import { UserProviderMock } from './user';
import { ListsProviderMock } from './lists';

@Injectable()
export class StoreProviderMock {

    constructor(
        public user: UserProviderMock,
        public lists: ListsProviderMock
    ) { }


    public initializeStore(): void {
        // Stub
    }

}
