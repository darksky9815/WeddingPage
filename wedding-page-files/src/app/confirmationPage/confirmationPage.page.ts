import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guests, PlusGuestResp, GuestsResp } from '../app.component';
import { ApiService } from '../services/api.service';

function isString(value: string): boolean {
  if (value == null || value === "") {
    return true;
  }
  return !/\d/.test(value);
}

function isEmpty(text: string): boolean {
  return text == null || text.match(/^\s*$/) !== null;
}

@Component({
  standalone: false,
  selector: 'app-confirmation',
  templateUrl: './confirmationPage.page.html',
  styleUrls: ['./confirmationPage.page.scss'],
})

export class ConfirmationPage implements OnInit {
  isAttending: boolean = false;
  guestNameValue = "";
  Warning = "";
  GuestName = "";
  plusGuest: PlusGuestResp[] = [];
  guest: Guests | null = null;
  validateGuest: boolean = false;
  mensajeParaConfirmar = "";
  ConfirmationMessage = "";
  plusGuestWarnings: string[] = [];
  //private activatedRoute = inject(ActivatedRoute);
  constructor(private apiService: ApiService) {}

  ngOnInit() {
  }
  async onEnter(){
    this.Warning = "";
    this.GuestName = "";
    
    this.validateGuest = await this.ValidateGuestName();
  }

  

  onChange() {
    this.Warning = "";
    this.validateGuest = false;
    this.guest = null;
    this.GuestName = "";
    this.ConfirmationMessage = "";
    this.plusGuest = [];
    this.plusGuestWarnings = [];
  }

  async ValidateGuestName() {
    if(isEmpty(this.guestNameValue)){
      this.Warning = "Favor de ingresar un nombre.";
      return false;
    }
    if(!isString(this.guestNameValue)){
      this.Warning = "Favor de no ingrasar numeros.";
      return false;
    }

    await this.findGuest();

    if(this.guest === null){
      this.Warning = "No se encuentra en la lista de invitados.";
      return false;
    }

    this.GuestName = this.guest?.guestName ?? "";
    this.isAttending = this.guest?.confirmation ?? false;
    if(!this.isAttending){
      this.mensajeParaConfirmar = "¿Te unes a la fiesta o nos vas a dejar bailando solos?";
    }else{
      this.mensajeParaConfirmar = `Su confirmación ya fue realizada. \n ¿Quieres cambiar tu confirmación?`;
    }

    if (this.guest && this.guest?.numberofPlus !== null && this.guest?.numberofPlus > 0) {
      if(this.guest.plusGuest === null || this.guest.plusGuest.length === 0){
        console.log(this.guest.numberofPlus);
        this.guest.plusGuest = [];
        for (let i = 0; i < this.guest.numberofPlus; i++) {
          this.plusGuest.push({
            id: 0,
            guestId: this.guest.id,
            plusGuestName: "",
            confirmation: null
          });          
        }
        this.guest.plusGuest = this.plusGuest.map(a => ({
            id: a.id,
            guestId: a.guestId,
            plusGuestName: a.plusGuestName,
            confirmation: a.confirmation,
            plusConfirmationDate: null,
            guest: this.guest!
        }))
      }
       else {
        this.plusGuest = this.guest.plusGuest.map(pg => ({
          id: pg.id,
          guestId: pg.guestId,
          plusGuestName: pg.plusGuestName,
          confirmation: pg.confirmation
        }));
      }
    }
    return true;
  }

  async findGuest() {
      this.guest = await new Promise<Guests | null>((resolve, reject) => {
      this.apiService.findGuest(this.guestNameValue).subscribe({
        next: (data) => resolve(data as Guests),
        error: () => resolve(null)
      });
    });    
  }

  onBlurPlusGuest(index: number) {
    this.ValidatePlusGuest(index);
  }

  onChangePlusGuest(index: number) {
      this.ValidatePlusGuest(index);
  }

  ValidatePlusGuest(index: number) {

    this.plusGuestWarnings[index] = "";
    const plusGuest = this.plusGuest[index];
    
    if (!isString(plusGuest.plusGuestName)) {
      this.plusGuestWarnings[index] = "Favor de no ingresar números.";
      return;
    }
    if (this.plusGuest.find(pg => pg.plusGuestName !== "" && 
      pg.plusGuestName.toLowerCase() === plusGuest.plusGuestName.toLowerCase() &&
      pg.id !== plusGuest.id) !== undefined) {
      this.plusGuestWarnings[index] = "El nombre del invitado ya existe. Ingrese su apellido para diferenciarlos.";
      return;
    }
  }
  
  onClick() {
    if (!this.validateGuest) {
      return;
    }

    if(this.plusGuest.every(a => a.plusGuestName === "") && this.plusGuest.some(a => a.confirmation !== null || 
      a.confirmation !== undefined || a.confirmation !== false)){
      this.Warning = "Favor de ingresar al menos un nombre de acompañante.";
      return;
    }

    if(this.plusGuestWarnings.length > 0 && this.plusGuestWarnings.some(a => a !== "")){
      this.Warning = "Favor de corregir los errores en los nombres de los acompañantes.";
      return;
    }

    if (this.guest) {
      const guestConfirmation: GuestsResp = {
        id: this.guest.id,
        confirmation: this.isAttending
      };
      if(this.plusGuest.length !== 0){               
        this.apiService.updateGuestAndPlus(this.plusGuest).subscribe({
          error: (err) => {
          console.error(err);
          this.Warning = "Error al enviar la confirmación.";
        }}) 
      }
      this.apiService.updateGuest(guestConfirmation).subscribe({
      next: () => {
        this.ConfirmationMessage = `Confirmación enviada. ${this.guest?.confirmation ? "\nYa reservamos tu silla, tu plato… y tu pedazo de bizcocho.\n¡Nos hace muy felices saber que vienes! " : "\nTe vamos a extrañar, pero entendemos.\nPrometemos compartir fotos, chismes y tal vez una selfie con el bizcocho."}`;
        this.guestNameValue = "";
        this.validateGuest = false;
        this.guest = null;      
        this.plusGuest = [];
        this.plusGuestWarnings = [];
      },
      error: (err) => {
        console.error(err);
        this.Warning = "Error al enviar la confirmación.";
        }
      });
          
    } else {
      this.Warning = "Invitado no encontrado.";
    }
  }
}
