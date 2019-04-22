import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { promise } from 'protractor';
import { ShareService } from 'src/app/services/share.service';
import { AngularFireDatabase } from "@angular/fire/database";
import * as firebase from 'firebase';
import { MatSnackBar } from '@angular/material';

ShareService
@Injectable()
export class PlatResponsableService implements Resolve<any> {
    constructor(private db: AngularFireDatabase ,private snackBar : MatSnackBar,) {

    }
    
//snackbar
showMsg(message: string){
    this.snackBar.open(message ,'fermer',{
        duration : 2000
    })
  }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            const ref = this.getPlats().subscribe((plats: any[])=>{
                const ref1 = this.getCategories().subscribe((categories)=>{
                    const ref2 = this.getIngredients().subscribe((ingredient)=>{
                        const ref3 =   this.getFamilles().subscribe((familles)=>{
                            const ref4 =    this.getSfamilles().subscribe((sfamilles)=>{
                                const obj= {
                                    plats: plats,
                                    categories: categories,
                                    ingredient : ingredient,
                                    familles : familles, 
                                    sfamilles : sfamilles
                                };
                                ref.unsubscribe();
                                ref1.unsubscribe();
                                ref2.unsubscribe();
                                ref3.unsubscribe();
                                ref4.unsubscribe();
                                resolve(obj)
                            })
                        })
                    })
                })
            });
        }
)
}
supprimePlat(key : string) {
    const itemsRef = this.db.object(`plats/${key}`);
    return itemsRef.remove();
  }

getPlats(){
    const ref = this.db.list('plats').snapshotChanges();
   return ref;
}
getCategories(){
    const ref = this.db.list('categories').snapshotChanges();
    return ref ;
}
getCategorie(key : string){
    var cat = firebase.database().ref("categories");
    cat.orderByChild("key").equalTo(key).on("child_added", function(snapshot) {
        console.log(snapshot.key);
      });
    //const ref = this.db.list('categories').orderByChild('size').equalTo(key).snapshotChanges();
    return cat ;
}
getIngredients(){
    const ref = this.db.list('ingredient').snapshotChanges();
    return ref ;
}
getFamilles(){
    const ref = this.db.list('famille').snapshotChanges();
    return ref ;
}
getSfamilles(){
    const ref = this.db.list('sfamille').snapshotChanges();
    return ref ;
}

}