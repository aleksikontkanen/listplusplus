import { NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { ListModal } from './list-modal';

@Injectable()
class NavParamsMock {
    public get(query: string): Object {
        return {};
    }
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
                { provide: Platform, useValue: null },
                { provide: NavParams, useClass: NavParamsMock },
                { provide: ViewController, useValue: null }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ListModal);
        component = fixture.componentInstance;
    }));

    it('should create the page', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

});
