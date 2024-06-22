import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // empty path
  {path: '', component: HomeComponent, title: 'MyStore'},
  {path: 'profile', component: ProfileComponent, title: 'MyStore | Profile'},
  {path: 'products', 
    loadChildren: () => import('./product/product.module')
                              .then(m => m.ProductModule)},
  //wild card path
  {path: '**', component: PageNotFoundComponent, title: 'Page Not Found'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
