import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, ITaskList, IListItem } from './../store'; /* tslint:disable-line */

export interface IApiMockData {
    user: IUser,
    lists: Array<ITaskList>
};

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
        }
    ]
};

@Injectable()
export class ApiProviderMock {

    public getUserInfo(): Observable<IUser> {
        return Observable.of(ApiMockData.user);
    }

    public getUserLists(userId: number): Observable<Array<ITaskList>> {
        return Observable.of(ApiMockData.lists);
    }

    public getListItems(listId: number): Observable<Array<IListItem>> {
        return Observable.of(ApiMockData.lists[0].list_items);
    }

}
