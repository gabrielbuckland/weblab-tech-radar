import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Technology,
  TechnologyService,
} from '../../services/technology.service';

@Component({
  selector: 'app-technology-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './technology-list.component.html',
  styleUrl: './technology-list.component.scss',
})
export class TechnologyListComponent implements OnInit {
  technologies = signal<Technology[]>([]);

  constructor(private techService: TechnologyService) {}

  ngOnInit() {
    this.loadTechnologies();
  }

  loadTechnologies() {
    this.techService.getTechnologies().subscribe({
      next: (data: Technology[]) => this.technologies.set(data),
      error: (err: any) =>
        console.error('Fehler beim Laden der Technologien:', err),
    });
  }

  deleteTechnology(id: number) {
    if (
      confirm('Bist du sicher, dass du diese Technologie löschen möchtest?')
    ) {
      this.techService.deleteTechnology(id).subscribe({
        next: () => this.loadTechnologies(),
        error: (err: any) => console.error('Fehler beim Löschen:', err),
      });
    }
  }
}
