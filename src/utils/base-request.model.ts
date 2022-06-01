import { Observable } from "rxjs";
import { Method, Headers$, Body } from "./types";

const baseUrl = 'https://pokeapi.co/api/v2';
export default class BaseRequestModel {
    constructor(private url: string, private method: Method, private headers: Headers$, private body?: Body) {
        this.url = url;
        this.method = method || "GET";
        this.headers = headers || {};
        this.body = body;
    }

    request(): Observable<any> {
        return new Observable(observer => {
            fetch(`${baseUrl}${this.url}`,
                {
                    method: this.method as any,
                    headers: this.headers,
                    body: JSON.stringify(this.body)
                }).then((r: any) => {
                    return r.json()
                }).then((data: any) => {
                    observer.next(data);
                    observer.complete();
                }).catch((e: any) => {
                    observer.error(e);
                })
            return () => {
                // clean up on unsubscribe
            }
        });
    }
}