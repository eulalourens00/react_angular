import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api-service';

@Component({
  imports: [],
  selector: 'app-reg-component',
  styleUrl: './reg-component.css',
  templateUrl: './reg-component.html',
})
export class RegComponent {
  public regForm = new FormGroup({name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]) });

    constructor(private api: ApiService){}
    public onSubmit(): void{
      if(this.regForm.invalid) return;
      this.api.createUser(this.regForm.value).subscribe(() => {
      alert('Регистрация прошла успешно!'); this.regForm.reset(); 
    }); 
  } 
} 
