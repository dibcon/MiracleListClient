import { Component, OnInit, NgZone, Inject, InjectionToken, Optional } from '@angular/core';
import { CommunicationService } from '../Services/CommunicationService';
import { Router } from '@angular/router';
import { MiracleListProxy, LoginInfo } from '../Services/MiracleListProxy';
import { Title }  from '@angular/platform-browser';

import { isDevMode } from '@angular/core';
export const CLIENT_ID = new InjectionToken<string>('CLIENT_ID');

@Component({
 selector: 'Login',
 templateUrl: './Login.component.html'
})
export class LoginComponent implements OnInit {

 public clientID: string

 constructor(private miracleListProxy : MiracleListProxy, public communicationService: CommunicationService, private titleService: Title, private zone: NgZone, @Optional() @Inject(CLIENT_ID) cLIENT_ID?: string)
 {
this.clientID = cLIENT_ID;
this.communicationService.clientID = cLIENT_ID;
 console.log("======= LoginComponent:constructor. ClientID=" + cLIENT_ID);
}

  ngOnInit(){
  // Startaktion
  // console.log("======= LoginComponent:ngOnInit");
  this.zone.run(() => {
     this.showDownloads = !(this.communicationService.isCordova() || this.communicationService.isElectron());
  });
  }

 public name: string = "";
 public password: string;
 public errorMsg = '';

 public showDownloads: boolean;

 login() {

  // Kennwort nicht loggen!!!
  console.log("LOGIN", this.name);

if (!this.name || !this.password)
 {
 this.errorMsg = "Benutzername und Kennwort müssen ausgefüllt sein!";
 return;
}

this.errorMsg = "";
let li = new LoginInfo();
li.clientID = this.communicationService.clientID;
li.username = this.name;
li.password = this.password;

 this.miracleListProxy.login(li).subscribe(x=> {

  if (x == null || x.message) {
   console.log("login NICHT ERFOLGREICH",x);
   this.errorMsg = x ? x.message : 'Ungültige Anmeldung!';
   this.communicationService.token = "";
  }
  else {
   console.log("login ERFOLGREICH",x);
   this.communicationService.token = x.token;
   this.communicationService.username = this.name;
   this.errorMsg = "";
   this.communicationService.navigate("/app"); // Ansicht aufrufen
   this.titleService.setTitle(`MiracleListClient [${this.name}]` );
  }
  })
 }
}
