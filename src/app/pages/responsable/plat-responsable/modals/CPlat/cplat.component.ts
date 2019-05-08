import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {  Validators, FormControl } from '@angular/forms';
import { CPlatService } from "./cplat.service";
import { Plat } from 'src/app/srecette/plat.model';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-cplat',
  templateUrl: './cplat.component.html',
  styleUrls: ['./cplat.component.scss'],
})
export class CplatComponent implements OnInit {
   //photo : string;
  
   ingredients: any[] = [
    {nom: '', quantite: '' , unite: '' }
  ];
  srecettes: any[] = [
    {nom: '', quantite: '' , unite: '' }
  ];
  etapes:any[]=[
    {num:'', etape : ''}
  ]
  unites:string[] = ['g','ml','portion']


  valider= false ;
  plat  = new Plat() ;
   //informations necessaires 
  nomPlat = new FormControl('', Validators.required);
  category = new FormControl('', Validators.required);
  famille = new FormControl('', Validators.required);
  sfamille = new FormControl('', Validators.required);
  nbparts = new FormControl('', Validators.required);
  duree = new FormControl('', Validators.required);
  
 
  constructor(
     public dialogRef: MatDialogRef<CplatComponent>,
     @Inject(MAT_DIALOG_DATA) public payload: any , 
     private  CPlatservice: CPlatService
     ,private shareService : ShareService

     ) { }

  ngOnInit() {
    //console.log(this.payload);

  }
  addNewIngredient(){  
    this.ingredients.push({nom: '', quantite: 0 , unite: '' }) 
   }
    addNewSrecette(){  
      this.srecettes.push({nom: '', quantite: 0 , unite: '' }) 
     }
      addNewEtape(){
        this.etapes.push({numeo :'',etape:''})
      }
  onNoClick(): void {
    this.dialogRef.close();
  }

  get isValid():boolean{
    return this.nomPlat.invalid || this.category.invalid || this.famille.invalid 
    || this.sfamille.invalid || this.nbparts.invalid || this.duree.invalid; 
}

  ajoutPlat() {

    this.valider=true;
    const obj = {
      token: JSON.parse(localStorage.getItem('profile')).token,
      nomPlat : this.nomPlat.value,
      categorie : {
        key: this.category.value.key,
        nomcategorie: this.category.value.payload.val().nomcategorie
      },
      famille : {
        key: this.famille.value.key,
        nomfamille: this.famille.value.payload.val().nomfamille
      },
      sfamille : {
        key: this.sfamille.value.key,
        nomsfamille: this.sfamille.value.payload.val().nomsfamille
      },
      ingredients: this.ingredients ,
      srecettes: this.srecettes,
      etapes:this.etapes,
      nbPart : this.nbparts.value,
      duree : this.duree.value
    };
    console.log(obj)
     this.CPlatservice
    .ajoutPlat(obj)
    .then((data: any) => {
      this.shareService.showMsg("plat ajouté");
      this.valider= false;
      this.dialogRef.close({
        key: data.key,
        ...obj
      });
    })
    .catch(error => {
      console.error(error.message);
      this.shareService.showMsg(error.message);
      this.valider= false;

    });
    
}

}




