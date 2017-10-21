import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { StoreProvider, ITaskList } from './../../providers/store';

@Component({
    selector: 'add-list-modal',
    templateUrl: 'add-list-modal.html'
})
export class AddListModal implements OnInit {

    public listData: ITaskList;

    constructor(
        private navigationParameters: NavParams,
        private viewController: ViewController,
        private store: StoreProvider
    ) { }

    public ngOnInit(): void {
        this.listData = this.navigationParameters.get('listData');
    }

    public dismiss(): void {
        this.viewController.dismiss();
    }

    public saveList(listName: string): void {
        if (listName) {
            this.store.lists.addUserList(listName).then(() => {
                this.dismiss();
            });
        } else {
            // Raise validation error
        }
    }
}
