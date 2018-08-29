import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlightSchoolModule } from './flight-school/flight-school.module';
import { AppComponent } from './app.component';
import { SortablejsModule } from 'angular-sortablejs';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlightSchoolModule,
    SortablejsModule.forRoot({ animation: 100 }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
