import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    private Subject = new Subject<any>();

    publishSomeData(data: any) {
        this.Subject.next(data);
    }

    getObservable(): Subject<any> {
        return this.Subject;
    }
}
