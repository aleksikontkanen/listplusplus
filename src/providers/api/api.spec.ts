import { async, TestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { ApiProvider } from './api';

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
            const mockResponse = {};

            mockbackEnd.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
            });

            api.getUserInfo().subscribe(userInfo => {
                expect(userInfo).toEqual(userInfo);
            })
        })
    ));

});
