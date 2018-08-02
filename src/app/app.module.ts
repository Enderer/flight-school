import { BrowserModule } from '@angular/platform-browser';
// import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FlightSchoolModule } from './flight-school/flight-school.module';

import { AppComponent } from './app.component';
import { GameDurationPipe } from './app/flight-school/pipes/game-duration.pipe';


// export class MyHammerConfig extends HammerGestureConfig  {
//   overrides = <any>{
//       'tap': {
//         threshold: 2000,
//       }
//   };
// }

@NgModule({
  declarations: [
    AppComponent,
    GameDurationPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlightSchoolModule
  ],
  providers: [
    
  //   { 
  //     provide: HAMMER_GESTURE_CONFIG, 
  //     useClass: MyHammerConfig 
  // }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
