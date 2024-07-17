import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderContainerComponent} from "./components/header/header-container/header-container.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, HeaderContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mt-ui';
}
