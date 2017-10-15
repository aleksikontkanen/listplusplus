import { Injectable } from '@angular/core';
import { UserProvider } from './user';

@Injectable()
export class StoreProvider {

    constructor(
        public user: UserProvider
    ) { }

    public async initializeStore(): Promise<void> {
        await this.user.initialize();
    }

}
