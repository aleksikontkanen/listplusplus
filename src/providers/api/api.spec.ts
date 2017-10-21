import { async, TestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { ApiProvider } from './api';
import { ApiMockData } from './api.mock';
import { IList } from './../store'; /* tslint:disable-line */

const createResponse = (body: Object): Response => {
    return new Response(
        new ResponseOptions(
            {
                body: JSON.stringify(body)
            }
        )
    );
};

describe('Api Provider', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                ApiProvider,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                }
            ]
        })
    }));

    it('should instantiate', async(inject(
        [ApiProvider], (api: ApiProvider) => {
            expect(api).toBeDefined();
        })
    ));

    it('should create get request on getUserInfo call', async(inject(
        [ApiProvider, MockBackend], (api: ApiProvider, mockbackEnd: MockBackend) => {
            mockbackEnd.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(createResponse(ApiMockData.user));
            });

            api.getUserInfo().subscribe(userInfo => {
                expect(userInfo).toEqual(ApiMockData.user);
            })
        })
    ));

    it('should create get request on getUserLists call', async(inject(
        [ApiProvider, MockBackend], (api: ApiProvider, mockbackEnd: MockBackend) => {
            mockbackEnd.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(createResponse(ApiMockData.lists));
            });

            api.getUserLists(ApiMockData.user.id).subscribe(lists => {
                expect(lists).toEqual(ApiMockData.lists);
            })
        })
    ));

    it('should create get request on getListItems call', async(inject(
        [ApiProvider, MockBackend], (api: ApiProvider, mockbackEnd: MockBackend) => {
            mockbackEnd.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(createResponse(ApiMockData.lists[0].list_items));
            });

            api.getListItems(ApiMockData.user.id).subscribe(listItems => {
                expect(listItems).toEqual(ApiMockData.lists[0].list_items);
            })
        })
    ));

    it('should create post request on createList call', async(inject(
        [ApiProvider, MockBackend], (api: ApiProvider, mockbackEnd: MockBackend) => {

            const newName: string = 'New list';
            const newList = {
                name: newName
            } as IList;

            mockbackEnd.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(createResponse(newList));
            });


            api.createList(newName).subscribe(list => {
                expect(list.name).toEqual(newName);
            })
        })
    ));

});
