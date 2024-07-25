import {Component, Input} from '@angular/core';
import {UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-upper-title-ui',
  standalone: true,
  imports: [
    UpperCasePipe
  ],
  templateUrl: './upper-title-ui.component.html',
  styleUrl: './upper-title-ui.component.scss'
})
export class UpperTitleUiComponent {
  @Input({ required: true }) title!: string
  @Input() fontSize: string = '20px'
}
