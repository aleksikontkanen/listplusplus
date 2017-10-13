import { async, TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

import { Http, BaseRequestOptions } from '@angular/http';
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

});
