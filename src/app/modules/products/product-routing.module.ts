import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { TopProductsComponent } from './top-products.component';
import { ProductsShellComponent } from './products-shell.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ProductListComponent,
      },
      {
        path: 'top-products',
        component: TopProductsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
