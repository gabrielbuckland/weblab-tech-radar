import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Technology } from './technology.service';

@Injectable({
  providedIn: 'root',
})
export class TechnologyFormService {
  form: FormGroup;
  initialFormState: FormGroup;
  isDraftMode: boolean = false;
  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
    this.initialFormState = this.form.value;
  }

  /** Creates a new FormGroup for technology */
  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: [''],
      ring: [''],
      description: [''],
      is_draft: [true], // Default to draft
      id: [0],
    });
  }

  getForm(): FormGroup {
    return this.form;
  }

  resetForm() {
    this.form.reset(this.initialFormState);
  }

  /** Populates the form with existing technology data */
  populateForm(tech: Technology | null) {
    if (tech) {
      this.form.patchValue(tech);
    }
  }

  /** Applies validation rules based on draft or publish mode */
  applyValidationRules(isDraft: boolean) {
    if (!isDraft) {
      // 🚀 Enforce required fields for publishing
      this.form.controls['category'].setValidators([Validators.required]);
      this.form.controls['ring'].setValidators([Validators.required]);
      this.form.controls['description'].setValidators([
        Validators.required,
        Validators.minLength(10),
      ]);
    } else {
      // 💾 Remove strict validation for drafts
      this.form.controls['category'].clearValidators();
      this.form.controls['ring'].clearValidators();
      this.form.controls['description'].clearValidators();
    }

    Object.keys(this.form.controls).forEach((field) => {
      this.form.controls[field].updateValueAndValidity();
    });
  }

  toggleMode() {
    this.isDraftMode = !this.isDraftMode;
    this.applyValidationRules(this.isDraftMode);
  }

  setMode(isDraftMode: boolean) {
    this.isDraftMode = isDraftMode;
  }

  getMode(): boolean {
    return this.isDraftMode;
  }
}
