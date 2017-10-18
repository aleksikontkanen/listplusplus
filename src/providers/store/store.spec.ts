import { async, TestBed, inject } from '@angular/core/testing';

import { StoreProvider } from './store';
import { UserProvider, UserProviderMock } from './user';
import { ListsProvider, ListsProviderMock } from './lists';

describe('Store Provider', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                StoreProvider,
                { provide: UserProvider, useClass: UserProviderMock },
                { provide: ListsProvider, useClass: ListsProviderMock }
            ]
        })
    });

    it('should instantiate', async(inject(
        [StoreProvider], (store: StoreProvider) => {
            expect(store).toBeDefined();
        })
    ));

    it('should initialize', async(inject(
        [StoreProvider, UserProvider, ListsProvider], (store: StoreProvider, user: UserProviderMock, lists: ListsProviderMock) => {

            const userSpy = spyOn(user, 'initialize').and.callThrough();
            const listsSpy = spyOn(lists, 'initialize').and.callThrough();

            store.initializeStore().then(() => {
                expect(userSpy.calls.count()).toBe(1);
                expect(listsSpy.calls.count()).toBe(1);
            });
        })
    ));

});
