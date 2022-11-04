import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appButtonColor]'
})
export class ButtonColorDirective {

  @Input() color: string = ""; 
  @HostBinding('style.backgroundColor') bgColor: string = "";

  constructor(private ref: ElementRef) { }

  @HostListener('mouseover') onHover(event: Event) {
    this.bgColor = this.color;
  }

  @HostListener('mouseleave') onLeave(event: Event) {
    this.bgColor = "";
  }

}

