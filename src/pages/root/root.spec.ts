import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { ModalController, AlertController, ToastController } from 'ionic-angular';
import { RootPage } from './root';

import { StoreProvider, StoreProviderMock, ITaskList } from './../../providers/store';
import { ApiMockData } from './../../providers/api';

class AlertControllerMock {
    public create(data: Object): AlertMock {
        return new AlertMock();
    }
}

class AlertMock {
    public present(): void {
        // stub
    }
}

describe('Rootpage', () => {

    let fixture: ComponentFixture<RootPage>;
    let component: RootPage;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [
                NO_ERRORS_SCHEMA
            ],
            declarations: [
                RootPage
            ],
            providers: [
                { provide: StoreProvider, useClass: StoreProviderMock },
                { provide: ModalController, useValue: null },
                { provide: AlertController, useClass: AlertControllerMock },
                { provide: ToastController, useValue: null }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(RootPage);
        component = fixture.componentInstance;
    }));

    it('should create page', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should initally fetch user\'s lists', () => {
        expect(component.userLists).toBeFalsy();
        fixture.detectChanges();
        expect(component.userLists).toEqual(ApiMockData.lists);
    });

    it('should call for list deletion on deleteList call', async(inject([StoreProvider], (store: StoreProviderMock) => {
        const storeSpy = spyOn(store.lists, 'deleteUserList').and.callThrough();

        const listToDelete: ITaskList = {
            id: 1
        } as ITaskList;

        fixture.detectChanges();

        component.deleteList(listToDelete);

        expect(storeSpy.calls.count()).toBe(1);
    })));

    it('should create alert dialog when sharing a list', async(inject([StoreProvider], (store: StoreProviderMock) => {
        const alertControllerSpy = spyOn(AlertControllerMock.prototype, 'create').and.callThrough();
        const alertSpy = spyOn(AlertMock.prototype, 'present').and.callThrough();

        const listToShare: ITaskList = {
            id: 1
        } as ITaskList;

        fixture.detectChanges();

        component.shareList(listToShare);

        expect(alertControllerSpy.calls.count()).toBe(1);
        expect(alertSpy.calls.count()).toBe(1);
    })));
});
