import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IEmployee } from 'src/app/Models/employee';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css'],
})
export class GraphicComponent implements OnInit {
  employees: IEmployee[];
  snackBar = inject(MatSnackBar);

  constructor(private api: ApiService, private router: Router) {
    this.employees = [];
  }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.api.getEmployees().subscribe({
      next: (data) =>
        (this.employees = data.filter(
          (emp) => emp.department === 'Graphic Design'
        )),
      error: (err) => console.error('Error fetching posts:', err),
    });
  }

  editEmployee(id: string) {
    this.router.navigate(['/graphic', 'edit-employee', id]);
  }

  deleteEmployee(id: string): void {
    this.api.deleteEmployee(id).subscribe({
      next: () => {
        this.employees = this.employees.filter(
          (employee) => employee.id !== id
        );
      },
      error: (err) => console.error('Error deleting employee:', err),
      complete: () => this.openSnackBar(),
    });
  }

  openSnackBar() {
    this.snackBar.open('Employee Deleted Succefully!', 'Close', {
      duration: 3000,
    });
  }
}
