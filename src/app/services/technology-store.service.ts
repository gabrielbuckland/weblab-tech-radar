import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { TechnologyService, Technology } from './technology.service';

@Injectable({
  providedIn: 'root',
})
export class TechnologyStoreService {
  private technologies: WritableSignal<Technology[]> = signal<Technology[]>([]);

  constructor(private techService: TechnologyService) {
    this.loadTechnologies(); // Lade beim Start die Daten aus der DB
  }

  getTechnologies(): Signal<Technology[]> {
    return this.technologies.asReadonly(); // 👈 Expose als readonly
  }

  getTechnologiesWithFilter(
    filterFunc: (tech: Technology) => boolean
  ): Signal<Technology[]> {
    return computed(() => this.technologies().filter(filterFunc));
  }

  loadTechnologies() {
    this.techService.getTechnologies().subscribe({
      next: (data) => this.technologies.set(data),
      error: (err) => console.error('Error loading technologies:', err),
    });
  }

  addTechnology(newTech: Technology) {
    console.log(newTech);
    this.techService.addTechnology(newTech).subscribe((createdTech) => {
      this.technologies.update((techs) => [
        ...techs,
        {
          ...createdTech,
        },
      ]);
    });
  }

  updateTechnology(updatedTech: Technology) {
    this.techService.updateTechnology(updatedTech).subscribe((savedTech) => {
      const updatedList = this.technologies().map((tech) =>
        tech.id === updatedTech.id ? { ...updatedTech } : { ...tech }
      );

      this.technologies.set([...updatedList]);
    });
  }

  deleteTechnology(id: number) {
    this.techService.deleteTechnology(id).subscribe(() => {
      this.technologies.update((techs) =>
        techs.filter((tech) => tech.id !== id)
      );
    });
  }
}
