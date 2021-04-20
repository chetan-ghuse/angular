import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSubmitForm]'
})
export class SubmitFormDirective {
	/*@Input() appSubmitForm!: Function;*/

  constructor(private el: ElementRef) { }

  @HostListener('keydown.control.enter')
  OnKeyUp() {

  	console.log(this.el.nativeElement);
  	
  }


}
