import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';


 import { NguiMapModule} from '@ngui/map';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyAKWE1JinLb5yLSoxHiEjiq1CMuOqbx_s4'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
