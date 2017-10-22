import { NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { async, TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { NavParams, ViewController } from 'ionic-angular';
import { StoreProvider, StoreProviderMock } from './../../providers/store';
import { AddListItemModal } from './add-list-item-modal';

@Injectable()
class NavParamsMock {
    public get(query: string): Object {
        return {};
    }
}

@Injectable()
class ViewControllerMock {
    public dismiss(): void { }
}

describe('AddListItemModal', () => {

    let fixture: ComponentFixture<AddListItemModal>;
    let component: AddListItemModal;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [
                NO_ERRORS_SCHEMA
            ],
            declarations: [
                AddListItemModal
            ],
            providers: [
                { provide: StoreProvider, useClass: StoreProviderMock },
                { provide: NavParams, useClass: NavParamsMock },
                { provide: ViewController, useClass: ViewControllerMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AddListItemModal);
        component = fixture.componentInstance;
    }));

    it('should create the modal', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should dismiss the modal', async(inject([ViewController], (viewController: ViewControllerMock) => {
        const viewControllerSpy = spyOn(viewController, 'dismiss').and.callThrough();

        fixture.detectChanges();

        component.dismiss();

        expect(viewControllerSpy.calls.count()).toBe(1);
    })));

});
