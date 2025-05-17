import { Routes } from "@angular/router";

export const RUTAS_ROUTES: Routes = [

   {
      path:'equipo-trabajo',
      loadComponent: () => import('../equipo-trabajo/equipo-trabajo.component').then(m => m.EquipoTrabajoComponent),
      children: [
          {
            path:'list',
            loadComponent: () => import('../equipo-trabajo-page/equipo-trabajo-page.component').then(m => m.EquipoTrabajoPageComponent),
          },
          {
            path:'tarifas',
            loadComponent: () => import('../tarifas-page/tarifas-page.component').then(m => m.TarifasPageComponent),
          },
          {
            path:'editar-tarifas/:cod_trfro',
            loadComponent: () => import('../tarifas-edicion-page/tarifas-edicion-page.component').then(m => m.TarifasEdicionPageComponent),
          }

        ]
    },

]
