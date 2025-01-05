import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IEmployee } from 'src/app/Models/employee';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css'],
})
export class GraphicComponent implements OnInit, OnDestroy {
  employees: IEmployee[];
  snackBar = inject(MatSnackBar);
  subscriptions!: Subscription[];

  constructor(private api: ApiService, private router: Router) {
    this.employees = [];
    this.subscriptions = [];
  }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    let sub = this.api.getEmployees().subscribe({
      next: (data) =>
        (this.employees = data.filter(
          (emp) => emp.department === 'Graphic Design'
        )),
      error: (err) => console.error('Error fetching posts:', err),
    });

    this.subscriptions.push(sub)
  }

  editEmployee(id: string) {
    this.router.navigate(['/graphic', 'edit-employee', id]);
  }

  deleteEmployee(id: string): void {
    let sub = this.api.deleteEmployee(id).subscribe({
      next: () => {
        this.employees = this.employees.filter(
          (employee) => employee.id !== id
        );
      },
      error: (err) => console.error('Error deleting employee:', err),
      complete: () => this.openSnackBar(),
    });

    this.subscriptions.push(sub)
  }

  openSnackBar() {
    this.snackBar.open('Employee Deleted Succefully!', 'Close', {
      duration: 3000,
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }
}
