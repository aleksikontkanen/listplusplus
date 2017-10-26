import { async, TestBed, inject } from '@angular/core/testing';
import { Platform } from 'ionic-angular';
import { PlatformMock } from './../../../../test-config/mocks-ionic';
import { SecureStorage } from '@ionic-native/secure-storage';

import { ApiProvider, ApiProviderMock, ApiMockData } from './../../api';
import { UserProvider } from './user';
import { USER_STORAGE_KEY, USER_TOKEN_KEY } from './user.model'; /* tslint:disable-line */

class SecureStorageMock {
    public create(name: string): Promise<SecureStorageObjectMock> {
        return Promise.resolve(new SecureStorageObjectMock());
    }
}

class SecureStorageObjectMock {
    public get(key: string): Promise<string> {
        return Promise.resolve('value');
    }

    public set(key: string, value: string): Promise<void> {
        return Promise.resolve();
    }
}

describe('User Provider', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                UserProvider,
                { provide: ApiProvider, useClass: ApiProviderMock },
                { provide: SecureStorage, useClass: SecureStorageMock },
                { provide: Platform, useClass: PlatformMock }
            ]
        })
    }));

    it('should instantiate', async(inject(
        [UserProvider], (user: UserProvider) => {
            expect(user).toBeDefined();
        })
    ));

    it('should get current user', async(inject(
        [UserProvider], (user: UserProvider) => {
            user.getUserInfo().subscribe(userInfo => {
                expect(userInfo).toEqual(ApiMockData.user);
            });
        })
    ));

    it('should call authenticate and get user info', async(inject(
        [UserProvider], (user: UserProvider) => {
            const username: string = 'user';
            const password: string = 'password';

            user.initialize().then(() => {
                user.login(username, password).then(() => {
                    user.getUserInfo().subscribe(userInfo => {
                        expect(userInfo).toEqual(ApiMockData.user);
                    });
                })
            });
        })
    ));

    it('should call logout on api and reset user info', async(inject(
        [UserProvider], (user: UserProvider) => {
            user.logout();
            user.getUserInfo().subscribe(userInfo => {
                expect(userInfo).toEqual(undefined);
            });
        })
    ));

});
