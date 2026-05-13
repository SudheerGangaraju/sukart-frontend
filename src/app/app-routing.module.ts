import { NgModule } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { NoPreloading, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { environment } from '../environments/environment';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AIChatComponent } from 'ai-assistant';
import { TestComponent } from './components/test/test.component';

const loadAboutModule = () =>
  loadRemoteModule({
    type: 'module',
    remoteEntry: environment.aboutRemoteEntry,
    exposedModule: './AboutModule',
  })
    .then((m) => m.AboutModule)
    .catch(() =>
      import('./modules/about/about.module').then((m) => m.AboutModule),
    );

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/products/products.module').then(
        (m) => m.ProductsModule,
      ),
  },
  {
    path: 'about',
    loadChildren: loadAboutModule,
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./modules/contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./modules/cart/cart.module').then((m) => m.CartModule),
  },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'test', component: TestComponent },
  { path: 'ai', component: AIChatComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'products' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: NoPreloading,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
