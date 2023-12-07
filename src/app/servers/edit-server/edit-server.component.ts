import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CanComponentDeactivate, CanDeactivateGuard} from "./can-deactivate-guard.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})


// export class EditServerComponent implements OnInit, CanComponentDeactivate {
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);//1 option - bad!!
    console.log(this.route.snapshot.fragment);//1 option - bad!!

    this.route.queryParams.subscribe(
      (queryParam:Params)=>{
        this.allowEdit=queryParam['allowEdit'] ==="1" ? true :false;
      }
    ); //2 option - react on changes !!
    this.route.fragment.subscribe()  //2 option - react on changes !!
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route,  queryParamsHandling: 'preserve'})
  }


  handelRedirectionInMyComponent():Observable<boolean> | Promise<boolean> | boolean {
    if(!this.allowEdit) {
      return true;
    }
    if((this.serverName !==this.server.name || this.serverStatus !==this.server.status) && this.changesSaved===false) {
     return confirm("Do you want to discard the changes ?");
    } else {
      return true;
    }
  }
}
