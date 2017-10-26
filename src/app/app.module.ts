import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SecureStorage } from '@ionic-native/secure-storage';

import { MyApp } from './app.component';

import { RootPage } from '../pages/root/root';
import { ListModal } from '../pages/list-modal/list-modal';
import { AddListModal } from '../pages/add-list-modal/add-list-modal';
import { AddListItemModal } from '../pages/add-list-item-modal/add-list-item-modal';

import { ApiProvider } from '../providers/api';
import { StoreProvider, UserProvider, ListsProvider } from '../providers/store';


@NgModule({
    declarations: [
        MyApp,
        RootPage,
        ListModal,
        AddListModal,
        AddListItemModal
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        RootPage,
        ListModal,
        AddListModal,
        AddListItemModal
    ],
    providers: [
        StatusBar,
        SplashScreen,
        SecureStorage,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        ApiProvider,
        StoreProvider,
        ListsProvider,
        UserProvider
    ]
})
export class AppModule { }
