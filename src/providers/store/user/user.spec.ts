import { async, TestBed, inject } from '@angular/core/testing';

import { ApiProvider, ApiProviderMock, ApiMockData } from './../../api';
import { UserProvider } from './user';

describe('User Provider', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                UserProvider,
                { provide: ApiProvider, useClass: ApiProviderMock }
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

            user.login(username, password).then(() => {
                user.getUserInfo().subscribe(userInfo => {
                    expect(userInfo).toEqual(ApiMockData.user);
                });
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
