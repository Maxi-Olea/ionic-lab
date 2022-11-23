import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'camera',
        loadChildren: () => import('../camera/camera.module').then(m => m.CameraPageModule)
      },
      {
        path: 'map',
        loadChildren: () => import('../map/map.module').then(m => m.MapPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/camera',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/camera',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
