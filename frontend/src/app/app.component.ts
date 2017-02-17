import { Component, OnInit } from '@angular/core';

import { Gweet } from './gweet';
import { GweetService } from './gweet.service';

@Component({
  selector: 'gwitter',
  template: `
  <h1>Welcome to {{name}}</h1>
  <ul class="gweets">
    <li *ngFor="let gweet of gweets">
      {{gweet.body}}
      <p>by: {{gweet.username}} on {{gweet.created_on}}</p>
    </li>
  </ul>
  `,
  providers: [GweetService]
})

export class AppComponent implements OnInit {
  name = 'Gwitter';
  gweets: Gweet[];

  constructor(private gweetService: GweetService) { }

  getGweets(): void {
    this.gweetService.getGweets().then(gweets => this.gweets = gweets);
  }

  ngOnInit(): void {
    this.getGweets();
  }
}
