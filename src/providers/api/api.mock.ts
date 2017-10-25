import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, ITaskList, IListItem, ListItemState } from './../store'; /* tslint:disable-line */

export interface IApiMockData {
    user: IUser,
    lists: Array<ITaskList>
};

// Mock data should be converted in a class with set of factory functions for each model.
export const ApiMockData: IApiMockData = {
    user: {
        id: 1,
        name: 'userName',
        email: 'userName@example.com',
        date_created: new Date().toISOString(),
        date_modified: new Date().toISOString()
    },
    lists: [
        {
            id: 1,
            name: 'list1',
            users: [1],
            list_items: [
                {
                    id: 1,
                    name: 'task1',
                    state: 'UNDONE',
                    date_created: new Date().toISOString(),
                    date_modified: new Date().toISOString()
                },
                {
                    id: 2,
                    name: 'task2',
                    state: 'DONE',
                    date_created: new Date().toISOString(),
                    date_modified: new Date().toISOString()
                }
            ],
            date_created: new Date().toISOString(),
            date_modified: new Date().toISOString()
        },
        {
            id: 2,
            name: 'list1',
            users: [1],
            list_items: [
                {
                    id: 1,
                    name: 'task3',
                    state: 'UNDONE',
                    date_created: new Date().toISOString(),
                    date_modified: new Date().toISOString()
                },
                {
                    id: 2,
                    name: 'task4',
                    state: 'DONE',
                    date_created: new Date().toISOString(),
                    date_modified: new Date().toISOString()
                }
            ],
            date_created: new Date().toISOString(),
            date_modified: new Date().toISOString()
        }
    ]
};

@Injectable()
export class ApiProviderMock {

    public authenticate(username: string, password: string): Observable<{ token: string }> {
        return Observable.of({ token: '1234abcd' });
    }

    public resetAuthentication(): void {

    }

    public getUserInfo(): Observable<IUser> {
        return Observable.of(ApiMockData.user);
    }

    public getUserLists(userId: number): Observable<Array<ITaskList>> {
        return Observable.of(ApiMockData.lists);
    }

    public getListItems(listId: number): Observable<Array<IListItem>> {
        return Observable.of(ApiMockData.lists[0].list_items);
    }

    public createList(listName: string): Observable<ITaskList> {
        return Observable.of(ApiMockData.lists[0]);
    }

    public deleteList(list: ITaskList): Observable<Response> {
        return Observable.of(null);
    }

    public createListItem(itemName: string, taskList: ITaskList): Observable<IListItem> {
        return Observable.of(ApiMockData.lists[0].list_items[0]);
    }

    public deleteListItem(listItem: IListItem): Observable<Response> {
        return Observable.of(null);
    }

    public changeListItemState(listItem: IListItem, state: ListItemState): Observable<IListItem> {
        return Observable.of(ApiMockData.lists[0].list_items[0]);
    }

}
