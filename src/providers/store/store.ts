import { Injectable } from '@angular/core';
import { UserProvider } from './user';
import { ListsProvider } from './lists';

@Injectable()
export class StoreProvider {

    constructor(
        public user: UserProvider,
        public lists: ListsProvider
    ) { }

    public async initializeStore(): Promise<void> {
        await this.user.initialize();
        await this.lists.initialize();
    }

}
