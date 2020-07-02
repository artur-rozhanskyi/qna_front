import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({ selector: '[appDropdown]' })
export class DropdownDirective {
  @HostListener('click') onclick() {
    const parent = this.el.nativeElement;
    parent.classList.toggle('show');
    const child = [].filter.call(this.el.nativeElement.children, (ele) =>
      ele.classList.contains('dropdown-menu')
    );

    if (child.length) {
      child[0].classList.toggle('show');
    }
  }

  constructor(private el: ElementRef) {}
}
