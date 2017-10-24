import { async, TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { ApiProvider, ApiProviderMock, ApiMockData } from './../../api';
import { UserProvider, UserProviderMock } from './../user';
import { ListsProvider } from './lists';
import { ITaskList, IListItem, ListItemState } from './lists.model';

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
            lists.initialize().then(() => {
                lists.getUserLists().subscribe(userLists => {
                    expect(userLists).toEqual(ApiMockData.lists);
                });
            });
        })
    ));

    it('should add new list', async(inject(
        [ListsProvider, ApiProvider], (lists: ListsProvider, api: ApiProviderMock) => {
            const newListName: string = 'New list';
            const newList: ITaskList = {
                id: 1,
                name: newListName,
            } as ITaskList;

            spyOn(api, 'createList').and.returnValue(Observable.of(newList));

            lists.initialize().then(() => {
                lists.addUserList(newListName).then(() => {
                    lists.getUserLists().first().subscribe(userLists => {
                        expect(userLists.pop()).toEqual(newList);
                    });
                });
            });
        })
    ));

    it('should delete list', async(inject(
        [ListsProvider, ApiProvider], (lists: ListsProvider, api: ApiProviderMock) => {
            const list: ITaskList = {
                id: 2
            } as ITaskList;

            lists.initialize().then(() => {
                lists.deleteUserList(list).then(() => {
                    lists.getUserLists().first().subscribe(userLists => {
                        expect(
                            userLists.find(userList => userList.id === list.id)
                        ).toEqual(undefined);
                    });
                });
            });
        })
    ));

    it('should add new list item to existing list', async(inject(
        [ListsProvider, ApiProvider], (lists: ListsProvider, api: ApiProviderMock) => {
            const newListItemName: string = 'New list item';
            const newListItem: IListItem = {
                id: 1,
                name: newListItemName,
            } as IListItem;

            spyOn(api, 'createListItem').and.returnValue(Observable.of(newListItem));

            lists.initialize().then(() => {
                lists.addListItem(newListItemName, ApiMockData.lists[0]).then(() => {
                    lists.getUserLists().first().subscribe(userLists => {
                        expect(userLists[0].list_items.pop()).toEqual(newListItem);
                    });
                });
            });
        })
    ));

    it('should delete list item', async(inject(
        [ListsProvider, ApiProvider], (lists: ListsProvider, api: ApiProviderMock) => {
            const listItem: IListItem = {
                id: 1,
                name: 'List item'
            } as IListItem;

            lists.initialize().then(() => {
                lists.deleteListItem(listItem).then(() => {
                    lists.getUserLists().first().subscribe(userLists => {
                        expect(
                            userLists[0].list_items.find(item => item.id === listItem.id)
                        ).toEqual(undefined);
                    });
                });
            });
        })
    ));

    it('should set list item state', async(inject(
        [ListsProvider, ApiProvider], (lists: ListsProvider, api: ApiProviderMock) => {
            const returnState: ListItemState = 'UNDONE';
            const newListItem: IListItem = {
                id: 2,
                name: 'List item',
                state: returnState
            } as IListItem;

            spyOn(api, 'createListItem').and.returnValue(Observable.of(newListItem));

            lists.initialize().then(() => {
                lists.changeListItemState(newListItem, returnState).then(() => {
                    lists.getUserLists().first().subscribe(userLists => {
                        expect(
                            userLists[0].list_items.find(item => item.id === newListItem.id).state
                        ).toEqual(returnState);
                    });
                });
            });
        })
    ));

});
