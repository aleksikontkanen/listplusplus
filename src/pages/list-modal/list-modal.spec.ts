import { NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { async, TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { NavParams, ViewController, ModalController } from 'ionic-angular';
import { ListModal } from './list-modal';
import { StoreProvider, StoreProviderMock, ITaskList, IListItem, ListItemState } from './../../providers/store';

@Injectable()
class NavParamsMock {
    public get(query: string): Object {
        return {};
    }
}

class ViewControllerMock {
    public dismiss(): void { }
}

class ModalControllerMock {
    public create(): ModalMock {
        return new ModalMock();
    }
}

class ModalMock {
    public present(): void { }
}

describe('ListModal', () => {

    let fixture: ComponentFixture<ListModal>;
    let component: ListModal;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [
                NO_ERRORS_SCHEMA
            ],
            declarations: [
                ListModal
            ],
            providers: [
                { provide: StoreProvider, useClass: StoreProviderMock },
                { provide: NavParams, useClass: NavParamsMock },
                { provide: ViewController, useClass: ViewControllerMock },
                { provide: ModalController, useClass: ModalControllerMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ListModal);
        component = fixture.componentInstance;
    }));

    it('should create the modal', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should create modal and present it on openAddListItemModal call', async(() => {
        const modalMockPrototypeSpy = spyOn(ModalMock.prototype, 'present').and.callThrough();

        fixture.detectChanges();

        component.openAddListItemModal({} as ITaskList);

        expect(modalMockPrototypeSpy.calls.count()).toBe(1);
    }));


    it('should dismiss the modal', async(inject([ViewController], (viewController: ViewControllerMock) => {
        const viewControllerSpy = spyOn(viewController, 'dismiss').and.callThrough();

        fixture.detectChanges();

        component.dismiss();

        expect(viewControllerSpy.calls.count()).toBe(1);
    })));

    it('should set state to DONE if checkbox is checked', async(inject([StoreProvider], (store: StoreProviderMock) => {
        spyOn(store.lists, 'changeListItemState').and.callFake((listItem: IListItem, state: ListItemState) => {
            expect(state).toBe('DONE');
        });

        component.changeListItemState(undefined, true);
    })));

    it('should set state to UNDONE if checkbox is unchecked', async(inject([StoreProvider], (store: StoreProviderMock) => {
        spyOn(store.lists, 'changeListItemState').and.callFake((listItem: IListItem, state: ListItemState) => {
            expect(state).toBe('UNDONE');
        });

        component.changeListItemState(undefined, false);
    })));

    it('should call for list item deletion on deleteListItem call', async(inject([StoreProvider], (store: StoreProviderMock) => {
        const storeSpy = spyOn(store.lists, 'deleteListItem').and.callThrough();

        const listItem: IListItem = {
            id: 1
        } as IListItem;

        fixture.detectChanges();

        component.deleteListItem(listItem);

        expect(storeSpy.calls.count()).toBe(1);
    })));

});
