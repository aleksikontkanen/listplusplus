import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { RootPage } from '../pages/root/root';
import { ListModal } from '../pages/list-modal/list-modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api';
import { StoreProvider, UserProvider, ListsProvider } from '../providers/store';


@NgModule({
    declarations: [
        MyApp,
        RootPage,
        ListModal
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
        ListModal
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        ApiProvider,
        StoreProvider,
        ListsProvider,
        UserProvider
    ]
})
export class AppModule { }
