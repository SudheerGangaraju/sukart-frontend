import { NgModule } from '@angular/core';
import { IndianRupeePipe } from './indian-rupee.pipe';
import { PriceColorPipe } from './price-color.pipe';

@NgModule({
  declarations: [IndianRupeePipe, PriceColorPipe],
  exports: [IndianRupeePipe, PriceColorPipe],
})
export class PipesModule {}
