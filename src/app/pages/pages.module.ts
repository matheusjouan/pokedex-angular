import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    HomeComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule
  ]
})

export class PagesModule { }
