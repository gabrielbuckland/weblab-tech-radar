import { Component } from '@angular/core';
import { TechnologyListComponent } from '../../components/technology-list/technology-list.component';
import { TechnologyFormComponent } from '../../components/technology-form/technology-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TechnologyListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  title = 'Home';
}
