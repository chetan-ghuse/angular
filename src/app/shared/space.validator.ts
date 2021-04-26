import { AbstractControl } from '@angular/forms';

export function forbiddenSpaceValidator(control: AbstractControl): {[key: string]: any} | null {
  const forbidden = control.value.trim().length > 0;
  return forbidden ? null : {'forbiddenSpace': {value: control.value}};
}
