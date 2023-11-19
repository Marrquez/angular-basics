import { Routes } from '@angular/router';
import { VariablesAndDataTypesComponent } from './components/variables-and-data-types/variables-and-data-types.component';
import { DecoratorsComponent } from './components/decorators/decorators.component';
import { ComponentCompositionComponent } from './components/component-composition/component-composition.component';
import { AgFormsComponent } from './components/ag-forms/ag-forms.component';
import { TsAlgorithmsComponent } from './components/ts-algorithms/ts-algorithms.component';

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
    },
    {
        path: 'decorators',
        component: DecoratorsComponent
    },
    {
        path: 'component-composition',
        component: ComponentCompositionComponent
    },
    {
        path: 'ag-forms',
        component: AgFormsComponent
    },
    {
        path: 'ts-algorithms',
        component: TsAlgorithmsComponent
    }
];
