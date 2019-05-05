import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-navigation-responsable",
  templateUrl: "./navigation-responsable.component.html"
})
export class NavigationResponsableComponent implements OnInit {
  items = [
    {
      title: "Acceuil",
      icon: "home",
      link: "./",
    },
    {
      title: "Plats",
      icon: "utensils",
      link: "./plats",
    },
    {
      title: "Boissons",
      icon: "glass-martini",
      link: "./boissons",
    },
    {
      title: "Sous Recettes",
      icon: "book-open",
      link: "./srecettes"
    },
    {
      title: "Portions",
      icon: "balance-scale",
      link: "./portions"
    },
    {
      title: "Réservations",
      icon: "calendar",
      link: "./reservations"
    },
    {
      title: "Personnels",
      icon: "users",
      link: "./personnels"
    },
    {
      title: "Inventaire",
      icon: "archive",
      link: "./inventaire"
    }]
  constructor(private router: Router) {}

  ngOnInit(): void {}
  activeRoute(routename: string): boolean {
    return this.router.url.indexOf(routename) > -1;
  }
}
