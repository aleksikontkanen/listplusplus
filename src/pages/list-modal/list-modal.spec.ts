import { NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { async, TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { NavParams, ViewController } from 'ionic-angular';
import { ListModal } from './list-modal';

@Injectable()
class NavParamsMock {
    public get(query: string): Object {
        return {};
    }
}

class ViewControllerMock {
    public dismiss(): void { }
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
                { provide: NavParams, useClass: NavParamsMock },
                { provide: ViewController, useClass: ViewControllerMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ListModal);
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
