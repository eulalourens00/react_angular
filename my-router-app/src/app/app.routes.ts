import { Routes } from '@angular/router'; 
import {Home} from './home/home'; 
import {LoginComponent } from './login/login'; 
import {Profile} from './profile/profile'; 
import path from 'path';
import { Component } from '@angular/core';
import { authGuard } from './auth-guard';

export const routes: Routes = [ 
    {path:'', component:Home},
    {path:'profile', component:Profile,
        canActivate:[authGuard]
    }, 
    {path:'login', component:LoginComponent}
];
