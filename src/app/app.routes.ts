import { Routes } from '@angular/router';
import { VariablesAndDataTypesComponent } from './components/variables-and-data-types/variables-and-data-types.component';

export const routes: Routes = [
    
    {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'home'
    },
    {
        path: 'variables-and-data-types',
        component: VariablesAndDataTypesComponent
    }
];
