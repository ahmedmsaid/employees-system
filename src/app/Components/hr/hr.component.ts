import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/Models/employee';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.css']
})
export class HrComponent implements OnInit {
  employees: IEmployee[];

  constructor(private api: ApiService, private router: Router) {
    this.employees = [];
   }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.api.getEmployees().subscribe({
      next: (data) => (this.employees = data),
      error: (err) => console.error('Error fetching posts:', err)
    });
  }

  deleteEmployee(id: string): void {
    this.api.deleteEmployee(id).subscribe({
      next: () => {
        this.employees = this.employees.filter(employee => employee.id !== id);
      },
      error: (err) => console.error('Error deleting employee:', err)
    })
  }
}
