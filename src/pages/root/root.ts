import { Component } from '@angular/core';
import { StoreProvider, ITaskList, IUser } from './../../providers/store';
import { ModalController, AlertController, ToastController } from 'ionic-angular';
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
        private alertController: AlertController,
        private toastController: ToastController
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

    public shareList(listToShare: ITaskList): void {
        this.alertController.create({
            title: 'Share the list',
            message: 'Please provide email address of the person you want to share this list.',
            inputs: [
                {
                    name: 'shareToUserEmail',
                    placeholder: 'User email'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => { }
                },
                {
                    text: 'Share',
                    handler: data => {
                        if (this.validateEmail(data.shareToUserEmail)) {
                            this.store.lists.shareUserList(listToShare, data.shareToUserEmail).then(() => {
                                this.toastController.create({
                                    message: 'Request sent!',
                                    duration: 3000,
                                    position: 'bottom'
                                }).present();
                            }).catch(() => {
                                this.toastController.create({
                                    message: 'Something went wrong. Request not sent.',
                                    duration: 3000,
                                    position: 'bottom'
                                }).present();
                            });
                        }
                    }
                }
            ]
        }).present();
    }

    /* Internal */

    private validateEmail(email: string): boolean {
        return /\S+@\S+\.\S+/.test(email);
    }
}
