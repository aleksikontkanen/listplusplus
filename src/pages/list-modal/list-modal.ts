import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { StoreProvider, ITaskList, IListItem, ListItemState } from './../../providers/store';
import { AddListItemModal } from './../add-list-item-modal/add-list-item-modal';

@Component({
    selector: 'list-modal',
    templateUrl: 'list-modal.html'
})
export class ListModal implements OnInit {

    public listData: ITaskList;

    constructor(
        private modalController: ModalController,
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

    public openAddListItemModal(listData: ITaskList): void {
        const modal = this.modalController.create(AddListItemModal, { listData });
        modal.present();
    }

    public changeListItemState(listItem: IListItem, checked: boolean): void {
        const state: ListItemState = checked ? 'DONE' : 'UNDONE';
        this.store.lists.changeListItemState(listItem, state);
    }

    public deleteListItem(listItem: IListItem): void {
        this.store.lists.deleteListItem(listItem);
    }

}
