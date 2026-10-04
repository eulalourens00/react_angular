import { Component } from '@angular/core'; 
import { AuthService } from '../auth';  
@Component({
selector: 'app-login', 
standalone: true, 
template: ` 
<h2>Страница входа</h2> 
<button (click)="onLoginClick()" style="padding: 10px;"> Войти в систему </button> ` }) 
export class LoginComponent{
  constructor (private auth: AuthService) {}
  public onLoginClick(): void{
  this.auth.login();
  }
}

