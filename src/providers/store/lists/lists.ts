import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ApiProvider } from './../../api';
import { UserProvider } from './../user';
import { IStore } from './../store.model';
import { ITaskList, IListItem, ListItemState } from './lists.model'; /* tslint:disable-line */

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

    public async shareUserList(listToShare: ITaskList, shareToUserEmail: string): Promise<void> {
        await this.api.shareList(listToShare, shareToUserEmail).subscribe();
    }

    public async deleteUserList(list: ITaskList): Promise<void> {
        await this.api.deleteList(list).subscribe(response => {
            this.lists.first().subscribe(userLists => {
                let listFound: boolean = false;
                try {
                    userLists.forEach((userList, i) => {
                        if (list.id === userList.id) {
                            userLists.splice(i, 1);
                            listFound = true;
                        }
                    });

                    if (listFound === false) {
                        throw 'List not found';
                    }

                    this.lists.next(userLists);

                } catch (error) {
                    console.error(error);
                }
            });
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

    public async deleteListItem(listItem: IListItem): Promise<void> {
        await this.api.deleteListItem(listItem).subscribe(response => {
            this.lists.first().subscribe(lists => {
                let itemFound: boolean = false;
                try {
                    lists.forEach((list, i) => {
                        list.list_items.forEach((item, j) => {
                            if (item.id === listItem.id) {
                                lists[i].list_items.splice(j, 1);
                                itemFound = true;
                            }
                        });
                    });

                    if (itemFound === false) {
                        throw 'Item not found';
                    }

                    this.lists.next(lists);

                } catch (error) {
                    console.error(error);
                }
            });
        });
    }

    public async changeListItemState(listItem: IListItem, state: ListItemState): Promise<void> {
        await this.api.changeListItemState(listItem, state).subscribe(modifiedItem => {
            this.lists.first().subscribe(lists => {
                try {
                    lists.forEach(list => {
                        list.list_items.forEach(item => {
                            if (item.id === listItem.id) {
                                item.state = state;
                            }
                        });
                    });
                    this.lists.next(lists);

                } catch (error) {
                    console.error(error);
                }
            });
        });
    }

}
