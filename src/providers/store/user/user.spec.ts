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

});
