import { Component } from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent {
  errorMessage:string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    //this.errorMessage = this.route.snapshot.data['message'] //if no changes   !!

    this.route.data.subscribe(
      (data:Data) => {
        this.errorMessage = data['message']
      }
    )

  }
}
