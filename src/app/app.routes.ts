import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFound404Component } from './pages/not-found-404/not-found-404.component';

export interface CustomRoute extends Route {
  useInNavbar?: boolean;
  label?: string;
}

export const routes: CustomRoute[] = [
  { path: '', component: HomeComponent, useInNavbar: false, label: 'Home' },
  {
    path: 'about',
    component: NotFound404Component,
    useInNavbar: true,
    label: 'About',
  },
  {
    path: 'pricing',
    component: NotFound404Component,
    useInNavbar: true,
    label: 'Pricing',
  },
  {
    path: '**',
    component: NotFound404Component,
    useInNavbar: false,
    label: 'PageNotFound',
  },
];
