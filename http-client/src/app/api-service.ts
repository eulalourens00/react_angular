import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface User{id: number; name: string;}

@Injectable({
    providedIn:'root'
})
export class ApiService{
    constructor(private http: HttpClient){}
    public getUsers(){
        return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
    }

    public createUser(userData:{name:string, email:string}){
        this.http.post('https://jsonplaceholder.typicode.com/users', userData);
    }

    
}