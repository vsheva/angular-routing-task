import {Observable} from "rxjs";
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";

export interface CanComponentDeactivate {
  //canDeactivate(): Observable<boolean> | Promise<boolean> | boolean ;
  handelRedirectionInMyComponent: ()=> Observable<boolean> | Promise<boolean> | boolean ;
}



export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

 canDeactivate(myComponent:CanComponentDeactivate,
               currentRoute: ActivatedRouteSnapshot,
               currentState: RouterStateSnapshot,
               nextState?: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean  {

   return myComponent.handelRedirectionInMyComponent() //we call function canDeactivate()
 }

}
