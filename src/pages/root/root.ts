import { Component, OnInit } from '@angular/core';
import { StoreProvider, IList } from './../../providers/store';

@Component({
    selector: 'root-page',
    templateUrl: 'root.html'
})
export class RootPage implements OnInit {

    public userLists: Array<IList>;

    constructor(
        private store: StoreProvider
    ) { }

    public ngOnInit(): void {
        this.store.lists.getUserLists().subscribe(fetchedUserLists => {
            this.userLists = fetchedUserLists

        }, error => {
            // TODO: Create error handling and notifications

        });
    }
}
