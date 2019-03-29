import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BarmanComponent } from './barman.component';
import { BoissonBarComponent} from "./boisson-bar/boisson-bar.component";
import { StockBarComponent } from "./stock-bar/stock-bar.component";
import { MenuBarComponent} from "./menu-bar/menu-bar.component";
import { ReservationBarComponent } from "./reservation-bar/reservation-bar.component";
import { CommandeBarComponent } from "./commande-bar/commande-bar.component";
import {  InventraireBarComponent } from "./inventraire-bar/inventraire-bar.component";
import { AcceuilBarComponent} from "./acceuil-bar/acceuil-bar.component";

const routes: Routes = [
    {
      path: "",
      component: BarmanComponent,
      children: [
        { path: "boisson", component: BoissonBarComponent },
        { path: "stock", component: StockBarComponent },
        { path: "menu", component: MenuBarComponent },
        { path: "reservation", component: ReservationBarComponent },
        { path: "commande", component: CommandeBarComponent },
        { path: "inventaire", component: InventraireBarComponent },
        { path: "", component: AcceuilBarComponent }
      ]
    }
  ];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BarmanRoutingModule {}
