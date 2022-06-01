import { Observable } from 'rxjs';
import BaseRequestModel from '../utils/base-request.model';
import { Body } from '../utils/types';

class ApiService {
    constructor(private route: string, private form?: Body) {
        this.route = route;
        this.form = form;
    }

    //get request
    get(): Observable<any> {
        const headers = {
            'Access-Control-Allow-Origin': '*'
        };
        const newBase = new BaseRequestModel(this.route, 'GET', headers);
        return newBase.request();
    }
    // post request
    post(): Observable<any> {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        };
        const newBase = new BaseRequestModel(this.route, 'POST', headers, this.form)
        return newBase.request();
    }
    // add more PUSH, PUT, etc
}

export default ApiService;