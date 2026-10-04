import { inject } from '@angular/core'; 
import {CanActivateFn, Router } from '@angular/router'; 
import {AuthService } from './auth'; 

export const authGuard:CanActivateFn = (route, state) => 
  { const auth = inject(AuthService); 
    const router = inject(Router); 
    if(auth.isAuthenticated()) { return true;} 
    else { alert("Стоп! Доступ закрыт!"); 
      router.navigate(['/login']); 
      return false; 
    } 
  };
