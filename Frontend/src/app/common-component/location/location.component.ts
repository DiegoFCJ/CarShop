import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  location: String;
  toDisplay: String;
  toDisplayTitle: String;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("sono entrato");
    this.route.url.subscribe(urlSegments => {
      if(urlSegments[0] != null){
        console.log(urlSegments);
        this.location = urlSegments[0].path;
        console.log("valore di location : " + this.location);
      }
    })
    
    if(this.location === "users"){
      this.toDisplay = "Utenti / ";
      this.toDisplayTitle = "Tutti gli utenti"
    } else if (this.location === "work-in-progress"){
      // Questo e' solo di prova ma andra' fatto per tutte le pagine
      this.toDisplay = ""
      this.toDisplayTitle = "Il tuo Profilo"
    } else if (this,this.location === "admin-all-products"){
      this.toDisplay = "Prodotti / ";
      this.toDisplayTitle = "Tutti i prodotti";
    } else if (this,this.location === "aggiungi-auto"){
      this.toDisplay = "Prodotti / Tutti i prodotti / ";
      this.toDisplayTitle = "Aggiungi prodotto";
    } else if (this,this.location === "modifica-auto"){
      this.toDisplay= "Prodotti / Modifica auto / ";
      this.toDisplayTitle = "Modifica auto";
    } else {
      this.toDisplay = "unexpected / "
      this.toDisplayTitle = "Modificare la location.component"
    }
  }

}
