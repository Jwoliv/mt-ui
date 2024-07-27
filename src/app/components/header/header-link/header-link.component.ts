import {Component, Input, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Link} from "../../../model/component-model/link.model";
import {UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-header-link',
  standalone: true,
    imports: [
        RouterLink,
        UpperCasePipe,
        RouterLinkActive
    ],
  templateUrl: './header-link.component.html',
  styleUrl: './header-link.component.scss'
})
export class HeaderLinkComponent {
 public _link = signal<Link>({});

 @Input() set link(link: Link) {
   this._link.set(link);
 }

 get link() {
   return this._link()
 }

}
