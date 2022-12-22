import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { GrocessaryService } from '../service/grocessary.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  fullName: string = "";
  email: string = "";
  subject: string = "";
  constructor(
    private router:Router,
    private datePipe: DatePipe,
    private gservice:GrocessaryService
  ) { }

  ngOnInit(): void {
  }
  onSubmit():void{
    if (this.fullName === '' || this.fullName.length < 4) {
      alert('FirstName must contain atleast 4 characters');
      return;
    }
    if (this.subject === '' || this.subject.length < 10) {
      alert('LastName must contain atleast 10 characters');
      return;
    }

//alert("sucess")
    const body: any = {
      fullName : this.fullName,
      email :this.email,
      subject:this.subject
    }
    console.log("=======>",body);
    this.gservice.onSubmit(body).pipe(take(1)).subscribe((res :any) => {
      console.log("***",res);
      if(res && res?.contact_id){
        alert("Your Response submitted sucessfully");
        this.router.navigate([""]);
      }
    }, err =>{
      console.log("Error  ",err);
      alert("Something going wrong!!pl try again");
    })
  }

}
