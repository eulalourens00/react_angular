import { Injectable } from '@angular/core'; 
@Injectable({
providedIn: 'root' }) 
export class AuthService {
    private isLoggedIn: boolean = false;
    public isAuthenticated(): boolean { return this.isLoggedIn; }
    public login(): void { this.isLoggedIn = true;
    alert("Вы успешно вошли в систему!"); } }