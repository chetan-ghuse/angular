import { Directive, HostListener } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Directive({
  selector: '[appSubmitForm]'
})
export class SubmitFormDirective {

  constructor(private formGroup: FormGroupDirective) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.ctrlKey && event.keyCode === 13) {
      this.formGroup.onSubmit(event);
    }
  }
}
