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
  findFamilyGuest(familyId:number, guestId:number){
    return this.http.get(this.apiUrl+`/GetFamilyGuest/${familyId}/${guestId}`);
  }

  postGuestConfirme(guest: GuestsResp) {
    return this.http.post(this.apiUrl+"/GuestConfirme", guest);
  }

  postPlusConfirme(plusGuest: PlusGuestResp[]) {
    return this.http.post(this.apiUrl+"/GuestPlusConfirme", plusGuest);
  }
}
