//imports necessaires

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//import / login / inscription

import { LoginComponent } from "./auth/login/login.component";
import { InscriptionComponent } from "./auth/inscription/inscription.component";
import { InterfaceTestComponent } from './pages/InterfaceTest/InterfaceTest.component';
import { TestService } from './pages/InterfaceTest/InterfaceTest.service';
const routes: Routes = [
      {
        path: "test",
        component: InterfaceTestComponent
        ,resolve:{test : TestService}
      },

      {
        path: "",
        component: LoginComponent
      },
      {
        path: "inscription",
        component: InscriptionComponent
      },
      
      {
        path: "pages",
        loadChildren:"./pages/pages.module#PagesModule"
           }]
   
  
          
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
