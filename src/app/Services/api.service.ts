import { HttpClient } from '@angular/common/http';
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

deleteEmployee(id: string): Observable<void> {
  return this.http.delete<void>(`http://localhost:3000/employees/${id}`)
}

}
