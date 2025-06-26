import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})

export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/homepage', icon: 'home' },
    { title: 'Confirmation Date', url: '/confirmationpage', icon: 'calendar' },
    { title: 'Itinerary', url: '/folder/Itinerary', icon: 'newspaper' },
    { title: 'Food Menu', url: '/folder/Food Menu', icon: 'book' },
    { title: 'Table Arrangement', url: '/folder/Table Arrangement', icon: 'restaurant' },
    { title: 'Info', url: '/folder/Info', icon: 'information-circle' },
    { title: 'Edit Guest List', url: '/guestList', icon: 'people'}
  ];
  constructor() {}
}

export interface Guests {
  id: number;
  guestName: string;
  confirmation: boolean | null;
  numberofPlus: number | null;
  confirmationDate: Date | null;
  plusGuest: PlusGuest[] | null;
  familyId: number | null;
}

export interface PlusGuest {
  id: number;
  guestId: number;
  plusGuestName: string;
  confirmation: boolean | null;
  plusConfirmationDate: string | null;
  guest?: Guests;
}

export interface GuestsResp {
  id: number;
  confirmation: boolean | null;
}

export interface PlusGuestResp {
  id: number;
  guestId: number;
  plusGuestName: string;
  confirmation: boolean | null;
}
