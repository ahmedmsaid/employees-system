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
import { ReactiveFormsModule } from '@angular/forms';
import { EditEmployeeComponent } from './Components/edit-employee/edit-employee.component';
import { PopUpComponent } from './Components/pop-up/pop-up.component';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hr', component: HrComponent },
  { path: 'it', component: ItComponent },
  { path: 'graphic', component: GraphicComponent },
  { path: 'add-employee', component: AddEmployeeComponent},
  { path: ':department/edit-employee/:id', component: EditEmployeeComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HrComponent,
    GraphicComponent,
    ItComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    PopUpComponent,
    HomeComponent,
    NavComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
