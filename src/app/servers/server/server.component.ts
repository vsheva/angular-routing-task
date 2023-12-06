import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };

  //---1---
  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  //-------------!!!!!!!!!!!!!!!!!!----------
  ngOnInit() {
    const id = +this.route.snapshot.params['id']; //-2-
    this.server = this.serversService.getServer(id); //-2-

    //-3-
    this.route.params.subscribe(
      (param: any) => {
        this.server = this.serversService.getServer(+param['id']); // param - is Object  !!!
      }
    )
  }

  //-------------!!!!!!!!!!!!!!!!!!----------


  onEdit() {
    this.router.navigate(['/servers', this.server.id,'edit']); // !!! это проще, чем ниже
    //this.router.navigate(['edit', {relativeTo: this.route, queryParamsHandling: 'preserve'}])
  }


}
