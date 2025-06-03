import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Guests } from '../app.component';

var guests: Guests[] = [];

@Component({
  standalone: false,
  selector: 'app-guestList',
  templateUrl: './editGuestListPage.page.html',
  styleUrls: ['./editGuestListPage.page.scss'],
})

export class EditGuestListPage implements OnInit {
    
  //private activatedRoute = inject(ActivatedRoute);
  constructor(private apiService: ApiService) {}

  ngOnInit() {
  this.apiService.getGuests().subscribe(data => {
    guests = data as Guests[];
  });
}

// headerTittle(values: number){
//   return guests.keys();}
}