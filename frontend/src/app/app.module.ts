import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }         from './app.component';
import { GweetsComponent }      from './gweets.component';
import { GweetService }         from './gweet.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    GweetsComponent
  ],
  providers: [ GweetService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
