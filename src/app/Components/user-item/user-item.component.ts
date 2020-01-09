import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() user:any
  firstName:string
  lastName:string
  constructor() {
  }
  
  ngOnInit() {
    this.firstName=this.user.first_name
    this.lastName=this.user.last_name
  }

}
