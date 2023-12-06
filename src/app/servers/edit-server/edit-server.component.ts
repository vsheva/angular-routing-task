import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);//1 option - bad!!
    console.log(this.route.snapshot.fragment);//1 option - bad!!

    this.route.queryParams.subscribe(
      (queryParam:Params)=>{
        this.allowEdit=queryParam['allowEdit'] ==="1" ? true :false;
      }
    ); //2 option - react on changes !!
    this.route.fragment.subscribe()  //2 option - react on changes !!

    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
