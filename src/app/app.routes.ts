import { Routes } from '@angular/router';
import { TabletComponent } from './tablet/tablet';
import { AdminComponent } from './admin-dashboard/admin-dashboard'; // Asegúrate de que la ruta sea correcta

export const routes: Routes = [
  // Ruta por defecto (La raíz): Muestra la Tablet
  { path: '', component: TabletComponent },
  
  // Ruta Admin: Muestra el Dashboard de PC
  { path: 'admin', component: AdminComponent },

  // Cualquier otra cosa: Redirige a la raíz
  { path: '**', redirectTo: '' }
];