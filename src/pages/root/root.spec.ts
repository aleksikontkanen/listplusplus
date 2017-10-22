import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ModalController } from 'ionic-angular';
import { RootPage } from './root';

import { StoreProvider, StoreProviderMock } from './../../providers/store';
import { ApiMockData } from './../../providers/api';

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
                { provide: ModalController, useValue: null }
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
});
