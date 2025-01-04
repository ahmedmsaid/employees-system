import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployee } from '../Models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor(private http: HttpClient) { }

getEmployees(): Observable<IEmployee[]> {
  return this.http.get<IEmployee[]>('http://localhost:3000/employees');
}

addEmployee(employee: IEmployee) {
  return this.http.post<IEmployee>('http://localhost:3000/employees', employee, {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  })
}

deleteEmployee(id: string): Observable<void> {
  return this.http.delete<void>(`http://localhost:3000/employees/${id}`)
}

}
