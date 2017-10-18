import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { PlatformMock } from '../../test-config/mocks-ionic';

import { StoreProvider, StoreProviderMock, UserProviderMock, ListsProviderMock } from './../providers/store';

describe('MyApp Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp],
            imports: [
                IonicModule.forRoot(MyApp)
            ],
            providers: [
                StatusBar,
                SplashScreen,
                { provide: Platform, useClass: PlatformMock },
                { provide: StoreProvider, useClass: StoreProviderMock },
                UserProviderMock,
                ListsProviderMock
            ]
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyApp);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(component instanceof MyApp).toBe(true);
    });
});
