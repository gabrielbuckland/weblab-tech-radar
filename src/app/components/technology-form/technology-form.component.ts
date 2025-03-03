import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Technology } from '../../services/technology.service';
import { ModalService } from '../../services/modal.service';
import { TechnologyFormService } from '../../services/technology-form.service';
import { CommonModule } from '@angular/common';
import { TechnologyStoreService } from '../../services/technology-store.service';
import { log } from 'console';

@Component({
  selector: 'app-technology-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './technology-form.component.html',
  styleUrl: './technology-form.component.scss',
})
export class TechnologyFormComponent implements OnChanges {
  @Input() technologyData: Technology | null = null; // ✅ Existing tech for editing
  @Output() formSubmitted = new EventEmitter<Technology>();

  technologyForm: FormGroup;

  constructor(
    private techStore: TechnologyStoreService,
    public technologyFormService: TechnologyFormService,
    public modalService: ModalService
  ) {
    this.technologyForm = this.technologyFormService.getForm();
  }

  ngOnInit() {
    this.technologyFormService.setMode(true);
    this.technologyFormService.applyValidationRules(
      this.technologyFormService.getMode()
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['technologyData']) {
      if (this.technologyData) {
        console.log('📝 Editing existing technology:', this.technologyData);
        this.technologyForm.patchValue(this.technologyData); // ✅ Pre-fill form
        this.technologyFormService.setMode(!!this.technologyData.is_draft);
      } else {
        console.log('➕ Creating new technology');
        this.technologyFormService.resetForm(); // ✅ Reset form when adding new technology
        this.technologyFormService.setMode(true);
      }
      this.technologyFormService.applyValidationRules(
        this.technologyFormService.getMode()
      );
    }
  }

  submitForm() {
    this.technologyForm.markAllAsTouched();
    this.technologyForm.updateValueAndValidity();

    if (this.technologyForm.valid) {
      const data = {
        ...this.technologyData, // ✅ Retain ID if updating
        ...this.technologyForm.value,
        is_draft: 1,
      };

      if (data?.id) {
        this.techStore.updateTechnology(data); // ✅ Update existing tech
      } else {
        this.techStore.addTechnology(data); // ✅ Add new tech
      }

      this.formSubmitted.emit(data);
      this.modalService.closeModal();
      this.technologyFormService.resetForm();
      this.technologyFormService.setMode(false);
    }
  }
}
