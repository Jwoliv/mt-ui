import {Component, EventEmitter, Output} from '@angular/core';
import {Colors} from "../../app.colors";

@Component({
  selector: 'app-change-entity-call-buttons',
  standalone: true,
  imports: [],
  templateUrl: './change-entity-call-buttons.component.html',
  styleUrl: './change-entity-call-buttons.component.scss'
})
export class ChangeEntityCallButtonsComponent {
  @Output() callDeleteBtn: EventEmitter<void> = new EventEmitter<void>();
  @Output() callUpdateBtn: EventEmitter<void> = new EventEmitter<void>();

  public readonly Colors = Colors;

  public triggerDeleteEntity() {
    this.callDeleteBtn.emit()
  }

  public triggerUpdateBtn() {
    this.callUpdateBtn.emit()
  }
}
