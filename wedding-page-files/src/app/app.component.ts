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
    { title: 'Home', url: '/homepage', icon: 'home', visible: true },
    { title: 'Confirmation Date', url: '/confirmationpage', icon: 'calendar', visible: new Date().toISOString().split('T')[0] < '2025-10-02' },
    { title: 'Itinerary', url: '/folder/Itinerary', icon: 'newspaper', visible: new Date().toISOString().split('T')[0] === '2025-12-06' },
    { title: 'Food Menu', url: '/folder/Food Menu', icon: 'book', visible: new Date().toISOString().split('T')[0] === '2025-12-06' },
    { title: 'Table Arrangement', url: '/folder/Table Arrangement', icon: 'restaurant', visible: new Date().toISOString().split('T')[0] === '2025-12-06' }
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
