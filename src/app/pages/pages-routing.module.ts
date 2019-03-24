import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";

import { PortionneurComponent } from "./portionneur/portionneur.component";
import { ResponsableComponent } from "./responsable/responsable.component";
import { ServeurComponent } from "./serveur/serveur.component";
import { ComptoireComponent } from "./comptoire/comptoire.component";
import { BarmanComponent } from "./barman/barman.component";
import { PagesComponent } from "./pages.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "cuisine",
        loadChildren: "./cuisinier/cuisinier.module#CuisineModule"
      },
      {
        path: "controle",
        loadChildren: "./controle/controle.module#ControleModule"
      },
      {
        path: "portion",
        component: PortionneurComponent
      },
      {
        path: "responsable",
        loadChildren: "./responsable/responsable.module#ResponsableModule"
      },
      {
        path: "serveur",
        component: ServeurComponent
      },
      {
        path: "comptoire",
        component: ComptoireComponent
      },
      {
        path: "bar",
        component: BarmanComponent
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
