import { Injectable, Signal, signal } from '@angular/core';
import { TechnologyFormService } from './technology-form.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private isOpen = signal(false); // Signal, um Modal-Status zu verwalten

  constructor(private technologyFormService: TechnologyFormService) {}

  get modalOpen(): Signal<boolean> {
    return this.isOpen;
  }

  newModal() {
    this.technologyFormService.resetForm();
    this.openModal();
  }

  openModal() {
    this.isOpen.set(true);
  }

  closeModal() {
    this.isOpen.set(false);
  }
}
