
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Gweet } from './gweet';
import { GweetService } from './gweet.service';

@Component({
  moduleId: module.id,
  selector: 'my-gweets',
  templateUrl: './gweets.component.html',
  styleUrls: [ './gweets.component.css' ]
})

export class GweetsComponent implements OnInit {
  errorMessage: string;
  gweets: Array<Gweet[]>;
  public currentText: string = '';
  public charsLeft: string = 140;

  title = "Gwitter";

  constructor(
    private router: Router,
    private gweetService: GweetService) { }

  getGweets() {
    this.gweetService
        .getGweets()
        .then(gweets => this.gweets = gweets);
  }

  postGweet(): void {
    var currentText = this.currentText.trim();
    if (!currentText) { return; }
    this.gweetService.create(currentText)
        .then(gweet => {
          this.getGweets();
        });
  }

  login(email: string, password: string): void {
    this.gweetService.login(email, password);
  }

  ngOnInit(): void {
    this.getGweets();
  }

  changed() {
    this.charsLeft = 140 - this.currentText.length;
  }
}
