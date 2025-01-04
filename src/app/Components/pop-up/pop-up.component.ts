import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IEmployee } from 'src/app/Models/employee';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public emp: IEmployee, private router: Router) { }

  ngOnInit() {
  }

  navigate(){
    if (this.emp.department === 'Human Resources') {
      this.router.navigate(['/hr']);
    }  
    if (this.emp.department === 'Information Technology') {
      this.router.navigate(['/it']);
    }
    if (this.emp.department === 'Graphic Design') {
      this.router.navigate(['/graphic']);
    }
  }

}
