import { Component, Input, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnologyStoreService } from '../../services/technology-store.service';
import { Technology } from '../../services/technology.service';
import { TechnologyFormService } from '../../services/technology-form.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-technology-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './technology-list.component.html',
  styleUrl: './technology-list.component.scss',
})
export class TechnologyListComponent implements OnInit {
  @Input() showAdminView: boolean = false;
  technologies!: Signal<Technology[]>;
  selectedTechnology: Technology | null = null; // ✅ Stores selected tech for editing

  ringMapping: { [key: string]: number } = {
    Adopt: 1,
    Trial: 2,
    Assess: 3,
    Hold: 4,
  };

  constructor(
    private techStore: TechnologyStoreService,
    private technologyFormService: TechnologyFormService,
    public modalService: ModalService
  ) {}

  ngOnInit() {
    this.updateTechnologies();
  }

  updateTechnologies() {
    this.technologies = this.showAdminView
      ? this.techStore.getTechnologies()
      : this.techStore.getTechnologiesWithFilter(
          (tech: Technology) => tech.is_draft === 0
        );
  }

  deleteTechnology(id: number) {
    this.techStore.deleteTechnology(id);
  }

  togglePublishTechnology(tech: Technology) {
    const toggledIsDraft = tech.is_draft === 1 ? 0 : 1;

    if (toggledIsDraft === 0) {
      // tech is draft
      const form = this.technologyFormService.getForm();
      this.technologyFormService.populateForm(tech);

      this.technologyFormService.applyValidationRules(false); // Enforce publish rules

      if (form.invalid) {
        console.warn('⚠️ Cannot publish, missing required fields:', tech);
        this.selectedTechnology = tech; // Pass the technology for editing
        this.modalService.openModal();
        return;
      }
    }

    this.techStore.updateTechnology({
      ...tech,
      is_draft: toggledIsDraft,
      published_at: this.findNewPublishDate(tech),
    });
  }

  private findNewPublishDate(tech: Technology): Date | null {
    return tech.is_draft ? new Date() : tech.published_at;
  }

  editTechnology(tech: Technology) {
    this.technologyFormService.populateForm(tech);
    this.modalService.openModal();
  }

  get sortedTechnologies() {
    return this.technologies().sort(
      (a, b) => this.ringMapping[a.ring] - this.ringMapping[b.ring]
    );
  }
}
