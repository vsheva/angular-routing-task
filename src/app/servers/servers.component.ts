import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload(id) {
  //this.router.navigate(['servers'], {relativeTo: this.route}); !!!!!!!
  //   this.router.navigate(
  //     ['/servers', id, 'edit'],
  //     {queryParams: { allowEdit:'2'}, fragment: "loading"}
    //)
  }

}
