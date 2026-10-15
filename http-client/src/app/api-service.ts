import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface User{id: number; name: string;}

@Injectable({
    providedIn:'root'
})
export class ApiService{
    constructor(private http: HttpClient){}
    public getUsers(){
        return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
        .pipe(catchError((error) => {
            console.log('Error of internet');
        return of([]);
        })
    );
}

    public createUser(userData:{name:string, email:string}){
        return this.http.post('https://jsonplaceholder.typicode.com/users', userData);
    }
}