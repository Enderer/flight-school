import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gameDuration'
})
export class GameDurationPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
