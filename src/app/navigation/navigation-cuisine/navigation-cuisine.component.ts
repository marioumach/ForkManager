import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";


@Component({
  selector: "app-navigation-cuisine",
  templateUrl: "./navigation-cuisine.component.html"
})
export class NavigationCuisineComponent implements OnInit {
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
      title: "Sous Recettes",
      icon: "book-open",
      link: "./srecettes"
    },
    {
      title: "Réservation",
      icon: "calendar",
      link: "./reservation"
    },
    {
      title: "Stock",
      icon: "box-open",
      link: "./stock"
    },
    {
      title: "Commande",
      icon: "shopping-basket",
      link: "./commande"
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
