import { Injectable } from '@angular/core';
import { UserProviderMock } from './user';
import { ListsProviderMock } from './lists';

@Injectable()
export class StoreProviderMock {

    public user: UserProviderMock = new UserProviderMock;
    public lists: ListsProviderMock = new ListsProviderMock;

    public initializeStore(): void {
        // Stub
    }

}
