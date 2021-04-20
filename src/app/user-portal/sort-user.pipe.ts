import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortUser'
})
export class SortUserPipe implements PipeTransform {

  transform(value: Array<any>, ...args: any): Array<any> {
  	value = value.slice().sort((a,b) => {
  		let x = a.user.firstName.toLowerCase();
  		let y = b.user.firstName.toLowerCase();
  		if(x<y) {
  			return -1;
  		} else if(x>y) {
  			return 1;
  		}
  		return 0;
  	})
    return value;
  }

}
