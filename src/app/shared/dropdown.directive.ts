import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({ selector: '[appDropdown]' })
export class DropdownDirective {
  @HostListener('click') onclick() {
    let parent = this.el.nativeElement; //parent element
    parent.classList.toggle('show');
    let child = [].filter.call(this.el.nativeElement.children, (ele) =>
      ele.classList.contains('dropdown-menu')
    );

    if (child.length) {
      child[0].classList.toggle('show');
    }
  }

  constructor(private el: ElementRef) {}
}
