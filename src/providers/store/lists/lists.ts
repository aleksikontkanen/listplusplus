import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ApiProvider } from './../../api';
import { UserProvider } from './../user';
import { IStore } from './../store.model';
import { ITaskList } from './lists.model'; /* tslint:disable-line */

@Injectable()
export class ListsProvider implements IStore {

    private lists: BehaviorSubject<Array<ITaskList>> = new BehaviorSubject([]);

    constructor(
        private api: ApiProvider,
        private user: UserProvider
    ) { }

    public async initialize(): Promise<void> {
        await this.user.getUserInfo()
            .first()
            .flatMap(userInfo => this.api.getUserLists(userInfo.id))
            .subscribe(
            lists => this.lists.next(lists),
            error => this.lists.error(error));
    }

    public getUserLists(): Observable<Array<ITaskList>> {
        return this.lists.asObservable();
    }

    public async addUserList(listName: string): Promise<void> {
        await this.api.createList(listName).subscribe(addedList => {
            this.lists.first().subscribe(lists => this.lists.next([...lists, addedList]));
        });
    }

    public async addListItem(itemName: string, taskList: ITaskList): Promise<void> {
        await this.api.createListItem(itemName, taskList).subscribe(addedItem => {
            this.lists.first().subscribe(lists => {
                try {
                    lists.find(list => list.id === taskList.id).list_items.push(addedItem);
                    this.lists.next(lists);
                } catch (error) {
                    console.error(error);
                }
            });
        });
    }

}
