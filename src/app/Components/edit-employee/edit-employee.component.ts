import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from 'src/app/Models/employee';
import { ApiService } from 'src/app/Services/api.service';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit, OnDestroy {
  employeeForm!: FormGroup;
  employee!: IEmployee;
  emp_id!: string;
  department!: string;
  subscriptions!: Subscription[];
  popUp = inject(MatDialog);

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { 
    this.employeeForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required)
    });

    this.subscriptions = [];
  }

  ngOnInit() {
    this.emp_id = this.route.snapshot.paramMap.get('id') ?? '';
    this.department = this.route.snapshot.paramMap.get('department') ?? '';
    this.getEmployee(this.emp_id);
  }

  getEmployee(id: string) {
    let sub = this.api.getEmployee(id).subscribe({
      next: (data) => this.employeeForm.patchValue(data),
      error: (err) => console.log("Error ocurred " + err)
    });

    this.subscriptions.push(sub)
  }

  editEmployee(id: string, emp: IEmployee) {
    let sub = this.api.editEmployee(id, emp).subscribe({
      next: () => console.log("Employee Updated Successfully"),
      error: (err) => console.error("Error ocurred " + err)
    })

    this.subscriptions.push(sub)
  }

  onSubmit() {
    this.employee = {
      id: this.emp_id,
      firstName: this.employeeForm.get('firstName')?.value,
      lastName: this.employeeForm.get('lastName')?.value,
      birthDate: this.employeeForm.get('birthDate')?.value,
      phone: this.employeeForm.get('phone')?.value,
      address: this.employeeForm.get('address')?.value,
      email: this.employeeForm.get('email')?.value,
      department: this.employeeForm.get('department')?.value,
      salary: this.employeeForm.get('salary')?.value
    }
    this.editEmployee(this.emp_id, this.employee)
    this.openDialog();
    //this.router.navigate(['/' + this.department]);
  }

  openDialog() {
    this.popUp.open(PopUpComponent, {
      data: this.employee,
      autoFocus: true,
      disableClose: false
    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }

}
