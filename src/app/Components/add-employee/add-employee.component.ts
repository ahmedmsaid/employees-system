import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { IEmployee } from 'src/app/Models/employee';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit, OnDestroy {
  employeeForm!: FormGroup;
  snackBar = inject(MatSnackBar);
  subscriptions!: Subscription[];
  //newEmployee!: IEmployee;

  constructor(private api: ApiService) { 
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
  }

  addEmployee(employee: IEmployee) {
    let sub = this.api.addEmployee(employee).subscribe({
      next: () => console.log("Added Succefully!"),
      error: (err) => console.error("Error occured" + err),
      complete: () => this.openSnackBar()
    })

    this.subscriptions.push(sub);
  }

  onSubmit() {
    let newEmployee = {
      id: this.generateRandomNumber(100, 1000).toString(),
      firstName: this.employeeForm.get('firstName')?.value,
      lastName: this.employeeForm.get('lastName')?.value,
      birthDate: this.employeeForm.get('birthDate')?.value,
      phone: this.employeeForm.get('phone')?.value,
      address: this.employeeForm.get('address')?.value,
      email: this.employeeForm.get('email')?.value,
      department: this.employeeForm.get('department')?.value,
      salary: this.employeeForm.get('salary')?.value
    }

    this.addEmployee(newEmployee);
  }  

  generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  openSnackBar() {
    this.snackBar.open('Employee Added Succefully!', 'Close', {
      duration: 3000,
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }

}
