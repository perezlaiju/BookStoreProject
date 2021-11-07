import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookpageComponent } from './bookpage/bookpage.component';
import { TopmenuComponent } from './topmenu/topmenu.component';

const routes: Routes = [
  {path:'home' ,component: BookpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
