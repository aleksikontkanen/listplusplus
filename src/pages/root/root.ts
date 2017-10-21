import { Component } from '@angular/core';
import { StoreProvider, ITaskList } from './../../providers/store';
import { ModalController } from 'ionic-angular';
import { ListModal } from './../list-modal/list-modal';

@Component({
    selector: 'root-page',
    templateUrl: 'root.html'
})
export class RootPage {

    public userLists: Array<ITaskList>;

    constructor(
        private store: StoreProvider,
        private modalController: ModalController
    ) { }

    public ngOnInit(): void {
        this.store.lists.getUserLists().subscribe(fetchedUserLists => {
            this.userLists = fetchedUserLists

        }, error => {
            // TODO: Create error handling and notifications

        });
    }

    public openListModal(listData: ITaskList): void {
        const modal = this.modalController.create(ListModal, { listData });
        modal.present();
    }
}
