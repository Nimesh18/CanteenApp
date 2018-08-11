import { RequestOptionsArgs, Http } from '@angular/http';

export class ServerAPI {
    Http: Http;
    readonly Root = 'http://localhost:4200';

    constructor(http: Http) {
        this.Http = http;
    }

    CreateURL(path: string): string {
        return this.Root + path;
    }

    Get(address: string, options?: RequestOptionsArgs): Promise<any> {
        // tslint:disable-next-line:no-shadowed-variable
        return new Promise<any>((resolve, reject) => {
            const url = this.CreateURL(address);
            this.Http.get(url, options).subscribe(result => {
                const response = JSON.parse(result.text());
                resolve(response);
            }, error => reject(error));
        });
    }

    Post(address: string, request: any, options?: RequestOptionsArgs): Promise<any> {
        // tslint:disable-next-line:no-shadowed-variable
        return new Promise<any>((resolve, reject) => {
            const url = this.CreateURL(address);
            this.Http.post(url, request, options).subscribe(result => {
                const response = JSON.parse(result.text());
                resolve(response);
            }, error => reject(error));
        });
    }
}
