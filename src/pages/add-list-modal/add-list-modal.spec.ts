import { NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { async, TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { NavParams, ViewController } from 'ionic-angular';
import { StoreProvider, StoreProviderMock } from './../../providers/store';
import { AddListModal } from './add-list-modal';

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

describe('AddListModal', () => {

    let fixture: ComponentFixture<AddListModal>;
    let component: AddListModal;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [
                NO_ERRORS_SCHEMA
            ],
            declarations: [
                AddListModal
            ],
            providers: [
                { provide: StoreProvider, useClass: StoreProviderMock },
                { provide: NavParams, useClass: NavParamsMock },
                { provide: ViewController, useClass: ViewControllerMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AddListModal);
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
