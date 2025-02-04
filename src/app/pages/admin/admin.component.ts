import { Component } from '@angular/core';
import { TechnologyListComponent } from '../../components/technology-list/technology-list.component';
import { CommonModule } from '@angular/common';
import { TechnologyFormComponent } from '../../components/technology-form/technology-form.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TechnologyListComponent, CommonModule, TechnologyFormComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  title = 'Admin';
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
