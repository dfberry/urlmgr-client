import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { DashboardComponent } from './components/index';
import { HomeComponent } from './home/home.component';

let appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'dashboard', component: DashboardComponent/*, canActivate: [AuthGuard]*/ }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });

class AuthGuard implements CanActivate {

    constructor(
      private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("authGuard - canActivate, route = " + route.url);
        console.log("authGuard - canActivate, state " + state.url);

        //if (this.isAuthenticated()) {
            // logged in so return true
        //    console.log("authGuard - canActivate isAuthenticated");
            return true;
        //}
        //console.log("authGuard - canActivate NOT isAuthenticated");

        // not logged in so redirect to login page with the return url
        //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        //return false;

    }

    //isAuthenticated(){
      /*this.store.select(state => state.user)
        .distinctUntilChanged()
        .subscribe(data => {
          console.log("authGuard - isAuthenticated - data = " + JSON.stringify(data));
          this.onUserEmitted(data)
        });
        */
        //return true;
    //}

    //public onUserEmitted(user:User){
    //  console.log("authGuard - onUserEmitted - user = " + JSON.stringify(user));
    //  return user.isAuthenticated;
    //}
}