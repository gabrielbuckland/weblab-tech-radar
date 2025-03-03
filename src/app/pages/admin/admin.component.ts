import { Component } from '@angular/core';
import { TechnologyListComponent } from '../../components/technology-list/technology-list.component';
import { CommonModule } from '@angular/common';
import { TechnologyFormComponent } from '../../components/technology-form/technology-form.component';
import { ModalService } from '../../services/modal.service';
import { TechnologyFormService } from '../../services/technology-form.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TechnologyListComponent, CommonModule, TechnologyFormComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  title = 'Admin';

  constructor(public modalService: ModalService) {}
}
