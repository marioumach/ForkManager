import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InscriptionComponent } from './inscription.component';

const routes: Routes = [
    { path: '', component: InscriptionComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InscriptionRoutingModule {}
