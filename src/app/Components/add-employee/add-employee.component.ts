import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IEmployee } from 'src/app/Models/employee';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
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
  }

  ngOnInit() {
  }

  addEmployee(employee: IEmployee) {
    this.api.addEmployee(employee).subscribe({
      next: () => console.log("Added Succefully!"),
      error: (err) => console.error("Error occured" + err)
    })
  }

  onSubmit() {
    let newEmployee = {
      id: this.generateRandomNumber(6, 100).toString(),
      firstName: this.employeeForm.get('firstName')?.value,
      lastName: this.employeeForm.get('lastName')?.value,
      birthDate: this.employeeForm.get('birthDate')?.value.toISOString().split('T')[0],
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

}
