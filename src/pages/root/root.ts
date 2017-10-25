import { Component } from '@angular/core';
import { StoreProvider, ITaskList, IUser } from './../../providers/store';
import { ModalController, AlertController } from 'ionic-angular';
import { ListModal } from './../list-modal/list-modal';
import { AddListModal } from './../add-list-modal/add-list-modal';


@Component({
    selector: 'root-page',
    templateUrl: 'root.html'
})
export class RootPage {

    public userInfo: IUser;
    public userLists: Array<ITaskList>;
    public errorMessage: string;

    constructor(
        private store: StoreProvider,
        private modalController: ModalController,
        private alertController: AlertController
    ) { }

    public ngOnInit(): void {
        this.store.user.getUserInfo().subscribe(fetchedUserInfo => {
            this.userInfo = fetchedUserInfo;

        }, error => {
            // TODO: Create error handling and notifications
        });

        this.store.lists.getUserLists().subscribe(fetchedUserLists => {
            this.userLists = fetchedUserLists;

        }, error => {
            // TODO: Create error handling and notifications
        });
    }

    public login(username: string, password: string): void {
        if (username && password) {
            this.store.user.login(username, password).catch(() => {
                this.alertController.create({
                    title: 'Login failed',
                    subTitle: 'Your username or password is invalid',
                    buttons: ['okay']
                }).present();
            });
        }
    }

    public openListModal(listData: ITaskList): void {
        const modal = this.modalController.create(ListModal, { listData });
        modal.present();
    }

    public openAddListModal(): void {
        const modal = this.modalController.create(AddListModal);
        modal.present();
    }

    public deleteList(listToDelete: ITaskList): void {
        this.store.lists.deleteUserList(listToDelete);
    }
}
