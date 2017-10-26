import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, Subscription } from 'rxjs';
import { Platform } from 'ionic-angular';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

import { ApiProvider } from './../../api';
import { IStore } from './../store.model';
import { IUser, USER_STORAGE_KEY, USER_TOKEN_KEY } from './user.model'; /* tslint:disable-line */

@Injectable()
export class UserProvider implements IStore {

    private userInfo: ReplaySubject<IUser> = new ReplaySubject(1);
    private userInfoSubscription: Subscription;
    private secureStorageObject: SecureStorageObject;

    constructor(
        private api: ApiProvider,
        private secureStorage: SecureStorage,
        private platform: Platform
    ) { }

    public async initialize(): Promise<void> {
        await this.createSecureStorage();
        await this.checkForExistingAuthenticationToken();
    }

    public getUserInfo(): Observable<IUser> {
        return this.userInfo.asObservable();
    }

    public login(username: string, password: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.authenticate(username, password).subscribe(authenticationInfo => {
                this.setAuthenticationToken(authenticationInfo.token);
                this.subscribeToUserInfo();
                resolve();
            }, error => {
                reject();
            });
        });
    }

    public logout(): void {
        this.api.resetAuthentication();
        this.userInfo.next(undefined);
    }

    /* Internal */

    private subscribeToUserInfo(): void {
        if (this.userInfoSubscription === undefined) {
            this.userInfoSubscription = this.api.getUserInfo().subscribe(userInfo => {
                this.userInfo.next(userInfo);
            }, error => {
                this.userInfo.error(error);
            });
        }
    }

    private async setAuthenticationToken(token: string): Promise<void> {
        if (this.platform.is('cordova')) {
            await this.secureStorageObject.set(USER_TOKEN_KEY, token);
        }
    }

    private async createSecureStorage(): Promise<void> {
        if (this.platform.is('cordova')) {
            await this.secureStorage.create(USER_STORAGE_KEY).then((storage: SecureStorageObject) => {
                this.secureStorageObject = storage;
            });
        }
    }

    private checkForExistingAuthenticationToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.platform.is('cordova')) {
                this.secureStorageObject.get(USER_TOKEN_KEY).then(
                    token => {
                        this.api.authenticationToken = token;
                        this.subscribeToUserInfo();
                        resolve();
                    },
                    error => {
                        resolve(); // fail silently
                    }
                );
            } else {
                resolve(); // do nothing
            }
        });
    }

}
