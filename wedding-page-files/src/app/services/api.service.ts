import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Guests, GuestsResp, PlusGuestResp} from '../app.component';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'https://localhost:44392/api/Guests'; // Change to your API endpoint

  constructor(private http: HttpClient) {}

  getGuests() {
    return this.http.get(this.apiUrl+"/GetGuests");
  }

  findGuest(value:string){
    return this.http.get(this.apiUrl+`/GetGuest/${value}`);
  }

  updateGuest(guest: GuestsResp) {
    return this.http.post(this.apiUrl+"/GuestConfirme", guest);
  }

  updateGuestAndPlus(plusGuest: PlusGuestResp[]) {
    return this.http.post(this.apiUrl+"/GuestPlusConfirme", plusGuest);
  }
}
