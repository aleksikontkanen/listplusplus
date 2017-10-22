import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { StoreProvider, ITaskList } from './../../providers/store';

@Component({
    selector: 'add-list-item-modal',
    templateUrl: 'add-list-item-modal.html'
})
export class AddListItemModal implements OnInit {

    public listData: ITaskList;

    constructor(
        private viewController: ViewController,
        private navigationParameters: NavParams,
        private store: StoreProvider
    ) { }

    public ngOnInit(): void {
        this.listData = this.navigationParameters.get('listData');
    }

    public dismiss(): void {
        this.viewController.dismiss();
    }

    public saveItem(itemName: string): void {
        if (itemName) {
            this.store.lists.addListItem(itemName, this.listData).then(() => {
                this.dismiss();
            });
        } else {
            // Raise validation error
        }
    }
}
