import { Pipe, PipeTransform } from '@angular/core';

const regex = new RegExp('<.*>', 'g');

@Pipe({
  name: 'sanitizeInput'
})
export class SanitizeInputPipe implements PipeTransform {
  transform(value: string): string {
    if (typeof value === 'string') {
      value = value.replace(regex, '');
    }
    return value;
  }
}
