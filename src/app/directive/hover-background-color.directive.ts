import {Directive, ElementRef, HostListener, inject, Input, OnInit, Renderer2} from '@angular/core';
import {Colors} from "../shared/app.colors";

@Directive({
  selector: '[appHoverBackgroundColor]',
  standalone: true
})
export class HoverBackgroundColorDirective implements OnInit {
  @Input() color!: string

  private elementRef: ElementRef = inject(ElementRef);
  private render: Renderer2 = inject(Renderer2);

  private LIGHT_ACTIVE_COLORS_MAP: { [key: string]: Colors } = {
    [Colors.LIGHT_GREEN]: Colors.ACTIVE_GREEN,
    [Colors.LIGHT_RED]: Colors.ACTIVE_RED,
    [Colors.LIGHT_BLUE]: Colors.ACTIVE_BLUE,
    [Colors.LIGHT_GRAY]: Colors.ACTIVE_GRAY,
  };

  ngOnInit(): void {
    this.setInitialStyles();
    this.changeBackgroundColor(this.color);
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.changeBackgroundColor(this.LIGHT_ACTIVE_COLORS_MAP[this.color!])
  }


  @HostListener('mouseleave') onMouseLeave(): void {
    this.changeBackgroundColor(this.color);
  }

  private setInitialStyles(): void {
    this.render.setStyle(this.elementRef.nativeElement, 'transition', 'background-color 0.3s');
  }

  private changeBackgroundColor(color: string) {
    this.render.setStyle(this.elementRef.nativeElement, 'backgroundColor', color);
  }
}
