import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService, User } from '../api-service';

@Component({
  imports: [],
  selector: 'app-reg-component',
  styleUrl: './reg-component.css',
  templateUrl: './reg-component.html',
})
export class RegComponent {
  public regForm = new FormGroup({name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]) });

    constructor(private api: ApiService){}
    public onSubmit(): void{
      if(this.regForm.invalid) return;
      this.api.createUser({
        email: this.regForm.value.email!,
        name: this.regForm.value.name!
      }).subscribe(() => {
      alert('Регистрация прошла успешно!'); this.regForm.reset(); 
    }); 
  } 
} 
