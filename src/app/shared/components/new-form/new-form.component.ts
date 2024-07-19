import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-new-form',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './new-form.component.html',
  styleUrl: './new-form.component.scss'
})
export class NewFormComponent {
  @Input({required: true}) isShowForm: boolean = false;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  stopPropagation(event: any): void {
    event.stopPropagation();
  }

  onCloseForm() {
    this.isShowForm = false;
    this.onClose.emit(this.isShowForm);
  }
}
