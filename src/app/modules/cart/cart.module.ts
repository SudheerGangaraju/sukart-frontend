import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, FormsModule, CartRoutingModule, PipesModule],
})
export class CartModule {}
