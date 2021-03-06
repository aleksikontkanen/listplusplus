import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StoreProvider } from './../providers/store';

import { RootPage } from '../pages/root/root';

@Component({
    templateUrl: 'app.html'
})
export class MyApp implements OnInit {
    rootPage: {} = RootPage;

    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private splashScreen: SplashScreen,
        private store: StoreProvider
    ) { }

    public ngOnInit(): void {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.store.initializeStore();
        });
    }
}
