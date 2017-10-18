import { async, TestBed, inject } from '@angular/core/testing';

import { ApiProvider, ApiProviderMock, ApiMockData } from './../../api';
import { UserProvider, UserProviderMock } from './../user';
import { ListsProvider } from './lists';

describe('List Provider', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                ListsProvider,
                { provide: ApiProvider, useClass: ApiProviderMock },
                { provide: UserProvider, useClass: UserProviderMock }
            ]
        })
    }));

    it('should instantiate', async(inject(
        [ListsProvider], (lists: ListsProvider) => {
            expect(lists).toBeDefined();
        })
    ));

    it('should initialize', async(inject(
        [ListsProvider, UserProvider], (lists: ListsProvider, user: UserProviderMock) => {
            lists.initialize().then(() => {
                expect(lists).toBeDefined();
            });
        })
    ));

    it('should get current lists', async(inject(
        [ListsProvider], (lists: ListsProvider) => {
            lists.getUserLists().subscribe(userLists => {
                expect(userLists).toEqual(ApiMockData.lists);
            });

        })
    ));

});
