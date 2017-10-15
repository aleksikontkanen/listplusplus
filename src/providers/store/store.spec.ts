import { async, TestBed, inject } from '@angular/core/testing';

import { StoreProvider } from './store';
import { UserProvider, UserProviderMock } from './user';

describe('Store Provider', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                StoreProvider,
                { provide: UserProvider, UseClass: UserProviderMock }
            ]
        })
    }));

    it('should instantiate', async(inject(
        [StoreProvider], (store: StoreProvider) => {
            expect(store).toBeDefined();
        })
    ));

});
