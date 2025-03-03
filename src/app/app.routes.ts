import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFound404Component } from './pages/not-found-404/not-found-404.component';
import { AdminComponent } from './pages/admin/admin.component';

export interface CustomRoute extends Route {
  useInNavbar?: boolean;
  label?: string;
}

export const routes: CustomRoute[] = [
  { path: '', component: HomeComponent, useInNavbar: false, label: 'Home' },
  {
    path: 'admin',
    component: AdminComponent,
    useInNavbar: true,
    label: 'Admin',
  },
  {
    path: '**',
    component: NotFound404Component,
    useInNavbar: false,
    label: 'PageNotFound',
  },
];
