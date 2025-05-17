import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/errors/page-not-found/page-not-found.component';

export const routes: Routes = [

   {
     path:'home',
     component: HomeComponent
   },

   // Products
   {
     path:'equipo-trabajo',
     loadChildren: () => import('./components/router/rutas.routes').then(route => route.RUTAS_ROUTES),
   },

   { path: '',
     redirectTo: '/home',
     pathMatch: 'full'
   },

   {
     path:'**',
     component: PageNotFoundComponent
   }
];
