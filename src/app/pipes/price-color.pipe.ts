import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceColor',
})
export class PriceColorPipe implements PipeTransform {
  transform(value: number | null | undefined): string | null {
    return (value ?? 0) > 20000 ? '#d32f2f' : null;
  }
}
