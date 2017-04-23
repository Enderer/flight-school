import { Component } from '@angular/core';

declare const FastClick: any;


@Component({
  selector: 'fs-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  constructor() {
    FastClick.attach(document.body);
    document.ontouchmove = function(e) { e.preventDefault(); };
  }
}
