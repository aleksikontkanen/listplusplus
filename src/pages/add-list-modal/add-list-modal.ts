import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { StoreProvider, ITaskList } from './../../providers/store'; /* tslint:disable-line */

@Component({
    selector: 'add-list-modal',
    templateUrl: 'add-list-modal.html'
})
export class AddListModal {

    constructor(
        private viewController: ViewController,
        private store: StoreProvider
    ) { }

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
