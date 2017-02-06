import { Component, OnInit } from '@angular/core';
// Dienste
import { MiracleListProxy } from '../Services/MiracleListProxy';
import { CommunicationService } from '../Services/CommunicationService'
// für Modalfenster
import { ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

// MomentJS
import * as moment from 'moment';


@Component({
 selector: 'Start',
 templateUrl: './Start.component.html'
})
export class StartComponent implements OnInit {

 ngOnInit() { console.log("======= LoginComponent:ngOnInit");
console.log(moment().localeData()); }

 constructor(private miracleListProxy : MiracleListProxy, private communicationService: CommunicationService, overlay: Overlay, vcr: ViewContainerRef, public modal: Modal, ) {
  overlay.defaultViewContainer = vcr;
 }

//  get username(): string {
//   return (this.communicationService.username)
//  }

 get isLoggedIn(): boolean {
  return (this.communicationService.username != null && this.communicationService.username != "")
 }

 about() {

  this.modal.alert()
   .size('lg')
   .showClose(true)
   .title('Über die Anwendung MiracleList')
   .body(`
            <h4>Dies ist eine Beispielanwendung für eine Single-Page-Webapplication (SPA) zur Aufgabenverwaltung.</h4>
            <div>Autor: Dr. Holger Schwichtenberg, <a href="http://www.IT-Visions.de">www.IT-Visions.de</a></div>
            <div>Version: 0.4.2 vom 30.01.2017</div>
     
            <h5>Webadressen:</h5>
            <ul>
                <li>Backend: <a href="https://miraclelistbackend.azurewebsites.net">https://miraclelistbackend.azurewebsites.net</a></li>
                <li>Frontend: <a href="http://www.miraclelist.net">http://www.miraclelist.net</a></li>
                <li>Quellcode Frontend: <a href="https://github.com/HSchwichtenberg/MiracleListClient">https://github.com/HSchwichtenberg/MiracleListClient</a></li>
            </ul>
            <h5>Eingesetzte Techniken:</h5>
            <ul>
                <li>Backend: .NET Core, C#, ASP.NET Core WebAPI, Entity Framework Core, SQL Azure, Azure Web App, Swagger</li>
                <li>Frontend: HTML, CSS, TypeScript, Angular, Bootstrap, MomentJS, angular2-moment, angular2-contextmenu, angular2-modal</li>
            </ul></h5>
             <h5>Versionsgeschichte:</h5>
            <ul>
                <li>0.1: Basisversion mit Aufgaben anlegen und bearbeiten</li>
                <li>0.2: Benutzerverwaltung, Kategorien verwalten</li>
                <li>0.3: Suchfunktion, fällige Aufgaben</li>
               <li>0.4: Aufwand zu einer Aufgabe erfassbar</li>
            </ul>
            
            <div>` + (this.isLoggedIn ? `<div>Angemelderter Benutzer: ${this.communicationService.username} (Token: ${this.communicationService.token})` : "") + `</div>` +
   "<div>Spracheinstellungen: " + (<any>moment().localeData())._abbr + "/" + window.navigator.language + "</div>"
   )
   .open();

 }

 logout() {
  console.log("logout");
  this.miracleListProxy.logoff(this.communicationService.token).subscribe(x=>x);
  this.communicationService.token = "";
  this.communicationService.navigate(""); // Ansicht aufrufen
 }
}

// modal.alert()
//     .size('lg')
//     .isBlocking(true)
//     .showClose(true)
//     .keyboard(27)
//     .title('Hello World')
//     .body('A Customized Modal')
//     .open();

