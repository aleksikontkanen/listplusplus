import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { IList } from './../../providers/store';

@Component({
    selector: 'list-modal',
    templateUrl: 'list-modal.html'
})
export class ListModal implements OnInit {

    public listData: IList;

    constructor(
        private navigationParameters: NavParams,
        private viewController: ViewController
    ) { }

    public ngOnInit(): void {
        this.listData = this.navigationParameters.get('listData');
    }

    public dismiss(): void {
        this.viewController.dismiss();
    }
}
