import { Component, inject, OnInit} from '@angular/core';
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
  familyGuest: Guests | null = null;
  validateGuest: boolean = false;
  mensajeParaConfirmar = "";
  ConfirmationMessage = "";
  plusGuestWarnings: string[] = [];
  loading: boolean = false;
  //private activatedRoute = inject(ActivatedRoute);
  constructor(private apiService: ApiService) {}  

  ngOnInit() {
}

  async onEnter(event: any) {
    event.target.blur();
    this.plusGuest = [];
    this.Warning = "";
    this.GuestName = "";   
    this.loading = true;
    this.validateGuest = await this.ValidateGuestName();
    this.loading = false;
  }  

  onChange() {
    this.Warning = "";
    this.validateGuest = false;
    this.guest = null;
    this.familyGuest = null;
    this.isAttending = false;
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

    if(await this.findGuest() === false){return false;}

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
        error: (err) => {
          const message = err.error || 'An error occurred';
          this.Warning = message;
          this.loading = false;
          return false;
        }      
      });    
      }); 

      if(this.guest?.familyId != null){
          this.familyGuest = await new Promise<Guests | null>((resolve, reject) => {
            this.apiService.findFamilyGuest(this.guest?.familyId!, this.guest?.id!).subscribe({
              next: (data) => resolve(data as Guests),
              error: (err) => {
                const message = err.error || 'An error occurred';
                this.loading = false;
                console.log(message);
              }
            });
          });
        }   
    return true;
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
    this.loading = true;
    if (!this.validateGuest) {
      return;
    }

    if(this.guest?.numberofPlus !== null && this.plusGuest.every(a => a.plusGuestName === "") && this.plusGuest.some(a =>a.confirmation !== null && a.confirmation === true )) 
    {
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
        this.apiService.postPlusConfirme(this.plusGuest).subscribe({
          error: (err) => {
          console.error(err);
          this.loading = false;
          this.Warning = "Error al enviar la confirmación de los acompañantes.";
        }}) 
      }

      if(this.guest.familyId !== null && (this.familyGuest !== undefined || this.familyGuest !== null)){
        const familyGuestConfirmation: GuestsResp = {
          id: this.familyGuest?.id!,
          confirmation: this.familyGuest?.confirmation!
        };
        this.apiService.postGuestConfirme(familyGuestConfirmation).subscribe({
          error: (err) => {
            console.error(err);
            this.loading = false;
            this.Warning = `Error al enviar la confirmación de ${this.familyGuest?.guestName}.`;
          }
        });
      }

      this.apiService.postGuestConfirme(guestConfirmation).subscribe({
      next: () => {
        this.ConfirmationMessage = this.mensajeDeconfirmacion();
        this.guestNameValue = "";
        this.validateGuest = false;
        this.guest = null;      
        this.plusGuest = [];
        this.plusGuestWarnings = [];
        this.Warning = "";
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.Warning += `Error al enviar la confirmación de ${this.guest?.guestName}.`;
        }
      });
          
    } else {
      this.Warning = "Invitado no encontrado.";
    }
    this.loading = false;
  }

  mensajeDeconfirmacion() {
      const mensajeGuestConfirmacion = "\nYa reservamos tu silla, tu plato… y tu pedazo de bizcocho.\n¡Nos hace muy felices saber que vienes! Guarda muy bien tu sobre de la invitación y las taquillas. Será requerido en momento de la entrada.";
      const mensajeGuestNoConfirmacion = "\nTe vamos a extrañar, pero entendemos.\nPrometemos compartir fotos, chismes y tal vez una selfie con el bizcocho.";
      const mensajeFamilyConfirmacion = this.familyGuest ? `\n${this.familyGuest.guestName} también ha confirmado su asistencia.` : "";
      const mensajeFamilyNoConfirmacion = this.familyGuest ? `\n${this.familyGuest.guestName} también confirmo` : "";
    
      return !this.familyGuest ? this.isAttending ? mensajeGuestConfirmacion 
      : mensajeGuestNoConfirmacion : 
      this.isAttending && this.familyGuest?.confirmation === true ?
      mensajeGuestConfirmacion + mensajeFamilyConfirmacion : 
      !this.isAttending && this.familyGuest?.confirmation === true ?
      mensajeGuestNoConfirmacion + mensajeFamilyConfirmacion + mensajeGuestConfirmacion : 
      this.isAttending && this.familyGuest?.confirmation === false ?
      mensajeGuestConfirmacion + mensajeFamilyNoConfirmacion + "." + mensajeGuestNoConfirmacion : 
      !this.isAttending && this.familyGuest?.confirmation === false ? 
      mensajeGuestNoConfirmacion + mensajeFamilyNoConfirmacion + ", te vamos a extrañar." : "";
    }
  }
