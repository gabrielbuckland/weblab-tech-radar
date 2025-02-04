import { Component } from '@angular/core';
import { CustomRoute, routes } from '../../app.routes';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  navbarRoutes: CustomRoute[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.navbarRoutes = this.router.config.filter(
      (route: CustomRoute) => route.useInNavbar
    );
  }
}
