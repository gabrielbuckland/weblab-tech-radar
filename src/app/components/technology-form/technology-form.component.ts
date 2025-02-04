import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Technology,
  TechnologyService,
} from '../../services/technology.service';

@Component({
  selector: 'app-technology-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './technology-form.component.html',
  styleUrl: './technology-form.component.scss',
})
export class TechnologyFormComponent {
  @Output() closeModal = new EventEmitter<void>(); // Signal zum Schließen
  technology: Technology = {
    id: 0,
    name: '',
    category: '',
    ring: '',
    description: '',
  };

  constructor(private techService: TechnologyService) {}

  submitForm() {
    this.techService.addTechnology(this.technology).subscribe({
      next: () => {
        this.closeModal.emit(); // Schließt das Modal nach erfolgreichem Speichern
      },
      error: (err: any) => console.error('Fehler beim Speichern:', err),
    });
  }
}
