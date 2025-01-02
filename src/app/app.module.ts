import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './Components/nav/nav.component';
import { HrComponent } from './Components/hr/hr.component';
import { ItComponent } from './Components/it/it.component';
import { NotFoundComponent } from './Components/NotFound/NotFound.component';
import { GraphicComponent } from './Components/graphic/graphic.component';
import { MaterialModule } from './Modules/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';

const routes: Routes = [
  { path: '', component: NotFoundComponent },
  { path: 'hr', component: HrComponent },
  { path: 'it', component: ItComponent },
  { path: 'graphic', component: GraphicComponent },
  { path: 'add-employee', component: AddEmployeeComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HrComponent,
    GraphicComponent,
    ItComponent,
    AddEmployeeComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
