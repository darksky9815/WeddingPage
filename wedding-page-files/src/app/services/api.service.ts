import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Guests, GuestsResp, PlusGuestResp} from '../app.component';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = environment.apiUrl; // Change to your API endpoint

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
