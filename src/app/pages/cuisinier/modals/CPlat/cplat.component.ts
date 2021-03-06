import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {  Validators, FormControl } from '@angular/forms';
import { CPlatService } from "./cplat.service";
import { ShareService } from 'src/app/services/share.service';
import { Plat } from 'src/app/models/plat.model';

@Component({
  selector: 'app-cplat',
  templateUrl: './cplat.component.html',
  styleUrls: ['./cplat.component.scss'],
})
export class CplatComponent implements OnInit {
  //photo : string;

  ingredients: any[] = [
    { nom: '', quantite: '', unite: '' }
  ];
  srecettes: any[] = [
    { nom: '', quantite: '', unite: '' }
  ];
  etapes: any[] = [
    { num: '', etape: '' }
  ]
  unites: string[] = ['g', 'ml', 'portion']

  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  //colonnes
  ingredientColumns: string[] = ['position', 'nom', 'quantité', 'unité'];
  sousRecetteColumns: string[] = ['position', 'nom', 'quantité', 'unité', 'voir'];
  etapeColumns: string[] = ['position', 'nom', 'description'];
  Users: any[] = []
  resp: any
  valider = false;
  plat = new Plat();
  //informations necessaires 
  nomPlat = new FormControl('', Validators.required);
  category = new FormControl('', Validators.required);
  famille = new FormControl('', Validators.required);
  sfamille = new FormControl('', Validators.required);
  nbparts = new FormControl('', Validators.required);
  duree = new FormControl('', Validators.required);


  constructor(
    public dialogRef: MatDialogRef<CplatComponent>,
    @Inject(MAT_DIALOG_DATA) public payload: any,
    private CPlatservice: CPlatService
    , private shareService: ShareService

  ) {
    this.getTokenResponsable().subscribe((data: any) => {
      this.resp=data.payload.val().token
    })

  }

  ngOnInit() {


  }
  addNewIngredient() {
    this.ingredients.push({ nom: '', quantite: 0, unite: '' })
  }
  addNewSrecette() {
    this.srecettes.push({ nom: '', quantite: 0, unite: '' })
  }
  addNewEtape() {
    this.etapes.push({ numeo: '', etape: '' })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  get isValid(): boolean {
    return this.nomPlat.invalid || this.category.invalid || this.famille.invalid
      || this.sfamille.invalid || this.nbparts.invalid || this.duree.invalid;
  }

  ajoutPlat() {

    const obj = {
      nomPlat: this.nomPlat.value,
      categorie: {
        key: this.category.value.key,
        nomcategorie: this.category.value.payload.val().nomcategorie
      },
      famille: {
        key: this.famille.value.key,
        nomfamille: this.famille.value.payload.val().nomfamille
      },
      sfamille: {
        key: this.sfamille.value.key,
        nomsfamille: this.sfamille.value.payload.val().nomsfamille
      },
      token: localStorage.getItem('token'),

      nbPart: this.nbparts.value,
      duree: this.duree.value,
      valide: false
    };
    console.log(obj)
    this.CPlatservice
      .ajoutPlat(obj)
      .then((data: any) => {
        const profile = JSON.parse(localStorage.getItem('profile'))
        this.shareService.showMsg("plat Proposé");
        this.valider = false;
        this.shareService.sendNotification({
          title: 'Proposition Plat ',
          body: this.nomPlat.value +' Proposé par Mr :' + JSON.parse(localStorage.getItem('profile')).nom + ' ' + JSON.parse(localStorage.getItem('profile')).prenom,
          icon : profile.avatar,
          to: this.resp
        }).subscribe(() => {
          console.log('notification envoyée avec succes')
        })
        this.dialogRef.close({
          key: data.key,
          ...obj
        });
      })
      .catch(error => {
        console.error(error.message);
        this.shareService.showMsg(error.message);
        this.valider = false;

      });
  }
  getTokenResponsable() {
    console.log(JSON.parse(localStorage.getItem('profile')).responsable)
    return this.shareService.getUser(JSON.parse(localStorage.getItem('profile')).responsable)
  }

}




