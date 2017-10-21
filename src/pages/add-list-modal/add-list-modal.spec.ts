import { NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { AddListModal } from './add-list-modal';

@Injectable()
class NavParamsMock {
    public get(query: string): Object {
        return {};
    }
}

describe('ListModal', () => {

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
                { provide: Platform, useValue: null },
                { provide: NavParams, useClass: NavParamsMock },
                { provide: ViewController, useValue: null }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AddListModal);
        component = fixture.componentInstance;
    }));

    it('should create the page', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

});
