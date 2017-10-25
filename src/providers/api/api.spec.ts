import { async, TestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { ApiProvider } from './api';
import { ApiMockData } from './api.mock';
import { ITaskList, IListItem, ListItemState } from './../store'; /* tslint:disable-line */

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

    it('should authenticate', async(inject(
        [ApiProvider, MockBackend], (api: ApiProvider, mockbackEnd: MockBackend) => {
            const token: string = 'fa84cc3a09bfd2166ac1c12f';
            const username: string = 'user';
            const password: string = 'password';

            mockbackEnd.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(createResponse({ token }));
                expect(connection.request.method).toBe(RequestMethod.Post, 'Request method should be POST');
            });

            api.authenticate(username, password).subscribe(authenticationInfo => {
                expect(api.authenticationToken).toEqual(token);
            })
        })
    ));

    it('should logout', async(inject(
        [ApiProvider, MockBackend], (api: ApiProvider, mockbackEnd: MockBackend) => {
            const token: string = 'fa84cc3a09bfd2166ac1c12f';
            const username: string = 'user';
            const password: string = 'password';

            mockbackEnd.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(createResponse({ token }));
            });

            api.authenticate(username, password).subscribe(authenticationInfo => {
                api.resetAuthentication();
                expect(api.authenticationToken).toEqual(undefined);
            })
        })
    ));

    it('should create get request on getUserInfo call', async(inject(
        [ApiProvider, MockBackend], (api: ApiProvider, mockbackEnd: MockBackend) => {
            mockbackEnd.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(createResponse(ApiMockData.user));
                expect(connection.request.method).toBe(RequestMethod.Get, 'Request method should be GET');
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
                expect(connection.request.method).toBe(RequestMethod.Get, 'Request method should be GET');
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
                expect(connection.request.method).toBe(RequestMethod.Get, 'Request method should be GET');
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
            } as ITaskList;

            mockbackEnd.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(createResponse(newList));
                expect(connection.request.method).toBe(RequestMethod.Post, 'Request method should be POST');
            });


            api.createList(newName).subscribe(list => {
                expect(list).toEqual(newList);
            })
        })
    ));

    it('should create delete request on deleteList call', async(inject(
        [ApiProvider, MockBackend], (api: ApiProvider, mockbackEnd: MockBackend) => {

            const list = {
                id: 1
            } as ITaskList;

            mockbackEnd.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    status: 204,
                    statusText: 'No content'
                })));
                expect(connection.request.method).toBe(RequestMethod.Delete, 'Request method should be DELETE');
            });


            api.deleteList(list).subscribe(response => {
                expect(response.status).toEqual(204, 'Response status should be 204 No content');
            })
        })
    ));

    it('should create post request on createListItem call', async(inject(
        [ApiProvider, MockBackend], (api: ApiProvider, mockbackEnd: MockBackend) => {
            const newListItemName: string = 'New list item';
            const newListItem = {
                name: newListItemName
            } as IListItem;

            mockbackEnd.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(createResponse(newListItem));
                expect(connection.request.method).toBe(RequestMethod.Post, 'Request method should be POST');
            });

            api.createListItem(newListItemName, ApiMockData.lists[0]).subscribe(listItem => {
                expect(listItem).toEqual(newListItem);
            })
        })
    ));

    it('should create delete request for deleteListItem call', async(inject(
        [ApiProvider, MockBackend], (api: ApiProvider, mockbackEnd: MockBackend) => {
            const listItem = {
                id: 1,
                name: 'List item'
            } as IListItem;

            mockbackEnd.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    status: 204,
                    statusText: 'No content'
                })));
                expect(connection.request.method).toBe(RequestMethod.Delete, 'Request method should be DELETE');
            });

            api.deleteListItem(listItem).subscribe(response => {
                expect(response.status).toEqual(204, 'Response status should be 204 No content');
            })
        })
    ));

    it('should create patch request for changeListItemState call', async(inject(
        [ApiProvider, MockBackend], (api: ApiProvider, mockbackEnd: MockBackend) => {
            const newListItemName: string = 'New list item';
            const newListItem = {
                name: newListItemName
            } as IListItem;

            mockbackEnd.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(createResponse(newListItem));
                expect(connection.request.method).toBe(RequestMethod.Patch, 'Request method should be PATCH');
            });

            api.changeListItemState(newListItem, 'DONE').subscribe(listItem => {
                expect(listItem).toEqual(newListItem);
            })
        })
    ));

});
