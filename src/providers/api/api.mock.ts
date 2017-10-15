/* tslint:disable:no-any */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from './../store';

export interface IApiMockData {
    user: IUser
};

export const ApiMockData: IApiMockData = {
    user: {
        id: '1',
        name: 'userName',
        email: 'userName@example.com',
        date_created: new Date().toISOString(),
        date_modified: new Date().toISOString()
    }
};

@Injectable()
export class ApiProviderMock {

    public getUserInfo(): Observable<IUser> {
        return Observable.of(ApiMockData.user);
    }

}
