import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ProductCardShellComponent } from './product-card-shell.component';
import { TopProductsComponent } from './top-products.component';
import { ProductsShellComponent } from './products-shell.component';

@NgModule({
  declarations: [
    ProductsShellComponent,
    ProductListComponent,
    ProductCardShellComponent,
    TopProductsComponent,
  ],
  imports: [CommonModule, ProductRoutingModule, PipesModule],
})
export class ProductsModule {}
