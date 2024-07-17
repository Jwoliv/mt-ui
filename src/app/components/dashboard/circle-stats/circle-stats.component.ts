import { Component } from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";

export interface CircleSegmentsData {
  start: number,
  end: number,
  color: string
}

@Component({
  selector: 'app-circle-stats',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgStyle
  ],
  templateUrl: './circle-stats.component.html',
  styleUrl: './circle-stats.component.scss'
})
export class CircleStatsComponent {
  categories = [
    { name: 'Category A', value: 30, color: '#ff0000' },
    { name: 'Category B', value: 10, color: '#44bd69' },
    { name: 'Category C', value: 20, color: '#4458bd' }
  ];

}
